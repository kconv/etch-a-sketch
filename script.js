const canvasSize = 500;
const grid = document.getElementById('grid');
const slider = document.getElementById('size-slider');
const colorPicker = document.getElementById('color-picker');
let colorPickerWrapper = document.getElementById("color-picker-wrapper");
let currentColor = '#000000';
let currentMode = 'normal';

function setColor(newColor) {
	currentColor = newColor;
}

function setMode(newMode) {
	currentMode = newMode;
}

function createGrid() {
	clearGrid();
	const cellSize = canvasSize / slider.value;
	grid.setAttribute('style', `grid-template-columns: repeat(${slider.value}, ${cellSize}px);`);
	dimensions.textContent = `${slider.value} x ${slider.value}`;

	for (let i = 0; i < slider.value * slider.value; i++) {
		let cell = document.createElement('div');
		grid.appendChild(cell).className = `cell ${i}`;
	}
	drawCells()
}

function clearGrid() {
	while (grid.firstChild) {
		grid.removeChild(grid.firstChild);
	}
}

function drawCells() {
	const cells = document.querySelectorAll('.cell');

	cells.forEach((cell) => {
		cell.addEventListener('mouseover', (e) => {
			switch (currentMode) {
				case 'rave':
					let r = Math.floor(Math.random() * 256);
					let g = Math.floor(Math.random() * 256);
					let b = Math.floor(Math.random() * 256);
					currentColor = `rgb(${r}, ${g}, ${b})`;
					break;
				case 'erase':
					currentColor = '#ffffff'
					break;
				default:
					currentColor = colorPicker.value;
					break;
				
			}
			e.target.style.backgroundColor = currentColor;
			e.target.style.opacity = 1;
		});
	});
}

function changeColor() {
	currentMode = 'normal';
	currentColor = colorPicker.value;
}

function raveMode() {
	currentMode = 'rave'
}

function eraseCells() {
	currentMode = 'erase';
}

function clearCells() {
	const cells = document.querySelectorAll('.cell');

	cells.forEach((cell) => {
		cell.style.opacity = 0;
	});
}

createGrid();
colorPicker.addEventListener('change', () => {
	currentColor = colorPicker.value;
});
