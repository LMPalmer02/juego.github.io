document.addEventListener('DOMContentLoaded', () => {
  const gameContainer = document.getElementById('game-container');
  const h3Element = document.querySelector("h3");
  const shipPositions = generateShipPositions();

  var startButton = document.getElementById("start-button"); // Crea el botón de comenzar
  var music = document.getElementById("music"); // Música

  startButton.addEventListener("click", () => {
    h3Element.style.display = "none"; // Oculta las instrucciones cuando comienza el juego
  });

  startButton.addEventListener("click", function() {
      startButton.style.display = "none"; // Ocultar el botón
      music.play(); // Reproducir la música
      iniciarJuego(); // Función que inicia el juego
  });

  // Crear la cuadrícula del juego después de darle a comenzar
  startButton.addEventListener("click", function() {
  for (let i = 0; i < 100; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    cell.addEventListener('click', () => handleCellClick(i));
    gameContainer.appendChild(cell);
}  

// Colocar los barcos en la cuadrícula
shipPositions.forEach(index => {
    const cell = gameContainer.children[index];
    cell.classList.add('ship');
});
      startButton.style.display = "none";
      iniciarJuego(); // Función que inicia el juego
  });

  function iniciarJuego() {
  }

  // Función para generar una posición aleatoria para un barco en la misma fila o columna
  function generateShipPosition(length, orientation) {
      const positions = [];
      const start = Math.floor(Math.random() * (orientation === 'horizontal' ? 10 - length : 10) * 10);
    
      for (let i = 0; i < length; i++) {
        const position = start + (orientation === 'horizontal' ? i : i * 10);
        positions.push(position);
      }
      return positions;
    }
  
  function overlap(existingShips, newShip) {
      for (const ship of existingShips) {
        for (const cell of newShip) {
          if (ship === cell) {
            return true; // Hay superposición
          }
        }
      }
      return false; // No hay superposición
    }

 
// Variable para controlar el temporizador
let canClick = true;

// Función para manejar el clic en una celda
function handleCellClick(index) {
  const cell = gameContainer.children[index];

  if (!canClick) {
    alert('¡Estas recargando munición! Debes esperar 3 segundos antes de volver a disparar');
    return; // Detener la ejecución si no se puede hacer clic
  }

  cell.innerText = 'X';
  canClick = false; // Deshabilitar el clic

  setTimeout(() => {
    canClick = true; // Habilitar el clic después de 3 segundos
  }, 3000);

  if (shipPositions.includes(index)) {
    cell.classList.add('ship-hit');
    alert('¡Tocado! ¡Has golpeado un barco!');

    if (isAllShipsSunk()) {
      alert('¡Enhorabuena! ¡Has hundido todos los barcos!');
    }
  } else {
    cell.classList.add('water-hit');
    alert('¡Agua! Prueba otra vez');
  }
}

function validateShipPosition(existingShips, newShip) {
  const start = newShip[0];
  const end = newShip[newShip.length - 1];

  if (Math.floor(start / 10) !== Math.floor(end / 10) && start % 10 !== end % 10) {
    return false; // El barco se parte o se corre a otras filas o columnas
  }

  return !overlap(existingShips, newShip);
}

  // Función para generar posiciones aleatorias para los barcos
  function generateShipPositions() {
      const positions = [];
      const shipLengths = [2, 2, 3, 4,];
    
      for (const length of shipLengths) {
        let orientation;
        let position;
    
        do {
          orientation = Math.random() < 0.5 ? 'horizontal' : 'vertical';
          position = generateShipPosition(length, orientation);
        } while (overlap(positions, position) || !validateShipPosition(positions, position));
    
        positions.push(...position);
      }
    
      return positions;
    }
   
  // Función para verificar si todos los barcos han sido hundidos
  function isAllShipsSunk() {
      return shipPositions.every(index => {
          const cell = gameContainer.children[index];
          return cell.classList.contains('ship-hit');
      });
  }
});

