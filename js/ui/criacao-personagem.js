import { RACAS } from '../data/racas.js';
import { CLASSES } from '../data/classes.js';
import { ANTECEDENTES } from '../data/antecedentes.js';
import { criar, el, toast, salvarLocal, carregarLocal } from './utils.js';

let etapa = 1;
let rascunho = {};

export function renderCriacaoPersonagem(container) {
  container.innerHTML = '';
  etapa = 1;
  rascunho = {};
  container.appendChild(renderEtapa());
}

function renderEtapa() {
  const div = criar('div', {});
  div.appendChild(criar('h2', { style: 'color:#d4a84f;margin-bottom:12px;' }, `Criação de Personagem — Etapa ${etapa}/6`));
  const progresso = criar('div', { style: 'height:6px;background:#2a241d;border-radius:3px;margin-bottom:16px;overflow:hidden;' },
    criar('div', { style: `height:100%;width:${(etapa/6)*100}%;background:#b8862f;transition:width .3s;` })
  );
  div.appendChild(progresso);
  if (etapa === 1) div.appendChild(etapaNome());
  else if (etapa === 2) div.appendChild(etapaRaca());
  else if (etapa === 3) div.appendChild(etapaClasse());
  else if (etapa === 4) div.appendChild(etapaAntecedente());
  else if (etapa === 5) div.appendChild(etapaAtributos());
  else if (etapa === 6) div.appendChild(etapaRevisao());
  return div;
}

function etapaNome() {
  const div = criar('div', {});
  div.appendChild(criar('h3', { style: 'color:#d4a84f;margin-bottom:10px;' }, '⚔️ Nome e Tendência'));
  div.appendChild(criar('label', {}, 'Nome do personagem'));
  div.appendChild(criar('input', { id: 'inp-nome', placeholder: 'Ex: Aelar, o Bravo', value: rascunho.nome || '' }));
  div.appendChild(criar('label', {}, 'Tendência'));
  const tendencias = ['Leal e Bom','Neutro e Bom','Caótico e Bom','Leal e Neutro','Neutro','Caótico e Neutro','Leal e Mau','Neutro e Mau','Caótico e Mau'];
  const sel = criar('select', { id: 'sel-tendencia' });
  tendencias.forEach(t => {
    const o = criar('option', { value: t }, t);
    if (rascunho.tendencia === t) o.selected = true;
    sel.appendChild(o);
  });
  div.appendChild(sel);
  div.appendChild(botoesNav());
  return div;
}

function etapaRaca() {
  const div = criar('div', {});
  div.appendChild(criar('h3', { style: 'color:#d4a84f;margin-bottom:10px;' }, '🧝 Escolha a Raça'));
  const lista = criar('div', { class: 'lista-opcoes' });
  RACAS.forEach(r => {
    const op = criar('div', {
      class: 'opcao' + (rascunho.raca === r.id ? ' selecionada' : ''),
      onclick: () => { rascunho.raca = r.id; rascunho.subRaca = null; el('conteudo').innerHTML = ''; el('conteudo').appendChild(renderEtapa()); }
    },
      criar('div', { class: 'nome' }, r.nome),
      criar('div', { class: 'extra' }, `Bônus: ${Object.entries(r.bonus).map(([k,v])=>`${k} +${v}`).join(', ')} · Velocidade ${r.velocidade}m`)
    );
    lista.appendChild(op);
    if (r.subRacas && r.subRacas.length > 0 && rascunho.raca === r.id) {
      const subList = criar('div', { style: 'padding:8px 12px;margin-top:-6px;margin-bottom:8px;background:#0a0805;border-radius:0 0 8px 8px;' });
      r.subRacas.forEach(sr => {
        subList.appendChild(criar('div', {
          class: 'opcao' + (rascunho.subRaca === sr.id ? ' selecionada' : ''),
          style: 'margin-bottom:6px;',
          onclick: () => { rascunho.subRaca = sr.id; el('conteudo').innerHTML = ''; el('conteudo').appendChild(renderEtapa()); }
        },
          criar('div', { class: 'nome', style: 'font-size:.85rem;' }, '↳ ' + sr.nome),
          criar('div', { class: 'extra' }, `Bônus extra: ${Object.entries(sr.bonus).map(([k,v])=>`${k} +${v}`).join(', ') || 'nenhum'}`)
        ));
      });
      lista.appendChild(subList);
    }
  });
  div.appendChild(lista);
  div.appendChild(botoesNav());
  return div;
}

