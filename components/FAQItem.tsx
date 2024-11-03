import { AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => (
    <AccordionItem value={question}>
        <AccordionTrigger className="text-left">
            {question}
        </AccordionTrigger>
        <AccordionContent>
            {answer}
        </AccordionContent>
    </AccordionItem>
)
export default FAQItem;