import BomDesempenho from "./BomDesempenho";
import Coin from "./Coin";
import Colaboracao from "./Colaboracao";
import Copyright from "./Copyright";
import FullScren from "./FullScren";
import HomeButton from "./HomeButton";
import InfoButton from "./InfoButton";
import OtimoDesempenho from "./OtimoDesempenho";
import Name from "./UserName";
import XP from "./Xp";

const InfosGame = ({ user }) => {

    return (
        <div className='infos'>
            <div style={{ position: 'absolute', width: '100%', height: '10%' }}>
                <Name name={user && user.nome ? user.nome : 'Nome'} />
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
                background-color: rgba(72, 151, 216, 0.432);
                }
            `}</style>
        </div>
    );
};

export default InfosGame;
