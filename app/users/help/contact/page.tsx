"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { API_BASE_URL } from "@/utils/api"
import { showAlert, showInfo } from "@/utils/base"
import anime from 'animejs'
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter } from 'lucide-react'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'

export default function ContactUsPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        anime({
            targets: '.fade-in',
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 800,
            delay: anime.stagger(100)
        });
    }, []);

    async function submitContactForm(data: any) {
        try {
            const response = await fetch(`${API_BASE_URL}/api/contact-us/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Erreur:', errorData);
                return { success: false, error: errorData };
            }

            setName("");
            setEmail("");
            setSubject("");
            setMessage("");

            const responseData = await response.json();
            showInfo('Message envoyé avec succès');
            return { success: true, data: responseData };
        } catch (error) {
            showAlert('Erreur lors de l\'envoi du message');
            return { success: false, error };
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const data = { name, email, subject, message };
        const submitted = submitContactForm(data);
    }

    return (
        <>
            <Head>
                <title>Contactez-nous - ShopLG | Support Client</title>
                <meta name="description" content="Besoin d'aide ? Contactez l'équipe ShopLG. Nous sommes là pour répondre à toutes vos questions." />
                <meta name="keywords" content="contact ShopLG, support client, aide ShopLG" />
                <link rel="canonical" href="https://shoplg.online/contact" />
            </Head>

            <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
                <main className="container mx-auto py-8 px-4">
                    <h1 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white fade-in">
                        Contactez-nous
                    </h1>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md fade-in">
                            <h2 className="text-2xl font-semibold mb-4 dark:text-white">Envoyez-nous un message</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="space-y-4">
                                    <div>
                                        <Label htmlFor="name">Nom</Label>
                                        <Input
                                            id="name"
                                            placeholder="Votre nom"
                                            required
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="dark:bg-gray-700 dark:text-white"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="Votre email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="dark:bg-gray-700 dark:text-white"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="subject">Sujet</Label>
                                        <Input
                                            id="subject"
                                            placeholder="Sujet de votre message"
                                            required
                                            value={subject}
                                            onChange={(e) => setSubject(e.target.value)}
                                            className="dark:bg-gray-700 dark:text-white"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="message">Message</Label>
                                        <Textarea
                                            id="message"
                                            placeholder="Votre message"
                                            rows={4}
                                            required
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            className="dark:bg-gray-700 dark:text-white"
                                        />
                                    </div>
                                    <Button type="submit" className="w-full bg-black hover:bg-gray-800 text-white">
                                        Envoyer le Message
                                    </Button>
                                </div>
                            </form>
                        </div>

                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md fade-in">
                            <h2 className="text-2xl font-semibold mb-4 dark:text-white">Informations de Contact</h2>
                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <Mail className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                                    <div>
                                        <h3 className="font-semibold dark:text-white">Email</h3>
                                        <p className="dark:text-gray-300">contact@shoplg.online</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <Phone className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                                    <div>
                                        <h3 className="font-semibold dark:text-white">Téléphone</h3>
                                        <p className="dark:text-gray-300">+33 (0)1 23 45 67 89</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <MapPin className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                                    <div>
                                        <h3 className="font-semibold dark:text-white">Adresse</h3>
                                        <p className="dark:text-gray-300">123 Rue du Commerce, Paris 75000</p>
                                    </div>
                                </div>
                            </div>

                            <h3 className="text-xl font-semibold mt-8 mb-4 dark:text-white">Suivez-nous</h3>
                            <div className="flex space-x-4">
                                <a href="#" className="text-gray-600 hover:text-blue-500 dark:text-gray-300">
                                    <Facebook className="h-6 w-6" />
                                    <span className="sr-only">Facebook</span>
                                </a>
                                <a href="#" className="text-gray-600 hover:text-blue-400 dark:text-gray-300">
                                    <Twitter className="h-6 w-6" />
                                    <span className="sr-only">Twitter</span>
                                </a>
                                <a href="#" className="text-gray-600 hover:text-pink-500 dark:text-gray-300">
                                    <Instagram className="h-6 w-6" />
                                    <span className="sr-only">Instagram</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </main>


            </div>
        </>
    )
}