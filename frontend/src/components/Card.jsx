import React, {useEffect, useState } from 'react'
import { Link } from "react-router-dom";

//icones
import { RiEdit2Fill } from "react-icons/ri";
import { TbTrashFilled } from "react-icons/tb";

import '../App.css'

export default function Card() {

  //puxando as tarefas da api
  const [tarefas, setTarefas] = useState([]);

  useEffect(() =>{
    fetch("http://127.0.0.1:8000/api/tarefas/")
    .then((response) => response.json())
    .then((data) => setTarefas(data))
    .catch((error) => console.error("Erro:", error));
  }, []);

    //Deletar
    const handleDelete = async (id) => {
      if (!window.confirm("Tem certeza que deseja excluir esta tarefa?")) return;

      try {
        const response = await fetch(`http://127.0.0.1:8000/api/tarefas/${id}/`,{
          method: "DELETE"
        });

        if (!response.ok) throw new Error(error);

        setTarefas(tarefas.filter((tarefa) => tarefa.id !== id));

        toast.success("A tarefa foi excluida!");
        }

        catch(error){
          console.error(error);
          toast.error("Não foi possivivél excluir a tarefa")
        }
    }

    // Muda o status pelo check
    const toggleStatus = async (tarefa) => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/tarefas/${tarefa.id}/`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              status: !tarefa.status,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Erro ao atualizar status");
        }

        const novaLista = await fetch("http://127.0.0.1:8000/api/tarefas/")
          .then(res => res.json())

        setTarefas(novaLista)

      } catch (error) {
        console.error(error);
        toast.error("Erro ao atualizar status");
      }
    };



  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6 mx-auto mt-10 max-w-7xl">
      {tarefas.map((tarefa) => (
        <div
          key={tarefa.id}
          className="relative w-full"
        >
          {/* Sombra */}
          <div className="absolute inset-0 translate-x-2 translate-y-2 rounded-xl bg-gray-200 border-2 border-black" />

          {/* principal */}
          <div className="relative z-10 w-full rounded-xl bg-white border-2 border-black p-5">
            <div className=''>

          {/* primeira linha */}
            <div className='flex items-center '>
              <h2 className="text-xl font-bold mb-2">{tarefa.titulo}</h2> 
              <label className='flex items-center absolute right-5 top-2 text-3xl '>
                <input
                  type="checkbox"
                  checked={tarefa.status}
                  onChange={() => toggleStatus(tarefa)}
                  className="w-5 h-5 cursor-pointer"
                />
              </label>
            </div>

            
             <p className="text-gray-700 mb-2">{tarefa.descricao}</p> 
            </div> 
            <div className='flex gap-10'>
              <p className="text-gray-500">
                Data limite: { tarefa.data.split("T")[0].split("-").reverse().join("/")}

              </p>
              <p className=" ">
                Status:{" "}
                <span className={tarefa.status ? "bg-[#2D7D6D] p-2 rounded-full text-white" : "bg-[#E32B24] p-2 rounded-full text-white"}>
                  {tarefa.status ? "Concluída" : "Pendente"}
                </span>
              </p>
            </div>           
            

            {/* Botões de editar e excluir */}
            <div className='flex items-center absolute right-5 bottom-5 text-3xl gap-6'>
            
            {/* EDITAR */}
            <Link to={`/editar/${tarefa.id}`}>
            <RiEdit2Fill
            className='hover:scale-105 hover:text-[#0077B6] transition-transform duration-200'
            />
            </Link>

            {/* EXCLUIR */}
            <TbTrashFilled
            className='hover:scale-105 hover:text-[#0077B6] transition-transform duration-200'
            onClick={() => handleDelete(tarefa.id)}
             /> 
            </div>
           
          </div>
          
        </div>
      ))}
    </div>    
      

  )
}
