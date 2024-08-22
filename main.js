let isSpinning = false;
let spinInterval;
let timerInterval;
let remainingTime = 60; // เวลาสำหรับการนับถอยหลัง (60 วินาที)

document.addEventListener("DOMContentLoaded", function () {
    document.addEventListener("keydown", function (event) {
        if (event.code === "Space") {
            if (!isSpinning) {
                startSpinning();
            }
        }
    });
});

function startSpinning() {
    const words = document.getElementById("wordContainer");
    const totalWords = words.children.length;
    const wordHeight = words.children[0].offsetHeight;
    const spinSpeed = 50;
    let currentTranslateY = 0;

    // รีเซ็ตตำแหน่งเริ่มต้นของการหมุนไปที่ตำแหน่งบนสุด
    words.style.transition = "";
    words.style.transform = `translateY(0px)`;

    // รีเซ็ตเวลาเป็น 01:00 เมื่อเริ่มหมุนใหม่
    remainingTime = 60;
    document.getElementById("timer").textContent = formatTime(remainingTime);

    setTimeout(() => {
        spinInterval = setInterval(() => {
            currentTranslateY -= wordHeight;

            if (Math.abs(currentTranslateY) >= totalWords * wordHeight) {
                currentTranslateY = 0;
            }

            words.style.transition = "transform 0.2s ease-out";
            words.style.transform = `translateY(${currentTranslateY}px)`;
        }, spinSpeed);
    }, 100);

    // เริ่มนับเวลาถอยหลัง
    timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    remainingTime--;
    document.getElementById("timer").textContent = formatTime(remainingTime);

    if (remainingTime <= 0) {
        stopSpinning();
    }
}

function stopSpinning() {
    clearInterval(spinInterval);
    clearInterval(timerInterval);

    const words = document.getElementById("wordContainer");
    const wordHeight = words.children[0].offsetHeight;
    const totalWords = words.children.length;
    const randomStopIndex = Math.floor(Math.random() * totalWords);
    const stopOffset = -randomStopIndex * wordHeight;

    words.style.transition = "transform 1s ease-out";
    words.style.transform = `translateY(${stopOffset}px)`;

    // แสดงเวลาเป็น 00:00 เมื่อหยุดหมุน
    document.getElementById("timer").textContent = "00:00";

    setTimeout(() => {
        words.style.transition = "";
    }, 1000);

    isSpinning = false; // ตั้งค่าให้พร้อมหมุนใหม่
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
}