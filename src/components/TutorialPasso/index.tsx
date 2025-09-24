// src/components/TutorialPassos.tsx

import React, { useState } from 'react';
import passo1 from '../../assets/passo1.png';
import passo2 from '../../assets/passo2.png';
import passo3 from '../../assets/passo3.png';
import passo4 from '../../assets/passo4.png';
import passo5 from '../../assets/passo5.png';
import passo6 from '../../assets/passo6.png';
import passo7 from '../../assets/passo7.png';
import passo8 from '../../assets/passo8.png';
import passo9 from '../../assets/passo9.png';
import passo10 from '../../assets/passo10.png';


const passosData = [
    {
        id: 1,
        title: 'Passo 1: Baixe o aplicativo',
        description: 'Vá até a loja do seu celular (Play Store ou App Store) e procure por "Portal do Paciente HC".',
        imageSrc: passo1,
        imageAlt: 'Loja de aplicativos mostrando o app Portal do Paciente HC',
    },
    {
        id: 2,
        title: 'Passo 2: Tela inicial',
        description: 'Após abrir a tela do aplicativo, clique em “Acessar Portal” para fazer o Cadastro.',
        imageSrc: passo2,
        imageAlt: 'Tela inicial do aplicativo do HC, com seta para clicar em Acessar Portal',
    },
    {
        id: 3,
        title: 'Passo 3: Cadastre-se',
        description: 'Se for sua primeira vez acessando o aplicativo, clique em “Cadastrar Senha”.',
        imageSrc: passo3,
        imageAlt: 'Tela do aplicativo mostrando a opção de cadastrar senha',
    },
    {
        id: 4,
        title: 'Passo 4: Cadastro inicial',
        description: 'Na tela de cadastro, digite seu CPF (somente números) no campo indicado e toque em “Localizar Paciente”.',
        imageSrc: passo4,
        imageAlt: 'Tela de cadastro de senha no app do HC.',
    },
    {
        id: 5,
        title: 'Passo 5: Preencha seus dados',
        description: 'Seu nome e CPF aparecerão automaticamente. Preencha os demais campos e responda as perguntas. Depois, toque em “Salvar”.',
        imageSrc: passo5,
        imageAlt: 'Tela com campos de cadastro no app do HC.',
    },
    {
        id: 6,
        title: 'Passo 6: Login',
        description: 'Você voltará para a tela de início. Digite o CPF e a senha que acabou de cadastrar. Depois, toque em “Acessar”.',
        imageSrc: passo6,
        imageAlt: 'Tela de login no app do HC.',
    },
    {
        id: 7,
        title: 'Passo 7: Menu principal',
        description: 'Caso sua consulta não apareça de imediato, toque no botão “Menu” na parte inferior da tela.',
        imageSrc: passo7,
        imageAlt: 'Tela inicial do app do HC com a opção Menu destacada.',
    },
    {
        id: 8,
        title: 'Passo 8: Acesse a teleconsulta',
        description: 'Dentro do menu, toque na opção “Teleconsulta”. Ali você verá sua consulta marcada.',
        imageSrc: passo8,
        imageAlt: 'Tela do menu do aplicativo com a opção Teleconsulta destacada.',
    },
    {
        id: 9,
        title: 'Passo 9: Entrar na teleconsulta',
        description: 'Toque duas vezes na opção “Teleconsulta”. Depois, toque em “Entrar na Teleconsulta” para acessar a sala virtual.',
        imageSrc: passo9,
        imageAlt: 'Tela de detalhes da teleconsulta com botão Entrar destacado.',
    },
    {
        id: 10,
        title: 'Passo 10: Aguardar o profissional',
        description: 'Agora é só aguardar o profissional de saúde entrar na sala. Você será atendido em breve, fique tranquilo.',
        imageSrc: passo10,
        imageAlt: 'Tela de sala de espera da teleconsulta.',
    },
];

export const TutorialPassos: React.FC = () => {
    // 2. ESTADO: Controla qual passo está ativo no momento.
    const [currentStep, setCurrentStep] = useState(1);

    const totalPassos = passosData.length;
    const stepData = passosData.find((p) => p.id === currentStep);

    // 3. NAVEGAÇÃO: Funções para avançar e voltar.
    const handleNext = () => {
        if (currentStep < totalPassos) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleRestart = () => {
        setCurrentStep(1);
    };

    if (!stepData) return null; // Garante que nada quebre se o passo não for encontrado

    const progressPercentage = (currentStep / totalPassos) * 100;

    return (
        <section className="bg-background text-tx-primary w-full max-w-4xl mx-auto p-4 md:p-8 rounded-2xl shadow-lg border border-gray-300">
            {/* Barra de Progresso */}
            <div>
                <span className="text-sm font-semibold text-primary-600">Passo {currentStep} de {totalPassos}</span>
                <div className="w-full bg-muted rounded-full h-2.5 mt-2">
                    <div
                        className="bg-primary-600 h-2.5 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${progressPercentage}%` }}
                    ></div>
                </div>
            </div>

            {/* Conteúdo do Passo */}
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Textos */}
                <div className="space-y-4 text-center lg:text-left">
                    <h2 className="text-2xl font-bold text-primary-600">{stepData.title}</h2>
                    <p className="text-tx-secondarytext-lg">{stepData.description}</p>
                </div>
                {/* Imagem */}
                <div className="flex justify-center">
                    <img
                        src={stepData.imageSrc}
                        alt={stepData.imageAlt}
                        className="rounded-lg shadow-md max-h-96 object-contain"
                    />
                </div>
            </div>

            {/* Botões de Navegação */}
            <div className="mt-10 flex justify-between items-center">
                {currentStep > 1 ? (
                    <button
                        onClick={handleBack}
                        className="px-6 py-2 font-semibold rounded-lg bg-muted text-tx-secondary hover:bg-border transition-colors"
                    >
                        Voltar
                    </button>
                ) : (
                    <div></div> // Espaçador para manter o botão de próximo à direita
                )}

                {currentStep < totalPassos ? (
                    <button
                        onClick={handleNext}
                        className="px-6 py-2 font-semibold rounded-lg bg-primary-600 text-white hover:bg-primary-600/90 transition-colors animate-pulse"
                    >
                        Próximo
                    </button>
                ) : (
                    <button
                        onClick={handleRestart}
                        className="px-6 py-2 font-semibold rounded-lg bg-primary-600 text-white hover:bg-primary-600/90 transition-colors"
                    >
                        Refazer Tutorial
                    </button>
                )}
            </div>
        </section>
    );
};