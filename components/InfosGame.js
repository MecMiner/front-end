import { BomDesempenho, Coin, Colaboracao, Copyright, Nome, OtimoDesempenho, XP } from "./Elementos";
import FullScren from "./FullScren";
import HomeButton from "./HomeButton";
import InfoButton from "./InfoButton";


const InfosGame = ({ user }) => {

    return (
        <div className='infos'>
            <div style={{ position: 'absolute', width: '100%', height: '10%' }}>
                <Nome name={user && user.nome ? user.nome : 'Nome'} />
            </div>
            <div style={{ position: 'absolute', width: '80%', left: '10%', height: '10%', top: '10%' }}>
                <Coin info={user &&  user.pontos ? user.pontos: 0} />
            </div>
            <div style={{ position: 'absolute', width: '100%', height: '10%', top: '20%' }}>
                <XP info={user && user.xp ? user.xp : 0} />
            </div>
            <div style={{ position: 'absolute', width: '80%', left: '10%', height: '10%', top: '30%'}}>
                <Colaboracao info={user &&  user.colaboracao ? user.colaboracao : 0} />
            </div>
            <div style={{ position: 'absolute', width: '80%', left: '10%', height: '10%', top: '40%' }}>
                <OtimoDesempenho info={user &&  user.otimoDesempenho ? user.otimoDesempenho : 0} />
            </div>
            <div style={{ position: 'absolute', width: '80%', left: '10%', height: '10%', top: '50%' }}>
                <BomDesempenho info={user &&  user.bomDesempenho ? user.bomDesempenho : 0} />
            </div>
            <div style={{ position: 'absolute', width: '80%', left: '10%', height: '20%', top: '70%' }}>
                <FullScren/>
            </div>
            
            <div style={{ position: 'absolute', width: '100%', height: '10%', top: '80%' }}>
                <div style={{position: "absolute", width: '50%', height: '100%', justifyContent: 'center'}}>
                    <HomeButton />
                </div>
                <div style={{position: "absolute", left: '50%', width: '50%', height: '100%', justifyContent: 'center'}}>
                    <InfoButton />
                </div>

            </div>
            <div style={{ position: 'absolute', width: '80%', left: '10%', height: '10%', top: '90%' }}>
                <Copyright />
            </div>
            <style jsx>{`
                .infos {
                position: absolute;
                top: 0%;
                left: 0%;
                width: 15%;
                height: 100%;
                background-color: rgba(33, 158, 188, 0.432);
                border-radius: 10px;
                }
            `}</style>
        </div>
    );
};

export default InfosGame;
