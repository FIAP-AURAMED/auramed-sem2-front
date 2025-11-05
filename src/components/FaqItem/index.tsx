import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FaqItemProps {
    question: string;
    answer: string;
}

export default function FaqItem({ question, answer }: FaqItemProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border border-gray-200 rounded-lg mb-4 transition-all duration-200 hover:border-gray-300">
            <button
                className="flex justify-between items-center w-full p-4 text-left bg-white hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="font-medium text-tx-primary pr-4">{question}</span>
                {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                )}
            </button>
            
            {isOpen && (
                <div className="p-4 bg-gray-50 border-t border-gray-200">
                    <p className="text-tx-secondary leading-relaxed">{answer}</p>
                </div>
            )}
        </div>
    );
}