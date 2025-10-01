import { Link } from 'react-router-dom';
import { AlertTriangle, Home } from 'lucide-react';
import { useEffect } from 'react';

export default function NotFound() {

    useEffect(() => {
        document.title = 'AuraMed | 404 Not Found';
        return () => {
            document.title = 'AuraMed';
        };
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
            <div className="w-20 h-20 rounded-full flex items-center justify-center bg-secondary-600/10 mb-6">
                <AlertTriangle className="w-10 h-10 text-secondary-600" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-tx-primary">404</h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-tx-primary mt-2">
                Página Não Encontrada
            </h2>
            <p className="text-lg text-tx-secondary max-w-md mx-auto mt-4">
                Oops! Parece que a página que você está procurando não existe ou foi movida para outro local.
            </p>
            <Link 
                to="/" 
                className="mt-8 inline-flex items-center justify-center gap-2 bg-primary-600 text-white font-semibold px-4 py-3 rounded-lg hover:bg-primary-700 transition-colors"
            >
                <Home className="w-5 h-5" />
                Voltar para a Página Inicial
            </Link>
        </div>
    );
}