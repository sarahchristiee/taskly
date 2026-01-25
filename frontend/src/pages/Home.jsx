import React from 'react'
import '../App.css'

//imagens
import Grade from '../img/grade.svg'
import Imagem from '../img/imagemMenu.svg'

export default function Home() {
  return (
    <div className='pt-24'>
    <main className='max-w-[80%] mx-auto pt-20 relative z-10'>
      <h1 className='text-6xl font-bold'>Bem vindo ao <span className='text-[#03045E]'>Taskly</span></h1>
      <p className='text-3xl pt-15 mb-15 -pb-15 w-[50%] bg-white'>Aqui você pode anotar tudo o que precisa fazer e, quando terminar, é só marcar como concluído. Simples assim. Um jeito fácil de organizar seu dia e não esquecer de nada.</p>
      <a href="/tarefas" className='inline-block text-3xl text-white bg-[#0077B6] px-6 py-3 rounded-full hover:scale-110 hover:bg-[#03045E] transition-transform duration-300'>Começar</a>
    </main>
    <img src={Grade} alt="" className='absolute bottom-0 left-0 w-90 z-0' />
    <img src={Grade} alt="" className='absolute top-0 right-0 w-90 z-0' />
    <img src={Imagem} alt="" className='absolute bottom-20 right-60 w-140 z-0' />
    </div>
  )
}
