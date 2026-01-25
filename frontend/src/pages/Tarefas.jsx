import React from 'react'
import '../App.css'
import { IoAdd } from "react-icons/io5";
import Card from '../components/Card';

export default function Tarefas() {
  return (
    <div>
      <main className='max-w-[80%] mx-auto pt-20 relative z-10'>
      <h1 className='text-6xl font-bold text-[#03045E]'>Suas Tarefas</h1>

      <div className='z-0 absolute left-0 w-7xl'>
        <Card />
      </div>
      </main>
      <a href="/adicionar" className='z-10 absolute bottom-40 right-40'><IoAdd size={80} className='bg-[#0077B6] p-2 rounded-full text-white hover:scale-110 hover:bg-[#03045E] transition-transform duration-200 '/></a>
    </div>
  )
}
