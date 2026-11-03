import { Combate } from '../engine/combate.js';
import { MONSTROS } from '../data/monstros.js';
import { criar, el, toast, mostrarResultadoDado } from './utils.js';
import { narrarAtaque, narrarMorte } from '../engine/narrador.js';

let combateAtual = null;

export function renderCombate(container) {
  container.innerHTML = '';
  container.appendChild(criar('h2', { style: 'color:#d4a84f;margin-bottom:16px;' }, '⚔️ Combate'));
  if (!combateAtual) {
    container.appendChild(criar('p', { style: 'color:#a89a80;margin-bottom:16px;' }, 'Nenhum combate ativo. Adicione participantes e role iniciativa.'));
  } else {
    container.appendChild(criar('h3', { style: 'color:#d4a84f;margin-bottom:8px;' }, `Rodada ${combateAtual.rodada}`));
    const lista = criar('div', { class: 'iniciativa-lista' });
    combateAtual.participantes.forEach((p, i) => {
      const item = criar('div', {
        class: 'iniciativa-item' + (i === combateAtual.turnoAtual ? ' ativo' : '') + (p.pv <= 0 ? ' morto' : '')
      },
        criar('span', { class: 'ini' }, p.iniciativa || '?'),
        criar('span', { class: 'nome' }, p.nome || 'Sem nome'),
        criar('span', { class: 'hp' + (p.pv <= p.pvMax * 0.25 ? ' baixo' : '') }, `${p.pv || 0}/${p.pvMax || 0} PV`)
      );
      const acoes = criar('div', { style: 'display:flex;gap:4px;' },
        criar('button', { class: 'btn-sec', style: 'padding:4px 8px;font-size:.7rem;', onclick: (e) => { e.stopPropagation(); atacar(p, container); } }, '🗡️'),
        criar('button', { class: 'btn-sec', style: 'padding:4px 8px;font-size:.7rem;', onclick: (e) => { e.stopPropagation(); curar(p, container); } }, '💚'),
        criar('button', { class: 'btn-danger', style: 'padding:4px 8px;font-size:.7rem;', onclick: (e) => { e.stopPropagation(); p.pv = 0; renderCombate(container); toast(`${p.nome} foi derrotado!`); } }, '💀')
      );
      item.appendChild(acoes);
      lista.appendChild(item);
    });
    container.appendChild(lista);
    container.appendChild(criar('button', {
      class: 'btn btn-block', style: 'margin-top:12px;',
      onclick: () => { combateAtual.proximoTurno(); renderCombate(container); }
    }, '▶️ Próximo Turno'));
    if (combateAtual.log && combateAtual.log.length > 0) {
      const logDiv = criar('div', { class: 'log', style: 'margin-top:12px;' });
      combateAtual.log.slice(-10).forEach(l => logDiv.appendChild(criar('p', {}, l)));
      container.appendChild(logDiv);
    }
    container.appendChild(criar('button', {
      class: 'btn btn-danger btn-block', style: 'margin-top:12px;',
      onclick: () => { if (confirm('Encerrar combate?')) { combateAtual = null; renderCombate(container); } }
    }, '🚫 Encerrar Combate'));
  }
  container.appendChild(criar('h3', { style: 'color:#d4a84f;margin:20px 0 10px;' }, '➕ Adicionar Participante'));
  container.appendChild(criar('label', {}, 'Selecione um monstro do Manual'));
  const sel = criar('select', { id: 'sel-monstro' });
  MONSTROS.forEach((m, i) => sel.appendChild(criar('option', { value: i }, `${m.nome} (ND ${m.nd}, ${m.pv} PV)`)));
  container.appendChild(sel);
  container.appendChild(criar('button', {
    class: 'btn btn-block',
    onclick: () => {
      const idx = parseInt(sel.value);
      const m = MONSTROS[idx];
      if (!combateAtual) combateAtual = new Combate([]);
      const inst = {
        ...m, id: `m-${Date.now()}-${Math.random()}`,
        nome: m.nome + (combateAtual.participantes.filter(p => p.nome?.startsWith(m.nome)).length > 0 ? ` #${combateAtual.participantes.filter(p => p.nome?.startsWith(m.nome)).length + 1}` : ''),
        pv: m.pv, pvMax: m.pv, iniciativa: 0, tipoEntidade: 'monstro'
      };
      combateAtual.adicionarParticipante(inst);
      toast(`${m.nome} adicionado!`);
      renderCombate(container);
    }
  }, '➕ Adicionar Monstro'));
  container.appendChild(criar('h3', { style: 'color:#d4a84f;margin:20px 0 10px;' }, '🧑 Adicionar Jogador'));
  container.appendChild(criar('input', { id: 'inp-jogador', placeholder: 'Nome do personagem' }));
  container.appendChild(criar('input', { id: 'inp-pv-jogador', type: 'number', placeholder: 'PV (ex: 25)', value: 20 }));
  container.appendChild(criar('input', { id: 'inp-ca-jogador', type: 'number', placeholder: 'CA (ex: 15)', value: 15 }));
  container.appendChild(criar('button', {
    class: 'btn btn-block',
    onclick: () => {
      const nome = el('inp-jogador').value || 'Jogador';
      const pv = parseInt(el('inp-pv-jogador').value) || 20;
      const ca = parseInt(el('inp-ca-jogador').value) || 15;
      if (!combateAtual) combateAtual = new Combate([]);
      combateAtual.adicionarParticipante({ id: `p-${Date.now()}`, nome, pv, pvMax: pv, ca, iniciativa: 0, tipoEntidade: 'jogador' });
      toast(`${nome} adicionado!`);
      renderCombate(container);
    }
  }, '➕ Adicionar Jogador'));
  container.appendChild(criar('button', {
    class: 'btn btn-block', style: 'margin-top:16px;background:#4a6fa8;color:white;',
    onclick: () => {
      if (!combateAtual || combateAtual.participantes.length === 0) { toast('Adicione participantes primeiro!'); return; }
      combateAtual.rolarIniciativa();
      combateAtual.log = combateAtual.log || [];
      combateAtual.log.push('🎲 Iniciativa rolada!');
      renderCombate(container);
      toast('Iniciativa rolada!');
    }
  }, '🎲 Rolar Iniciativa'));
  container.appendChild(criar('button', {
    class: 'btn btn-sec btn-block',
    onclick: () => {
      const nivel = parseInt(prompt('Nível do grupo:', '3')) || 3;
      const qtd = parseInt(prompt('Quantidade de monstros:', '3')) || 3;
      if (!combateAtual) combateAtual = new Combate([]);
      const novos = combateAtual.gerarMonstrosAleatorios(nivel, qtd);
      novos.forEach(m => combateAtual.adicionarParticipante(m));
      combateAtual.rolarIniciativa();
      renderCombate(container);
      toast(`Encontro gerado: ${qtd} monstros!`);
    }
  }, '🎲 Gerar Encontro Aleatório'));
}

