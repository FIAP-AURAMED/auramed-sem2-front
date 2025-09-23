// src/components/ActionCard.tsx
import { Link } from 'react-router-dom'; // Importe o Link do seu roteador

// 1. Definimos as props para este card específico
interface CardParticipanteProps {
    img: string;
    title: string;
    description: string;
    icon: string;
    linkUrl: string;
    className?: string;
}

export default function CardParticipante({ img, title, description, linkUrl, icon, className, }: CardParticipanteProps) {
    return (
        <div
            className={`
        bg-primary-600/20 rounded-lg text-center hover:shadow-lg p-6 flex flex-col items-center justify-center space-y-4
        ${className}`}
        >

            <img src={img} alt={title} className='w-50 h-50 redoude-' />

            {/* Título */}
            <h3 className="text-xl font-semibold text-tx-primary">
                {title}
            </h3>

            {/* Descrição */}
            <p className="text-tx-secondary flex-grow">
                {description}
            </p>

            <div className='flex items-center just gap-2'>
                <Link to={linkUrl}>
                    <img src={icon} title={icon} className={`h-8 w-8 text-primary-600`} aria-hidden="true" />
                </Link>

                <Link to={linkUrl}>
                    <img src={icon} title={icon} className={`h-8 w-8 text-primary-600`} aria-hidden="true" />
                </Link>
            </div>
        </div>
    );
}