function etapaClasse() {
  const div = criar('div', {});
  div.appendChild(criar('h3', { style: 'color:#d4a84f;margin-bottom:10px;' }, '🎭 Escolha a Classe'));
  const lista = criar('div', { class: 'lista-opcoes' });
  CLASSES.forEach(c => {
    const op = criar('div', {
      class: 'opcao' + (rascunho.classe === c.id ? ' selecionada' : ''),
      onclick: () => { rascunho.classe = c.id; rascunho.subClasse = null; el('conteudo').innerHTML = ''; el('conteudo').appendChild(renderEtapa()); }
    },
      criar('div', { class: 'nome' }, c.nome),
      criar('div', { class: 'extra' }, `Dado de Vida: d${c.dadoVida} · Atributos: ${c.atributosPrincipais.join(', ')}`)
    );
    lista.appendChild(op);
    if (rascunho.classe === c.id && c.subclasses && c.subclasses.length > 0) {
      const subList = criar('div', { style: 'padding:8px 12px;margin-top:-6px;margin-bottom:8px;background:#0a0805;border-radius:0 0 8px 8px;' });
      subList.appendChild(criar('div', { style: 'font-size:.75rem;color:#a89a80;margin-bottom:6px;' }, 'Subclasse:'));
      c.subclasses.forEach(sc => {
        subList.appendChild(criar('div', {
          class: 'opcao' + (rascunho.subClasse === sc.id ? ' selecionada' : ''),
          style: 'margin-bottom:6px;',
          onclick: () => { rascunho.subClasse = sc.id; el('conteudo').innerHTML = ''; el('conteudo').appendChild(renderEtapa()); }
        },
          criar('div', { class: 'nome', style: 'font-size:.85rem;' }, '↳ ' + sc.nome),
          criar('div', { class: 'extra' }, `Nível ${sc.nivel}`)
        ));
      });
      lista.appendChild(subList);
    }
  });
  div.appendChild(lista);
  div.appendChild(botoesNav());
  return div;
}

function etapaAntecedente() {
  const div = criar('div', {});
  div.appendChild(criar('h3', { style: 'color:#d4a84f;margin-bottom:10px;' }, '📜 Escolha o Antecedente'));
  const lista = criar('div', { class: 'lista-opcoes' });
  ANTECEDENTES.forEach(a => {
    lista.appendChild(criar('div', {
      class: 'opcao' + (rascunho.antecedente === a.id ? ' selecionada' : ''),
      onclick: () => { rascunho.antecedente = a.id; el('conteudo').innerHTML = ''; el('conteudo').appendChild(renderEtapa()); }
    },
      criar('div', { class: 'nome' }, a.nome),
      criar('div', { class: 'extra' }, `Perícias: ${a.pericias.join(', ')}${a.ferramentas ? ' · Ferramentas: '+a.ferramentas.join(', ') : ''}`)
    ));
  });
  div.appendChild(lista);
  div.appendChild(botoesNav());
  return div;
}

