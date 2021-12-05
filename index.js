let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )
const tabBtn = document.getElementById("tab-btn")
const copyBtn = document.getElementById("copy-btn")
const extractBtn = document.getElementById("Extract-btn")
const copiedEl = document.getElementById("copied-el")

console.log("this is the 2 btns"+copyBtn.textContent +" "+extractBtn.textContent)
if (leadsFromLocalStorage) 
{
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

tabBtn.addEventListener("click", function()
{    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
    {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
})

function render(leads)
{
    let listItems = ""
    for (let i = 0; i < leads.length; i++) 
    {
        listItems +=`
            <li>
                    ${leads[i]}
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

deleteBtn.addEventListener("dblclick", function() 
{
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

inputBtn.addEventListener("click", function() 
{
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads) )
    render(myLeads)
})

copyBtn.addEventListener("click",function()
{
    let string = ""
    for(let i = 0 ;i<myLeads.length;i++)
    {
        string += myLeads[i] + "\n"
    }
    navigator.clipboard.writeText(string)
    copiedEl.textContent = "Copied"
    //alert("copied")
})

extractBtn.addEventListener("click", function()
{
    let string = ""
    for(let i = 0 ; i < myLeads.length ; i++)
    {
        string += myLeads[i] + "\n"
    }
    //let FileSaver = require('file-saver')
    //let blob = new blob(["string"],{type: 'text/plain;charset=utf-8"'})
    require FileSaver.js
    FileSaver.saveAs(["string"],{type: 'text/plain;charset=utf-8"'},'ChromExtension.txt')
    copiedEl.textContent = "extarcted"
})

