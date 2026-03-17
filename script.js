window.addEventListener('load', () => {
    // 1. Tạo hiệu ứng tim bay rải rác
    const container = document.body;
    for (let i = 0; i < 30; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart-particle');
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.top = Math.random() * 100 + 'vh'; 
        const size = Math.random() * 15 + 10 + 'px';
        heart.style.width = size; heart.style.height = size;
        heart.style.animationDuration = Math.random() * 3 + 4 + 's';
        heart.style.animationDelay = Math.random() * 2 + 's';
        container.appendChild(heart);
    }

    // 2. Lắng nghe Volume Control
    const audio = document.getElementById('birthday-audio');
    document.getElementById('volume-slider').addEventListener('input', (e) => {
        audio.volume = e.target.value;
    });
});
const CORRECT_PASSWORD = "5nam"; 
const HINT_MESSAGE = "Số năm chúng mình bên nhau đó! (viết liền không dấu)";

function showHint() {
    const hintElement = document.getElementById('hint-text');
    hintElement.innerText = HINT_MESSAGE;
    hintElement.classList.remove('hidden');
    // Tự động ẩn thông báo lỗi nếu đang hiện
    document.getElementById('password-error').classList.add('hidden');
}

function checkPassword() {
    const input = document.getElementById('password-input').value;
    const errorMsg = document.getElementById('password-error');
    const hintText = document.getElementById('hint-text');
    const passwordScreen = document.getElementById('password-screen');
    const setupScreen = document.getElementById('setup');

    if (input === CORRECT_PASSWORD) {
        passwordScreen.classList.add('hidden');
        setTimeout(() => {
            passwordScreen.style.display = 'none';
            setupScreen.classList.remove('hidden');
            setupScreen.classList.add('flex', 'flex-col', 'items-center');
        }, 1000);
    } else {
        errorMsg.classList.remove('hidden');
        hintText.classList.add('hidden'); // Ẩn gợi ý khi nhập sai để họ tập trung nhập lại
        const inputField = document.getElementById('password-input');
        inputField.classList.add('animate-bounce');
        setTimeout(() => inputField.classList.remove('animate-bounce'), 500);
    }
}

// Cho phép nhấn Enter để gửi mật khẩu
document.getElementById('password-input')?.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        checkPassword();
    }
});

function typeWriter(elementId, text, speed, callback) {
    let i = 0;
    const element = document.getElementById(elementId);
    element.innerHTML = "";
    element.classList.remove('opacity-0');
    function type() {
        if (i < text.length) {
            element.innerHTML += (text.charAt(i) === '|') ? '<br>' : text.charAt(i);
            i++; setTimeout(type, speed);
        } else if (callback) callback();
    }
    type();
}

function openGift() {
    const audio = document.getElementById('birthday-audio');
    
    // Nhạc bắt đầu từ phút thứ 1
    const startMusic = () => {
        audio.currentTime = 60;
        audio.play();
        document.getElementById('volume-control').classList.remove('opacity-0');
        
        audio.volume = 0;
        let vol = 0;
        const interval = setInterval(() => {
            if (vol < 1) {
                vol += 0.05; audio.volume = Math.min(vol, 1).toFixed(2);
                document.getElementById('volume-slider').value = audio.volume;
            } else clearInterval(interval);
        }, 500);
    };

    if (audio.readyState >= 1) startMusic();
    else { audio.addEventListener('loadedmetadata', startMusic, { once: true }); audio.load(); }

    // Pháo hoa nổ
    const end = Date.now() + 3000;
    (function frame() {
        confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0 }, colors: ['#ff69b4', '#ff1493'] });
        confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1 }, colors: ['#ff69b4', '#ff1493'] });
        if (Date.now() < end) requestAnimationFrame(frame);
    }());

    // Hiển thị nội dung lời chúc
    document.getElementById('setup').classList.add('hidden');
    document.getElementById('main-content').classList.remove('hidden');
    
    setTimeout(() => {
        document.getElementById('title').classList.remove('opacity-0', 'translate-y-4');
        document.getElementById('card').classList.remove('opacity-0', 'scale-95');
        
        // Thay đổi nội dung lời chúc tại đây
        typeWriter('wish-text', "Chúc mừng sinh nhật em! |Cảm ơn em đã và đang là động lực của anh trong 5 năm qua | Chúc em tuổi mới thật rực rỡ và hạnh phúc.", 60, () => {
            typeWriter('closing-text', "Yêu em rất nhiều! ❤️", 80);
        });
    }, 1000);
}