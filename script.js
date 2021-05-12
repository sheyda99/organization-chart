const topParent = document.getElementById("top-parent");
const zoom = document.getElementById("zoom");
const percent = document.querySelector(".percent");
const percentList = document.querySelector(".percent-list");
const body = document.querySelector("body");

eventListeners();

function eventListeners() {
    zoom.addEventListener("click", zoomIn);
    zoom.addEventListener("click", zoomOut);
    percent.addEventListener("click", openAndClosePercentList);
    percentList.addEventListener("click", zoomWIthNumbers);
    topParent.addEventListener("click", chartFunctions);
}

function zoomIn(e) {
    if (e.target.className === "fas fa-plus") { // if the + button is clicked
        if (parseInt(percent.textContent) >= 30 && parseInt(percent.textContent) < 100) {
            topParent.style.zoom = parseInt(topParent.style.zoom) + 10 + "%";

        } else if (parseInt(percent.textContent) === 25) {
            topParent.style.zoom = parseInt(topParent.style.zoom) + 5 + "%";

        } else if (parseInt(percent.textContent) === 100 || parseInt(percent.textContent) === 125) {
            topParent.style.zoom = parseInt(topParent.style.zoom) + 25 + "%";
        }
    }
    percent.innerHTML = topParent.style.zoom;
}

function zoomOut(e) {
    if (e.target.className === "fas fa-minus") { // if the - button is clicked
        if (parseInt(percent.textContent) > 30 && parseInt(percent.textContent) <= 100) {
            topParent.style.zoom = parseInt(topParent.style.zoom) - 10 + "%";

        } else if (parseInt(percent.textContent) === 30) {
            topParent.style.zoom = parseInt(topParent.style.zoom) - 5 + "%";

        } else if (parseInt(percent.textContent) === 125 || parseInt(percent.textContent) === 150) {
            topParent.style.zoom = parseInt(topParent.style.zoom) - 25 + "%";
        }
    }
    percent.innerHTML = topParent.style.zoom;
}

function openAndClosePercentList(e) {
    if (percentList.style.display === "none") {
        percentList.style.display = "block";
    } else {
        percentList.style.display = "none";
    }
}

function zoomWIthNumbers(e) {
    switch (e.target.className) {
        case "25":
            topParent.style.zoom = "25%";
            break;
        case "30":
            topParent.style.zoom = "30%";
            break;
        case "40":
            topParent.style.zoom = "40%";
            break;
        case "50":
            topParent.style.zoom = "50%";
            break;
        case "60":
            topParent.style.zoom = "60%";
            break;
        case "70":
            topParent.style.zoom = "70%";
            break;
        case "80":
            topParent.style.zoom = "80%";
            break;
        case "90":
            topParent.style.zoom = "90%";
            break;
        case "100":
            topParent.style.zoom = "100%";
            break;
        case "125":
            topParent.style.zoom = "125%";
            break;
        case "150":
            topParent.style.zoom = "150%";
            break;
    }
    percentList.style.display = "none";
}

function chartFunctions(e) {
    if (e.target.className === "btn add-btn fas fa-plus") { // if the add(+) button is clicked
        // creating new category with li element & adding new category to ul element inside of parent element
        const newCategory = document.createElement("li");
        newCategory.innerHTML = "<p><input type='text' placeholder='Category name' size='12' autofocus><i class='btn delete-btn fas fa-times'></i><i class='btn save-btn fas fa-check'></i></p><ul></ul>";
        e.target.parentElement.nextElementSibling.appendChild(newCategory);

    } else if (e.target.className === "btn save-btn fas fa-check") { // if the save button is clicked
        const input = e.target.previousSibling.previousSibling;
        if (input.value !== "") { // if input field is not empty
            e.target.parentElement.style.backgroundColor = "#ffa376";
            input.style.backgroundColor = "#ffa376"
            input.style.color = "#fff";
            e.target.className = "btn add-btn fas fa-plus";

        } else { // if input field is empty
            showAlert("Please Fill out the Field!");
        }

    } else if (e.target.className === "btn delete-btn fas fa-times") { // if the delete(x) button is clicked
        e.target.parentElement.parentElement.remove(); // removing li (parent) element
    }
}

function showAlert(message) {
    // creating alert box and adding to inside of body element
    const alert = document.createElement("div");
    alert.className = "alert-box";
    alert.innerHTML = message;
    body.appendChild(alert);
    
    // alert box will disappear in 2 seconds
    setTimeout(function() {
        alert.remove();
    }, 2000);
}

// It will make chart draggable
dragElement(topParent);

function dragElement(element) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(element.id + "-header")) {
        document.getElementById(element.id + "-header").onmousedown = dragMouseDown;
    } else {
        element.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}