// Kontekst ma'lumotlari (kerak bo'lsa foydalanish mumkin)
console.log("Hozirgi vaqt: 2026-yil 25-aprel, shanba, 15:00. Joylashuv: Boyovut, Sirdaryo.");

let audioContext, analyser, microphone;
let canvas, ctx;
let started = false;

function startVisualizer() {
    if (started) return; // Ikkinchi marta bosilsa hech narsa qilmaydi
    started = true;

    // Boshqaruv panelini yo'qotish animatsiyasi
    document.querySelector('.controls').classList.add('fade-out');

    // Canvas-ni sozlash
    canvas = document.getElementById('visualizer');
    ctx = canvas.getContext('2d');
    
    // Canvas o'lchamini to'liq ekranga moslash
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Web Audio API-ni boshlash
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioContext.createAnalyser();

    // Mikrofon ruxsatini so'rash
    navigator.mediaDevices.getUserMedia({ audio: true, video: false })
        .then(stream => {
            // Mikrofon ovozini analyserga ulash
            microphone = audioContext.createMediaStreamSource(stream);
            microphone.connect(analyser);
            analyser.connect(audioContext.destination);

            // Analizator sozlamalari
            analyser.fftSize = 256; // Ma'lumot aniqligi
            const bufferLength = analyser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);

            // Chizish funksiyasini boshlash
            drawVisualizer(dataArray, bufferLength);
        })
        .catch(err => {
            console.error("Mikrofon ruxsati rad etildi:", err);
            alert("Vizualizator ishlashi uchun mikrofon ruxsati kerak.");
            // Agar ruxsat rad etilsa, panelni qaytarish
            document.querySelector('.controls').classList.remove('fade-out');
            started = false;
        });
}

function drawVisualizer(dataArray, bufferLength) {
    if (!started) return;

    requestAnimationFrame(() => drawVisualizer(dataArray, bufferLength));

    // Analizordan olingan ovoz chastotasi ma'lumotlarini dataArray-ga yozish
    analyser.getByteFrequencyData(dataArray);

    // Canvas-ni tozalash
    ctx.fillStyle = "rgba(5, 5, 16, 0.1)"; // Sekin o'chadigan orqa fon
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 100;

    // Neon doira chizish (Musiqaning markazi)
    let avg = 0;
    for(let i=0; i<bufferLength; i++) avg += dataArray[i];
    avg /= bufferLength;
    const dynamicRadius = radius + avg * 0.4;

    ctx.beginPath();
    ctx.arc(centerX, centerY, dynamicRadius, 0, 2 * Math.PI);
    ctx.lineWidth = 10;
    ctx.strokeStyle = `hsl(${(180 + avg * 1.2) % 360}, 100%, 50%)`; // Rang chastotaga qarab o'zgaradi
    ctx.stroke();
    
    // Yerdagi soya (Mirror effekt)
    ctx.fillStyle = `hsl(${(180 + avg * 1.2) % 360}, 100%, 5%, 0.1)`;
    ctx.fillRect(0, canvas.height * 0.9, canvas.width, canvas.height * 0.1);

    // Neon chiziqlar (Bar) chizish
    for (let i = 0; i < bufferLength; i++) {
        const barHeight = dataArray[i] * 1.5;
        const angle = i * (Math.PI * 2 / bufferLength);

        // Chiziq boshlanish va tugash koordinatalari
        const xStart = centerX + Math.cos(angle) * (dynamicRadius + 10);
        const yStart = centerY + Math.sin(angle) * (dynamicRadius + 10);
        const xEnd = centerX + Math.cos(angle) * (dynamicRadius + barHeight + 10);
        const yEnd = centerY + Math.sin(angle) * (dynamicRadius + barHeight + 10);

        // Chiziqni chizish
        ctx.beginPath();
        ctx.moveTo(xStart, yStart);
        ctx.lineTo(xEnd, yEnd);
        ctx.lineWidth = 4;
        
        // Neon rangi
        const hue = (180 + avg + i * 2) % 360;
        ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
        ctx.shadowColor = `hsl(${hue}, 100%, 50%)`;
        ctx.shadowBlur = 10;
        ctx.stroke();
        ctx.shadowBlur = 0; // Keyingi elementlar uchun soya-ni o'chirish
    }
}