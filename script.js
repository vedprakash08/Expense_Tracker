const transactions = [];

const list=document.getElementById("transactionList");
const status= document.getElementById("status");

const income= document.getElementById("income");
const expense=document.getElementById("expense");
const balance= document.getElementById("balance");

const form=document.getElementById("transactionForm");
form.addEventListener('submit', addTransaction);

const formatter = new Intl.NumberFormat('en-IN',{
    style:'currency', currency:'INR',signDisplay: 'always'
});


function updateList(){
    const incomeTotal= transactions.filter((x)=> x.type === "income").reduce((total,x)=> parseFloat(total)+parseFloat(x.amount),0);

    const expenseTotal= transactions.filter((x)=> x.type === "expense").reduce((total,x)=> parseFloat(total)+parseFloat(x.amount),0);

    const balanceTotal= incomeTotal-expenseTotal;

    balance.textContent= formatter.format(balanceTotal).substring(1);
    income.textContent= formatter.format(incomeTotal);
    expense.textContent= formatter.format(expenseTotal*-1);
}
function makeList(){
    list.innerHTML="";

    if(transactions.length===0){
        status.textContent = "No transactions.";
        return;
    }
    else{
        status.textContent = "";
    }
    transactions.forEach((transaction)=>{

        const sign= 'income' === transaction.type? +1:-1;
        const node=document.createElement("li");
        node.innerHTML = `
        <div class="name">
            <h4>${transaction.name}</h4>
            <p>${new Date(transaction.date).toLocaleDateString()}</p>
        </div>
        <div class ="amount">${formatter.format(transaction.amount *sign)}</div>

        <div class ="action">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" onclick="deleteTrans(${transaction.id})">
            <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
        </div>
        `

        list.appendChild(node);
    });
     
}

makeList();
updateList();
function deleteTrans(id){
    const index = transactions.findIndex((x) => {
        if(x.id === id)
        return x;
    });
    transactions.splice(index,1);
    makeList();
    updateList();
}

function addTransaction(e){
    e.preventDefault();
    const formData= new FormData(this);
    transactions.push({
        id: transactions.length+1,
        name: formData.get("name"),
        amount: parseFloat(formData.get("amount")),
        date: new Date(formData.get("date")),
        type: null === formData.get("type") ? "income":"expense",
    });

    this.reset();
    updateList();
    makeList();
}

