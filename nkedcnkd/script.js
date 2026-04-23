function getWeather() {
    const cityInput = document.getElementById('cityInput').value;
    const cityDisplay = document.querySelector('.city');
    const tempDisplay = document.querySelector('.temp');
    const humidityDisplay = document.querySelector('.humidity');
    const windDisplay = document.querySelector('.wind');
    const icon = document.querySelector('.weather-icon');

    if (cityInput === "") {
        alert("Iltimos, shahar nomini kiriting!");
        return;
    }

    // Shahar nomini ekranlashtiramiz
    cityDisplay.innerHTML = cityInput.charAt(0).toUpperCase() + cityInput.slice(1);

    // Tasodifiy ob-havo ma'lumotlarini hosil qilamiz (Simulyatsiya)
    const randomTemp = Math.floor(Math.random() * 35) + 5; // 5 dan 40 gacha
    const randomHumidity = Math.floor(Math.random() * 60) + 30; // 30% dan 90% gacha
    const randomWind = Math.floor(Math.random() * 15) + 1; // 1 dan 15 km/soat

    // Ma'lumotlarni yangilaymiz
    tempDisplay.innerHTML = randomTemp + "°C";
    humidityDisplay.innerHTML = randomHumidity + "%";
    windDisplay.innerHTML = randomWind + " km/soat";

    // Ob-havoga qarab ikonkani o'zgartirish
    if (randomTemp > 25) {
        icon.src = "https://cdn-icons-png.flaticon.com/512/4814/4814268.png"; // Quyoshli
    } else if (randomTemp > 15) {
        icon.src = "https://cdn-icons-png.flaticon.com/512/1163/1163661.png"; // Bulutli
    } else {
        icon.src = "https://cdn-icons-png.flaticon.com/512/4088/4088981.png"; // Yomg'irli
    }
}

// Enter tugmasi bosilganda ishlashi uchun
document.getElementById('cityInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        getWeather();
    }
});