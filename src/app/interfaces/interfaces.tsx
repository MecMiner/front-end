export interface Usuario {
    nome: string; // Nome do usuário, campo obrigatório
    email: string; // Email do usuário, campo obrigatório
    tipo: string; // Tipo de usuário, campo obrigatório
    pontos: number  ; // Pontos do usuário, valor numérico ou nulo (default: 0)
    xp: number  ; // Experiência (XP) do usuário, valor numérico ou nulo (default: 0)
    colaboracao: number  ; // Colaboração do usuário, valor numérico ou nulo (default: 0)
    bomDesempenho: number  ; // Bom desempenho do usuário, valor numérico ou nulo (default: 0)
    otimoDesempenho: number  ; // Ótimo desempenho do usuário, valor numérico ou nulo (default: 0)
}

export interface Desafio {
    iddesafio: number;
    idusuario: number;
    titulo: string;
    top1: number  ;
    top2: number  ;
    top3: number  ;
    idexemploNivel1: number  ;
    dadosProj: string  ;
    descProblema: string  ;
    nomeProjeto: string  ;
    contextoProblema: string  ;
    imagemProb: string  ;
    materialComplementar: string  ;
    solucao: string  ;
    etapasSolucao: string  ;
    dica: string  ;
    resultado: string  ;
    imagemResul: string  ;
}


export interface DesafioNivel2 {
    iddesafio: number;
    idexemploNivel: number  ;
    dadosProj: string  ;
    descProblema: string  ;
    nomeProjeto: string  ;
    contextoProblema: string  ;
    imagemProb: string  ;
    materialComplementar: string  ;
    solucao: string  ;
    etapasSolucao: string  ;
    dica: string  ;
    dicaColega: string  ;
    resultado: string  ;
    imagemResul: string  ;
}

export interface DesafioNivel3e4 {
    iddesafio: number;
    idexemploNivel: number  ;
    dadosProj: string  ;
    descProblema: string  ;
    nomeProjeto: string  ;
    contextoProblema: string  ;
    imagemProb: string  ;
    materialComplementar: string  ;
    solucao: string  ;
    etapasSolucao: string  ;
    dica: string  ;
    dicaColega: string  ;
    resultado: string  ;
    imagemResul: string  ;
    linkNivel: string  ;
}

export interface Exemplo {
    id: number;
    titulo: string;
    conhecimento: string  ;
    sugestoes: string  ;
    nome: string;
    descricao: string  ;
    linguagem: string;
    linkproj: string  ;
    linkex: string  ;
    data: Date;
    contexto: string  ;
    problema: string  ;
    imagemprob: string  ;
    solucao: string  ;
    imagemsolu: string  ;
    resultado: string  ;
    imagemresul: string  ;
    referencias: string  ;
    topico1: number  ;
    topico2: number  ;
    topico3: number  ;
    outro: string  ;
    tag1: string  ;
    tag2: string  ;
    tag3: string  ;
    id_usuario: number;
}


export interface Respostas {
    nivel: number  ;
    respostanivel2: string  ;
    respostanivel3: string  ;
    respostanivel4: string  ;
    statusNivel2: {
        jogou: boolean,
        corrigido: boolean,
        certo: boolean,
        erros: number,
        feedback: string
    }  ; // JSON parseado
    statusNivel3: {
        jogou: boolean,
        corrigido: boolean,
        certo: boolean,
        erros: number,
        feedback: string
    }  ; // JSON parseado
    statusNivel4: {
        jogou: boolean,
        corrigido: boolean,
        certo: boolean,
        erros: number,
        feedback: string
    }  ; // JSON parseado
}

export interface Tags {
    Id: number; // BIGINT mapeado como number
    TagName: string; // Campo obrigatório
}


export interface Topico1 {
    id: number; // Campo obrigatório como PRIMARY KEY
    nome: string; // Campo obrigatório
}

export interface Topico2 {
    id: number; // Campo obrigatório como PRIMARY KEY
    nome: string; // Campo obrigatório
    associacao: number; // Campo obrigatório
}

export interface Topico3 {
    id: number; // Campo obrigatório como PRIMARY KEY
    nome: string; // Campo obrigatório
    associacao: number; // Campo obrigatório
}

export interface Depoimento {
    id: number;
    id_usuario: number;
    id_exemplo: number;
    comentario: string;
    data: string;
    estrela: number;
}


export interface GamePtsProps {
    bomDesempenho: boolean,
    otimoDesempenho: boolean,
    col: boolean,
    pontos: number,
    exp: number,
}

export const GamePts: GamePtsProps = {
    bomDesempenho: false,
    otimoDesempenho: false,
    col: false,
    pontos: 0,
    exp: 0
}

export const respostasConstrutor: Respostas = {
    nivel: 0,
    respostanivel2: "",
    respostanivel3: "",
    respostanivel4: "",
    statusNivel2 : { jogou: false, corrigido: false, certo: false, erros: 0, feedback: "" },
    statusNivel3 : { jogou: false, corrigido: false, certo: false, erros: 0, feedback: "" },
    statusNivel4 : { jogou: false, corrigido: false, certo: false, erros: 0, feedback: "" }
}