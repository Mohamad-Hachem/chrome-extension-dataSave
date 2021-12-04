let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const deleteBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )
const tabBtn = document.getElementById("tab-btn")
const copyBtn = document.getElementById("copy-btn")
const extractBtn = document.getElementById("Extract-btn")
const textarea = document.getElementById("textarea-el")

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
        listItems += leads[i]
    }
    textarea.innerHTML = listItems
}

deleteBtn.addEventListener("dblclick", function() 
{
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

inputBtn.addEventListener("click", function() 
{
    //$$$$$$$$$$$$$
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads) )
    render(myLeads)
    //$$$$$$$$$$$$$$
    // chrome.tabs.executeScript( 
    //     {
    //       code: "window.getSelection().toString();"
    //     }, function(selection) 
    //     {
    //       textarea.value = selection[0];
    //     }
    // );
})

    // chrome.extension.onRequest.addListener(function(request,sender,sendResponse)
    // {
    //     if(request.method == "getSelection")
    //     {
    //         //let selection = getSelectionHTML()
    //         sendResponse(
    //         {
    //             data: selection, url:window.location.href, subject :document.title
    //         })
    //         myLeads.push(selection)
    //         localStorage.setItem("myLeads", JSON.stringify(myLeads))
    //         render(myLeads)
    //     }
    //     else
    //         sendResponse({})    
    // })
//})

//Gets the html od the user's selection
// function getSelectionHTML()
// {
//     let userSelection ;
//     if(window.getSelection)
//     {
//         //W3C ranges
//         userSelection = window.getSelection();
//         if(userSelection.getRangeAt)
//             let range = userSelection.getRangeAt(0)
//         else
//         {
//             let range = document.createRange()
//             range.setStart(userSelection.anchorNode, userSelection.anchorOffset)
//             range.setEnd(userSelection.focusNode, userSelection.focusOffset)
//         }
//         let clonedSelection = range.cloneContents()
//         let div = document.createElement('div')
//         div.appendChild(clonedSelection)
//         return div.innerHTML
//     }
//     else if(document.selection)
//     {
//         userSelection = document.selection.createRange()
//         return userSelection.htmlText
//     }
//     else
//     {
//         return ''
//     }
// }