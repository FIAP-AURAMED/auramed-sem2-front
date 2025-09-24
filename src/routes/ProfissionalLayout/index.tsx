import { Outlet} from "react-router-dom";
import DashboardProfissional from "../DashboardProfissional";

function ProfissionalLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Cabeçalho ou menu do profissional */}
      <header className="bg-primary-600 text-white p-4 flex justify-between">
        <h1>Área do Profissional</h1>
      </header>
        <DashboardProfissional/>
      {/* Conteúdo da rota */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}

export default ProfissionalLayout;
