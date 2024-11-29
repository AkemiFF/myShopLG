"use client"
import { CreateOrder } from '@/utils/order';
import crypto from 'crypto';
import { NextApiRequest, NextApiResponse } from 'next';

interface NotificationBody {
    reference: string;
    montant: number;
    etat: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        try {
            const SECRET_KEY = process.env.KEY_SECRET;
            const signature = req.headers['vpi-signature'];
            const payload = JSON.stringify(req.body);

            // Vérification de la signature
            const computedHash = crypto
                .createHmac('sha256', (SECRET_KEY as string))
                .update(payload)
                .digest('hex')
                .toUpperCase();

            if (computedHash !== signature) {
                return res.status(401).json({ error: 'Invalid signature' });
            }

            const { reference, montant, etat } = req.body as NotificationBody;


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

            // Répondre avec succès à Vanilla Pay
            return res.status(200).json({ message: 'Notification reçue et traitée.' });
        } catch (error) {
            console.error('Erreur lors du traitement de la notification :', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        return res.status(405).json({ error: 'Method not allowed' });
    }
}

