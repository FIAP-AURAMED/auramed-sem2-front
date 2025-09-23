// src/components/FeatureCard.tsx

import React from 'react';
import { CheckCircle } from 'lucide-react';


interface CardBeneficiosProps {
    icon: React.ElementType;
    title: string;
    beneficios: string[];
    className?: string; 
    colorTheme?: 'green' | 'pink' | 'amarelo';
}

export default function CardBeneficios({ icon: Icon, title, beneficios, className, colorTheme='green' }: CardBeneficiosProps) {

    const colorStyles = {
            green: {
                bg: 'bg-green-600/10',
                text: 'text-green-600'
            },
            pink: {
                bg: 'bg-primary-600/10',
                text: 'text-primary-600'
            },
            amarelo: {
                bg: 'bg-secondary-600/10',
                text: 'text-secondary-600'
            }
        };

        const styles = colorStyles[colorTheme] || colorStyles.green;

    return (

        <div
            className={`
        bg-white rounded-lg text-center border-2 border-gray-300 transition-colors p-6 space-y-4
        ${className}`}
        >
            <div className={`w-16 h-16 ${styles.bg} rounded-full flex items-center justify-center mx-auto`}>
                <Icon className={`h-8 w-8 ${styles.text}`} aria-hidden="true" />
            </div>

            <h3 className="text-[24px] font-semibold text-tx-primary">
                {title}
            </h3>
            <ul className="space-y-4 text-left" role="list">
                {beneficios.map((beneficio, index) => (
                    <li key={index} className="flex items-center gap-3">
                        <CheckCircle className={`h-5 w-5 text-green-600 flex-shrink-0`} aria-hidden="true" />
                        <span className="text-tx-secondary">
                            {beneficio}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}