function atacar(alvo, container) {
  const rolagem = Math.floor(Math.random() * 20) + 1;
  const acerto = rolagem >= (alvo.ca || 10) || rolagem === 20;
  const dadoDano = alvo.ataques?.[0]?.dano?.match(/(\d+)d(\d+)([+-]\d+)?/);
  let dano = 0;
  if (acerto && dadoDano) {
    const qtd = parseInt(dadoDano[1]) * (rolagem === 20 ? 2 : 1);
    const faces = parseInt(dadoDano[2]);
    const mod = parseInt(dadoDano[3] || 0);
    for (let i = 0; i < qtd; i++) dano += Math.floor(Math.random() * faces) + 1;
    dano += mod;
    alvo.pv = Math.max(0, (alvo.pv || 0) - dano);
  }
  const texto = narrarAtaque({ acerto, dano, critico: rolagem === 20 });
  combateAtual.log = combateAtual.log || [];
  combateAtual.log.push(`${alvo.nome}: ${texto}`);
  if (alvo.pv <= 0) combateAtual.log.push(narrarMorte(alvo.nome));
  mostrarResultadoDado(rolagem, acerto ? `Acertou! ${dano} de dano` : 'Errou!');
  renderCombate(container);
}

function curar(alvo, container) {
  const cura = Math.floor(Math.random() * 10) + 5;
  alvo.pv = Math.min(alvo.pvMax, (alvo.pv || 0) + cura);
  combateAtual.log = combateAtual.log || [];
  combateAtual.log.push(`💚 ${alvo.nome} recuperou ${cura} PV.`);
  toast(`+${cura} PV em ${alvo.nome}`);
  renderCombate(container);
}