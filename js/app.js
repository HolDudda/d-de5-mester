 import { el, criar, rolarDado, rolarVarios, mostrarResultadoDado, fecharModalDado, toast, salvarLocal, carregarLocal } from './ui/utils.js';
import { renderCriacaoPersonagem } from './ui/criacao-personagem.js';
import { renderNovaCampanha, renderCampanha } from './ui/campanha.js';
import { renderCombate } from './ui/combate-ui.js';
import { gerarMasmorra, gerarPDM, gerarEncontroAleatorio, gerarCampanha, gerarTesouroAleatorio } from './engine/campanha.js';
import { GEMAS, OBJETOS_ARTE } from './data/tesouros.js';
import { ITENS_MAGICOS } from './data/itens-magicos.js';
import { DEUSES } from './data/deuses.js';
import { PLANOS } from './data/planos.js';
import { MAGIAS } from './data/magias.js';
import { MONSTROS } from './data/monstros.js';
import { RACAS } from './data/racas.js';
import { CLASSES } from './data/classes.js';
import { ANTECEDENTES } from './data/antecedentes.js';
import { ARMADURAS, ARMAS, EQUIPAMENTO_AVENTURA } from './data/equipamentos.js';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').catch(e => console.log('SW fail:', e));
}

function navegar(pagina) {
  const conteudo = el('conteudo');
  conteudo.innerHTML = '';
  conteudo.scrollTop = 0;
  const titulos = {
    'criar-personagem': '⚔️ Criar Personagem',
    'nova-campanha': '🗺️ Nova Campanha',
    'minhas-campanhas': '📜 Minhas Campanhas',
    'combate': '🎯 Combate',
    'tesouro': '💎 Tesouros',
    'ferramentas': '🎲 Ferramentas do Mestre',
    'compendio': '📖 Compêndio',
    'dados': '🎲 Rolar Dados',
    'pagina-inicio': 'D&D 5e Master'
  };
  el('titulo-pagina').textContent = titulos[pagina] || 'D&D 5e Master';
  if (pagina === 'criar-personagem') renderCriacaoPersonagem(conteudo);
  else if (pagina === 'nova-campanha' || pagina === 'minhas-campanhas') renderNovaCampanha(conteudo);
  else if (pagina === 'combate') renderCombate(conteudo);
  else if (pagina === 'tesouro') renderTesouro(conteudo);
  else if (pagina === 'ferramentas') renderFerramentas(conteudo);
  else if (pagina === 'compendio') renderCompendio(conteudo);
  else if (pagina === 'dados') renderDados(conteudo);
  else if (pagina === 'pagina-inicio') renderInicio(conteudo);
}

function renderInicio(container) {
  container.innerHTML = `
    <div class="hero">
      <h2>🐉 Guia do Mestre</h2>
      <p>Seu companheiro definitivo para mestrar D&D 5ª Edição</p>
    </div>
    <div class="grid-menu">
      <button class="card-menu" data-nav="criar-personagem"><span class="icon">⚔️</span><span class="label">Criar Personagem</span><span class="desc">Raças, classes, antecedentes</span></button>
      <button class="card-menu" data-nav="nova-campanha"><span class="icon">🗺️</span><span class="label">Nova Campanha</span><span class="desc">Gere uma campanha automática</span></button>
      <button class="card-menu" data-nav="minhas-campanhas"><span class="icon">📜</span><span class="label">Minhas Campanhas</span><span class="desc">Continue aventuras salvas</span></button>
      <button class="card-menu" data-nav="combate"><span class="icon">🎯</span><span class="label">Combate</span><span class="desc">Iniciativa e monstros</span></button>
      <button class="card-menu" data-nav="tesouro"><span class="icon">💎</span><span class="label">Tesouros</span><span class="desc">Gemas, itens, artefatos</span></button>
      <button class="card-menu" data-nav="ferramentas"><span class="icon">🎲</span><span class="label">Ferramentas</span><span class="desc">Tabelas, NPCs, encontros</span></button>
      <button class="card-menu" data-nav="compendio"><span class="icon">📖</span><span class="label">Compêndio</span><span class="desc">Regras, magias, monstros</span></button>
      <button class="card-menu" data-nav="dados"><span class="icon">🎲</span><span class="label">Rolar Dados</span><span class="desc">d4 a d100</span></button>
    </div>
  `;
  container.querySelectorAll('[data-nav]').forEach(b => b.addEventListener('click', () => navegar(b.dataset.nav)));
}

