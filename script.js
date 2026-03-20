console.log("Hello world!");

// Load the data from memory or create a new array
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
let total = 0;
if (localStorage.getItem('theme') === 'dark') {     // Load the theme
    document.body.classList.add('darkMode');
}

// Switching between expense and income
let currentTab = 'expense';

function switchTab(type){
    currentTab = type;

    // Αλλάζουμε την εμφάνιση των κουμπιών
    const btns = document.querySelectorAll('.tab-btn');
    btns.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    // Change the total amount text

    renderExpenses();
}

function toggleTheme() {
    // 2. Toggle the class on the <body> tag
    document.body.classList.toggle('darkMode');

    // 3. Save the preference
    if (document.body.classList.contains('darkMode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
}

// Draw the expenses to the screen
function renderExpenses(){
    const list = document.getElementById("expenseList");
    const totalExpenses = document.getElementById("totalExpenses");

    list.innerHTML = ''; // Clears the list
    let tabTotal = 0;

    const filteredItems = expenses.filter(item => item.type == currentTab);

    filteredItems.forEach((item, index) => {
        const listItem = document.createElement('li');
        // Αν είναι έσοδο, ίσως θέλουμε πράσινο χρώμα, αν είναι έξοδο κόκκινο
        const color = item.type === 'income' ? '#4CD964' : '#FF3B30';
        
        listItem.innerHTML = `
            <span style="border-left: 5px solid ${color}; padding-left: 10px;">
                ${item.name} -- ${Number(item.amount).toFixed(2)}€
            </span>
            <button onclick="deleteExpense(${index})"}>X</button>
        `;
        list.appendChild(listItem);
        tabTotal += Number(item.amount);
    });

    totalExpenses.innerText = `${Number(tabTotal).toFixed(2)}€`;

    localStorage.setItem('expenses', JSON.stringify(expenses)); // save!! (saves to browser's Filing Cabinet)
}

function addTransaction() {
    const nameInput = document.getElementById("nameInput");
    const amountInput = document.getElementById("amountInput");

    // don't do anything if the inputs are invalid
    if (nameInput.value == '' || amountInput.value == '') return;

    // add content to the array 
    expenses.push({
        name: nameInput.value,
        amount: amountInput.value,
        type: currentTab,
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
