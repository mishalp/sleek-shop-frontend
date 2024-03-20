import Header from '@/components/header/Header'
import Footer from '@/components/footer/Footer'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { faqs } from '@/data'


export default function Faq() {
    return (
        <div className='w-screen max-w-full flex flex-col gap-20 bg-myprimary'>
            <Header />
            <div className="flex container flex-col w-full pt-32 py-4">
                <h2 className='text-2xl font-semibold'>FAQs</h2>
                <Accordion type="single" collapsible>
                    {faqs.map((item, i) => (
                        <AccordionItem value={item.q} key={i}>
                            <AccordionTrigger className='text-left decoration-0' >{item.q}</AccordionTrigger>
                            <AccordionContent>
                                {item.a}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
            <Footer />
        </div>
    )
}
