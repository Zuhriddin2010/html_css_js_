function addTask() {
    const input = document.getElementById('taskInput');
    const val = input.value.trim();
    
    if (!val) return;

    const ul = document.getElementById('taskList');
    const li = document.createElement('li');

    li.innerHTML = `
        <div class="task-header">
            <strong>${val}</strong>
            <button class="delete-btn" onclick="removeTask(this)">O'chirish</button>
        </div>
        <div class="slider-box">
            <input type="range" min="0" max="100" value="0" oninput="updateTask(this)">
            <span class="p-val">0%</span>
        </div>
    `;

    ul.appendChild(li);
    input.value = "";
    updateGlobalProgress();
}

// Har bir slider surilganda ishlaydi
function updateTask(slider) {
    const label = slider.nextElementSibling;
    label.innerText = slider.value + "%";
    updateGlobalProgress();
}

function removeTask(btn) {
    btn.closest('li').remove();
    updateGlobalProgress();
}

// Umumiy o'rtacha foyizni hisoblash
function updateGlobalProgress() {
    const sliders = document.querySelectorAll('input[type="range"]');
    const bar = document.getElementById('mainProgressBar');
    const text = document.getElementById('averagePercent');
    
    if (sliders.length === 0) {
        bar.style.width = "0%";
        text.innerText = "0%";
        return;
    }

    let total = 0;
    sliders.forEach(s => total += parseInt(s.value));
    
    const avg = Math.round(total / sliders.length);
    bar.style.width = avg + "%";
    text.innerText = avg + "%";
}

// Enter tugmasi
document.getElementById('taskInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});