import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import App from "./App";
import Home from "./routes/Home";
import Sobre from "./routes/Sobre";
import CentralAjuda from "./routes/CentralAjuda";
import Tutorial from "./routes/Tutorial";
import Simulador from "./routes/Simulador";
import ComoFunciona from "./routes/ComoFunciona";
import LoginProfissional from "./routes/LoginProfissional";
import NotFound from "./routes/NotFound";
import ProfissionalLayout from "./routes/ProfissionalLayout";
import DashboardProfissional from "./routes/DashboardProfissional";
import QuestionarioProfissional from "./routes/QuestionarioProfissional";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      errorElement: <NotFound />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/sobre", element: <Sobre /> },
        { path: "/central-ajuda", element: <CentralAjuda /> },
        { path: "/tutorial", element: <Tutorial /> },
        { path: "/simulador", element: <Simulador /> },
        { path: "/como-funciona", element: <ComoFunciona /> },
        { path: "/login-profissional", element: <LoginProfissional /> },
      ],
    },
    {
      path: "/profissional",
      element: <ProfissionalLayout />,
      children: [
        { path: "dashboard", element: <DashboardProfissional /> },
        { path: "questionario", element: <QuestionarioProfissional /> },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL }
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
