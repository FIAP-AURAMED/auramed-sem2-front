import { useState } from 'react';
import { ChevronDown } from 'lucide-react';


interface FaqItemProps {
    question: string;
    answer: string;
}

export default function FaqItem({ question, answer }: FaqItemProps) {

    const [isOpen, setIsOpen] = useState(false);


    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="border-b-2 border-gray-200 py-4">

            <button
                onClick={toggleOpen}
                className="w-full flex justify-between items-center text-left focus:outline-none"
                aria-expanded={isOpen}
            >
                <h3 className="text-lg font-semibold text-tx-primary">{question}</h3>
                <ChevronDown
                    className={`w-6 h-6 text-primary-600 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen mt-4' : 'max-h-0'}`}
            >
                <p className="text-tx-secondary">
                    {answer}
                </p>
            </div>
        </div>
    );
}