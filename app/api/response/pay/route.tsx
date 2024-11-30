import { CreateOrder } from '@/utils/order';
import crypto from 'crypto';
import { NextRequest, NextResponse } from 'next/server';




export async function POST(req: NextRequest) {
    try {
        const SECRET_KEY = process.env.KEY_SECRET;
        if (!SECRET_KEY) {
            throw new Error('KEY_SECRET is not defined in environment variables');
        }

        // Récupérer la signature et le corps de la requêteif (computedHash !== signature.toUpperCase()) {
        const signature = req.headers.get('vpi-signature');
        const payload = await req.text();
        console.log(signature);

        if (!signature) {
            return NextResponse.json({ error: 'Missing signature in headers' }, { status: 500 });
        }

        // Calcul de la signature pour vérification
        const computedHash = crypto
            .createHmac('sha256', SECRET_KEY)
            .update(payload)
            .digest('hex')
            .toUpperCase();

        console.log(computedHash);

        if (computedHash !== signature.toUpperCase()) {
            return NextResponse.json({ error: 'Invalid signature' }, { status: 501 });
        }

        // Analyse du corps de la requête (JSON)
        const body = JSON.parse(payload);
        const { reference, montant, etat } = body;

        // Traitement en fonction de l'état
        if (etat === 'SUCCESS') {
            const orderData = localStorage.getItem("orderData");
            if (orderData) {
                CreateOrder(JSON.parse(orderData));
            }
            console.log(`Paiement réussi : Référence ${reference}, Montant ${montant}`);
        } else if (etat === 'FAILED') {
            console.log(`Paiement échoué : Référence ${reference}`);
        } else if (etat === 'PENDING') {
            console.log(`Paiement en attente : Référence ${reference}`);
        }

        // Répondre à Vanilla Pay
        return NextResponse.json({ message: 'Notification reçue et traitée.' });
    } catch (error) {
        console.error('Erreur lors du traitement de la notification :', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function GET() {
    return NextResponse.json({ message: 'GET method not supported on this route' }, { status: 405 });
}
