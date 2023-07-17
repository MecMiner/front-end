import React, { useEffect, useState } from 'react';
import MyHead from '@/components/MyHead'
import Layout from '@/components/MyLayout'
import { useRouter } from 'next/router';
import CheckUser from '@/components/CheckUser';
import Loading from '@/components/Loading';
import config from '@/config';



export default function Menu({ data }) {
  const [isLoad,setIsLoad] = useState(true);
  const router = useRouter();

  const handleStart = (id) => {
    router.push(`/selecao-nivel?id=${id}`)
  };

  return (
    <div>
      <MyHead />
      <Layout>
        <CheckUser onFunction={() => setIsLoad(false)}/>
        {isLoad && <Loading/>}
        <div className="game-screen">

          <div>
            {data.dataDesafio.map((item, index) => {
              return (
                <button key={index} className="btn-menu" style={{fontSize: '20px'}} onClick={() => handleStart(item.iddesafio)}>{item.titulo}</button>
              )
            })}
          </div>
        </div>
      </Layout>
      <style jsx>{`
        .btn-menu {
          padding: 2rem;
          background-color: #2980b9;
          color: #fff;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          transition: background-color 0.3s ease;
          margin: 0 1rem;
        
          &:hover {
            background-color: #1a5276;
          }
        
          &:active {
            background-color: #154360;
          }
        }
      `}</style>
    </div>
  )
}

export async function getServerSideProps() {
  const apiUrl = config.apiUrl
  const response = await fetch(`${apiUrl}/desafio`);
  const data = await response.json();
  return { props: { data } };
}