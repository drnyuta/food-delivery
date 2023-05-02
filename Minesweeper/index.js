const grid = document.getElementById("grid");
let lockGame = false;
const testMode = false;
generateGrid();

//Generating a grid 10 * 10
function generateGrid() {
  lockGame = false;
  grid.innerHTML = "";
  for (let i = 0; i < 10; i++) {
    row = grid.insertRow(i);
    for (let j = 0; j < 10; j++) {
      cell = row.insertCell(j);
      cell.onclick = function () {
        init(this);
      };
      let mine = document.createAttribute("mine");
      mine.value = false;
      cell.setAttributeNode(mine);
    }
  }
  generateMines();
}

// Generate Mines
function generateMines() {
  for (let i = 0; i < 20; i++) {
    let row = Math.floor(Math.random() * 10);
    let col = Math.floor(Math.random() * 10);
    let cell = grid.rows[row].cells[col];
    cell.setAttribute("mine", "true");
    if (testMode) {
      cell.innerHTML = "X";
    }
  }
}

//Highlight mines
function revealMines() {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      let cell = grid.rows[i].cells[j];
      if (cell.getAttribute("mine") === "true") {
        cell.className = "mine";
        let mineImage = document.createElement("img");
        mineImage.src = "penis.svg";
        mineImage.className = "pen";
        cell.innerHTML = "";
        cell.appendChild(mineImage);
      }
    }
  }
}

function checkGameComplete() {
  let gameComplete = true;
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      if (
        grid.rows[i].cells[j].getAttribute("mine") === "false" &&
        grid.rows[i].cells[j].innerHTML === ""
      ) {
        gameComplete = false;
      }
    }
  }
  if (gameComplete) {
    alert("Good girl!");
    revealMines();
  }
}

function init(cell) {
  // Check if dame completed or no
  if (lockGame) {
    return;
  } else {
    //Check user clicked on mine
    if (cell.getAttribute("mine") == "true") {
      revealMines();
      lockGame = true;
    } else {
      cell.className = "active";
      //Display number of mines around cell
      let mineCount = 0;
      let cellRow = cell.parentNode.rowIndex;
      let cellCol = cell.cellIndex;
      for (
        let i = Math.max(cellRow - 1, 0);
        i <= Math.min(cellRow + 1, 9);
        i++
      ) {
        for (
          let j = Math.max(cellCol - 1, 0);
          j <= Math.min(cellCol + 1, 9);
          j++
        ) {
          if (grid.rows[i].cells[j].getAttribute("mine") === "true") {
            mineCount++;
          }
        }
      }
      cell.innerHTML = mineCount;
      if (mineCount === 0) {
        //if cell don't have mine
        for (
          let i = Math.max(cellRow - 1, 0);
          i <= Math.min(cellRow + 1, 9);
          i++
        ) {
          for (
            let j = Math.max(cellCol - 1, 0);
            j <= Math.min(cellCol + 1, 9);
            j++
          ) {
            if (grid.rows[i].cells[j].innerHTML === "") {
              init(grid.rows[i].cells[j]);
            }
          }
        }
      }
      checkGameComplete();
    }
  }
}
