let newGameButton = document.getElementById('game');
let newButtonClicked = true;
newGameButton.onclick = start;
let moveCounter = 0;
let gameTime = 0;
let dif;
document.getElementById('full-image-container').style.display = 'none';

function start() {
  let dif;
  if (document.getElementById('game-difficulty-img').checked) {
    dif = document.getElementById('game-difficulty-img').value;
  } else if (document.getElementById('game-difficulty-num').checked) {
    dif = document.getElementById('number-selection').value;
  }
  if (newButtonClicked) {
    startGame(dif);
    field.style.display = 'block';
    startResults();
    newButtonClicked = false;
    newGameButton.innerHTML = 'Restart';
    difficulty.style.display = 'none';
    result.style.display = 'block';
    document.getElementById('slide').style.display = 'none';
    document.getElementById('child1').style.display = 'none';
    document.getElementById('result').style.display = 'block';

  } else {
    window.location.reload();
  }
}
function startGame(dif) {
  document.getElementById('full-image-container').style.display = 'block';
  const field = document.querySelector('.field');
  const cellSize = 100;
  const cells = [];
  const numbers = [...Array(dif * dif - 1).keys()].sort(
    () => Math.random() - 0.5
  );
  const imageSelection = document.getElementById('image-selection');
  const selectedImage = 'url("./img/' + imageSelection.value + '")';
  for (let i = 0; i <= dif * dif - 2; i++) {
    const cell = document.createElement('div');
    const value = numbers[i] + 1;
    cell.className = 'cell';
    if (dif == 4 && document.getElementById('game-difficulty-img').checked) {
      let selectedImageId = '' + imageSelection.value; // Cria o ID dinâmico
      let selectedImageElement = document.getElementById(selectedImageId); // Obtém o elemento com o ID
      if (selectedImageElement) {
        // Verifica se o elemento existe
        selectedImageElement.style.display = 'block'; // Aplica display: block
      } else {
        console.log('Elemento não encontrado: ' + selectedImageId);
      }

      const x = ((value - 1) % dif) * cellSize;
      const y = Math.floor((value - 1) / dif) * cellSize;
      cell.style.backgroundImage = selectedImage;
      cell.style.backgroundPositionX = `-${x}px`;
      cell.style.backgroundPositionY = `-${y}px`;
    } else {
      cell.innerHTML = value;
    }
    const left = i % dif;
    const top = (i - left) / dif;
    cells.push({
      value: value,
      left: left,
      top: top,
      element: cell,
    });
    cell.style.left = `${left * cellSize}px`;
    cell.style.top = `${top * cellSize}px`;
    field.append(cell);
    cell.addEventListener('click', () => {
      move(i);
    });
  }
  const empty = {
    value: dif * dif,
    top: dif - 1,
    left: dif - 1,
  };
  cells.push(empty);
  function move(index) {
    const cell = cells[index];
    const leftDiff = Math.abs(empty.left - cell.left);
    const topDiff = Math.abs(empty.top - cell.top);
    if (leftDiff + topDiff > 1) {
      return;
    }
    moveCounter++;
    cell.element.style.left = `${empty.left * cellSize}px`;
    cell.element.style.top = `${empty.top * cellSize}px`;
    const emptyLeft = empty.left;
    const emptyTop = empty.top;
    empty.left = cell.left;
    empty.top = cell.top;
    cell.left = emptyLeft;
    cell.top = emptyTop;
    const isFinished = cells.every((cell) => {
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
    }
  }
}
function startResults() {
  const moveContainer = document.querySelector('.move-text');
  const timeContainer = document.querySelector('.time-text');
  moveContainer.innerHTML = '' + moveCounter;
  timeContainer.innerHTML = '' + gameTime;
  const movesUpdate = setInterval(() => {
    moveContainer.innerHTML = '' + moveCounter;
  }, 100);
  const gameInterval = setInterval(() => {
    timeContainer.innerHTML = '' + ++gameTime;
  }, 1000);
}

let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName('mySlides');
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none';
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  slides[slideIndex - 1].style.display = 'block';
  setTimeout(showSlides, 3000);
}
function encontrarPosicaoCorreta(valor) {
  // Percorra todas as células do quebra-cabeça resolvido
  for (let i = 0; i < dif * dif; i++) {
    if (cells[i].value === valor) {
      return i;
    }
  }
  return -1;
}

function moverParaPosicaoCorreta(index, posicaoCorreta) {
  // Troque a peça na posição 'index' com a peça na 'posicaoCorreta'
  const temp = cells[index];
  cells[index] = cells[posicaoCorreta];
  cells[posicaoCorreta] = temp;

  // Atualize a posição das peças no DOM
  cells[index].element.style.left = `${cells[index].left * cellSize}px`;
  cells[index].element.style.top = `${cells[index].top * cellSize}px`;
  cells[posicaoCorreta].element.style.left = `${
    cells[posicaoCorreta].left * cellSize
  }px`;
  cells[posicaoCorreta].element.style.top = `${
    cells[posicaoCorreta].top * cellSize
  }px`;
}

function encontrarPosicaoCorreta(valor) {
  // Percorra todas as células do quebra-cabeça resolvido
  for (let i = 0; i < dif * dif; i++) {
    if (cells[i].value === valor) {
      return i;
    }
  }
  return -1;
}

function moverParaPosicaoCorreta(index, posicaoCorreta) {
  // Troque a peça na posição 'index' com a peça na 'posicaoCorreta'
  const temp = cells[index];
  cells[index] = cells[posicaoCorreta];
  cells[posicaoCorreta] = temp;

  // Atualize a posição das peças no DOM
  cells[index].element.style.left = `${cells[index].left * cellSize}px`;
  cells[index].element.style.top = `${cells[index].top * cellSize}px`;
  cells[posicaoCorreta].element.style.left = `${
    cells[posicaoCorreta].left * cellSize
  }px`;
  cells[posicaoCorreta].element.style.top = `${
    cells[posicaoCorreta].top * cellSize
  }px`;
}

function resolverAutomaticamente() {
  let dif;
  // Percorra todas as peças do quebra-cabeça
  for (let i = 0; i < dif * dif; i++) {
    // Encontre a posição correta da peça atual no quebra-cabeça resolvido
    const posicaoCorreta = encontrarPosicaoCorreta(cells[i].value);

    // Mova a peça para a posição correta
    moverParaPosicaoCorreta(i, posicaoCorreta);
  }
}

let resolverButton = document.getElementById('resolver');
resolverButton.onclick = resolverAutomaticamente;
