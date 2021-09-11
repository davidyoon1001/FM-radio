var frequency_value = document.querySelector(".frequency-value");
var slider_input = document.querySelector(".slider").querySelector("input");
var knob = document.querySelector(".knob");
var angle = 135;
var minangle = 0;
var maxangle = 270;
var current_vol = document.querySelector(".current-vol");
var volume_controller = document.querySelectorAll(".volume-controller");

function moveKnob(direction) {
    if (direction == "up") {
        if (angle + 27 <= maxangle) {
            angle = angle + 27;
            setAngle(angle);
            current_vol.innerText = (angle / maxangle) * 10;
        }
    } else if (direction == "down") {
        if (angle - 27 >= minangle) {
            angle = angle - 27;
            setAngle(angle);
            current_vol.innerText = (angle / maxangle) * 10;
        }
    }
}

function setAngle(angle) {
    knob.style.transform = "rotate(" + angle + "deg)";
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
    let value = slider_input.value;
    frequency_value.textContent = value + " FM";
})
