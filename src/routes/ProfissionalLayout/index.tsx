import { useEffect } from "react";

export default function ProfissionalLayout() {

  useEffect(() => {
          document.title = 'AuraMed | Profissional';
          return () => {
              document.title = 'AuraMed';
          };
      }, []);

  return (
    <div className="min-h-screen flex flex-col">
      
      <header className="bg-primary-600 text-white p-4 flex justify-between">
        <h1>Área do Profissional</h1>
      </header>
    </div>
  );
}


