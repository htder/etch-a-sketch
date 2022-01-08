let initialGridSize = 16;

const gridContainer = document.createElement("div");

const resetButton = document.querySelector(".reset");
const sizeButton = document.querySelector(".changeSize");
const flexContainer = document.querySelector(".flex-container");

gridContainer.classList.add("grid-container");

createGrid(initialGridSize);

resetButton.addEventListener("click", function (e) {
  clearCellsDelay();
});

sizeButton.addEventListener("click", function (e) {
  let input = document.getElementById("input").value;
  if (input < 10 || input > 100) {
    document.getElementById("input").value = "Enter Valid Number";
    return;
  }
  initialGridSize = input;
  while (gridContainer.firstChild) {
    gridContainer.removeChild(gridContainer.lastChild);
  }
  createGrid(input);
  document.getElementById("input").value = "";
});

function createGrid(gridSize) {
  const dimension = `${960 / gridSize}px`;
  for (let i = 0; i < gridSize * gridSize; i++) {
    const gridItem = document.createElement("div");
    gridItem.style.width = dimension;
    gridItem.style.height = dimension;

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
      cell.classList.add("colorCell");
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
      cell.classList.remove("colorCell");
    });

    await wait(350);
    gridContainer.classList.remove("shakeContainer");
  }
  slowLoop();
}
