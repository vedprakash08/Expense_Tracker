const transactions = [
    {
        id:1,
        name: 'salary',
        amount:'5000',
        date : new Date(),
        type:'income'
    },
    {
        id:2,
        name: 'haircut',
        amount:'300',
        date : new Date(),
        type:'expense'
    },
    {
        id:3,
        name: 'picnic',
        amount:'1000',
        date : new Date(),
        type:'expense'
    }
];

const list=document.getElementById("transactionList");
const status= document.getElementById("status");


const formatter = new Intl.NumberFormat('en-IN',{
    style:'currency', currency:'INR',signDisplay: 'always'
});
function makeList(){
    list.innerHTML="";

    if(transactions.length===0){
        status.textContent = "No transactions.";
        return;
    }
    transactions.forEach((transaction)=>{
        const node=document.createElement("li");
        node.innerHTML = `
        <div class="name">
            <h4>${transaction.name}</h4>
            <p>${new Date(transaction.date).toLocaleDateString()}</p>
        </div>
        <div class ="amount">${formatter.format(transaction.amount)}</div>

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

function deleteTrans(id){
    const index = transactions.findIndex((x) => {
        if(x.id === id)
        return x;
    });
    console.log(index+1)
    transactions.splice(index,1);
    makeList();
}