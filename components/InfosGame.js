import BomDesempenho from "./BomDesempenho";
import Coin from "./Coin";
import Colaboracao from "./Colaboracao";
import Copyright from "./Copyright";
import HomeButton from "./HomeButton";
import InfoButton from "./InfoButton";
import OtimoDesempenho from "./OtimoDesempenho";
import Name from "./UserName";
import XP from "./Xp";

const InfosGame = ({ user }) => {

    return (
        <div className='infos'>
            <div style={{ position: 'absolute', width: '100%', height: '10%' }}>
                <Name name={user.nome ? user.nome : 'Nome'} />
            </div>
            <div style={{ position: 'absolute', width: '100%', height: '10%', top: '10%' }}>
                <Coin coin={user.pontos ? user.pontos: 0} />
            </div>
            <div style={{ position: 'absolute', width: '100%', height: '10%', top: '20%' }}>
                <XP info={user.xp ? user.xp : 0} />
            </div>
            <div style={{ position: 'absolute', width: '100%', height: '10%', top: '40%' }}>
                <Colaboracao info={user.colaboracao ? user.colaboracao : 0} />
            </div>
            <div style={{ position: 'absolute', width: '100%', height: '10%', top: '50%' }}>
                <OtimoDesempenho info={user.otimoDesempenho ? user.otimoDesempenho : 0} />
            </div>
            <div style={{ position: 'absolute', width: '100%', height: '10%', top: '60%' }}>
                <BomDesempenho info={user.bomDesempenho ? user.bomDesempenho : 0} />
            </div>
            <div style={{ position: 'absolute', width: '100%', height: '10%', top: '90%' }}>
                <Copyright />
            </div>
            <div style={{ position: 'absolute', width: '100%', height: '10%', top: '80%' }}>
                <div style={{position: "absolute", width: '50%', height: '100%', justifyContent: 'center'}}>
                    <HomeButton />
                </div>
                <div style={{position: "absolute", width: '50%', height: '100%', justifyContent: 'center'}}>
                    <InfoButton />
                </div>

            </div>
            <style jsx>{`
                .infos {
                position: absolute;
                top: 0%;
                left: 0%;
                width: 15%;
                height: 100%;
                }
            `}</style>
        </div>
    );
};

export default InfosGame;
