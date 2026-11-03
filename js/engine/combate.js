import { MONSTROS } from '../data/monstros.js';

export class Combate {
  constructor(participantes = []) {
    this.participantes = participantes;
    this.turnoAtual = 0;
    this.rodada = 1;
    this.log = [];
  }

  adicionarParticipante(p) {
    this.participantes.push(p);
    this.ordenarIniciativa();
  }

  rolarIniciativa() {
    this.participantes.forEach(p => {
      const modDes = p.modDes !== undefined ? p.modDes : Math.floor(((p.atributos?.DES || 10) - 10) / 2);
      p.iniciativa = Math.floor(Math.random() * 20) + 1 + modDes;
    });
    this.ordenarIniciativa();
  }

  ordenarIniciativa() {
    this.participantes.sort((a, b) => (b.iniciativa || 0) - (a.iniciativa || 0));
  }

  proximoTurno() {
    this.turnoAtual++;
    if (this.turnoAtual >= this.participantes.length) {
      this.turnoAtual = 0;
      this.rodada++;
    }
    let tentativas = 0;
    while (this.participantes[this.turnoAtual]?.pv <= 0 && tentativas < this.participantes.length) {
      this.turnoAtual++;
      if (this.turnoAtual >= this.participantes.length) {
        this.turnoAtual = 0;
        this.rodada++;
      }
      tentativas++;
    }
    return this.participantes[this.turnoAtual];
  }

  ataque(atacante, alvo, bonusAtaque, dadoDano, tipoDano = '') {
    const rolagem = Math.floor(Math.random() * 20) + 1;
    const total = rolagem + bonusAtaque;
    const acerto = rolagem === 20 || (rolagem !== 1 && total >= (alvo.ca || 10));
    let dano = 0;
    const critico = rolagem === 20;
    if (acerto) {
      dano = this.rolarDano(dadoDano, critico);
      alvo.pv = Math.max(0, (alvo.pv || 0) - dano);
    }
    return { rolagem, total, acerto, dano, critico, alvo, tipoDano };
  }

  rolarDano(expressao, critico = false) {
    const match = expressao.match(/(\d+)d(\d+)([+-]\d+)?/);
    if (!match) return 0;
    let qtd = parseInt(match[1]);
    const faces = parseInt(match[2]);
    const mod = parseInt(match[3] || 0);
    if (critico) qtd *= 2;
    let total = 0;
    for (let i = 0; i < qtd; i++) total += Math.floor(Math.random() * faces) + 1;
    return total + mod;
  }

  gerarMonstrosAleatorios(nivelGrupo, qtd = 3) {
    const ndAlvo = nivelGrupo <= 4 ? '1/4' : nivelGrupo <= 8 ? '1' : nivelGrupo <= 12 ? '3' : '5';
    const pool = MONSTROS.filter(m => m.nd === ndAlvo);
    const escolhidos = [];
    for (let i = 0; i < qtd; i++) {
      const base = pool[Math.floor(Math.random() * pool.length)] || MONSTROS[0];
      escolhidos.push({
        ...base,
        id: `monstro-${i}-${Date.now()}`,
        nome: base.nome + ` #${i+1}`,
        pv: base.pv,
        pvMax: base.pv,
        iniciativa: 0,
        tipoEntidade: 'monstro'
      });
    }
    return escolhidos;
  }
}