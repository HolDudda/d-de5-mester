import { gerarAleatorio } from './campanha.js';

const DESCRICOES_ATAQUE = [
  'Você golpeia com precisão, a lâmina cravando fundo!',
  'Um golpe certeiro encontra seu alvo!',
  'Seu ataque conecta com força devastadora!',
  'A investida é rápida e violenta!'
];
const DESCRICOES_ERRO = [
  'O golpe passa de raspão, errando o alvo.',
  'O inimigo se esquiva no último instante.',
  'Sua arma encontra apenas o ar.',
  'O ataque é bloqueado pela armadura do oponente.'
];
const DESCRICOES_DANO = [
  'O sangue escorre enquanto o inimigo cambaleia.',
  'O impacto ecoa pelo ambiente.',
  'O alvo solta um grito de dor.',
  'O inimigo se encolhe com o ferimento.'
];
const DESCRICOES_MORTE = [
  'O inimigo tomba, derrotado!',
  'O oponente cai no chão, sem vida.',
  'Um último suspiro escapa enquanto o corpo desaba.',
  'A batalha termina para esse inimigo.'
];

export function narrarAtaque(resultado) {
  const base = resultado.acerto ? gerarAleatorio(DESCRICOES_ATAQUE) : gerarAleatorio(DESCRICOES_ERRO);
  if (resultado.critico) return `💥 CRÍTICO! ${base} ${gerarAleatorio(DESCRICOES_DANO)}`;
  if (resultado.acerto) return `${base} ${gerarAleatorio(DESCRICOES_DANO)} (${resultado.dano} de dano)`;
  return base;
}

export function narrarMorte(nome) {
  return `☠️ ${nome} ${gerarAleatorio(DESCRICOES_MORTE)}`;
}

export function gerarDescricaoAmbiente(ambiente) {
  const descricoes = {
    floresta: [
      'Árvores antigas se erguem como pilares de um templo natural. A luz mal penetra pelas copas densas.',
      'O som de folhas e o canto distante de pássaros preenchem o ar. Umidade paira no ambiente.',
      'Trilhas de animais cortam o sub-bosque enquanto sons de galhos estalam ao longe.'
    ],
    masmorra: [
      'A escuridão é quase total. O ar é parado e cheira a poeira e séculos de abandono.',
      'Paredes de pedra úmidas brilham sob a tocha. Gotas ecoam no silêncio.',
      'Corredores estreitos se estendem adiante, com marcas de batalhas antigas nas pedras.'
    ],
    urbano: [
      'As ruas movimentadas cheiram a pão assado e fumaça de forja.',
      'Mercadores gritam seus produtos enquanto a guarda patrulha as esquinas.',
      'Uma taverna iluminada acena com promessas de descanso e rumores.'
    ],
    mar: [
      'O balanço do navio é constante. O horizonte se perde em azul profundo.',
      'Ondas quebram contra o casco, e gaivotas circulam acima.',
      'Uma brisa salgada traz cheiro de aventura e perigo.'
    ]
  };
  return gerarAleatorio(descricoes[ambiente] || descricoes.floresta);
}