function etapaAtributos() {
  const div = criar('div', {});
  div.appendChild(criar('h3', { style: 'color:#d4a84f;margin-bottom:10px;' }, '💪 Distribua os Atributos'));
  div.appendChild(criar('p', { style: 'font-size:.85rem;color:#a89a80;margin-bottom:12px;' }, 'Use o array padrão ou role 4d6 (descarta o menor). Você também pode ajustar manualmente (3 a 18).'));
  const atribs = ['FOR','DES','CON','INT','SAB','CAR'];
  const nomes = { FOR:'Força', DES:'Destreza', CON:'Constituição', INT:'Inteligência', SAB:'Sabedoria', CAR:'Carisma' };
  if (!rascunho.atributos) rascunho.atributos = { FOR: 10, DES: 10, CON: 10, INT: 10, SAB: 10, CAR: 10 };
  div.appendChild(criar('button', { class: 'btn btn-sec btn-block', onclick: () => {
    const valores = [];
    for (let i = 0; i < 6; i++) {
      const rolls = [1,2,3,4].map(() => Math.floor(Math.random()*6)+1).sort((a,b)=>b-a);
      valores.push(rolls[0]+rolls[1]+rolls[2]);
    }
    valores.sort((a,b)=>b-a);
    atribs.forEach((a,i) => rascunho.atributos[a] = valores[i]);
    el('conteudo').innerHTML = ''; el('conteudo').appendChild(renderEtapa());
  }}, '🎲 Rolar 4d6 (descarta menor) e distribuir'));
  const grid = criar('div', { style: 'margin-top:16px;' });
  atribs.forEach(a => {
    grid.appendChild(criar('div', { style: 'display:flex;align-items:center;gap:12px;margin-bottom:12px;' },
      criar('div', { style: 'flex:1;font-weight:700;color:#d4a84f;' }, nomes[a]),
      criar('input', { type: 'number', min: 3, max: 18, value: rascunho.atributos[a], style: 'width:80px;text-align:center;font-size:1.2rem;font-weight:700;margin:0;', oninput: (e) => { rascunho.atributos[a] = parseInt(e.target.value) || 10; } }),
      criar('div', { style: 'width:50px;text-align:center;color:#a89a80;font-size:.85rem;' }, `(${modFormatado(rascunho.atributos[a])})`)
    ));
  });
  div.appendChild(grid);
  div.appendChild(criar('button', { class: 'btn btn-sec btn-block', onclick: () => {
    const arr = [15,14,13,12,10,8];
    atribs.forEach((a,i) => rascunho.atributos[a] = arr[i]);
    el('conteudo').innerHTML = ''; el('conteudo').appendChild(renderEtapa());
  }}, '📋 Usar array padrão: 15,14,13,12,10,8'));
  div.appendChild(botoesNav());
  return div;
}

function modFormatado(valor) {
  const m = Math.floor((valor - 10) / 2);
  return (m >= 0 ? '+' : '') + m;
}

