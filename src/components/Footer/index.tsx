
import { Link } from 'react-router-dom';
import { Mail, Phone} from 'lucide-react';
import logo from '../../assets/logo.png';

export default function Footer() {
    return (
        <footer className="bg-gray-500/10 mt-auto " role="contentinfo">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Logo and Description */}
                    <div className="space-y-4">
                        <img
                            src={logo}
                            alt="Auramed Logo"
                            className="h-10 w-auto"
                        />
                        <p className="text-tx-secondary">
                            Reduzindo o absenteísmo em teleconsultas através de uma solução acessível e intuitiva.
                        </p>
                    </div>

                    {/* Navigation Links */}
                    <div>
                        <h3 className="font-semibold text-tx-primary-6text-primary-600 mb-4 text-lg">
                            Navegação
                        </h3>
                        <nav className="space-y-2" aria-label="Links do rodapé">
                            <Link
                                to="/"
                                className="block text-tx-secondary hover:text-primary-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-6text-primary-600 rounded p-1 -m-1"
                            >
                                Página Inicial
                            </Link>
                            <Link
                                to="/como-funciona"
                                className="block text-tx-secondary hover:text-primary-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-6text-primary-600 rounded p-1 -m-1"
                            >
                                Como Funciona
                            </Link>
                            <Link
                                to="/tutorial"
                                className="block text-tx-secondary hover:text-primary-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-6text-primary-600 rounded p-1 -m-1"
                            >
                                Tutorial
                            </Link>
                            <Link
                                to="/simulador"
                                className="block text-tx-secondary hover:text-primary-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-6text-primary-600 rounded p-1 -m-1"
                            >
                                Simular Consulta
                            </Link>
                            <Link
                                to="/central-ajuda"
                                className="block text-tx-secondary hover:text-primary-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-6text-primary-600 rounded p-1 -m-1"
                            >
                                Central de Ajuda
                            </Link>
                        </nav>
                    </div>

                    {/* Contact Information */}
                    <div>
                        <h3 className="font-semibold text-primary-600 mb-4 text-lg">
                            Contato
                        </h3>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <Mail className="h-4 w-4 text-primary-600 flex-shrink-0" aria-hidden="true" />
                                <span className="text-tx-secondary text-accessible">
                                    contato@auramed.com.br
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone className="h-4 w-4 text-primary-600 flex-shrink-0" aria-hidden="true" />
                                <span className="text-tx-secondary text-accessible">
                                    (11) 9999-9999
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-border mt-8 pt-6 text-center">
                    <p className="text-tx-secondary text-accessible">
                        © 2025 Auramed. Todos os direitos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
};