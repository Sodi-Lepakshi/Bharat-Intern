const transactionForm = document.getElementById('transaction-form');
const type = document.getElementById('type');
const amount = document.getElementById('amount');
const transactionsList = document.getElementById('transactions-list');

transactionForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const transaction = {
        type: type.value,
        amount: amount.value,
    };

    const res = await fetch('http://localhost:5000/api/transactions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(transaction),
    });

    const data = await res.json();
    addTransactionDOM(data);
    amount.value = '';
});

async function getTransactions() {
    const res = await fetch('http://localhost:5000/api/transactions');
    const data = await res.json();
    data.forEach(addTransactionDOM);
}

function addTransactionDOM(transaction) {
    const item = document.createElement('li');
    item.classList.add(transaction.type === 'income' ? 'income' : 'expense');
    item.innerHTML = `
        ${transaction.type === 'income' ? '+' : '-'}$${transaction.amount}
    `;
    item.style.opacity = 0;
    transactionsList.appendChild(item);
    setTimeout(() => {
        item.style.opacity = 1;
    }, 0);
}

getTransactions();
