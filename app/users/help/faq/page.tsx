"use client"
import FAQItem from '@/components/FAQItem'
import {
    Accordion
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react'
import { useState } from 'react'


const faqData = [
    {
        question: "How do I place an order?",
        answer: "To place an order, simply browse our products, add items to your cart, and proceed to checkout. Follow the prompts to enter your shipping and payment information."
    },
    {
        question: "What payment methods do you accept?",
        answer: "We accept major credit cards (Visa, MasterCard, American Express), PayPal, and Apple Pay."
    },
    {
        question: "How long will it take to receive my order?",
        answer: "Shipping times vary depending on your location and chosen shipping method. Generally, orders are processed within 1-2 business days and delivered within 3-7 business days."
    },
    {
        question: "What is your return policy?",
        answer: "We offer a 30-day return policy for most items. Products must be in their original condition with tags attached. Please see our Returns page for more details."
    },
    {
        question: "Do you ship internationally?",
        answer: "Yes, we ship to many countries worldwide. Shipping costs and delivery times may vary depending on the destination."
    },
    {
        question: "How can I track my order?",
        answer: "Once your order ships, you'll receive a confirmation email with a tracking number. You can use this number to track your package on our website or the carrier's site."
    },
    {
        question: "Are my payment details secure?",
        answer: "Yes, we use industry-standard encryption and security measures to protect your payment information. We never store your full credit card details on our servers."
    },
    {
        question: "What should I do if I receive a damaged item?",
        answer: "If you receive a damaged item, please contact our customer service within 48 hours of delivery. We'll arrange for a replacement or refund."
    }
]

export default function FAQPage() {
    const [searchTerm, setSearchTerm] = useState('')

    const filteredFAQs = faqData.filter(faq =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="min-h-screen bg-gray-100">

            {/* Main Content */}
            <main className="container mx-auto py-8 px-4">
                <h1 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h1>

                {/* Search Bar */}
                <div className="max-w-2xl mx-auto mb-8">
                    <div className="relative">
                        <Input
                            type="text"
                            placeholder="Search FAQ..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full py-2 pl-10 pr-4 rounded-md"
                        />
                        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>
                </div>

                {/* FAQ Accordion */}
                <div className="max-w-3xl mx-auto">
                    <Accordion type="single" collapsible className="w-full">
                        {filteredFAQs.map((faq, index) => (
                            <FAQItem key={index} question={faq.question} answer={faq.answer} />
                        ))}
                    </Accordion>
                </div>

                {/* Contact Section */}
                <div className="mt-12 text-center">
                    <h2 className="text-2xl font-semibold mb-4">Still have questions?</h2>
                    <p className="mb-4">If you cannot find the answer to your question in our FAQ, please feel free to contact us.</p>
                    <Button>Contact Support</Button>
                </div>
            </main>

        </div>
    )
}