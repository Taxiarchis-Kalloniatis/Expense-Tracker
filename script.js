console.log("Hello world!");

// Load the data from memory or create a new array
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
let total = 0;

// Draw the expenses to the screen
function renderExpenses(){
    const list = document.getElementById("expenseList");
    const totalExpenses = document.getElementById("totalExpenses");

    list.innerHTML = ''; // Clears the list
    total = 0;

    expenses.forEach((expense, index) => {
        const item = document.createElement('li');
        item.innerHTML = `
            <span>${expense.name} -- ${Number(expense.amount).toFixed(2)}€</span>
            <button onclick="deleteExpense(${index})" style="background:#FF3B30">X</button>
        `;
        list.appendChild(item);
        total += Number(expense.amount);
    })

    totalExpenses.innerText = `${total.toFixed(2)}€`;

    localStorage.setItem('expenses', JSON.stringify(expenses)); // save!! (saves to browser's Filing Cabinet)
}

function addExpense() {
    const nameInput = document.getElementById("nameInput");
    const amountInput = document.getElementById("amountInput");

    // don't do anything if the inputs are invalid
    if (nameInput.value == '' || amountInput.value == '') return;

    // add content to the array 
    expenses.push({
        name: nameInput.value,
        amount: amountInput.value
    });

    nameInput.value = '';
    amountInput.value = '';
    renderExpenses();
}

function deleteExpense(index){
    expenses.splice(index, 1);
    renderExpenses();
}

renderExpenses();



/*
function addExpense() {
    //console.log("Adding expense.")
    // Getting the elements we need
    const nameInput = document.getElementById("nameInput");
    const amountInput = document.getElementById("amountInput");
    const list = document.getElementById("expenseList");
    const totalExpenses = document.getElementById("totalExpenses");

    // If the inputs are empty/invalid do not add
    if (nameInput.value == '' || amountInput.value == ''){
        alert("Invalid input!");
        return;
    }

    // Save the item name and amount
    const itemName = nameInput.value;
    const itemAmount = Number(amountInput.value);

    // Create a new item for the list
    const item = document.createElement("li");

    // Create text span for the item
    const span = document.createElement("span");
    span.innerText = `${itemName} -- ${itemAmount}€`;

    // Delete button for the item
    const delButton = document.createElement("button");
    delButton.innerText = 'X';
    delButton.style.backgroundColor = '#FF3B30';
    delButton.style.padding = "5px 10px";

    delButton.onclick = function(){
        total -= itemAmount;
        totalExpenses.innerText = `${total.toFixed(2)}€`;
        list.removeChild(item);
    };

    // Add button and span to item
    item.appendChild(span);
    item.appendChild(delButton);

    // Add the item to the list and update total expenses
    list.appendChild(item);
    total += itemAmount;
    totalExpenses.innerHTML = `${total.toFixed(2)}€`;

    // Clear inputs
    nameInput.value = '';
    amountInput.value = '';
}*/
