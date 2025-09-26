import { MenuIcon, User, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';


export default function Menu() {
    const location = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
    const isActive = (path: string): boolean => location.pathname === path;

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    const navLinkBaseStyle: string = "px-4 py-2 rounded-md text-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500";
    const navLinkDesktopIdleStyle: string = "text-gray-700 hover:bg-gray-100 hover:text-gray-900";
    const navLinkActiveStyle: string = "bg-primary-600 text-white";

    const mobileNavLinkBaseStyle: string = "w-full text-left px-4 py-3 rounded-md text-base font-medium transition-colors";

    return (
        <div>
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between gap-4">
                    {/* Navegação Principal (Desktop) */}
                    <nav className="hidden md:flex items-center gap-4" role="navigation" aria-label="Navegação principal">
                        <Link to="/" className={`${navLinkBaseStyle} ${isActive('/') ? navLinkActiveStyle : navLinkDesktopIdleStyle}`} aria-current={isActive('/') ? 'page' : undefined}>Início</Link>
                        <Link to="/como-funciona" className={`${navLinkBaseStyle} ${isActive('/como-funciona') ? navLinkActiveStyle : navLinkDesktopIdleStyle}`} aria-current={isActive('/como-funciona') ? 'page' : undefined}>Como Funciona</Link>
                        <Link to="/sobre" className={`${navLinkBaseStyle} ${isActive('/sobre') ? navLinkActiveStyle : navLinkDesktopIdleStyle}`} aria-current={isActive('/sobre') ? 'page' : undefined}>Sobre o Projeto</Link>
                        <Link to="/central-ajuda" className={`${navLinkBaseStyle} ${isActive('/central-ajuda') ? navLinkActiveStyle : navLinkDesktopIdleStyle}`} aria-current={isActive('/central-ajuda') ? 'page' : undefined}>Central de Ajuda</Link>
                    </nav>

                    <div className="flex items-center gap-3">
                        {/* Botão de Acesso do Profissional (Desktop) */}
                        <Link to="/login-profissional" className="hidden md:block">
                            <button className="flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium border-2 border-gray-300 bg-white text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" aria-label="Área do profissional de saúde">
                                <User className="h-4 w-4" aria-hidden="true" />
                                Área do Profissional
                            </button>
                        </Link>

                        {/* Botão Hamburger (Mobile) */}
                        <button
                            className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                            onClick={() => setMobileMenuOpen(true)}
                            aria-label="Abrir menu de navegação"
                        >
                            <MenuIcon className="h-9 w-9" />
                        </button>
                    </div>
                </div>
            </div>

            {/* overlay que aparece com o menu */}
            <div
                className={`fixed inset-0 bg-black/40 z-40 transition-opacity md:hidden ${mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={closeMobileMenu}
                aria-hidden="true"
            ></div>

            {/* O painel do menu que desliza */}
            <div
                className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-50 transform transition-transform md:hidden ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
                role="dialog"
                aria-modal="true"
                aria-label="Menu de navegação móvel"
            >
                <div className="flex flex-col p-4 space-y-4">
                    {/* Cabeçalho do Menu Mobile */}
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
                        <button
                            onClick={closeMobileMenu}
                            className="p-2 rounded-md text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            aria-label="Fechar menu"
                        >
                            <X className="h-8 w-8" />
                        </button>
                    </div>

                    {/* Navegação Mobile */}
                    <nav className="flex flex-col space-y-2" role="navigation">
                        <Link to="/" onClick={closeMobileMenu} className={`${mobileNavLinkBaseStyle} ${isActive('/') ? navLinkActiveStyle : navLinkDesktopIdleStyle}`}>Início</Link>
                        <Link to="/como-funciona" onClick={closeMobileMenu} className={`${mobileNavLinkBaseStyle} ${isActive('/como-funciona') ? navLinkActiveStyle : navLinkDesktopIdleStyle}`}>Como Funciona</Link>
                        <Link to="/sobre" onClick={closeMobileMenu} className={`${mobileNavLinkBaseStyle} ${isActive('/sobre') ? navLinkActiveStyle : navLinkDesktopIdleStyle}`}>Sobre o Projeto</Link>
                        <Link to="/central-ajuda" onClick={closeMobileMenu} className={`${mobileNavLinkBaseStyle} ${isActive('/central-ajuda') ? navLinkActiveStyle : navLinkDesktopIdleStyle}`}>Central de Ajuda</Link>

                        <div className="border-t pt-4 mt-6">
                            <Link to="/login-profissional" onClick={closeMobileMenu}>
                                <button className="w-full flex items-center gap-2 px-4 py-3 rounded-md text-base font-medium border-2 border-gray-300 bg-white text-gray-800 hover:bg-gray-50">
                                    <User className="h-4 w-4" aria-hidden="true" />
                                    Área do Profissional
                                </button>
                            </Link>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    );
}
