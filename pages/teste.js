import CoinsXP from "@/components/CoinsXp";
import CompleteAsEtapa from "@/components/CompleteAsEtapas";
import Desempenho from "@/components/Desempenho";
import DialogScreen from "@/components/DialogoBoxTeste";
import Layout from "@/components/MyLayout";
import SortingGame from "@/components/SortingGame";

const YourPage = ({data}) => {
    const fraseGrande = data.dataDesafio.etapasSolucao
    const linhas = fraseGrande.split('\r\n');
  return (
    <Layout>
      <div>
        <DialogScreen complete={() => {}} tamanho={"600px"} dialogText={`${data.dataDesafio.descProblema}`} />
      </div>
    </Layout>
    
  );
};

export default YourPage;

export async function getServerSideProps(context) {
    const response = await fetch(`http://localhost:8080/desafio2/1574`);
    const data = await response.json();
    return { props: { data } };
  }