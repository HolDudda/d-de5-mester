import { gerarCampanha, gerarGancho, gerarPDM, gerarEncontroAleatorio } from '../engine/campanha.js';
import { criar, el, toast, salvarLocal, carregarLocal } from './utils.js';

export function renderNovaCampanha(container) {
  container.innerHTML = '';
  container.appendChild(criar('h2', { style: 'color:#d4a84f;margin-bottom:16px;' }, '🗺️ Criar Nova Campanha'));
  container.appendChild(criar('p', { style: 'color:#a89a80;margin-bottom:16px;font-size:.9rem;' },
    'O app gera automaticamente um mundo com reinos, deuses, masmorras, NPCs, ganchos de aventura e encontros — baseado nas tabelas do Guia do Mestre.'));
  container.appendChild(criar('label', {}, 'Tema (opcional)'));
  const sel = criar('select', { id: 'sel-tema' });
  ['Aleatório','Fantasia Heroica','Espada e Feitiçaria','Fantasia Sombria','Mistério','Intriga','Guerra','Wuxia','Fantasia Épica','Fantasia Mítica'].forEach(t => {
    sel.appendChild(criar('option', { value: t }, t));
  });
  container.appendChild(sel);
  container.appendChild(criar('button', {
    class: 'btn btn-block', style: 'font-size:1.1rem;padding:16px;',
    onclick: () => {
      const tema = sel.value === 'Aleatório' ? null : sel.value;
      const campanha = gerarCampanha(tema);
      const campanhas = carregarLocal('campanhas', []);
      campanhas.push(campanha);
      salvarLocal('campanhas', campanhas);
      toast('🌍 Campanha gerada com sucesso!');
      renderCampanha(container, campanha);
    }
  }, '🎲 Gerar Campanha Automática'));
  const campanhas = carregarLocal('campanhas', []);
  if (campanhas.length > 0) {
    container.appendChild(criar('h3', { style: 'color:#d4a84f;margin:24px 0 12px;' }, '📜 Campanhas Salvas'));
    const lista = criar('div', { class: 'lista-opcoes' });
    campanhas.forEach((c, idx) => {
      const op = criar('div', { class: 'opcao', onclick: () => renderCampanha(container, c) },
        criar('div', { class: 'nome' }, c.nome),
        criar('div', { class: 'extra' }, `${c.tema} · ${c.masmorras.length} masmorras · ${c.ganchos.length} ganchos`),
        criar('button', {
          class: 'btn btn-danger', style: 'padding:6px 10px;font-size:.75rem;margin-top:6px;',
          onclick: (e) => {
            e.stopPropagation();
            if (confirm('Apagar esta campanha?')) {
              campanhas.splice(idx, 1);
              salvarLocal('campanhas', campanhas);
              renderNovaCampanha(container);
            }
          }
        }, '🗑️ Apagar')
      );
      lista.appendChild(op);
    });
    container.appendChild(lista);
  }
}

export function renderCampanha(container, campanha) {
  container.innerHTML = '';
  container.appendChild(criar('h2', { style: 'color:#d4a84f;margin-bottom:8px;' }, campanha.nome));
  container.appendChild(criar('p', { style: 'color:#a89a80;margin-bottom:16px;' }, `Tema: ${campanha.tema}`));
  const painel = criar('div', { class: 'painel' },
    criar('h3', {}, '🌍 O Mundo'),
    criar('div', { class: 'ficha' },
      linha('Reino', campanha.reino),
      linha('Evento Atual', campanha.evento),
      linha('Governo', campanha.governo),
      linha('Deus Patrono', campanha.deusPatrono?.nome || '-'),
      linha('Domínio', campanha.deusPatrono?.dominio || '-')
    )
  );
  container.appendChild(painel);
  container.appendChild(criar('h3', { style: 'color:#d4a84f;margin:20px 0 10px;' }, '🎣 Ganchos de Aventura'));
  campanha.ganchos.forEach((g, i) => {
    container.appendChild(criar('div', { class: 'painel' },
      criar('h3', {}, `Aventura ${i+1}`),
      criar('div', { class: 'ficha' },
        linha('Objetivo', g.objetivo),
        linha('Introdução', g.introducao),
        linha('Clímax', g.climax),
        linha('Complicação', g.complicacao),
        linha('Reviravolta', g.reviravolta),
        linha('Missão Secundária', g.missaoSecundaria)
      )
    ));
  });
  container.appendChild(criar('h3', { style: 'color:#d4a84f;margin:20px 0 10px;' }, '🏚️ Masmorras'));
  campanha.masmorras.forEach((m, i) => {
    container.appendChild(criar('div', { class: 'painel' },
      criar('h3', {}, `Masmorra ${i+1}: ${m.local}`),
      criar('div', { class: 'ficha' },
        linha('Criador', m.criador),
        linha('Propósito', m.proposito),
        linha('História', m.historia),
        linha('Salas', `${m.salas.length} salas`),
        ...m.salas.map((s) => linha(`Sala ${s.numero}`, `${s.tipo}: ${s.conteudo?.descricao || s.conteudo?.monstro?.nome || 'Vazio'}`))
      )
    ));
  });
  container.appendChild(criar('h3', { style: 'color:#d4a84f;margin:20px 0 10px;' }, '👥 Personagens do Mestre'));
  campanha.pdms.forEach((pdm) => {
    container.appendChild(criar('div', { class: 'npc-card' },
      criar('h4', {}, `${pdm.nome} — ${pdm.ocupacao}`),
      criar('div', { class: 'ficha' },
        linha('Maneirismo', pdm.maneirismo),
        linha('Ideal', pdm.ideal),
        linha('Vínculo', pdm.vinculo),
        linha('Defeito', pdm.defeito)
      )
    ));
  });
  const btnEnc = criar('button', {
    class: 'btn btn-block', style: 'margin-top:16px;',
    onclick: () => {
      const enc = gerarEncontroAleatorio('floresta', 1);
      const painelEnc = criar('div', { class: 'painel', style: 'margin-top:12px;' },
        criar('h3', {}, '⚔️ Encontro Aleatório'),
        criar('div', { class: 'ficha' },
          linha('Descrição', enc.descricao),
          linha('Ambiente', enc.tipo),
          linha('Dificuldade', enc.dificuldade)
        )
      );
      container.insertBefore(painelEnc, btnEnc.nextSibling);
      toast('Encontro gerado!');
    }
  }, '🎲 Gerar Encontro Aleatório');
  container.appendChild(btnEnc);
  container.appendChild(criar('button', {
    class: 'btn btn-sec btn-block',
    onclick: () => {
      campanha.ganchos.push(gerarGancho());
      const campanhas = carregarLocal('campanhas', []);
      const idx = campanhas.findIndex(c => c.id === campanha.id);
      if (idx >= 0) { campanhas[idx] = campanha; salvarLocal('campanhas', campanhas); }
      renderCampanha(container, campanha);
      toast('Novo gancho adicionado!');
    }
  }, '➕ Adicionar Novo Gancho'));
  container.appendChild(criar('button', {
    class: 'btn btn-sec btn-block', style: 'margin-top:12px;',
    onclick: () => renderNovaCampanha(container)
  }, '← Voltar ao menu de campanhas'));
}

function linha(k, v) {
  return criar('div', { class: 'linha' },
    criar('span', {}, k),
    criar('span', { class: 'valor' }, String(v || '-'))
  );
}