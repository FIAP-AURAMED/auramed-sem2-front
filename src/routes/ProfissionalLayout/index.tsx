import { Outlet, Link } from "react-router-dom";

function ProfissionalLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Cabeçalho ou menu do profissional */}
      <header className="bg-gray-800 text-white p-4 flex justify-between">
        <h1>Área do Profissional</h1>
        <nav>
          <Link to="/profissional/dashboard" className="mr-4">Dashboard</Link>
          <Link to="/profissional/questionario">Questionário</Link>
        </nav>
      </header>

      {/* Conteúdo da rota */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}

export default ProfissionalLayout;
