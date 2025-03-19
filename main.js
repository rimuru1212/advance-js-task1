const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const btn3 = document.getElementById("btn3");
const btn4 = document.getElementById("btn4");
const btn5 = document.getElementById("btn5");
const btn6 = document.getElementById("btn6"); // Sort order toggle

const tbl = document.getElementById("tblNumbers");
let total = 0;
let numbersArr = [];
let isAscending = true;

function insertNumber() {
    const txtNumber = document.getElementById("txtNum").value;
    let num;
    let regex = /^[0-9]+$/;

    if (txtNumber.match(regex)) {
        num = parseInt(txtNumber);
        numbersArr.push(num);
        console.log(numbersArr);
        document.getElementById("txtNum").value = "";
    } else {
        alert("Please input a positive number");
        document.getElementById("txtNum").value = "";
        return;
    }
    sortNumbers();
}

btn1.addEventListener("click", insertNumber);
document.getElementById("txtNum").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        insertNumber();
    }
});

btn2.addEventListener("click", () => {
    document.getElementById("txtNum").value = "";
});

btn3.addEventListener("click", () => {
    numbersArr = [];
    total = 0;
    while (tbl.hasChildNodes()) {
        tbl.removeChild(tbl.firstChild);
    }
    document.getElementById("btn4").style.display = "none";
});

btn4.addEventListener("click", () => {
    const trTotal = document.createElement("tr");
    const tdTotalLabel = document.createElement("td");
    const tdTotalValue = document.createElement("td");

    trTotal.style.height = "30px";
    tdTotalLabel.style.fontWeight = "bold";
    tdTotalLabel.innerHTML = "TOTAL";
    tdTotalValue.style.textDecoration = "underline";
    tdTotalValue.innerHTML = total;

    trTotal.appendChild(tdTotalLabel);
    trTotal.appendChild(tdTotalValue);
    tbl.appendChild(trTotal);
});

btn5.addEventListener("click", () => {
    if (numbersArr.length === 0) {
        alert("No numbers entered.");
        return;
    }
    const highestNumber = Math.max(...numbersArr);
    const lowestNumber = Math.min(...numbersArr);

    const trHighestLowest = document.createElement("tr");
    const tdHighestLabel = document.createElement("td");
    const tdHighestValue = document.createElement("td");
    const tdLowestLabel = document.createElement("td");
    const tdLowestValue = document.createElement("td");

    trHighestLowest.style.height = "30px";
    tdHighestLabel.style.fontWeight = "bold";
    tdHighestLabel.innerHTML = "HIGHEST";
    tdHighestValue.style.textDecoration = "underline";
    tdHighestValue.innerHTML = highestNumber;
    tdLowestLabel.style.fontWeight = "bold";
    tdLowestLabel.innerHTML = "LOWEST";
    tdLowestValue.style.textDecoration = "underline";
    tdLowestValue.innerHTML = lowestNumber;

    trHighestLowest.appendChild(tdHighestLabel);
    trHighestLowest.appendChild(tdHighestValue);
    trHighestLowest.appendChild(tdLowestLabel);
    trHighestLowest.appendChild(tdLowestValue);
    tbl.appendChild(trHighestLowest);
});

btn6.addEventListener("click", () => {
    isAscending = !isAscending;
    sortNumbers();
});

function sortNumbers() {
    numbersArr.sort((a, b) => (isAscending ? a - b : b - a));
    iterateNumbers();
}

function deleteNumber(i) {
    numbersArr.splice(i, 1);
    sortNumbers();
}

function editNumber(i) {
    const editTxt = prompt("Enter new number: ", numbersArr[i]);
    const regex = /^[0-9]+$/;
    
    if (editTxt == null || editTxt == "") {
        alert("You did not input a new value!");
    } else if (editTxt.match(regex)) {
        numbersArr[i] = parseInt(editTxt);
        sortNumbers();
    } else {
        alert("You did not input a valid number!");
    }
}

function iterateNumbers() {
    while (tbl.hasChildNodes()) {
        tbl.removeChild(tbl.firstChild);
    }
    if (numbersArr.length > 0) {
        total = 0;
        numbersArr.forEach((num, i) => {
            const tr = document.createElement("tr");
            const td1 = document.createElement("td");
            const td2 = document.createElement("td");
            const td3 = document.createElement("td");
            const td4 = document.createElement("td");
            const btnDelete = document.createElement("button");
            const btnEdit = document.createElement("button");

            td1.style.width = "70px";
            td1.innerHTML = num;
            td2.style.width = "70px";
            td2.style.color = num % 2 === 0 ? "green" : "blue";
            td2.innerHTML = num % 2 === 0 ? "EVEN" : "ODD";
            btnDelete.setAttribute("onclick", `deleteNumber(${i})`);
            btnDelete.innerHTML = "Remove";
            btnEdit.setAttribute("onclick", `editNumber(${i})`);
            btnEdit.innerHTML = "Edit";

            td3.appendChild(btnDelete);
            td4.appendChild(btnEdit);
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            tbl.appendChild(tr);
            total += num;
        });
        document.getElementById("btn4").style.display = "inline";
        document.getElementById("btn5").style.display = "inline";
        document.getElementById("btn6").style.display = "inline";
    } else {
        total = 0;
        document.getElementById("btn4").style.display = "none";
    }
}   