function renderTesouro(container) {
  container.appendChild(criar('h2', { style: 'color:#d4a84f;margin-bottom:16px;' }, '💎 Gerador de Tesouros'));
  const btn = criar('button', { class: 'btn btn-block', style: 'margin-bottom:16px;', onclick: () => {
    const t = gerarTesouroAleatorio();
    let desc = '';
    if (t.tipo === 'moedas') desc = `💰 ${t.valor} peças de ${t.moeda}`;
    else if (t.tipo === 'gema') desc = `💎 ${t.nome} (${t.valor} po)`;
    else if (t.tipo === 'objeto') desc = `🏺 ${t.nome} (${t.valor} po)`;
    else desc = `✨ ${t.item.nome} (${t.item.raridade}) — ${t.item.desc}`;
    const painel = criar('div', { class: 'painel', style: 'margin-bottom:12px;' }, criar('div', { style: 'font-size:1.1rem;color:#d4a84f;' }, desc));
    container.insertBefore(painel, btn.nextSibling);
  }}, '🎲 Gerar Tesouro Aleatório');
  container.appendChild(btn);
  container.appendChild(criar('h3', { style: 'color:#d4a84f;margin:20px 0 10px;' }, '💎 Gemas por Valor'));
  Object.entries(GEMAS).forEach(([valor, lista]) => {
    container.appendChild(criar('div', { class: 'painel' }, criar('h3', {}, `${valor}`), criar('div', { style: 'font-size:.85rem;color:#a89a80;' }, lista.join(' · '))));
  });
  container.appendChild(criar('h3', { style: 'color:#d4a84f;margin:20px 0 10px;' }, '🏺 Objetos de Arte'));
  Object.entries(OBJETOS_ARTE).forEach(([valor, lista]) => {
    container.appendChild(criar('div', { class: 'painel' }, criar('h3', {}, `${valor}`), criar('div', { style: 'font-size:.85rem;color:#a89a80;' }, lista.join(' · '))));
  });
  container.appendChild(criar('h3', { style: 'color:#d4a84f;margin:20px 0 10px;' }, '✨ Itens Mágicos'));
  const porRaridade = {};
  ITENS_MAGICOS.forEach(i => { (porRaridade[i.raridade] = porRaridade[i.raridade] || []).push(i); });
  Object.entries(porRaridade).forEach(([rar, itens]) => {
    const p = criar('div', { class: 'painel' }, criar('h3', {}, `${rar.charAt(0).toUpperCase() + rar.slice(1)} (${itens.length} itens)`));
    itens.forEach(i => p.appendChild(criar('div', { style: 'padding:6px 0;border-bottom:1px dashed #4a3f30;font-size:.85rem;' }, criar('b', { style: 'color:#d4a84f;' }, i.nome + ' '), criar('span', { style: 'color:#a89a80;' }, `— ${i.desc}`))));
    container.appendChild(p);
  });
}

function linhaFerramenta(k, v) {
  return criar('div', { class: 'linha' }, criar('span', {}, String(k)), criar('span', { class: 'valor' }, String(v || '-')));
}

