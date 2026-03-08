const API_URL = "https://script.google.com/macros/s/AKfycbwUI-sPYGV_7QQEkzv70klIzJbj6IFnETw0E134xrqCM8BILroVNDh6_wP-EjaLVCjVkw/exec";

// โหลดข้อมูลทั้งหมด
function loadData(){

fetch(API_URL)
.then(res => res.json())
.then(data => {

console.log("API DATA:", data)

const transactions = data.transactions
const goals = data.goals

renderSummary(transactions)
renderTransactions(transactions)
renderGoals(goals)

})
.catch(err => {
console.error("Fetch error:", err)
})

}

// สรุปรายรับรายจ่าย
function renderSummary(data){

let income = 0
let expense = 0

data.forEach(t => {

if(t.type === "income"){
income += Number(t.amount)
}

if(t.type === "expense"){
expense += Number(t.amount)
}

})

document.getElementById("income").innerText = income
document.getElementById("expense").innerText = expense
document.getElementById("balance").innerText = income - expense

}

// แสดงรายการธุรกรรม
function renderTransactions(data){

const box = document.getElementById("transactions")

box.innerHTML = ""

data.slice().reverse().forEach(t => {

box.innerHTML += `
<div class="transaction">
<div>
${t.date} - ${t.category}
</div>

<div class="${t.type}">
฿${t.amount}
</div>
</div>
`

})

}

// แสดง Goal Progress
function renderGoals(goals){

const box = document.getElementById("goals")

box.innerHTML = ""

goals.forEach(g => {

const percent = (g.saved / g.target) * 100

box.innerHTML += `
<div class="goal-item">

<h3>${g.name}</h3>

<p>${g.saved} / ${g.target}</p>

<div class="progress">
<div class="bar" style="width:${percent}%"></div>
</div>

</div>
`

})

}

// เริ่มโหลดข้อมูล
loadData()
