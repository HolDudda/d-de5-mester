export const ARMADILHAS = [
  { nome:'Agulha Envenenada', tipo:'Mecânica', gatilho:'Abrir baú sem chave', deteccao:'CD 20 (Investigação)', desarme:'CD 15 (Ferramentas de Ladrão)', efeito:'1 dano perfurante + 2d10 veneno (CD 15 CON)' },
  { nome:'Dardos Envenenados', tipo:'Mecânica', gatilho:'Pisar em placa de pressão', deteccao:'CD 15 (Percepção/Investigação)', desarme:'Cavilha ou cera nos buracos', efeito:'4 dardos, +8 ataque, 1d4 perfurante + 2d10 veneno (CD 15 CON)' },
  { nome:'Esfera Rolante', tipo:'Mecânica', gatilho:'Placa de pressão', deteccao:'CD 15 (Percepção/Investigação)', desarme:'Cavilha sob placa', efeito:'Esfera 3m, 10d10 concussão (CD 15 DES), move 18m/rodada' },
  { nome:'Estátua Cuspindo Fogo', tipo:'Mágica', gatilho:'Placa de pressão', deteccao:'CD 15 (Percepção), detectar magia', desarme:'Dissipar magia CD 13', efeito:'Cone 9m, 4d10 fogo (CD 13 DES)' },
  { nome:'Fosso Simples', tipo:'Mecânica', gatilho:'Pisar no tecido camuflado', deteccao:'CD 10 (Percepção)', desarme:'Contornar', efeito:'Queda 3m (1d6 concussão)' },
  { nome:'Fosso Escondido', tipo:'Mecânica', gatilho:'Pisar na cobertura', deteccao:'CD 15 (Percepção/Investigação)', desarme:'Cavilha ou tranca arcana', efeito:'Queda 3-6m' },
  { nome:'Fosso Trancado', tipo:'Mecânica', gatilho:'Pisar na cobertura', deteccao:'CD 15 (Percepção/Investigação)', desarme:'Força CD 20 ou Destreza CD 15', efeito:'Queda + trancado' },
  { nome:'Fosso com Estacas', tipo:'Mecânica', gatilho:'Pisar na cobertura', deteccao:'CD 15 (Percepção/Investigação)', desarme:'Cavilha', efeito:'Queda + 2d10 perfurante (+4d10 veneno se CD 13 CON falhar)' },
  { nome:'Rede Caindo', tipo:'Mecânica', gatilho:'Fio esticado', deteccao:'CD 10 (Percepção)', desarme:'CD 15 (Ferramentas de Ladrão)', efeito:'Rede 3m², impedido e caído (CD 10 FOR)' },
  { nome:'Teto Desmoronando', tipo:'Mecânica', gatilho:'Fio esticado', deteccao:'CD 10 (Percepção)', desarme:'CD 15 (Ferramentas de Ladrão)', efeito:'4d10 concussão (CD 15 DES)' },
  { nome:'Esfera de Aniquilação', tipo:'Mágica', gatilho:'Boca de pedra', deteccao:'CD 20 (Arcanismo)', desarme:'Impossível', efeito:'Obliteração total de matéria' }
];

export const GRAVIDADE_ARMADILHA = {
  inconveniente: { cd: '10-11', ataque: '+3 a +5', dano: { '1-4': '1d10', '5-10': '2d10', '11-16': '4d10', '17-20': '10d10' } },
  perigosa: { cd: '12-15', ataque: '+6 a +8', dano: { '1-4': '2d10', '5-10': '4d10', '11-16': '10d10', '17-20': '18d10' } },
  mortal: { cd: '16-20', ataque: '+9 a +12', dano: { '1-4': '4d10', '5-10': '10d10', '11-16': '18d10', '17-20': '24d10' } }
};