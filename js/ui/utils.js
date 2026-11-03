export function el(id) { return document.getElementById(id); }

export function criar(tag, attrs = {}, ...children) {
  const e = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'class') e.className = v;
    else if (k === 'onclick') e.addEventListener('click', v);
    else if (k.startsWith('data-')) e.setAttribute(k, v);
    else if (k === 'style') e.setAttribute('style', v);
    else e[k] = v;
  }
  children.flat().forEach(c => {
    if (typeof c === 'string') e.appendChild(document.createTextNode(c));
    else if (c) e.appendChild(c);
  });
  return e;
}

export function rolarDado(faces) {
  return Math.floor(Math.random() * faces) + 1;
}

export function rolarVarios(qtd, faces) {
  let total = 0;
  const rolls = [];
  for (let i = 0; i < qtd; i++) { const r = rolarDado(faces); rolls.push(r); total += r; }
  return { total, rolls };
}

export function mostrarResultadoDado(resultado, descricao = '') {
  const modal = document.getElementById('modal-dado');
  const h3 = document.getElementById('dado-resultado');
  const p = document.getElementById('dado-descricao');
  if (!modal) return;
  h3.textContent = resultado;
  p.textContent = descricao;
  modal.classList.remove('escondido');
}

export function fecharModalDado() {
  const m = document.getElementById('modal-dado');
  if (m) m.classList.add('escondido');
}

export function salvarLocal(chave, valor) {
  try { localStorage.setItem(chave, JSON.stringify(valor)); } catch (e) { console.error(e); }
}

export function carregarLocal(chave, padrao = null) {
  try {
    const v = localStorage.getItem(chave);
    return v ? JSON.parse(v) : padrao;
  } catch (e) { return padrao; }
}

export function toast(msg) {
  const t = criar('div', { class: 'toast' }, msg);
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2000);
}

export function confirmar(msg) {
  return window.confirm(msg);
}