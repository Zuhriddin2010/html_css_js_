// Kontekst ma'lumotlari (kerak bo'lsa foydalanish mumkin)
console.log("Hozirgi vaqt: 2026-yil 25-aprel, shanba, 15:25. Joylashuv: Boyovut, Sirdaryo.");

let listening = false;
let waveData = [];
let canvas, ctx, analyser, audioContext, microphone;

function startListening() {
    const btn = document.getElementById('micBtn');
    const statusText = document.getElementById('status');
    const responseText = document.getElementById('responseText');

    if (listening) {
        // Eshitishni to'xtatish
        listening = false;
        btn.classList.remove('active');
        statusText.innerText = "Tayyor";
        responseText.innerText = "Sizni eshitishni to'xtatdim. Yana gapirish uchun tugmani bosing.";
        
        // Audio oqimini yopish
        if (microphone) {
            microphone.mediaStream.getTracks()[0].stop();
        }
        if (audioContext) {
            audioContext.close();
        }
        return;
    }

    // Web Audio API-ni sozlash
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioContext.createAnalyser();

    // Mikrofon ruxsatini so'rash
    navigator.mediaDevices.getUserMedia({ audio: true, video: false })
        .then(stream => {
            listening = true;
            btn.classList.add('active');
            statusText.innerText = "Eshityapman...";
            responseText.innerText = "Men sizni eshityapman, gapiring...";

            microphone = audioContext.createMediaStreamSource(stream);
            microphone.connect(analyser);

            // Analizator sozlamalari
            analyser.fftSize = 256;
            const bufferLength = analyser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);

            // To'lqinlarni chizishni boshlash
            initCanvas();
            drawWave(dataArray, bufferLength);
        })
        .catch(err => {
            console.error("Mikrofon ruxsati rad etildi:", err);
            statusText.innerText = "Xato: Mikrofon rad etildi";
            alert("Ushbu loyiha ishlashi uchun mikrofon ruxsati kerak.");
        });
}

function initCanvas() {
    canvas = document.getElementById('waveCanvas');
    ctx = canvas.getContext('2d');
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;
}

function drawWave(dataArray, bufferLength) {
    if (!listening) {
        // Eshitish to'xtatilsa, to'lqinlarni o'chirish
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
    }

    requestAnimationFrame(() => drawWave(dataArray, bufferLength));

    analyser.getByteFrequencyData(dataArray);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const baseRadius = 50;

    // Bir nechta neon to'lqin qatlamlarini chizish
    for (let j = 0; j < 3; j++) {
        ctx.beginPath();
        ctx.lineWidth = 2 + j;
        
        // Chastotaga qarab neon moviy rang
        const hue = 180 + j * 20; 
        ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
        ctx.shadowColor = `hsl(${hue}, 100%, 50%)`;
        ctx.shadowBlur = 10 + j * 5;

        for (let i = 0; i < bufferLength; i++) {
            // Chastota balandligiga qarab radius o'zgaradi
            const barHeight = dataArray[i] * 1.5;
            const angle = i * (Math.PI * 2 / bufferLength);

            const x = centerX + Math.cos(angle) * (baseRadius + barHeight + j * 10);
            const y = centerY + Math.sin(angle) * (baseRadius + barHeight + j * 10);

            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.closePath();
        ctx.stroke();
        ctx.shadowBlur = 0; // Keyingi qatlam uchun soyani o'chirish
    }
}