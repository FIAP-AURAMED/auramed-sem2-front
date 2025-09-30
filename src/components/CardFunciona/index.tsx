
import { Link } from 'react-router-dom'; 


interface CardFuncionaProps {
    icon: React.ElementType;
    title: string;
    description: string;
    buttonText?: string;
    buttonLink?: string;
    colorTheme?: 'pink' | 'yellow';
    className?: string;
}

export default function CardFunciona({ icon: Icon, title, description, buttonText, buttonLink, colorTheme = 'pink', className, }: CardFuncionaProps) {

   
    const colorStyles = {
        pink: {
            bg: 'bg-primary-600/10',
            text: 'text-primary-600', 
        },
        yellow: {
            bg: 'bg-secondary-600/10',
            text: 'text-secondary-600',
        },
        
    };

    const styles = colorStyles[colorTheme] || colorStyles.pink;

    return (
        <div
            className={`
        bg-white rounded-lg text-center border-2 border-gray-300
        hover:border-primary-600 transition-colors hover:shadow-lg p-6 flex flex-col items-center space-y-4
        ${className}`}
        >
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto ${styles.bg}`}>
                <Icon className={`h-8 w-8 ${styles.text}`} aria-hidden="true" />
            </div>
            <h3 className="text-xl font-semibold text-tx-primary">
                {title}
            </h3>
            <p className="text-tx-secondary flex-grow">
                {description}
            </p>

            {buttonLink && (
                <Link
                    to={buttonLink}
                    className=" border-1 border-solid border-gray-300 px-4 py-2 rounded-lg hover:bg-primary-600 hover:text-white transition-colors mt-4"
                    aria-label={title}
                >
                    {buttonText}
                </Link>
            )}
        </div>
    );
}