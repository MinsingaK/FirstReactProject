import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
import Dashboard from './pages/dashboard/Dashboard.jsx'
import Connexion from './pages/connexion/Connexion.jsx'
import Inscription from './pages/inscription/Inscription.jsx'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />
  },
  {
    path:"/connexion",
    element: <Connexion />
  },
  {
    path:"/inscription",
    element: <Inscription />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
