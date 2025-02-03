"use client"
import React, { useActionState, useEffect, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { singin } from '@/app/utils/auth';

export default function Login() {
  const [state, action, isPading] = useActionState(singin, {error: false, message: '', email: ''})


  const handleRegister = () => {
    window.open('https://portalworkedexamples.herokuapp.com/Login/Form_cadastrarUsuario.php', '_blank');
  };

  return (
    <div>
        <div className="flex justify-center items-center min-h-screen">
          <div className="login-container p-8 bg-gray-200 border-2 border-gray-600 rounded-lg flex flex-col items-center">
            <div className="image-login mb-4">
              <FaUser size={100} />
            </div>
            <form action={action} className="w-full">
              <input
                className="input-login p-2 mb-4 w-full border border-gray-400 rounded-md"
                name="email"
                defaultValue={`${state?.email}`}
                type="text"
                placeholder="Username"

              />
              <input
                className="input-login p-2 mb-4 w-full border border-gray-400 rounded-md"
                name="senha"
                type="password"
                placeholder="Password"

              />
              {state?.error && <p className='mb-4 text-red-600'>{state.message}</p>}
              <div className="button-container flex items-center justify-between mb-4 gap-5">
                <button
                  className="button-login p-2 w-4/5 max-w-xs bg-blue-600 text-white rounded-md disabled:opacity-50"
                  type="submit"
                  disabled={isPading}
                >
                  {isPading ? 'Loading...' : 'Log in'}
                </button>
                <button
                  className="button-register p-2 w-4/5 max-w-xs bg-green-500 text-white rounded-md"
                  type="button"
                  onClick={handleRegister}
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
    </div>
  );
}

