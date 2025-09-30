import { useEffect } from "react";
import { TutorialPassos } from "../../components/TutorialPasso";



export default function Tutorial() {

    useEffect(() => {
            document.title = 'AuraMed | Tutorial';
            return () => {
                document.title = 'AuraMed';
            };
        }, []);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <h1 className="text-4xl font-bold text-tx-primary mb-2 text-center">
                Como Usar o Aplicativo
            </h1>
            <p className="text-lg text-tx-secondary text-center max-w-150 max-auto pb-8">Um guia completo, passo a passo, para você se preparar da melhor forma para sua consulta online.</p>
            <TutorialPassos />
        </div>
    );
}