import React from 'react'
import { Link } from 'react-router-dom';
import { FaCalendarDay } from "react-icons/fa6";
import { BiSolidNote } from "react-icons/bi";
import Logo from '../img/logo.svg'

export default function Header() {
  return (
    <header className='fixed top-5 left-1/2 -translate-x-1/2 border rounded-full p-4 max-w-[80%] w-full bg-white z-100'>
      <nav className='flex items-center justify-between'>
        <a href="/">
        <img src={Logo} alt="Logo com escrita Taskly e um simbolo de check"  className='w-40'/>
        </a>
       

       <div className='flex items-center text-2xl font-semibold'>
        
        <Link to="/tarefas" className='mr-10 flex items-center gap-2 hover:scale-105 hover:text-[#03045E] transition-transform duration-200'>
          <BiSolidNote />
          <p>Tarefas</p>
        </Link>

        <Link to="/calendario" className='mr-10 flex items-center gap-2 hover:scale-105 hover:text-[#03045E] transition-transform duration-200'>
          <FaCalendarDay />
          Calendário
        </Link> 

       </div> 

      </nav>      
    </header>
  )
}
