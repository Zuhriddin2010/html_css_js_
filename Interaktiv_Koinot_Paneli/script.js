// Soatni yangilash
function updateClock() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('uz-UZ', { hour12: false });
    document.getElementById('time').innerText = timeStr;
}
setInterval(updateClock, 1000);

// Sayyorani o'zgartirish funksiyasi
function changePlanet(name, color, rotation) {
    const planet = document.getElementById('planet');
    const pName = document.getElementById('planet-name');
    const pDesc = document.getElementById('planet-desc');

    // Rang va effektlarni o'zgartirish
    planet.style.background = color;
    planet.style.boxShadow = `inset -20px -20px 60px rgba(0,0,0,0.7), 0 0 40px ${color}88`;
    
    // Matnlarni yangilash
    pName.innerText = name;
    pName.style.color = color;
    pDesc.innerText = `Ushbu sayyora o'z o'qi atrofida ${rotation}da aylanib chiqadi.`;

    // Kichik "sakrash" animatsiyasi
    planet.style.transform = "scale(1.1)";
    setTimeout(() => {
        planet.style.transform = "scale(1)";
    }, 200);
}

// Sichqoncha harakati bo'yicha fonni siljitish (Parallax)
document.addEventListener('mousemove', (e) => {
    const bg = document.getElementById('bg');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    bg.style.transform = `translate(-${x * 20}px, -${y * 20}px)`;
});


// Sayyoralar uchun CSS teksturalari bazasi
const planetTextures = {
    Mercury: "radial-gradient(circle at 30% 30%, #A5A5A5 0%, #888888 40%, #666666 70%, #444444 100%)",
    Venus: "radial-gradient(circle at 30% 30%, #F5E6CC 0%, #E3BB76 40%, #C49B5A 70%, #8B6B3C 100%)",
    Earth: "radial-gradient(circle at 30% 30%, #4facfe 0%, #00f2fe 20%, #2271B3 40%, #1a5a8f 60%, #1e8a34 70%, #29b945 80%, #1a5a8f 100%)", // Okean + Yashil quruqlik
    Mars: "radial-gradient(circle at 30% 30%, #FF6B6B 0%, #E27B58 40%, #B84D35 70%, #8C2E1D 100%)", // Qizil + Jigarrang relyef
    Jupiter: "repeating-linear-gradient(180deg, #D39C7E 0px, #D39C7E 10px, #C5AB6E 10px, #C5AB6E 20px, #B84D35 20px, #B84D35 30px)", // Rang-band chiziqlar
    Saturn: "radial-gradient(circle at 30% 30%, #F4E0C1 0%, #C5AB6E 40%, #A68D53 70%, #7D683A 100%)",
    Uranus: "radial-gradient(circle at 30% 30%, #E0F7FA 0%, #BBE1E4 40%, #95CAD0 70%, #6997A2 100%)",
    Neptune: "radial-gradient(circle at 30% 30%, #85AFFF 0%, #6081FF 40%, #3F5FCC 70%, #2A3F99 100%)"
};

// Sayyoralar nurlanishi (Glow) ranglari
const planetGlows = {
    Mercury: "rgba(165, 165, 165, 0.4)",
    Venus: "rgba(227, 187, 118, 0.4)",
    Earth: "rgba(79, 172, 254, 0.5)",
    Mars: "rgba(226, 123, 88, 0.5)",
    Jupiter: "rgba(211, 156, 126, 0.4)",
    Saturn: "rgba(197, 171, 110, 0.4)",
    Uranus: "rgba(187, 225, 228, 0.4)",
    Neptune: "rgba(96, 129, 255, 0.5)"
};

function updatePlanet(name, year) {
    const planet = document.getElementById('planet');
    const pName = document.getElementById('planet-name');
    const pDesc = document.getElementById('planet-desc');
    const texture = document.querySelector('.texture');

    // Teksturani o'zgartirish
    planet.style.background = planetTextures[name];
    
    // Nurli effekt qo'shish (glow)
    planet.style.boxShadow = `inset -40px -30px 60px rgba(0,0,0,0.9), 0 0 50px ${planetGlows[name]}`;
    
    // Matnlarni yangilash
    pName.innerText = name;
    pName.style.color = (name === 'Earth') ? '#4facfe' : (name === 'Mars' ? '#FF6B6B' : '#fff');
    pDesc.innerText = `${name} quyosh atrofida to'liq aylanishini ${year}da amalga oshiradi.`;

    // Animatsiya tezligini sayyoraga qarab o'zgartirish (qo'shimcha effekt)
    // Masalan, Yupiter juda tez aylanadi
    const speed = (name === 'Jupiter') ? '5s' : ((name === 'Earth' || name === 'Mars') ? '10s' : '20s');
    texture.style.animationDuration = speed;
}