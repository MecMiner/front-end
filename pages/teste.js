import SortingGame from "@/components/SortingGame";

const YourPage = ({data}) => {
    const fraseGrande = data.dataDesafio.etapasSolucao
    const linhas = fraseGrande.split('\r\n');
  return (
    <div>
      <SortingGame frasesIniciais={linhas} dica={"ola"}/>
    </div>
  );
};

export default YourPage;

export async function getServerSideProps(context) {
    const response = await fetch(`http://localhost:8080/desafio1/1574`);
    const data = await response.json();
    return { props: { data } };
  }