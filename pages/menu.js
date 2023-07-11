import React, { useEffect, useState } from 'react';
import MyHead from '@/components/MyHead'
import Layout from '@/components/MyLayout'
import { useRouter } from 'next/router';
import CheckUser from '@/components/CheckUser';
import Loading from '@/components/Loading';


export default function Menu({ data }) {
  const router = useRouter();

  const handleStart = (id) => {
    router.push(`/selectNivel?id=${id}`)
  };

  return (
    <div>
      <MyHead />
      <Layout>
        <CheckUser/>
        <Loading/>
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
    </div>
  )
}

export async function getServerSideProps() {
  const response = await fetch('http://localhost:8080/desafio');
  const data = await response.json();
  return { props: { data } };
}