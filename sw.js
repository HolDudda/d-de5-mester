const CACHE = 'dnd5e-v1';
const ASSETS = [
  './', './index.html', './manifest.json',
  './css/style.css',
  './js/app.js',
  './js/data/racas.js','./js/data/classes.js','./js/data/antecedentes.js',
  './js/data/magias.js','./js/data/monstros.js','./js/data/itens-magicos.js',
  './js/data/equipamentos.js','./js/data/deuses.js','./js/data/planos.js',
  './js/data/encontros.js','./js/data/armadilhas.js','./js/data/tesouros.js',
  './js/data/tabelas.js',
  './js/engine/campanha.js','./js/engine/combate.js','./js/engine/personagem.js',
  './js/engine/encontros.js','./js/engine/narrador.js',
  './js/ui/criacao-personagem.js','./js/ui/campanha.js','./js/ui/combate-ui.js','./js/ui/utils.js'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request).then(res => {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(e.request, copy));
      return res;
    }))
  );
});