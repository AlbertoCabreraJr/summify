'use client'

import React from 'react'
import Image from 'next/image'

const logo = '/assets/logo.svg'

const Hero = () => {
  return (
    <header className='w-full flex justify-center items-center flex-col'>
      <nav className='flex justify-between items-center flex-row w-full mb-10 pt-3'>
        <Image src={logo} alt='logo' className='object-contain' width={128} height={128} />
        <button type='button' onClick={() => window.open('https://github.com/AlbertoCabreraJr')} className='black_btn'>
          Github
        </button>
      </nav>

      <h1 className='head_text'>
        Summarize Articles with <br className='max-md:hidden' />
        <span className='orange_gradient'>OpenAI GPT-4</span>
      </h1>
      <h2 className='desc'>Simplify your reading with Summify, an open-source article summarizer.</h2>
    </header>
  )
}

export default Hero
