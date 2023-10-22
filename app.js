let newGameButton = document.getElementById('game');
let newButtonClicked = true;
newGameButton.onclick = start;
let moveCounter = 0;
let gameTime = 0;

// URL da imagem
const image = 'url("./img/4x4img.jpg")';

// Acionado quando o botão de novo jogo é clicado
function start() {
  let dif = document.querySelector('[name="game-difficulty"]:checked').value;
  if (newButtonClicked) {
    startGame(dif);
    field.style.display = 'block';
    startResults();
    newButtonClicked = false; // O valor da flag muda
    newGameButton.innerHTML = 'Restart';
    difficulty.style.display = 'none';
    result.style.display = 'block';
  } else {
    window.location.reload(); // Recarregue a página
  }
}
function startGame(dif) {
  // Procurando o campo
  const field = document.querySelector('.field');
  // Tamanho da célula
  const cellSize = 100;
  // Adiciona as informações sobre as células em um array
  const cells = [];
  // Cria e ordena um array com números
  const numbers = [...Array(dif * dif - 1).keys()].sort(
    () => Math.random() - 0.5
  );
  const fullImage = document.getElementById('full-image');
  if (dif == 4 && document.getElementById('game-difficulty-img').checked) {
    fullImage.src = './img/4x4img.jpg';
    fullImage.style.display = 'block';
  } else {
    fullImage.style.display = 'none';
  }

  for (let i = 0; i <= dif * dif - 2; i++) {
    // Cria uma tag
    const cell = document.createElement('div');
    const value = numbers[i] + 1;
    cell.className = 'cell';
    // Verifique se a opção selecionada é "4x4 (imagem)"
    if (dif == 4 && document.getElementById('game-difficulty-img').checked) {
      // Calcule a posição da imagem de fundo
      const x = (i % dif) * cellSize;
      const y = Math.floor(i / dif) * cellSize;
      cell.style.backgroundImage = image;
      cell.style.backgroundPositionX = `-${x}px`;
      cell.style.backgroundPositionY = `-${y}px`;
    } else {
      // Escreve o valor na célula
      cell.innerHTML = value;
    }
    // Posição na linha
    const left = i % dif;
    // Posição na coluna
    const top = (i - left) / dif;
    // Escreve a célula no array
    cells.push({
      value: value,
      left: left,
      top: top,
      element: cell,
    });
    // Muda as coordenadas
    cell.style.left = `${left * cellSize}px`;
    cell.style.top = `${top * cellSize}px`;
    // Adiciona uma célula ao campo field
    field.append(cell);
    // Quando o manipulador de eventos é acionado, a função é acionada
    cell.addEventListener('click', () => {
      move(i);
    });
  }

  // Coordenadas de uma célula vazia
  const empty = {
    value: dif * dif,
    top: dif - 1,
    left: dif - 1,
  };

  // Adiciona uma célula vazia ao array
  cells.push(empty);

  function move(index) {
    // Pega a célula
    const cell = cells[index];

    // Pega a diferença na coordenada
    const leftDiff = Math.abs(empty.left - cell.left);
    const topDiff = Math.abs(empty.top - cell.top);

    // Se a diferença for maior que um, então a célula não é adjacente
    if (leftDiff + topDiff > 1) {
      return;
    }

    moveCounter++;

    // Mover para a célula anterior
    cell.element.style.left = `${empty.left * cellSize}px`;
    cell.element.style.top = `${empty.top * cellSize}px`;

    // Coordenadas de uma célula vazia
    const emptyLeft = empty.left;
    const emptyTop = empty.top;

    // Anota as coordenadas da célula atual
    empty.left = cell.left;
    empty.top = cell.top;

    // Passa os valores gravados para a célula
    cell.left = emptyLeft;
    cell.top = emptyTop;

    // O método each verifica a condição de cada elemento
    const isFinished = cells.every((cell) => {
      // Verifica a coordenada correta
      return cell.value === cell.top * dif + cell.left + 1;
    });

    if (isFinished) {
      alert(
        'You solved the puzzle in ' +
          gameTime +
          ' seconds and ' +
          moveCounter +
          ' moves'
      );
      window.location.reload();
    }
  }
}

// Resultados
function startResults() {
  const moveContainer = document.querySelector('.move-text');
  const timeContainer = document.querySelector('.time-text');
  moveContainer.innerHTML = '' + moveCounter;
  timeContainer.innerHTML = '' + gameTime;

  // Atualiza o contêiner de etapas
  const movesUpdate = setInterval(() => {
    moveContainer.innerHTML = '' + moveCounter;
  }, 100);

  // Atualiza o contêiner de tempo
  const gameInterval = setInterval(() => {
    timeContainer.innerHTML = '' + ++gameTime;
  }, 1000);
}
