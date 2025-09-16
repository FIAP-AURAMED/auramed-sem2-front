import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import Home from './assets/routes/Home'
import Sobre from './assets/routes/Sobre'
import CentralAjuda from './assets/routes/CentralAjuda'
import Tutorial from './assets/routes/Tutorial'
import Simulador from './assets/routes/Simulador'
import ComoFunciona from './assets/routes/ComoFunciona'
import LoginProfissional from './assets/routes/LoginProfissional'
import NotFound from './assets/routes/NotFound'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'


const router =createBrowserRouter([
  {path: "/",
    element: <App/>,
    errorElement:<NotFound/>,
    children:[
      {path: "/",
      element: <Home/>
  },
  {path: "/sobre",
    element: <Sobre/>
  },
  {path: "/central-ajuda",
    element: <CentralAjuda/>
  },
  {path: "/tutorial",
    element: <Tutorial/>
  },
  {path: "/simulador",
    element: <Simulador/>
  },
  {path: "/como-funciona",
    element: <ComoFunciona/>
  },
  {path: "/login-profissional",
    element: <LoginProfissional/>
  }
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
