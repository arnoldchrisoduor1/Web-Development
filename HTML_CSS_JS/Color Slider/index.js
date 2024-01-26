document.addEventListener('DOMContentLoaded', function () {
    const redSlider = document.getElementById('red-slider');
    const greenSlider = document.getElementById('green-slider');
    const blueSlider = document.getElementById('blue-slider');
    const colorDisplay = document.getElementById('color-display');
    const rgbValue = document.getElementById('rgb-value');
    const hslValue = document.getElementById('hsl-value');

    function updateColor() {
        const redValue = redSlider.value;
        const greenValue = greenSlider.value;
        const blueValue = blueSlider.value;

        const rgbColor = `rgb(${redValue}, ${greenValue}, ${blueValue})`;
        const hslColor = `hsl(${calculateHue(redValue, greenValue, blueValue)}, 100%, 50%)`;

        colorDisplay.style.backgroundColor = rgbColor;
        rgbValue.textContent = `RGB: ${rgbColor}`;
        hslValue.textContent = `HSL: ${hslColor}`;
    }

    function calculateHue(red, green, blue) {
        const max = Math.max(red, green, blue);
        const min = Math.min(red, green, blue);

        let hue;

        if (max === min) {
            hue = 0;
        } else if (max === red) {
            hue = ((green - blue) / (max - min) + 6) % 6;
        } else if (max === green) {
            hue = (blue - red) / (max - min) + 2;
        } else {
            hue = (red - green) / (max - min) + 4;
        }

        return Math.round(hue * 60);
    }

    redSlider.addEventListener('input', updateColor);
    greenSlider.addEventListener('input', updateColor);
    blueSlider.addEventListener('input', updateColor);

    // Initial update
    updateColor();
});
