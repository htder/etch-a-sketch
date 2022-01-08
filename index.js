let initialGridSize = 16;

const gridContainer = document.createElement("div");

const resetButton = document.querySelector(".reset");
const flexContainer = document.querySelector(".flex-container");
const slider = document.querySelector(".slider");
const sliderDisplayValue = document.querySelector(".demo");

const sizeContainer = document.querySelector(".sizeContainer");
sliderDisplayValue.innerHTML = `${slider.value} x ${slider.value}`;

gridContainer.classList.add("grid-container");

createGrid(initialGridSize);

resetButton.addEventListener("click", function (e) {
  clearCellsDelay();
});

sizeContainer.addEventListener("mouseup", function (e) {
  while (gridContainer.firstChild) {
    gridContainer.removeChild(gridContainer.lastChild);
  }
  createGrid(slider.value);
});

sizeContainer.addEventListener("input", function (e) {
  sliderDisplayValue.innerHTML = `${slider.value} x ${slider.value}`;
  while (gridContainer.firstChild) {
    gridContainer.removeChild(gridContainer.lastChild);
  }
});

function createGrid(gridSize) {
  const dimension = `${960 / gridSize}px`;
  for (let i = 0; i < gridSize * gridSize; i++) {
    const gridItem = document.createElement("div");
    gridItem.style.width = dimension;
    gridItem.style.height = dimension;
    gridItem.classList.add("colorCell0");

    gridContainer.appendChild(gridItem);
  }
  gridContainer.style.gridTemplateRows = `repeat(${gridSize}, ${dimension})`;
  gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, ${dimension})`;
  flexContainer.append(gridContainer);

  cellsListener();
}

function cellsListener() {
  const gridCells = document.querySelectorAll(".grid-container div");
  gridCells.forEach((cell) =>
    cell.addEventListener("mouseenter", function (e) {
      const number = +/\d+/.exec(cell.classList[0])[0];
      if (number == 10) return;
      cell.classList.remove(`colorCell${number}`);
      cell.classList.add(`colorCell${number + 2}`);
    })
  );
}

const wait = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

function clearCellsDelay() {
  const gridCells = Array.from(
    document.querySelectorAll(".grid-container div")
  );

  gridContainer.classList.add("shakeContainer");
  async function slowLoop() {
    gridCells.forEach((cell) => {
      cell.className = "colorCell0";
    });

    await wait(500);
    gridContainer.classList.remove("shakeContainer");
  }
  slowLoop();
}
