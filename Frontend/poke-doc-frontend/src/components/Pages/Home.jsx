import React from 'react'
import CustomNav from '../Navbar/CustomNav'
import PokeDocHero from '../../assets/PokeDocHero.png'
const home = () => {


  return (
    <>
      <div id='hero' className='hero my-8 lg:px-96 sm:px-12'>
        <div id="hero-content" className='hero-content justify-center'>
          <div id="hero-title" className='text-left flex flex-col'>
            <h1 className='text-5xl font-bold'>Keep A Close Eye On Your Health </h1>
            <p className='py-6'>The easiest place to secure doctors appointments or look at those important notes</p>
            <div id="hero-actions" className="">
              <div id="hero-buttons" className='flex'>
                <a className='btn btn-white btn-lg flex-1 text-sm' href="/sign_up">Sign up</a>
                <div className='divider divider-horizontal flex-1'>OR</div>
                <a className='btn btn-white btn-lg flex-1 text-sm' href="/log_in">Login</a>
              </div>
            </div>
          </div>
          <figure className="">
            <img src={PokeDocHero} alt="" className='ml-2 max-w-xs rounded-lg shadow-2xl row-start-1 col-span-2'/>
          </figure>
        </div>
      </div>
    </>
  )
}

export default home