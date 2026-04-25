function updateUI() {
    // Elementlarni ushlab olamiz
    const c1 = document.getElementById('color1').value;
    const c2 = document.getElementById('color2').value;
    const blur = document.getElementById('blur').value;
    
    const previewCard = document.getElementById('previewCard');
    const glass = document.querySelector('.glass-object');
    const codeDisplay = document.getElementById('cssCode');
    const blurText = document.getElementById('blurVal');

    // Ranglarni o'zgartirish
    const gradient = `linear-gradient(45deg, ${c1}, ${c2})`;
    previewCard.style.background = gradient;
    
    // Glass effektini o'zgartirish
    glass.style.backdropFilter = `blur(${blur}px)`;
    glass.style.webkitBackdropFilter = `blur(${blur}px)`;
    blurText.innerText = blur + "px";

    // Kodni chiqarish
    const fullCode = `background: ${gradient};\nbackdrop-filter: blur(${blur}px);`;
    codeDisplay.innerText = fullCode;
}

function copyCode() {
    const code = document.getElementById('cssCode').innerText;
    navigator.clipboard.writeText(code);
    alert("Kod nusxalandi!");
}

// Sahifa yuklanganda bir marta ishlatib qo'yamiz
updateUI();