function etapaRevisao() {
  const div = criar('div', {});
  div.appendChild(criar('h3', { style: 'color:#d4a84f;margin-bottom:10px;' }, '✨ Revisão do Personagem'));
  rascunho.nome = el('inp-nome')?.value || rascunho.nome || 'Aventureiro';
  const raca = RACAS.find(r => r.id === rascunho.raca);
  // CORRIGIDO AQUI: subRacas (tudo junto)
  const subRaca = raca?.subRacas?.find(s => s.id === rascunho.subRaca); 
  const classe = CLASSES.find(c => c.id === rascunho.classe);
  const subClasse = classe?.subclasses?.find(s => s.id === rascunho.subClasse);
  const antecedente = ANTECEDENTES.find(a => a.id === rascunho.antecedente);
  const painel = criar('div', { class: 'painel ficha' });
  const atributosFinais = { ...rascunho.atributos };
  if (raca) {
    for (const [k,v] of Object.entries(raca.bonus)) if (atributosFinais[k] !== undefined) atributosFinais[k] += v;
    if (subRaca && subRaca.bonus) for (const [k,v] of Object.entries(subRaca.bonus)) if (atributosFinais[k] !== undefined) atributosFinais[k] += v;
  }
  const linhas = [
    ['Nome', rascunho.nome],
    ['Raça', raca?.nome + (subRaca ? ` (${subRaca.nome})` : '')],
    ['Classe', classe?.nome + (subClasse ? ` (${subClasse.nome})` : '')],
    ['Antecedente', antecedente?.nome],
    ['Nível', '1'],
    ['Tendência', rascunho.tendencia || 'Neutro'],
    ['— ATRIBUTOS —', ''],
    ...Object.entries(atributosFinais).map(([k,v]) => [k, `${v} (${modFormatado(v)})`]),
    ['— COMBATE —', ''],
    ['Pontos de Vida', classe ? `${classe.dadoVida + Math.floor((atributosFinais.CON-10)/2)}` : '-'],
    ['CA', `${10 + Math.floor((atributosFinais.DES-10)/2)}`],
    ['Iniciativa', `${modFormatado(atributosFinais.DES)}`],
    ['Bônus de Proficiência', '+2'],
    ['Testes de Resistência', classe?.testesResistencia?.join(', ') || '-'],
    ['— PERÍCIAS —', ''],
    ['Perícias', antecedente?.pericias?.join(', ') || '-'],
    ['Idiomas', (raca?.idiomas || ['Comum']).join(', ')]
  ];
  linhas.forEach(([k,v]) => painel.appendChild(criar('div', { class: 'linha' }, criar('span', {}, k), criar('span', { class: 'valor' }, v))));
  div.appendChild(painel);
  div.appendChild(criar('button', { class: 'btn btn-block', onclick: () => {
    const p = {
      nome: rascunho.nome, raca: rascunho.raca, subRaca: rascunho.subRaca,
      classe: rascunho.classe, subClasse: rascunho.subClasse, antecedente: rascunho.antecedente,
      tendencia: rascunho.tendencia, atributos: atributosFinais, nivel: 1,
      proficiencias: antecedente?.pericias || [], idiomas: raca?.idiomas || ['Comum'],
      equipamento: classe?.equipamentoInicial?.map(nome => ({ nome })) || []
    };
    p.pvMax = classe ? classe.dadoVida + Math.floor((atributosFinais.CON-10)/2) : 10;
    p.pvAtual = p.pvMax;
    p.ca = 10 + Math.floor((atributosFinais.DES-10)/2);
    p.iniciativa = Math.floor((atributosFinais.DES-10)/2);
    const fichas = carregarLocal('fichas', []);
    fichas.push(p);
    salvarLocal('fichas', fichas);
    toast('✨ Personagem criado e salvo!');
    document.querySelector('[data-nav="pagina-inicio"]').click();
  }}, '💾 Salvar Personagem'));
  div.appendChild(criar('button', { class: 'btn btn-sec btn-block', onclick: () => { etapa = 5; el('conteudo').innerHTML=''; el('conteudo').appendChild(renderEtapa()); } }, '← Voltar'));
  return div;
}

function botoesNav() {
  const div = criar('div', { class: 'btn-group', style: 'margin-top:16px;display:flex;gap:8px;' });
  if (etapa > 1) {
    div.appendChild(criar('button', { class: 'btn btn-sec', style: 'flex:1;', onclick: () => { etapa--; el('conteudo').innerHTML=''; el('conteudo').appendChild(renderEtapa()); } }, '← Voltar'));
  }
  if (etapa < 6) {
    div.appendChild(criar('button', { class: 'btn', style: 'flex:2;', onclick: () => {
      if (etapa === 1) {
        rascunho.nome = el('inp-nome')?.value || 'Aventureiro';
        rascunho.tendencia = el('sel-tendencia')?.value || 'Neutro';
      }
      if (etapa === 2 && !rascunho.raca) { toast('Escolha uma raça!'); return; }
      if (etapa === 3 && !rascunho.classe) { toast('Escolha uma classe!'); return; }
      if (etapa === 4 && !rascunho.antecedente) { toast('Escolha um antecedente!'); return; }
      if (etapa === 5) {
        const valores = Object.values(rascunho.atributos);
        if (valores.some(v => v < 3 || v > 18)) { toast('Atributos devem estar entre 3 e 18!'); return; }
      }
      etapa++;
      el('conteudo').innerHTML='';
      el('conteudo').appendChild(renderEtapa());
    }}, etapa === 5 ? 'Revisar →' : 'Avançar →'));
  }
  return div;
}