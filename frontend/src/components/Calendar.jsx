import React, {useState} from 'react'
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";

export default function Calendar() {

  const [dataAtual, setDataAtual] = useState(new Date());

  const mes = dataAtual.getMonth();
  const ano = dataAtual.getFullYear();

  const primeiroDia = new Date(ano, mes, 1);
  const ultimoDia = new Date(ano, mes +1, 0);

  const semana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  const dias = [];
  for (let i = 0; i < primeiroDia.getDay(); i++){
    dias.push(null);
  }
  for (let d =1; d<= ultimoDia.getDate(); d++){
    dias.push(d);
  }

  const mesAnt = () => {
    setDataAtual(new Date(ano, mes -1, 1));
  };

  const mesProx = () => {
    setDataAtual(new Date(ano, mes +1, 1));
  };

  return (
    <div>

      {/* Título mÊs e navegação */}
      <div className='flex items-center'>
        <h1 className='text-6xl font-semibold text-[#03045E]' >{dataAtual.toLocaleString("pt-BR", { month : "long"})} {ano} </h1>
        <button className='ml-10 p-4 text-2xl border rounded-full' onClick={mesAnt}><FaArrowLeftLong /></button> 
        <button className='ml-10 p-4 text-2xl border rounded-full' onClick={mesProx}><FaArrowRightLong /></button>
      </div>

      {/* cabeçalho calendário */}
      <div className="grid grid-cols-7 text-center font-bold mt-15 text-xl w-[80%]">
        {semana.map((dia) => (
          <div key={dia}>{dia}</div>
        ))}
      </div>
      
      {/* dias quadradinhos */}
      <div className="grid grid-cols-7 gap-1 text-center w-[80%]">
        {dias.map((dia, idd) =>
          dia ? (
          <div
            key={idd}
            className="relative h-24 border rounded hover:bg-[#0077B6] hover:text-white transition-colors duration-300 cursor-pointer"
          >
            <span className="absolute top-2 left-2 text-sm font-semibold">
              {dia}
            </span>
          </div>
                    ) : (
            <div key={idd} className='bg-gray-100' ></div>
          )
        )}
      </div>

    </div>
  )
}
