
function calculateTrappedWater(heights) {
    let n = heights.length;
    if (n === 0) return 0;

    let leftMax = Array(n).fill(0);
    let rightMax = Array(n).fill(0);
    let water = 0;

    leftMax[0] = heights[0];
    for (let i = 1; i < n; i++) {
        leftMax[i] = Math.max(leftMax[i - 1], heights[i]);
    }

    rightMax[n - 1] = heights[n - 1];
    for (let i = n - 2; i >= 0; i--) {
        rightMax[i] = Math.max(rightMax[i + 1], heights[i]);
    }

    for (let i = 0; i < n; i++) {
        water += Math.max(0, Math.min(leftMax[i], rightMax[i]) - heights[i]);
    }

    return water;
}

function visualizeWater() {
    let input = document.getElementById("heightInput").value;
    let heights = input.split(",").map(Number);
    let maxHeight = Math.max(...heights);
    let output = document.getElementById("output");
    output.innerHTML = "";

    let gridContainer = document.createElement("div");
    gridContainer.classList.add("grid-container");

    let leftMax = Array(heights.length).fill(0);
    let rightMax = Array(heights.length).fill(0);

    leftMax[0] = heights[0];
    for (let i = 1; i < heights.length; i++) {
        leftMax[i] = Math.max(leftMax[i - 1], heights[i]);
    }

    rightMax[heights.length - 1] = heights[heights.length - 1];
    for (let i = heights.length - 2; i >= 0; i--) {
        rightMax[i] = Math.max(rightMax[i + 1], heights[i]);
    }

    for (let i = 0; i < heights.length; i++) {
        let column = document.createElement("div");
        column.classList.add("block");
        column.style.height = `${maxHeight * 30}px`;

        for (let j = 0; j < maxHeight; j++) {
            let cell = document.createElement("div");
            cell.classList.add("cell");

            if (j < heights[i]) {
                cell.classList.add("filled");
            } else if (j < Math.min(leftMax[i], rightMax[i])) {
                cell.classList.add("water");
                cell.style.animationDelay = `${i * 100}ms`; 
            }

            column.appendChild(cell);
        }
        gridContainer.appendChild(column);
    }

    output.appendChild(gridContainer);
    // output.insertAdjacentHTML(
    //     "beforeend",
    //     `<h3>${calculateTrappedWater(heights)} Units</h3>`
    // );
}
