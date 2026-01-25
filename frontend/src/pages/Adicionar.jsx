import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

//data limite (feito com o react date-picker)
import DatePicker, { registerLocale } from "react-datepicker";
import ptBR from "date-fns/locale/pt-BR";
import "react-datepicker/dist/react-datepicker.css";

// notificação "toast" (feito com o react toastfy)
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import '../App.css'

export default function Adicionar() {

  //calendário em portugues
  registerLocale("pt-BR", ptBR);

  //para redirecionamento de página
  const navigate = useNavigate();

    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [data, setData] = useState(null);

    const handleSubmit = async (e) => {
      e.preventDefault();

      const tarefa = {
        titulo,
        descricao,
        data: data ? data.toISOString().split("T")[0] : null, //formatação data
      };

      try{
        const response = await fetch("http://127.0.0.1:8000/api/tarefas/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(tarefa)
        });

        if(!response.ok){
          throw new Error("Erro ao criar tarefa")
        }

        // Sucesso
        const tarefaCriada = await response.json();

        setTitulo("");
        setDescricao("");
        setData(null);

        toast.success("Tarefa criada com sucesso!");
        navigate("/tarefas");
      }

      catch(error){
        console.error(error);
        toast.error("Erro ao criar a tarefa!")
      }
    };
  

  return (
        <div>
          <main className='max-w-[80%] mx-auto pt-20 relative'>

          <h1 className='text-6xl font-bold text-[#03045E]'>Nova Tarefa</h1>

          <form onSubmit={handleSubmit} className='pt-10 grid gap-y-3'>

            {/* Título */}
            <div className='grid pb-5'>
              <label htmlFor="titulo" className='text-2xl'>Título <span className='text-[#E32B24]'>*</span></label>
              <input 
              type="text"
              id='titulo'
              placeholder='Insira o título da sua tarefa' 
              className='border w-[50vh] p-2 rounded-xl'
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
              /> 
            </div>
          
            {/* Descrição */}
            <div className='grid pb-5'>
              <label htmlFor="descricao" className='text-2xl'>Descrição</label>
              <textarea
              type="text"
              id='descricao'
              placeholder='Insira uma descrição sobre a tarefa'
              className='border w-[50vh] h-[20vh] p-2 rounded-xl resize-none'
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              />
            </div>

            {/* Data Limite */}
            <div className="grid w-[10vh]">
              <label className='text-2xl'>Data Limite<span className='text-[#E32B24]'>*</span></label>
              <DatePicker
              selected={data}
              onChange={(date) => setData(date)}
              locale="pt-BR"
              placeholderText="Selecione uma data"
              dateFormat="dd/MM/yyyy"
              className='border w-[20vh] p-2 rounded-xl mb-10'
              required
            />
            </div> 

          <div className="flex items-center gap-5">
            <Link to="/tarefas" className="bg-[#E32B24] text-white text-2xl rounded-full px-6 py-3 hover:bg-[#861C18] transition-color duration-300">Cancelar</Link>
            <button type="submit" className="bg-[#2D7D6D] text-white text-2xl rounded-full px-6 py-3 hover:bg-[#25584E] transition-colors duration-300">Criar Tarefa</button>
          </div>
         
          </form>
          </main>

        </div>
  );
};