function renderFerramentas(container) {
  container.appendChild(criar('h2', { style: 'color:#d4a84f;margin-bottom:16px;' }, '🎲 Ferramentas do Mestre'));
  container.appendChild(criar('h3', { style: 'color:#d4a84f;margin:16px 0 8px;' }, '👤 Gerador de NPC'));
  const btnNPC = criar('button', { class: 'btn btn-block', onclick: () => {
    const p = gerarPDM();
    const painel = criar('div', { class: 'painel', style: 'margin-top:12px;' },
      criar('h3', {}, `${p.nome} — ${p.ocupacao}`),
      criar('div', { class: 'ficha' },
        linhaFerramenta('Maneirismo', p.maneirismo),
        linhaFerramenta('Ideal', p.ideal),
        linhaFerramenta('Vínculo', p.vinculo),
        linhaFerramenta('Defeito', p.defeito)
      )
    );
    container.insertBefore(painel, btnNPC.nextSibling);
  }}, '👤 Gerar NPC Aleatório');
  container.appendChild(btnNPC);
  container.appendChild(criar('h3', { style: 'color:#d4a84f;margin:20px 0 8px;' }, '🏚️ Gerador de Masmorra'));
  container.appendChild(criar('button', { class: 'btn btn-block', onclick: () => {
    const m = gerarMasmorra();
    const painel = criar('div', { class: 'painel', style: 'margin-top:12px;' },
      criar('h3', {}, `${m.local} — ${m.proposito}`),
      criar('div', { class: 'ficha' },
        linhaFerramenta('Criador', m.criador),
        linhaFerramenta('História', m.historia),
        ...m.salas.map(s => linhaFerramenta(`Sala ${s.numero}`, `${s.tipo}: ${s.conteudo?.descricao || s.conteudo?.monstro?.nome || 'Vazio'}`))
      )
    );
    container.appendChild(painel);
  }}, '🏚️ Gerar Masmorra Aleatória'));
  container.appendChild(criar('h3', { style: 'color:#d4a84f;margin:20px 0 8px;' }, '⚔️ Gerador de Encontros'));
  const selAmb = criar('select', { style: 'margin-bottom:8px;' });
  ['floresta','urbano','mar','subterraneo'].forEach(a => selAmb.appendChild(criar('option', { value: a }, a.charAt(0).toUpperCase() + a.slice(1))));
  container.appendChild(selAmb);
  container.appendChild(criar('button', { class: 'btn btn-block', onclick: () => {
    const enc = gerarEncontroAleatorio(selAmb.value, 3);
    const painel = criar('div', { class: 'painel', style: 'margin-top:12px;' },
      criar('h3', {}, 'Encontro'),
      criar('div', { class: 'ficha' },
        linhaFerramenta('Descrição', enc.descricao),
        linhaFerramenta('Ambiente', enc.tipo),
        linhaFerramenta('Dificuldade', enc.dificuldade)
      )
    );
    container.appendChild(painel);
  }}, '🎲 Gerar Encontro'));
  container.appendChild(criar('h3', { style: 'color:#d4a84f;margin:20px 0 8px;' }, '📜 Fichas Salvas'));
  const fichas = carregarLocal('fichas', []);
  if (fichas.length === 0) container.appendChild(criar('p', { style: 'color:#a89a80;' }, 'Nenhum personagem salvo.'));
  else fichas.forEach((f, idx) => {
    const r = RACAS.find(x => x.id === f.raca);
    const c = CLASSES.find(x => x.id === f.classe);
    container.appendChild(criar('div', { class: 'painel' },
      criar('h3', {}, `⚔️ ${f.nome} (Nível ${f.nivel})`),
      criar('div', { class: 'ficha' },
        linhaFerramenta('Raça', r?.nome || '-'),
        linhaFerramenta('Classe', c?.nome || '-'),
        linhaFerramenta('PV', `${f.pvAtual}/${f.pvMax}`),
        linhaFerramenta('CA', f.ca),
        ...Object.entries(f.atributos || {}).map(([k,v]) => linhaFerramenta(k, `${v} (${Math.floor((v-10)/2) >= 0 ? '+' : ''}${Math.floor((v-10)/2)})`))
      ),
      criar('button', { class: 'btn btn-danger', style: 'margin-top:8px;padding:6px 12px;font-size:.75rem;', onclick: () => { if (confirm('Apagar ficha?')) { fichas.splice(idx,1); salvarLocal('fichas', fichas); navegar('ferramentas'); } } }, '🗑️ Apagar')
    ));
  });
}

function renderCompendio(container) {
  container.appendChild(criar('h2', { style: 'color:#d4a84f;margin-bottom:16px;' }, '📖 Compêndio'));
  const tabs = criar('div', { class: 'tabs' });
  const secoes = ['Raças','Classes','Antecedentes','Magias','Monstros','Itens Mágicos','Equipamento','Deuses','Planos','Regras'];
  secoes.forEach((s, i) => {
    const b = criar('button', { class: i === 0 ? 'ativo' : '' }, s);
    b.addEventListener('click', () => {
      tabs.querySelectorAll('button').forEach(x => x.classList.remove('ativo'));
      b.classList.add('ativo');
      const area = el('compendio-area');
      area.innerHTML = '';
      renderSecaoCompendio(area, s);
    });
    tabs.appendChild(b);
  });
  container.appendChild(tabs);
  const area = criar('div', { id: 'compendio-area' });
  container.appendChild(area);
  renderSecaoCompendio(area, 'Raças');
}

