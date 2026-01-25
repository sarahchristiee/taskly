import './App.css'
import { Routes, Route, Outlet } from 'react-router-dom';

// Nofificação toast (feito com react toastfy)
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// páginas
import Home from './pages/Home';
import Tarefas from './pages/Tarefas';
import Editar from './pages/Editar';
import Calendario from './pages/Calendario';
import Adicionar from './pages/Adicionar';

// Header
import Header from './components/Header';

function Layout() {
  return (
    <>
      <Header />
      <main className="pt-25">
        <Outlet />
      </main>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}



function App() {
  return (
    <Routes>
        <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/tarefas" element={<Tarefas />} />
        <Route path="/calendario" element={<Calendario />} />
        <Route path="/adicionar" element={<Adicionar />} />
        <Route path="/editar/:id" element={<Editar />} /> 
      </Route>
    
    </Routes>
  )
}

export default App
