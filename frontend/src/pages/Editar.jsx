import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

// Para data (feito com o react-date-picker
import DatePicker, { registerLocale } from "react-datepicker";
import ptBR from "date-fns/locale/pt-BR";
import "react-datepicker/dist/react-datepicker.css";
import '../App.css'


// notificação "toast" (feito com o react toastfy)
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Editar() {

  const {id} = useParams();
  const navigate = useNavigate();

  //data lem português
  registerLocale("pt-BR", ptBR);

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/tarefas/${id}/`)
    .then((res) => res.json())
    .then((tarefa) => {
      setTitulo(tarefa.titulo);
      setDescricao(tarefa.descricao || "");
      setData(new Date(tarefa.data));
    })
    .catch(() => {
      toast.success("Erro ao carregar a tarefa");
      alert("Erro ao carregar a tarefa");
      navigate("/tarefas");
    });

  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
    const response = await fetch(
      `http://127.0.0.1:8000/api/tarefas/${id}/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          titulo,
          descricao,
          data: data ? data.toISOString().split("T")[0] : null,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Erro ao editar tarefa");
    }

    toast.success("Tarefa editada com sucesso!");
    navigate("/tarefas");
  } catch (error) {
    console.error(error);
    toast.error("Erro ao editar a tarefa");
  }
};


  return (
    <div>
    <main className='max-w-[80%] mx-auto pt-20 relative'>
    
      <h1 className='text-6xl font-bold text-[#03045E]'>Editar Tarefa</h1>
    
      <form onSubmit={handleSubmit} className='pt-10 grid gap-y-3'>
    
        {/* Título */}
        <div className='grid pb-5'>
        <label htmlFor="titulo" className='text-2xl'>Título <span className='text-[#E32B24]'>*</span></label>
        <input
        type="text"
        id='titulo'
        placeholder='Insira o título da sua tarefa'
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        className='border w-[50vh] p-2 rounded-xl'
        required/> 
        </div>
              
        {/* Descrição */}
         <div className='grid pb-5'>
          <label htmlFor="descricao" className='text-2xl'>Descrição</label>
          <textarea
          type="text"
          id='descricao'
          placeholder='Insira uma descrição sobre a tarefa'
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          className='border w-[50vh] h-[20vh] p-2 rounded-xl resize-none'/>
          </div>
    
          {/* Data Limite */}
          <div className="grid w-[10vh]">
          <label className='text-2xl'>Data Limite<span className='text-[#E32B24]'>*</span></label>
          <DatePicker
            selected={data}
            onChange={setData}
            locale="pt-BR"
            dateFormat="dd/MM/yyyy"
            className="border w-[20vh] p-2 rounded-xl mb-10"
            required
          />
          </div> 

          <div className="flex items-center justify-between' gap-2">
            <Link to="/tarefas" className="bg-[#E32B24] text-white text-2xl rounded-full px-6 py-3 hover:bg-[#861C18] transition-color duration-300">Cancelar</Link>
            <button type="submit" className="bg-[#2D7D6D] text-white text-2xl rounded-full px-6 py-3 hover:bg-[#25584E] transition-color duration-300">Salvar Alterações</button>
          </div> 

          </form>
                
    </main>
    </div>
  )
}
