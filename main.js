let addBtn = document.querySelector(".add-btn");
let removeBtn = document.querySelector(".remove-btn");
let modalCont = document.querySelector(".modal-cont");
let mainCont = document.querySelector(".main-cont");
let textareaCont = document.querySelector(".textarea-cont");
let allPriorityColors = document.querySelectorAll(".priority-color");

// let lockElem = document.querySelector(".ticket-lock");

let colors = ["lightpink", "lightblue", "lightgreen", "black" ];
let modalPriorityColor = colors[colors.length - 1];

let addFlag = false;
let removeFlag = false;

let lockClass = "fa-lock"; 
let unlockClass = "fa-lock-open";

// Listener for modal priority coloring
allPriorityColors.forEach((colorElem, idx) => {
    colorElem.addEventListener("click", (e) => {
        allPriorityColors.forEach((priorityColorElem, idx) => {
            priorityColorElem.classList.remove("border");
        })
        colorElem.classList.add("border");

        modalPriorityColor = colorElem.classList[0];
    })
})

addBtn.addEventListener("click", (e) => {
    // Display Modal
    // Generate Ticket

    // addFlag = true -> display modal
    // addFlag = false -> no modal
    addFlag = !addFlag;
    if(addFlag) {
        modalCont.style.display = "flex";
    }else {
        modalCont.style.display = "none";
    }
})

removeBtn.addEventListener("click", (e) => {
    removeFlag = !removeFlag;
})

modalCont.addEventListener("keydown", (e) => {
    let key = e.key;
    if(key === "Shift"){
        createTicket(modalPriorityColor, textareaCont.value, shortid());
        modalCont.style.display = "none";
        addFlag = false;
        textareaCont.value = "";
    }
})

function createTicket(ticketColor, ticketTask, ticketID) {
    let ticketCont = document.createElement("div");
    ticketCont.setAttribute("class", "ticket-cont");
    ticketCont.innerHTML = `
        <div class="ticket-color ${ticketColor}"></div>
        <div class="ticket-id">#${ticketID}</div>
        <div class="task-area">${ticketTask}</div>
        <div class="ticket-lock">
            <i class="fa-solid fa-lock"></i>
        </div>
    `;

    mainCont.appendChild(ticketCont);

    handleRemoval(ticketCont);
    handleLock(ticketCont);
    handleColor(ticketCont);
}

function handleRemoval(ticket) {
    // removeFlag == true then remove
    if(removeFlag) ticket.remove();
}

function handleLock(ticket) {
    let ticketLockElem = ticket.querySelector(".ticket-lock");
    let ticketLock = ticketLockElem.children[0];
    let ticketTaskArea = ticket.querySelector(".task-area");
    ticketLock.addEventListener("click", (e) => {
        if(ticketLock.classList.contains(lock)) {
            ticketLock.classList.remove(lockClass);
            ticketLock.classList.add(unlockClass);
            ticketTaskArea.setAttribute("contenteditable", "true");
        }else{
            ticketLock.classList.remove(unlockClass);
            ticketLock.classList.add(lockClass);
            ticketTaskArea.setAttribute("contenteditable", "false");
        }
    })
}

function handleColor(ticket) {
    let ticketColor = ticket.querySelector(".ticket-color");
    ticketColor.addEventListener("click", (e) => {
        let currentTicketColor = ticketColor.classList[1]; 
        // Get ticket color index 
        let currentTicketColorIndex = colors.findIndex((color) => {
            return currentTicketColor === color;
        })
    
        currentTicketColorIndex++;
        let newTicketColorIdx = currentTicketColorIndex % colors.length;
        let newTicketColor = colors[newTicketColorIdx];
        ticketColor.classList.remove(currentTicketColor);
        ticketColor.classList.add(newTicketColor);
    })
}