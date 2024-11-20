"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { API_BASE_URL } from "@/utils/api"
import { showAlert, showInfo } from "@/utils/base"
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter } from 'lucide-react'
import React, { useState } from 'react'

export default function ContactUsPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    async function submitContactForm(data: any) {
        try {
            const response = await fetch(`${API_BASE_URL}api/contact-us/`, {
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

            showInfo('Message envoyé avec succès:');
            return { success: true, data: responseData };
        } catch (error) {
            showAlert('Erreur lors de l\'envoi du message:');
            return { success: false, error };
        }
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const data = { name, email, subject, message };
        const submited = submitContactForm(data);
    }

    return (
        <div className="min-h-screen bg-gray-100">

            {/* Main Content */}
            <main className="container mx-auto py-8 px-4">
                <h1 className="text-3xl font-bold mb-8 text-center">Contact Us</h1>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Contact Form */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold mb-4">Send us a message</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        placeholder="Your name"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Your email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="subject">Subject</Label>
                                    <Input
                                        id="subject"
                                        placeholder="Subject of your message"
                                        required
                                        value={subject}
                                        onChange={(e) => setSubject(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="message">Message</Label>
                                    <Textarea
                                        id="message"
                                        placeholder="Your message"
                                        rows={4}
                                        required
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                    />
                                </div>
                                <Button type="submit" className="w-full">Send Message</Button>
                            </div>
                        </form>
                    </div>

                    {/* Contact Information */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
                        <div className="space-y-4">
                            <div className="flex items-start space-x-3">
                                <Mail className="h-6 w-6 text-gray-600" />
                                <div>
                                    <h3 className="font-semibold">Email</h3>
                                    <p>support@eshop.com</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3">
                                <Phone className="h-6 w-6 text-gray-600" />
                                <div>
                                    <h3 className="font-semibold">Phone</h3>
                                    <p>+1 (555) 123-4567</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3">
                                <MapPin className="h-6 w-6 text-gray-600" />
                                <div>
                                    <h3 className="font-semibold">Address</h3>
                                    <p>123 E-commerce St, Digital City, 12345</p>
                                </div>
                            </div>
                        </div>

                        <h3 className="text-xl font-semibold mt-8 mb-4">Follow Us</h3>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-600 hover:text-blue-500">
                                <Facebook className="h-6 w-6" />
                                <span className="sr-only">Facebook</span>
                            </a>
                            <a href="#" className="text-gray-600 hover:text-blue-400">
                                <Twitter className="h-6 w-6" />
                                <span className="sr-only">Twitter</span>
                            </a>
                            <a href="#" className="text-gray-600 hover:text-pink-500">
                                <Instagram className="h-6 w-6" />
                                <span className="sr-only">Instagram</span>
                            </a>
                        </div>
                    </div>
                </div>
            </main>


        </div>
    )
}