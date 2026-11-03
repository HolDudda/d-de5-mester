export const ARMAS = [
  { nome:'Adaga', dano:'1d4', tipo:'perfurante', preco:'2 po', peso:'0.5 kg', propriedades:['Acuidade','Leve','Arremesso (6/18m)'] },
  { nome:'Espada Curta', dano:'1d6', tipo:'perfurante', preco:'10 po', peso:'1 kg', propriedades:['Acuidade','Leve'] },
  { nome:'Espada Longa', dano:'1d8', tipo:'cortante', preco:'15 po', peso:'1.5 kg', propriedades:['Versátil (1d10)'] },
  { nome:'Espada Grande', dano:'2d6', tipo:'cortante', preco:'50 po', peso:'3 kg', propriedades:['Duas mãos','Pesada'] },
  { nome:'Machado Grande', dano:'1d12', tipo:'cortante', preco:'30 po', peso:'3.5 kg', propriedades:['Duas mãos','Pesada'] },
  { nome:'Machadinha', dano:'1d6', tipo:'cortante', preco:'5 po', peso:'1 kg', propriedades:['Leve','Arremesso (6/18m)'] },
  { nome:'Maça', dano:'1d6', tipo:'concussão', preco:'5 po', peso:'2 kg', propriedades:['Nenhuma'] },
  { nome:'Clava Grande', dano:'1d8', tipo:'concussão', preco:'2 po', peso:'5 kg', propriedades:['Duas mãos'] },
  { nome:'Lança', dano:'1d6', tipo:'perfurante', preco:'1 po', peso:'1.5 kg', propriedades:['Arremesso (6/18m)','Versátil (1d8)'] },
  { nome:'Arco Longo', dano:'1d8', tipo:'perfurante', preco:'50 po', peso:'1 kg', propriedades:['Munição (45/180m)','Duas mãos'] },
  { nome:'Arco Curto', dano:'1d6', tipo:'perfurante', preco:'25 po', peso:'1 kg', propriedades:['Munição (24/96m)','Duas mãos'] },
  { nome:'Besta Leve', dano:'1d8', tipo:'perfurante', preco:'25 po', peso:'2.5 kg', propriedades:['Munição (24/96m)','Recarga','Duas mãos'] },
  { nome:'Besta Pesada', dano:'1d10', tipo:'perfurante', preco:'50 po', peso:'9 kg', propriedades:['Munição (30/120m)','Recarga','Duas mãos','Pesada'] },
  { nome:'Bordão', dano:'1d6', tipo:'concussão', preco:'2 pp', peso:'2 kg', propriedades:['Versátil (1d8)'] },
  { nome:'Rapieira', dano:'1d8', tipo:'perfurante', preco:'25 po', peso:'1 kg', propriedades:['Acuidade'] },
  { nome:'Cimitarra', dano:'1d6', tipo:'cortante', preco:'25 po', peso:'1.5 kg', propriedades:['Acuidade','Leve'] }
];

export const ARMADURAS = [
  { nome:'Armadura de Couro', ca:'11 + DES', tipo:'Leve', preco:'10 po', peso:'5 kg', req:'-' },
  { nome:'Couro Batido', ca:'12 + DES', tipo:'Leve', preco:'45 po', peso:'6.5 kg', req:'-' },
  { nome:'Gibão de Peles', ca:'12 + DES (máx 2)', tipo:'Média', preco:'10 po', peso:'6 kg', req:'-' },
  { nome:'Camisão de Malha', ca:'13 + DES (máx 2)', tipo:'Média', preco:'50 po', peso:'10 kg', req:'-' },
  { nome:'Cota de Escamas', ca:'14 + DES (máx 2)', tipo:'Média', preco:'50 po', peso:'22.5 kg', req:'-' },
  { nome:'Peitoral', ca:'14 + DES (máx 2)', tipo:'Média', preco:'400 po', peso:'10 kg', req:'-' },
  { nome:'Brunea', ca:'14 + DES (máx 2)', tipo:'Média', preco:'200 po', peso:'22.5 kg', req:'-' },
  { nome:'Cota de Anéis', ca:'14', tipo:'Pesada', preco:'30 po', peso:'20 kg', req:'-' },
  { nome:'Cota de Malha', ca:'16', tipo:'Pesada', preco:'75 po', peso:'27.5 kg', req:'FOR 13' },
  { nome:'Cota de Talas', ca:'17', tipo:'Pesada', preco:'200 po', peso:'30 kg', req:'FOR 15' },
  { nome:'Armadura de Placas', ca:'18', tipo:'Pesada', preco:'1.500 po', peso:'32.5 kg', req:'FOR 15' },
  { nome:'Escudo', ca:'+2', tipo:'Escudo', preco:'10 po', peso:'3 kg', req:'-' }
];

export const EQUIPAMENTO_AVENTURA = [
  { nome:'Mochila', preco:'2 po', peso:'2.5 kg' },
  { nome:'Saco de Dormir', preco:'1 po', peso:'3.5 kg' },
  { nome:'Corda de Cânhamo (15m)', preco:'1 po', peso:'5 kg' },
  { nome:'Tocha', preco:'1 pc', peso:'0.5 kg' },
  { nome:'Lanterna Coberta', preco:'5 po', peso:'1 kg' },
  { nome:'Óleo (frasco)', preco:'1 pp', peso:'0.5 kg' },
  { nome:'Rações (1 dia)', preco:'5 pp', peso:'1 kg' },
  { nome:'Cantil (cheio)', preco:'2 pp', peso:'2.5 kg' },
  { nome:'Kit de Primeiros Socorros', preco:'5 po', peso:'1.5 kg' },
  { nome:'Pé de Cabra', preco:'2 po', peso:'2.5 kg' },
  { nome:'Martelo', preco:'1 po', peso:'1.5 kg' },
  { nome:'Pítons (10)', preco:'5 pp', peso:'2.5 kg' },
  { nome:'Ferramentas de Ladrão', preco:'25 po', peso:'0.5 kg' },
  { nome:'Kit de Disfarce', preco:'25 po', peso:'1.5 kg' },
  { nome:'Kit de Herbalismo', preco:'5 po', peso:'1.5 kg' },
  { nome:'Bolsa de Componentes', preco:'25 po', peso:'1 kg' },
  { nome:'Foco Arcano', preco:'10 po', peso:'0.5 kg' },
  { nome:'Símbolo Sagrado', preco:'5 po', peso:'0.5 kg' }
];