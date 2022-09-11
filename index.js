
let myLeads = [{}] 
let myNotes = [{}]

const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const ulEl2 = document.getElementById("ul-el2")
const delBtn = document.getElementById("del-btn")
let listItems
const linksLocalStorage = JSON.parse(localStorage.getItem("myNotes"))
const linksLocalStorage2 = JSON.parse(localStorage.getItem("myLeads"))
const tabBtn = document.getElementById("tab-btn")

if(linksLocalStorage) {
    myNotes = linksLocalStorage
    render(myNotes, myLeads)
}

if(linksLocalStorage2) {
    myLeads = linksLocalStorage2
    render(myNotes, myLeads)
}

inputBtn.addEventListener("click", function() {
    if(inputEl.value != '') {
        myNotes.push({
            "name":inputEl.value,
            "status":1
        })
        inputEl.value = null
        localStorage.setItem("myNotes", JSON.stringify(myNotes))
        render(myNotes, myLeads)
        console.log(localStorage.getItem("myNotes"))
    }
}) 


tabBtn.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        console.log(tabs)
        myLeads.push({
            "name":tabs[0].url,
            "status":1
        })
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myNotes, myLeads)
    })
})

delBtn.addEventListener("dblclick", function() {
    console.log("yes")
    myLeads = []
    localStorage.clear()
    render(myNotes, myLeads)
})

function render(leads, links) {
    let leads2 = JSON.stringify(leads)
    console.log(leads2) 
    console.log(leads) 
    listItems = ""
    for(let i=0; i<leads.length; i++) {
        if(leads[i].status===1) {
            listItems += `
            <li>
                    <span>${leads[i].name}</span>
                    <span onclick="del(${i})" id="trial" class="deli-btn">&#10060</span>
            </li>
            `
        }
        ulEl.innerHTML = listItems
    }
    listItems = ""
    for(let i=0; i<links.length; i++) {
        if(links[i].status===1) {
            listItems += `
            <li>
                    <a href="${links[i].name}" target="_blank"><span>${links[i].name}</span></a>
                    <span onclick="del(${i})" id="trial" class="deli-btn">&#10060</span>
            </li>
            `
        }
        ulEl2.innerHTML = listItems
    }
}

function del(i) {
    console.log("no")
    console.log(myNotes)
    myNotes[i].status = 0;
    console.log(myLeads[i])
    localStorage.setItem("myNotes", JSON.stringify(myNotes))
    console.log(linksLocalStorage)
    render(myNotes, myLeads) 
}
const btn1 = document.querySelectorAll(".btns1")
btn1.forEach(function(button, index){
    button.addEventListener('click',function(){
        console.log(index)
        del(index)
    })
})


// document.getElementById('trial').addEventListener('click', function() {
//     console.log("yes")
// })
//<a href = ${leads[i].name} target="_blank"><span>✅</span>

