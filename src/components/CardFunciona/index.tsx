// src/components/ActionCard.tsx
import { Link } from 'react-router-dom'; // Importe o Link do seu roteador

// 1. Definimos as props para este card específico
interface CardFuncionaProps {
    icon: React.ElementType;
    title: string;
    description: string;
    buttonText?: string;
    buttonLink?: string;
    colorTheme?: 'pink' | 'yellow'; // Adicionamos temas de cores
    className?: string;
}

export default function CardFunciona({icon: Icon, title, description, buttonText, buttonLink, colorTheme = 'pink', className,}: CardFuncionaProps) {

    // 2. Mapa de estilos para as cores do ícone
    const colorStyles = {
        pink: {
            bg: 'bg-primary-600/10',
            text: 'text-primary-600', // Ajustei para combinar com o fundo
        },
        yellow: {
            bg: 'bg-secondary-600/10',
            text: 'text-secondary-600',
        },
        // Adicione mais temas se precisar
    };

    const styles = colorStyles[colorTheme] || colorStyles.pink;

    return (
        // Usamos um 'div' como container principal
        <div
            className={`
        bg-white rounded-lg text-center border-2 border-gray-300
        hover:border-primary-600 transition-colors hover:shadow-lg p-6 flex flex-col items-center space-y-4
        ${className}`}
        >
            {/* Ícone */}
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto ${styles.bg}`}>
                <Icon className={`h-8 w-8 ${styles.text}`} aria-hidden="true" />
            </div>

            {/* Título */}
            <h3 className="text-xl font-semibold text-tx-primary">
                {title}
            </h3>

            {/* Descrição */}
            <p className="text-tx-secondary flex-grow">
                {description}
            </p>

            {/* Botão/Link de Ação */}
            <Link
                to={buttonLink}
                className=" border-1 border-solid border-gray-300 px-4 py-2 rounded-lg hover:bg-primary-600 hover:text-white transition-colors mt-4"
                aria-label={title} // Boa prática de acessibilidade
            >
                {buttonText}
            </Link>
        </div>
    );
}