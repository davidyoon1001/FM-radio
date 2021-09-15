var frequency_value = document.querySelector(".frequency-value");
var slider_input = document.querySelector(".slider").querySelector("input");
var knob = document.querySelector(".knob");
var knob_angle = 135;
var minangle = 0;
var maxangle = 270;
var current_vol = document.querySelector(".current-vol");
var volume_controller = document.querySelectorAll(".volume-controller");
var radio_buttons = document.querySelectorAll(".radio-button");
var frequency_buttons = document.querySelectorAll(".frequency-button");
var panel = document.querySelectorAll(".draggable-div");
var panel_header = document.querySelectorAll(".panel-header");

panel_header.forEach((elem) => {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    elem.addEventListener("mousedown", () => {
        dragMouseDown();
    })
    function dragMouseDown(e) {
        console.log("fuick");
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        console.log(pos3);
        console.log(pos4);
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        console.log(pos1);
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elem.parentElement.parentElement.style.top = (elem.offsetTop - pos2) + "px";
        elem.parentElement.parentElement.style.left = (elem.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
    }
})



function moveKnob(direction) {
    if (direction == "up") {
        if (knob_angle + 27 <= maxangle) {
            knob_angle = knob_angle + 27;
            setAngle(knob_angle);
            current_vol.innerText = (knob_angle / maxangle) * 10;
        }
    } else if (direction == "down") {
        if (knob_angle - 27 >= minangle) {
            knob_angle = knob_angle - 27;
            setAngle(knob_angle);
            current_vol.innerText = (knob_angle / maxangle) * 10;
        }
    }
}

function setAngle(knob_angle) {
    knob.style.transform = "rotate(" + knob_angle + "deg)";
}

knob.addEventListener("mousewheel", function (e) {
    if (e.deltaY < 0) {
        moveKnob("down");
    } else {
        moveKnob("up");
    }
    return false;
});

volume_controller.forEach((elem) => {
    elem.addEventListener("click", () => {
        if (elem.innerText === "expand_less") {
            moveKnob("up");
        } else {
            moveKnob("down");
        }
        return false;
    })
})

slider_input.oninput = (() => {
    frequency_value.textContent = slider_input.value + " FM";
})

frequency_buttons.forEach((elem) => {
    elem.addEventListener("click", () => {
        if (elem.innerText == "chevron_left") {
            slider_input.stepDown(1);
            console.log(slider_input.value);
            frequency_value.textContent = slider_input.value + " FM";
        }
        if (elem.innerText == "chevron_right") {
            slider_input.stepUp(1);
            console.log(slider_input.value);
            frequency_value.textContent = slider_input.value + " FM";
        }
    })
})

radio_buttons.forEach((elem) => {
    var fm;
    elem.addEventListener("mousedown", () => {
        var timeout_id = setTimeout(() => {
            fm = slider_input.value;
            alert("FM frequency " + slider_input.value + " has been saved on button " + elem.innerText + ".");
        }, 700)
        this.addEventListener("mouseup", () => {
            clearTimeout(timeout_id);
        })
    })
    elem.addEventListener("click", () => {
        if (fm == undefined) {
            alert("Hold the button to save new FM frequency.")
            console.log("undefined");
        } else {
            slider_input.value = fm;
            frequency_value.textContent = fm + " FM";
        }
    })
})

dragElement(document.getElementById("mydiv"));

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
        /* if present, the header is where you move the DIV from:*/
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
        /* otherwise, move the DIV from anywhere inside the DIV:*/
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        console.log(pos1);
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
    }
}