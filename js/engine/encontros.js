import { gerarEncontroAleatorio } from './campanha.js';
import { MONSTROS } from '../data/monstros.js';

export function calcularDificuldadeEncontro(monstros, nivelGrupo, qtdJogadores = 4) {
  const xpTotal = monstros.reduce((s, m) => s + (m.xp || 0), 0);
  const qtd = monstros.length;
  let multiplicador = 1;
  if (qtd === 2) multiplicador = 1.5;
  else if (qtd >= 3 && qtd <= 6) multiplicador = 2;
  else if (qtd >= 7 && qtd <= 10) multiplicador = 2.5;
  else if (qtd >= 11) multiplicador = 3;
  const xpAjustado = Math.round(xpTotal * multiplicador);
  return { xpTotal, xpAjustado, multiplicador, qtd, nivelGrupo, qtdJogadores };
}

export function gerarEncontroPorNivel(nivel, ambiente = 'floresta') {
  const encontro = gerarEncontroAleatorio(ambiente, nivel);
  const ndApropriado = nivel <= 2 ? '1/4' : nivel <= 4 ? '1/2' : nivel <= 8 ? '2' : nivel <= 12 ? '5' : '10';
  const pool = MONSTROS.filter(m => m.nd === ndApropriado);
  const monstros = [];
  const qtd = Math.max(1, Math.floor(nivel / 4) + 1);
  for (let i = 0; i < qtd; i++) {
    const base = pool[i % pool.length] || MONSTROS[0];
    monstros.push({ ...base, pv: base.pv, iniciativa: 0 });
  }
  return { ...encontro, monstros, dificuldadeCalculada: calcularDificuldadeEncontro(monstros, nivel) };
}