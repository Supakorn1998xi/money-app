const API_URL="https://script.google.com/macros/s/AKfycbwqqhi9c47fwoqlZ6sABBMBzPntzPV1ANP6RfMClCdKIG3ixx04mXNBfo6ST7ufImCtTQ/exec"

let chart

function loadData(){

fetch(API_URL)
.then(res=>res.json())
.then(data=>{

renderTotal(data)
renderChart(data)
renderTransactions(data)

})

}
function renderTotal(list){

let total = 0

list.forEach(t=>{

if(t.type=="income"){

total += Number(t.amount)

}else{

total -= Number(t.amount)

}

})

document.getElementById("totalMoney").innerText =
total.toLocaleString()

}

function renderChart(list){

let categories={}

list.forEach(t=>{

if(t.type=="expense"){

if(!categories[t.category])
categories[t.category]=0

categories[t.category]+=Number(t.amount)

}

})

let labels=Object.keys(categories)
let values=Object.values(categories)

const ctx=document.getElementById("pieChart")

if(chart) chart.destroy()

chart=new Chart(ctx,{
type:'doughnut',
data:{
labels:labels,
datasets:[{
data:values
}]
}
})

}
function renderTransactions(list){

let box=document.getElementById("transactionList")

box.innerHTML=""

list.slice().reverse().forEach(t=>{

let color = t.type=="income" ? "green":"red"
let sign = t.type=="income" ? "+" : "-"

box.innerHTML+=`

<div class="transaction">

<div>

<b>${t.category}</b><br>
${new Date(t.date).toLocaleDateString()}

</div>

<div style="color:${color}">

${sign}${t.amount}

</div>

</div>

`

})

}
loadData()
