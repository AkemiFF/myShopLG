import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const tosData = [
    {
        title: "1. Acceptance of Terms",
        content: "By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. Additionally, when using this website's particular services, you shall be subject to any posted guidelines or rules applicable to such services."
    },
    {
        title: "2. Description of Service",
        content: "E-Shop provides users with access to a rich collection of resources, including various communications tools, forums, shopping services, personalized content, and branded programming through its network of properties which may be accessed through any various medium or device now known or hereafter developed."
    },
    {
        title: "3. Registration Obligations",
        content: "In consideration of your use of the Service, you agree to: (a) provide true, accurate, current and complete information about yourself as prompted by the Service's registration form, and (b) maintain and promptly update the registration data to keep it true, accurate, current and complete."
    },
    {
        title: "4. User Account, Password, and Security",
        content: "You are responsible for maintaining the confidentiality of your password and account, and are fully responsible for all activities that occur under your password or account. You agree to (a) immediately notify E-Shop of any unauthorized use of your password or account or any other breach of security, and (b) ensure that you exit from your account at the end of each session."
    },
    {
        title: "5. Privacy Policy",
        content: "Registration data and certain other information about you are subject to our Privacy Policy. For more information, see our full Privacy Policy."
    },
    {
        title: "6. User Conduct",
        content: "You agree to not use the Service to: (a) upload, post, email, transmit or otherwise make available any content that is unlawful, harmful, threatening, abusive, harassing, tortious, defamatory, vulgar, obscene, libelous, invasive of another's privacy, hateful, or racially, ethnically or otherwise objectionable; (b) harm minors in any way; (c) impersonate any person or entity; (d) forge headers or otherwise manipulate identifiers in order to disguise the origin of any content transmitted through the Service."
    },
    {
        title: "7. Modifications to Service",
        content: "E-Shop reserves the right at any time and from time to time to modify or discontinue, temporarily or permanently, the Service (or any part thereof) with or without notice. You agree that E-Shop shall not be liable to you or to any third party for any modification, suspension or discontinuance of the Service."
    },
    {
        title: "8. Termination",
        content: "You agree that E-Shop may, under certain circumstances and without prior notice, immediately terminate your account, any associated email address, and access to the Service. Cause for such termination shall include, but not be limited to, (a) breaches or violations of the TOS or other incorporated agreements or guidelines, (b) requests by law enforcement or other government agencies, (c) a request by you (self-initiated account deletions), (d) discontinuance or material modification to the Service (or any part thereof), (e) unexpected technical or security issues or problems, (f) extended periods of inactivity, (g) engagement by you in fraudulent or illegal activities, and/or (h) nonpayment of any fees owed by you in connection with the Services."
    },
]

export default function TermsOfServicePage() {
    return (
        <div className="min-h-screen bg-gray-100">

            {/* Main Content */}
            <main className="container mx-auto py-8 px-4">
                <h1 className="text-3xl font-bold mb-8 text-center">Terms of Service</h1>

                <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
                    <p className="mb-6">
                        Welcome to E-Shop. If you continue to browse and use this website, you are agreeing to comply with and be bound by the following terms and conditions of use, which together with our privacy policy govern E-Shop's relationship with you in relation to this website.
                    </p>

                    <Accordion type="single" collapsible className="w-full">
                        {tosData.map((item, index) => (
                            <AccordionItem key={index} value={`item-${index}`}>
                                <AccordionTrigger>{item.title}</AccordionTrigger>
                                <AccordionContent>{item.content}</AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>

                    <p className="mt-6">
                        If you do not agree to these terms of use, please refrain from using our website. The use of this website is subject to the following terms of use.
                    </p>
                </div>
            </main>

        </div>
    )
}