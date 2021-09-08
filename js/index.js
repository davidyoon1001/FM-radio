var frequency_value = document.querySelector(".frequency-value")
var slider_input = document.querySelector(".slider").querySelector("input")
slider_input.oninput = (() => {
    let value = slider_input.value;
    frequency_value.textContent = value + " FM";
})