function renderSecaoCompendio(area, secao) {
  if (secao === 'Raças') {
    RACAS.forEach(r => area.appendChild(criar('div', { class: 'painel' }, criar('h3', {}, `🧝 ${r.nome}`), criar('div', { class: 'ficha' },
      linhaFerramenta('Bônus', Object.entries(r.bonus).map(([k,v])=>`${k} +${v}`).join(', ')),
      linhaFerramenta('Tamanho', r.tamanho), linhaFerramenta('Velocidade', r.velocidade + 'm'),
      linhaFerramenta('Visão no Escuro', r.visaoNoEscuro ? r.visaoNoEscuro + 'm' : 'Não'),
      ...r.tracos.map(t => linhaFerramenta('Traço', t)),
      ...(r.subRacas || []).map(sr => linhaFerramenta('Sub-raça', `${sr.nome} (${Object.entries(sr.bonus).map(([k,v])=>`${k} +${v}`).join(', ')})`)),
      linhaFerramenta('Idiomas', r.idiomas.join(', '))
    ))));
  } else if (secao === 'Classes') {
    CLASSES.forEach(c => area.appendChild(criar('div', { class: 'painel' }, criar('h3', {}, `🎭 ${c.nome}`), criar('div', { class: 'ficha' },
      linhaFerramenta('Dado de Vida', 'd' + c.dadoVida),
      linhaFerramenta('Atributos', c.atributosPrincipais.join(', ')),
      linhaFerramenta('Testes de Resistência', c.testesResistencia.join(', ')),
      linhaFerramenta('Proficiências', c.proficiencias.join(', ')),
      ...Object.entries(c.caracteristicas || {}).map(([niv, caracs]) => linhaFerramenta(`Nível ${niv}`, caracs.join(' · ')))
    ))));
  } else if (secao === 'Antecedentes') {
    ANTECEDENTES.forEach(a => area.appendChild(criar('div', { class: 'painel' }, criar('h3', {}, `📜 ${a.nome}`), criar('div', { class: 'ficha' },
      linhaFerramenta('Perícias', a.pericias.join(', ')),
      linhaFerramenta('Ferramentas', (a.ferramentas || []).join(', ') || '-'),
      linhaFerramenta('Equipamento', a.equipamento.join(', ')),
      linhaFerramenta('Característica', a.caracteristica)
    ))));
  } else if (secao === 'Magias') {
    Object.entries(MAGIAS).forEach(([nivel, lista]) => {
      area.appendChild(criar('h3', { style: 'color:#d4a84f;margin:12px 0 8px;' }, `Magias de Nível ${nivel}`));
      lista.forEach(m => area.appendChild(criar('div', { class: 'painel', style: 'padding:10px;' },
        criar('div', { style: 'font-weight:700;color:#d4a84f;' }, m.nome),
        criar('div', { style: 'font-size:.75rem;color:#a89a80;margin:4px 0;' }, `${m.escola} · ${m.classes.join(', ')} · ${m.tempo} · ${m.alcance}`),
        criar('div', { style: 'font-size:.85rem;' }, m.desc)
      )));
    });
  } else if (secao === 'Monstros') {
    MONSTROS.forEach(m => area.appendChild(criar('div', { class: 'painel' }, criar('h3', {}, `👹 ${m.nome} (ND ${m.nd})`), criar('div', { class: 'ficha' },
      linhaFerramenta('Tipo', `${m.tipo} (${m.tamanho})`),
      linhaFerramenta('XP', m.xp), linhaFerramenta('CA', m.ca), linhaFerramenta('PV', m.pv),
      linhaFerramenta('Deslocamento', m.deslocamento),
      linhaFerramenta('Atributos', Object.entries(m.atributos).map(([k,v])=>`${k} ${v}`).join(', ')),
      ...m.ataques.map(a => linhaFerramenta(`Ataque: ${a.nome}`, a.dano || a.desc || '')),
      ...m.tracos.map(t => linhaFerramenta('Traço', t))
    ))));
  } else if (secao === 'Itens Mágicos') {
    ITENS_MAGICOS.forEach(i => area.appendChild(criar('div', { class: 'painel' },
      criar('div', { style: 'display:flex;justify-content:space-between;align-items:center;' },
        criar('span', { style: 'color:#d4a84f;font-weight:700;' }, i.nome),
        criar('span', { class: 'badge ' + i.raridade }, i.raridade)),
      criar('div', { style: 'font-size:.85rem;color:#a89a80;margin-top:4px;' }, i.desc),
      criar('div', { style: 'font-size:.75rem;margin-top:4px;' }, `Tipo: ${i.tipo} · Preço: ${i.preco}`)
    )));
  } else if (secao === 'Equipamento') {
    area.appendChild(criar('h3', { style: 'color:#d4a84f;margin-bottom:8px;' }, '⚔️ Armas'));
    ARMAS.forEach(a => area.appendChild(criar('div', { class: 'painel', style: 'padding:10px;' },
      criar('div', { style: 'font-weight:700;color:#d4a84f;' }, a.nome),
      criar('div', { style: 'font-size:.8rem;' }, `Dano: ${a.dano} ${a.tipo} · Preço: ${a.preco} · Peso: ${a.peso}`),
      criar('div', { style: 'font-size:.75rem;color:#a89a80;' }, `Propriedades: ${a.propriedades.join(', ')}`)
    )));
    area.appendChild(criar('h3', { style: 'color:#d4a84f;margin:12px 0 8px;' }, '🛡️ Armaduras'));
    ARMADURAS.forEach(a => area.appendChild(criar('div', { class: 'painel', style: 'padding:10px;' },
      criar('div', { style: 'font-weight:700;color:#d4a84f;' }, a.nome),
      criar('div', { style: 'font-size:.8rem;' }, `CA: ${a.ca} · Tipo: ${a.tipo} · Preço: ${a.preco} · Peso: ${a.peso} · Requisito: ${a.req}`)
    )));
    area.appendChild(criar('h3', { style: 'color:#d4a84f;margin:12px 0 8px;' }, '🎒 Equipamento de Aventura'));
    EQUIPAMENTO_AVENTURA.forEach(e => area.appendChild(criar('div', { class: 'painel', style: 'padding:10px;' },
      criar('div', { style: 'font-weight:700;color:#d4a84f;' }, e.nome),
      criar('div', { style: 'font-size:.8rem;' }, `Preço: ${e.preco} · Peso: ${e.peso}`)
    )));
  } else if (secao === 'Deuses') {
    DEUSES.forEach(d => area.appendChild(criar('div', { class: 'painel', style: 'padding:10px;' },
      criar('div', { style: 'font-weight:700;color:#d4a84f;' }, `⚡ ${d.nome}`),
      criar('div', { style: 'font-size:.8rem;' }, `Domínio: ${d.dominio} · Tendência: ${d.tendencia}`),
      criar('div', { style: 'font-size:.75rem;color:#a89a80;' }, `Símbolo: ${d.simbolo}`)
    )));
  } else if (secao === 'Planos') {
    PLANOS.forEach(p => area.appendChild(criar('div', { class: 'painel' },
      criar('div', { style: 'display:flex;justify-content:space-between;' },
        criar('span', { style: 'font-weight:700;color:#d4a84f;' }, p.nome),
        criar('span', { class: 'badge' }, p.tipo)),
      criar('div', { style: 'font-size:.85rem;color:#a89a80;margin-top:6px;' }, p.desc)
    )));
  } else if (secao === 'Regras') {
    const regras = [
      ['Vantagem/Desvantagem', 'Role 2d20 e use o maior/menor. Não se acumulam.'],
      ['Testes de Resistência', 'Sucesso = CD ≤ resultado. CD: 10 fácil, 15 média, 20 difícil, 25 muito difícil, 30 quase impossível.'],
      ['Descanso Curto', '1 hora. Gasta Dados de Vida para recuperar PV.'],
      ['Descanso Longo', '8 horas. Recupera todos os PV e metade dos Dados de Vida.'],
      ['Iniciativa', 'd20 + mod. DES. Ordem decrescente.'],
      ['Ataque', 'd20 + bônus de ataque vs CA. 20 natural = crítico (dobra dados de dano).'],
      ['Sintonização', 'Descanso curto focado no item. Máximo 3 itens sintonizados.'],
      ['Concentração', 'Quebra ao sofrer dano (CD 10 ou metade do dano).'],
      ['Percepção Passiva', '10 + mod. SAB (+ proficiência se tiver).'],
      ['Nível de Desafio', 'ND = nível do grupo para 4 personagens.'],
      ['Encontro Mortal', 'Risco real de morte. Use orçamento de XP por nível.'],
      ['Renome', '0-50. Aumenta por missões. Patentes: 1, 3, 10, 25, 50.'],
      ['Dádivas Épicas', 'Nível 20+. Poderes especiais concedidos pelo Mestre.']
    ];
    regras.forEach(([nome, desc]) => area.appendChild(criar('div', { class: 'painel' },
      criar('h3', {}, `📜 ${nome}`),
      criar('div', { style: 'font-size:.85rem;color:#a89a80;' }, desc)
    )));
  }
}

