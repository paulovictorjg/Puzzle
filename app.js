//pega o botão
let newGameButton = document.getElementById('game');

//flag para determinar a ordem de pressionar o botão
let newButtonClicked = true;

//evento quando o botão é clicado
newGameButton.onclick = start;

//contador de passos
let moveCounter = 0;
let gameTime = 0;

//acionado quando o botão de novo jogo é clicado
function start() {
  let dif = document.querySelector('[name="game-difficulty"]:checked').value;
  if (newButtonClicked) {
    startGame(dif);
    field.style.display = 'block';
    startResults();
    newButtonClicked = false; //o valor da flag muda
    newGameButton.innerHTML = 'Restart';
    difficulty.style.display = 'none';
    result.style.display = 'block';
  } else {
    window.location.reload(); //recarregue a página
  }
}

function startGame(dif) {
  //procurando o campo
  const field = document.querySelector('.field');

  //tamanho da célula
  const cellSize = 100;

  //adiciona as informações sobre as células em um array
  const cells = [];

  //cria e ordena um array com números
  const numbers = [...Array(dif * dif - 1).keys()].sort(
    () => Math.random() - 0.5
  );

  for (let i = 0; i <= dif * dif - 2; i++) {
    //cria uma tag
    const cell = document.createElement('div');
    const value = numbers[i] + 1;
    cell.className = 'cell';
    //escreve o valor na célula
    cell.innerHTML = value;
    //posição na linha
    const left = i % dif;
    //posição na coluna
    const top = (i - left) / dif;
    //escreve a célula no array
    cells.push({
      value: value,
      left: left,
      top: top,
      element: cell,
    });
    //muda as coordenadas
    cell.style.left = `${left * cellSize}px`;
    cell.style.top = `${top * cellSize}px`;

    //adiciona uma célula ao campo field
    field.append(cell);

    //quando o manipulador de eventos é acionado, a função é acionada
    cell.addEventListener('click', () => {
      move(i);
    });
  }

  //coordenadas de uma célula vazia
  const empty = {
    value: dif * dif,
    top: dif - 1,
    left: dif - 1,
  };
  //adiciona uma célula vazia ao array
  cells.push(empty);

  function move(index) {
    //pega a célula
    const cell = cells[index];

    //pega a diferença na coordenada
    const leftDiff = Math.abs(empty.left - cell.left);
    const topDiff = Math.abs(empty.top - cell.top);

    //se a diferença for maior que um, então a célula não é adjacente
    if (leftDiff + topDiff > 1) {
      return;
    }
    moveCounter++;
    //mover para a célula anterior
    cell.element.style.left = `${empty.left * cellSize}px`;
    cell.element.style.top = `${empty.top * cellSize}px`;

    //coordenadas de uma célula vazia
    const emptyLeft = empty.left;
    const emptyTop = empty.top;

    //anota as coordenadas da célula atual
    empty.left = cell.left;
    empty.top = cell.top;

    //passa os valores gravados para a célula
    cell.left = emptyLeft;
    cell.top = emptyTop;

    //o método each verifica a condição de cada elemento
    const isFinished = cells.every((cell) => {
      //verifica a coordenada correta
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
//resultados
function startResults() {
  const moveContainer = document.querySelector('.move-text');
  const timeContainer = document.querySelector('.time-text');
  moveContainer.innerHTML = '' + moveCounter;
  timeContainer.innerHTML = '' + gameTime;
  //atualiza o contêiner de etapas
  const movesUpdate = setInterval(() => {
    moveContainer.innerHTML = '' + moveCounter;
  }, 100);
  //atualiza o contêiner de tempo
  const gameInterval = setInterval(() => {
    timeContainer.innerHTML = '' + ++gameTime;
  }, 1000);
}
