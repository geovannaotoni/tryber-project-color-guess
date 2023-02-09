const rgbColor = document.getElementById('rgb-color');
const answer = document.getElementById('answer');
const balls = document.getElementsByClassName('ball');
const pScore = document.getElementsByTagName('span')[0];

// 4- Função para gerar as cores aleatoriamente em rgb
// https://wallacemaxters.com.br/blog/48/como-gerar-cores-aleatorias-no-javascript#:~:text=Gerando%20cores%20RGBA&text=A%20fun%C3%A7%C3%A3o%20Math.,ser%C3%A1%20a%20opacidade%20da%20cor.
const generateColor = () => {
  const r = Math.random() * 255;
  const g = Math.random() * 255;
  const b = Math.random() * 255;

  return `rgba(${r}, ${g}, ${b})`;
};

// 3- Criar os 6 círculos na página
const nav = document.getElementsByTagName('nav')[0];
for (let index = 0; index < 6; index += 1) {
  const div = document.createElement('div');
  div.classList.add('ball');
  div.style.backgroundColor = generateColor();
  nav.appendChild(div);
}

// 4- Função que gera aleatoriamente um valor de rgb dentre as 6 divs
const correctDiv = () => {
  // gerar um index aleatorio entre 0 e 5
  const correctBall = Math.floor(Math.random() * 6);
  // passar esse index para o HTMLCollection das divs e puxar o valor do background color
  const correctColor = balls[correctBall].style.backgroundColor; // aqui retorna uma string no formato 'rgb(x)'
  const correctRGB = correctColor.substring(3, correctColor.length); // aqui retorna uma substring somente com os valores (x), retirando as letras 'rgb' da string
  return correctRGB;
};

// 7- Placar que incremente 3 pontos para cada acerto no jogo
const winScore = () => {
  pScore.innerText = Number(pScore.innerText) + 3;
};

const lostScore = () => {
  pScore.innerText = Number(pScore.innerText) - 1;
};

// 7 - Salvar o Score no localStorage
const saveScore = () => {
  localStorage.setItem('score', pScore.innerText);
};

// 7 - Recuperar o Score do localStorage
const recoverScore = () => {
  pScore.innerText = localStorage.getItem('score');
};

// 5- Função para checar se a cor da div é igual a cor que está no parágrafo
const match = (event) => {
  const divColor = event.target.style.backgroundColor;
  const pColor = `rgb${rgbColor.innerText}`;
  if (pColor === divColor) {
    answer.innerHTML = 'Acertou!';
    winScore();
  } else {
    answer.innerHTML = 'Errou! Tente novamente!';
    lostScore();
  }
  saveScore();
};

for (let index = 0; index < balls.length; index += 1) {
  balls[index].addEventListener('click', match);
}

// 6- Botão para iniciar/reiniciar o jogo
const resetBtn = document.getElementById('reset-game');
const reset = () => {
  window.location.reload(true);
};

window.onload = () => {
  rgbColor.innerText = correctDiv();
  resetBtn.addEventListener('click', reset);

  if (localStorage.getItem('score')) {
    recoverScore();
  } else {
    saveScore();
  }
};