function renderDados(container) {
  container.appendChild(criar('h2', { style: 'color:#d4a84f;margin-bottom:16px;' }, '🎲 Rolar Dados'));
  const dados = [4,6,8,10,12,20,100];
  const grid = criar('div', { class: 'grid-3' });
  dados.forEach(d => grid.appendChild(criar('button', { class: 'btn', style: 'padding:20px;font-size:1.2rem;', onclick: () => mostrarResultadoDado(rolarDado(d), `d${d}`) }, `d${d}`)));
  container.appendChild(grid);
  container.appendChild(criar('h3', { style: 'color:#d4a84f;margin:20px 0 8px;' }, '⚖️ Vantagem / Desvantagem'));
  container.appendChild(criar('button', { class: 'btn btn-block', onclick: () => { const [a,b] = [rolarDado(20), rolarDado(20)]; mostrarResultadoDado(Math.max(a,b), `Vantagem (${a}, ${b})`); } }, '🎲 Rolar com Vantagem (2d20, maior)'));
  container.appendChild(criar('button', { class: 'btn btn-sec btn-block', onclick: () => { const [a,b] = [rolarDado(20), rolarDado(20)]; mostrarResultadoDado(Math.min(a,b), `Desvantagem (${a}, ${b})`); } }, '🎲 Rolar com Desvantagem (2d20, menor)'));
  container.appendChild(criar('h3', { style: 'color:#d4a84f;margin:20px 0 8px;' }, '🎲 Rolar Múltiplos Dados'));
  container.appendChild(criar('label', {}, 'Quantidade'));
  container.appendChild(criar('input', { id: 'inp-qtd', type: 'number', value: 1, min: 1, max: 100 }));
  container.appendChild(criar('label', {}, 'Tipo de Dado'));
  const sel = criar('select', { id: 'sel-dado' });
  dados.forEach(d => sel.appendChild(criar('option', { value: d }, `d${d}`)));
  container.appendChild(sel);
  container.appendChild(criar('button', { class: 'btn btn-block', onclick: () => {
    const qtd = parseInt(el('inp-qtd').value) || 1;
    const faces = parseInt(el('sel-dado').value);
    const r = rolarVarios(qtd, faces);
    mostrarResultadoDado(r.total, `${qtd}d${faces} (${r.rolls.join(' + ')})`);
  }}, '🎲 Rolar'));
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('#bottom-nav button').forEach(b => {
    b.addEventListener('click', () => {
      document.querySelectorAll('#bottom-nav button').forEach(x => x.classList.remove('ativo'));
      b.classList.add('ativo');
      navegar(b.dataset.nav);
    });
  });
  document.querySelectorAll('.card-menu, [data-nav]').forEach(b => {
    if (b.dataset.nav && !b.closest('#bottom-nav')) b.addEventListener('click', () => navegar(b.dataset.nav));
  });
  el('btn-menu').addEventListener('click', () => toast('Use a barra inferior para navegar'));
  el('dado-rapido').addEventListener('click', () => mostrarResultadoDado(rolarDado(20), 'd20 rápido'));
  const modal = document.getElementById('modal-dado');
  if (modal) modal.addEventListener('click', (e) => { if (e.target.id === 'modal-dado') fecharModalDado(); });
  const btnFechar = document.querySelector('#modal-dado button');
  if (btnFechar) btnFechar.addEventListener('click', fecharModalDado);
  renderInicio(el('conteudo'));
});