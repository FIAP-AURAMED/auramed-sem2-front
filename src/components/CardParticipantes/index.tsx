import github from "../../assets/github.svg" 
import linkedin from "../../assets/linkedin.svg"

interface CardParticipanteProps {
    img: string;
    name: string;
    role: string; 
    githubUrl?: string; 
    linkedinUrl?: string; 
    className?: string;
}

export default function CardParticipante({
    img,
    name,
    role,
    githubUrl,
    linkedinUrl,
    className,
}: CardParticipanteProps) {
    return (
        <div
            className={`
                bg-white border-2 border-transparent rounded-lg text-center shadow-md
                hover:shadow-xl hover:border-primary-500 transition-all duration-300
                p-6 flex flex-col items-center space-y-2
                ${className}
            `}
        >
            
            <img
                src={img}
                alt={`Foto de ${name}`}
                className='w-32 h-32 rounded-full object-cover mb-2' 
            />

            <h3 className="text-lg font-semibold text-gray-800">
                {name}
            </h3>

            <p className="text-gray-600 flex-grow min-h-[40px] text-sm">
                {role}
            </p>

            <div className='flex items-center justify-center gap-4 mt-2'>
                {githubUrl && (
                    <a
                        href={githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Perfil de ${name} no GitHub`}
                        className="text-gray-500 hover:text-gray-900 transition-colors"
                    >
                        <img src={github} alt={`Ícone do GitHub de ${name}`} className="w-8 h-8"/>
                    </a>
                )}

                {linkedinUrl && (
                    <a
                        href={linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Perfil de ${name} no LinkedIn`}
                        className="text-gray-500 hover:text-blue-600 transition-colors"
                    >
                        <img src={linkedin} alt={`Ícone do LinkedIn de ${name}`} className="w-8 h-8"/>
                    </a>
                )}
            </div>
        </div>
    );
}