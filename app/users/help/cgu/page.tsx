"use client"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import anime from 'animejs'
import Head from 'next/head'
import { useEffect } from 'react'

const tosData = [
    {
        title: "1. Acceptation des Conditions",
        content: "En accédant et en utilisant le site shoplg.online, vous acceptez et vous engagez à respecter les termes et dispositions de cet accord. De plus, lors de l'utilisation des services particuliers de ce site, vous serez soumis aux directives ou règles affichées applicables à ces services."
    },
    {
        title: "2. Description du Service",
        content: "ShopLG fournit aux utilisateurs un accès à une riche collection de ressources, notamment divers outils de communication, forums, services d'achat, contenu personnalisé et programmation de marque via son réseau de propriétés accessibles via tout support ou dispositif connu actuellement ou développé ultérieurement."
    },
    {
        title: "3. Obligations d'Inscription",
        content: "En contrepartie de votre utilisation du Service, vous acceptez de : (a) fournir des informations vraies, exactes, actuelles et complètes vous concernant comme demandé dans le formulaire d'inscription du Service, et (b) maintenir et mettre à jour rapidement les données d'inscription pour les garder vraies, exactes, actuelles et complètes."
    },
    {
        title: "4. Compte Utilisateur, Mot de Passe et Sécurité",
        content: "Vous êtes responsable du maintien de la confidentialité de votre mot de passe et de votre compte, et êtes entièrement responsable de toutes les activités qui se produisent sous votre mot de passe ou compte. Vous acceptez de (a) informer immédiatement ShopLG de toute utilisation non autorisée de votre mot de passe ou compte ou de toute autre violation de sécurité, et (b) vous assurer de vous déconnecter de votre compte à la fin de chaque session."
    },
    {
        title: "5. Politique de Confidentialité",
        content: "Les données d'inscription et certaines autres informations vous concernant sont soumises à notre Politique de Confidentialité. Pour plus d'informations, consultez notre Politique de Confidentialité complète."
    },
    {
        title: "6. Conduite de l'Utilisateur",
        content: "Vous acceptez de ne pas utiliser le Service pour : (a) télécharger, publier, envoyer par e-mail, transmettre ou rendre disponible tout contenu illégal, nuisible, menaçant, abusif, harcelant, diffamatoire, vulgaire, obscène, calomnieux, invasif de la vie privée d'autrui, haineux, ou racialement, ethniquement ou autrement répréhensible ; (b) nuire aux mineurs de quelque manière que ce soit ; (c) usurper l'identité d'une personne ou d'une entité ; (d) falsifier des en-têtes ou manipuler des identifiants pour masquer l'origine de tout contenu transmis via le Service."
    },
    {
        title: "7. Modifications du Service",
        content: "ShopLG se réserve le droit, à tout moment et de temps à autre, de modifier ou d'interrompre, temporairement ou définitivement, le Service (ou toute partie de celui-ci) avec ou sans préavis. Vous acceptez que ShopLG ne soit pas responsable envers vous ou envers un tiers pour toute modification, suspension ou interruption du Service."
    },
    {
        title: "8. Résiliation",
        content: "Vous acceptez que ShopLG puisse, dans certaines circonstances et sans préavis, résilier immédiatement votre compte, toute adresse e-mail associée et l'accès au Service. Les motifs d'une telle résiliation comprennent, sans s'y limiter, (a) les violations des CGU ou d'autres accords ou directives incorporés, (b) les demandes des forces de l'ordre ou d'autres agences gouvernementales, (c) une demande de votre part (suppressions de compte auto-initiées), (d) l'arrêt ou la modification substantielle du Service, (e) des problèmes techniques ou de sécurité imprévus, (f) des périodes d'inactivité prolongées, (g) votre engagement dans des activités frauduleuses ou illégales, et/ou (h) le non-paiement des frais dus en relation avec les Services."
    },
]

export default function TermsOfServicePage() {
    useEffect(() => {
        // Animation for page elements
        anime({
            targets: '.content-wrapper',
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 800,
            easing: 'easeOutExpo'
        });
    }, []);

    return (
        <>
            <Head>
                <title>Conditions d'Utilisation | ShopLG - Votre Destination Shopping en Ligne</title>
                <meta name="description" content="Découvrez les conditions d'utilisation de ShopLG. Nous nous engageons à vous offrir une expérience d'achat sécurisée et transparente sur shoplg.online." />
                <meta name="keywords" content="ShopLG, conditions d'utilisation, CGU, e-commerce, shopping en ligne, shoplg.online" />
                <meta property="og:title" content="Conditions d'Utilisation | ShopLG" />
                <meta property="og:description" content="Conditions d'utilisation officielles de ShopLG - Votre destination shopping en ligne de confiance." />
                <meta property="og:url" content="https://shoplg.online/terms" />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="https://shoplg.online/terms" />
            </Head>

            <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
                <main className="container mx-auto py-8 px-4">
                    <div className="content-wrapper">
                        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">
                            Conditions d'Utilisation
                        </h1>

                        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                            <p className="mb-6 text-gray-600 dark:text-gray-300">
                                Bienvenue sur ShopLG. En continuant à naviguer et à utiliser ce site web, vous acceptez de vous conformer et d'être lié par les conditions d'utilisation suivantes, qui, avec notre politique de confidentialité, régissent la relation de ShopLG avec vous concernant ce site web.
                            </p>

                            <Accordion type="single" collapsible className="w-full">
                                {tosData.map((item, index) => (
                                    <AccordionItem key={index} value={`item-${index}`}>
                                        <AccordionTrigger className="text-gray-800 dark:text-white hover:text-gray-600">
                                            {item.title}
                                        </AccordionTrigger>
                                        <AccordionContent className="text-gray-600 dark:text-gray-300">
                                            {item.content}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>

                            <p className="mt-6 text-gray-600 dark:text-gray-300">
                                Si vous n'acceptez pas ces conditions d'utilisation, veuillez vous abstenir d'utiliser notre site web. L'utilisation de ce site web est soumise aux conditions d'utilisation ci-dessus.
                            </p>
                        </div>


                    </div>
                </main>
            </div>
        </>
    )
}