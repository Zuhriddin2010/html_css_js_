const answers = [
    "Albatta!",
    "Bunga shubha yo'q",
    "Yaxshisi hozir aytmaganim ma'qul",
    "Keyinroq so'rang",
    "Mening manbalarim yo'q deydi",
    "Juda shubhali",
    "Ha, albatta",
    "Ehtimol, yo'q",
    "Yaqin orada bilib olasiz",
    "O'zingizga bog'liq"
];

function askQuestion() {
    const input = document.getElementById('questionInput');
    const ball = document.getElementById('ball');
    const answerText = document.getElementById('answer');
    const val = input.value.trim().toLowerCase();

    if (val === "") {
        alert("Avval savol bering!");
        return;
    }

    ball.classList.add('shake');
    answerText.style.opacity = "0";

    setTimeout(() => {
        let finalAnswer = "";

        // --- MATEMATIK TEKSHIRUV ---
        if (val.includes("24 soat") && val.includes("daqiqa")) {
            finalAnswer = "1440 daqiqa";
        } else if (val.includes("2*2") || val.includes("2+2")) {
            finalAnswer = "4";
        } 
        // Agar matematik savol bo'lmasa, tasodifiy javoblardan oladi
        else {
            const randomIndex = Math.floor(Math.random() * answers.length);
            finalAnswer = answers[randomIndex];
        }

        answerText.innerText = finalAnswer;
        ball.classList.remove('shake');
        answerText.style.opacity = "1";
    }, 500);
}
function askQuestion() {
    const input = document.getElementById('questionInput');
    const ball = document.getElementById('ball');
    const answerText = document.getElementById('answer');
    const val = input.value.trim().toLowerCase(); // Kichik harfga o'tkazamiz

    if (val === "") {
        alert("Savol yozing...");
        return;
    }

    ball.classList.add('shake');
    answerText.style.opacity = "0";

    setTimeout(() => {
        let finalAnswer = "";

        // --- 1. MATEMATIK VA LOGIK SAVOLLARNI YECHISH ---
        if (val.includes("necha daqiqa") && val.includes("soat")) {
            const numbers = val.match(/\d+/); // Gap ichidagi sonni topadi
            const hours = numbers ? numbers[0] : 1;
            finalAnswer = hours * 60 + " daqiqa bor.";
        } 
        else if (val.includes("necha soniya") && val.includes("daqiqa")) {
            const numbers = val.match(/\d+/);
            const mins = numbers ? numbers[0] : 1;
            finalAnswer = mins * 60 + " soniya bor.";
        }
        else if (val.includes("nechchi") || val.includes("+") || val.includes("*")) {
            // Matematik amallarni hisoblashga harakat qiladi
            try {
                // Faqat sonlar va ishoralar bo'lsa hisoblaydi
                const formula = val.replace(/[^0-9+\-*/.]/g, '');
                finalAnswer = "Javob: " + eval(formula);
            } catch {
                finalAnswer = "Buni hisoblay olmayman.";
            }
        }

        // --- 2. GAPLASHISH (CHAT) QISMI ---
        else if (val.includes("salom") || val.includes("assalomu alaykum")) {
            finalAnswer = "Vaalaykum salom! Sizga qanday yordam bera olaman?";
        }
        else if (val.includes("isming nima") || val.includes("kimsan")) {
            finalAnswer = "Men Sehrli AI Sharman.";
        }
        else if (val.includes("nima qilay") || val.includes("maslahat ber")) {
            finalAnswer = "Dasturlashni o'rganing, bu kelajak!";
        }

        // --- 3. AGAR TUSHUNMASA, ODDIY BASHORAT ---
        else {
            const randomAnswers = [
                "Juda qiziq savol...", 
                "Ehtimol shundaydir.", 
                "Mening tahlillarim bunga qarshi.", 
                "Bu haqda keyinroq o'ylab ko'ring."
            ];
            finalAnswer = randomAnswers[Math.floor(Math.random() * randomAnswers.length)];
        }

        answerText.innerText = finalAnswer;
        ball.classList.remove('shake');
        answerText.style.opacity = "1";
    }, 500);
}