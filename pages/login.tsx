import Head from 'next/head'
import Image from 'next/image'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import useAuth from '../hooks/useAuth';

interface Inputs {
  email: string
  password: string
}

function login() {
  const [login, setLogin] = useState(false)
  const { signIn, signUp } = useAuth()

  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
  
  const onSubmit: SubmitHandler<Inputs> = async ({email, password}) => {

    if (login) {
      await signIn(email, password)
    } else {
      await signUp(email, password)
    }
  }


  return (
   <div className="relative flex h-screen w-screen flex-col md:items-center md:justify-center">
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Image
        src="https://rb.gy/p2hphi"
        layout="fill"
        className="-z-10 !hidden opacity-60 sm:!inline"
        objectFit="cover"
      />
      <div className="absolute left-2 top-1 h-20 w-44 cursor-pointer md:left-8 md:top-4">
        <Image src="https://rb.gy/ek4j9f" layout="fill" objectFit="contain" 
        priority={true} />
      </div>

      <form
        className="relative mt-24 space-y-8 rounded-lg bg-slate-900/95 py-10 px-6 md:mt-0 md:max-w-md md:px-14"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-4xl font-semibold">Sign In</h1>
        <div className="space-y-4">
          <label className="inline-block w-full">
            <input
              type="email"
              placeholder="Email"
              className="input p-2 text-black rounded-md w-full"
             {...register('email', {required: true})}
            />
              {errors.email && (
                <p className="text-sm  text-orange-500 pt-3">
                Please enter a valid email.
              </p>
              )}
              
         
          </label>
          <label className="inline-block w-full ">
            <input
              type="password"
              placeholder="Password"
              className="input p-2 text-black rounded-md w-full"
              {...register('password', {required: true})}
            />
              {errors.password && (
                 <p className="text-sm  text-orange-500  pt-3">
                Your password must contain between 4 and 60 characters.
              </p>
              )}
             
          
          </label>
        </div>
        <button
          className="w-full rounded-md bg-[#E50914] py-3 font-semibold hover:bg-red-500"
          
          type="submit"
        >
          Sign In
        </button>

        <button
          className="w-full rounded-md bg-blue-900 py-3 font-semibold hover:bg-blue-500"
          
          type="submit"
        >
          Sign In With Google
        </button>

        <div className="text-[gray]">
          New to Netflix?{' '}
          <button
            className="cursor-pointer text-white hover:underline"
        
            type="submit"
          >
            Sign up now
          </button>
        </div>
      </form>
    </div>
  )
}

export default login