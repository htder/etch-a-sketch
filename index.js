const initialGridSize = 16;

const gridContainer = document.createElement("div");

const resetButton = document.querySelector(".reset");
const sizeButton = document.querySelector(".changeSize");
const flexContainer = document.querySelector(".flex-container");

gridContainer.classList.add("grid-container");

createGrid(initialGridSize);

resetButton.addEventListener("click", function (e) {
  clearCells();
});

sizeButton.addEventListener("click", function (e) {
  let input = document.getElementById("input").value;
  //   if (input < 10 || input > 100) return;
  gridSize = input;
  while (gridContainer.firstChild) {
    gridContainer.removeChild(gridContainer.lastChild);
  }
  createGrid(input);
});

function clearCells() {
  const gridCells = document.querySelectorAll(".grid-container div");
  gridCells.forEach((cell) => cell.classList.remove("colorCell"));
}

function createGrid(gridSize) {
  for (let i = 0; i < gridSize * gridSize; i++) {
    const gridItem = document.createElement("div");
    gridItem.textContent = "";
    gridItem.style.width = `${1200 / gridSize}px`;
    gridItem.style.height = `${1200 / gridSize}px`;

    gridContainer.appendChild(gridItem);
  }
  flexContainer.append(gridContainer);
  gridContainer.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
  gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;

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
