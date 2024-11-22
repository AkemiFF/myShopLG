"use client"
import FAQItem from '@/components/FAQItem'
import { Accordion } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import anime from 'animejs'
import { Search } from 'lucide-react'
import Head from 'next/head'
import { useEffect, useState } from 'react'

const faqData = [
    {
        question: "Comment passer une commande ?",
        answer: "Pour passer une commande, parcourez simplement nos produits, ajoutez des articles à votre panier et procédez au paiement. Suivez les instructions pour saisir vos informations de livraison et de paiement."
    },
    {
        question: "Quels moyens de paiement acceptez-vous ?",
        answer: "Nous acceptons les principales cartes de crédit (Visa, MasterCard, American Express), PayPal, et Apple Pay."
    },
    {
        question: "Quel est le délai de livraison ?",
        answer: "Les délais de livraison varient selon votre localisation et le mode d'expédition choisi. En général, les commandes sont traitées sous 1-2 jours ouvrables et livrées sous 3-7 jours ouvrables."
    },
    {
        question: "Quelle est votre politique de retour ?",
        answer: "Nous offrons une politique de retour de 30 jours pour la plupart des articles. Les produits doivent être dans leur état d'origine avec les étiquettes attachées. Consultez notre page Retours pour plus de détails."
    },
    {
        question: "Livrez-vous à l'international ?",
        answer: "Oui, nous livrons dans de nombreux pays. Les frais de port et les délais de livraison peuvent varier selon la destination."
    },
    {
        question: "Comment suivre ma commande ?",
        answer: "Une fois votre commande expédiée, vous recevrez un email de confirmation avec un numéro de suivi. Vous pouvez utiliser ce numéro pour suivre votre colis sur notre site ou celui du transporteur."
    },
    {
        question: "Mes informations de paiement sont-elles sécurisées ?",
        answer: "Oui, nous utilisons des mesures de sécurité et de cryptage aux normes de l'industrie pour protéger vos informations de paiement. Nous ne stockons jamais vos données de carte complètes sur nos serveurs."
    },
    {
        question: "Que faire si je reçois un article endommagé ?",
        answer: "Si vous recevez un article endommagé, veuillez contacter notre service client dans les 48 heures suivant la livraison. Nous organiserons un remplacement ou un remboursement."
    }
]

export default function FAQPage() {
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        anime({
            targets: '.fade-in',
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 800,
            delay: anime.stagger(100)
        });
    }, []);

    const filteredFAQs = faqData.filter(faq =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <>
            <Head>
                <title>FAQ - ShopLG | Questions Fréquentes</title>
                <meta name="description" content="Trouvez des réponses à toutes vos questions sur ShopLG. Notre FAQ couvre les commandes, livraisons, retours et plus encore." />
                <meta name="keywords" content="ShopLG FAQ, questions fréquentes, aide ShopLG, support client" />
                <link rel="canonical" href="https://shoplg.online/faq" />
            </Head>

            <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
                <main className="container mx-auto py-8 px-4">
                    <h1 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white fade-in">
                        Questions Fréquentes
                    </h1>

                    <div className="max-w-2xl mx-auto mb-8 fade-in">
                        <div className="relative">
                            <Input
                                type="text"
                                placeholder="Rechercher dans la FAQ..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full py-2 pl-10 pr-4 rounded-md dark:bg-gray-800 dark:text-white"
                            />
                            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        </div>
                    </div>

                    <div className="max-w-3xl mx-auto fade-in">
                        <Accordion type="single" collapsible className="w-full">
                            {filteredFAQs.map((faq, index) => (
                                <FAQItem key={index} question={faq.question} answer={faq.answer} />
                            ))}
                        </Accordion>
                    </div>

                    <div className="mt-12 text-center fade-in">
                        <h2 className="text-2xl font-semibold mb-4 dark:text-white">Encore des questions ?</h2>
                        <p className="mb-4 dark:text-gray-300">Si vous ne trouvez pas la réponse à votre question dans notre FAQ, n'hésitez pas à nous contacter.</p>
                        <Button className="bg-black hover:bg-gray-800 text-white">Contacter le Support</Button>
                    </div>
                </main>

            </div>
        </>
    )
}