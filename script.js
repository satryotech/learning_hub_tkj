/* ================================================================
   APPLICATION DATA
   ================================================================ */
const APP = {
    username: "AdminTKJ",
    password: "AdminTKJ",
    modules: ["hardware", "software", "network"],
    quiz: [
        {
            question: "Komponen yang menjadi tempat utama berbagai komponen komputer terhubung adalah...",
            answers: ["Salah Semua", "Keyboard", "Monitor", "Speaker"],
            correct: 0
        },
        {
            question: "RAM termasuk jenis memori yang bersifat...",
            answers: ["Permanen", "Volatile", "Optik", "Magnetik saja"],
            correct: 1
        },
        {
            question: "Software yang mengelola hardware dan menyediakan layanan dasar untuk aplikasi disebut...",
            answers: ["Browser", "Driver printer", "Sistem operasi", "Spreadsheet"],
            correct: 2
        },
        {
            question: "Perangkat yang umum digunakan untuk menghubungkan beberapa perangkat dalam LAN adalah...",
            answers: ["Switch", "Scanner", "Projector", "Keyboard"],
            correct: 0
        },
        {
            question: "Alamat logis yang digunakan pada jaringan IP disebut...",
            answers: ["MAC address", "IP address", "Serial number", "UUID"],
            correct: 1
        },
        {
            question: "Perangkat yang berfungsi menghubungkan jaringan yang berbeda adalah...",
            answers: ["Router", "Mouse", "RAM", "Printer"],
            correct: 0
        },
        {
            question: "Perintah yang umum digunakan untuk menguji keterjangkauan host adalah...",
            answers: ["ping", "format", "mkdir", "rename"],
            correct: 0
        },
        {
            question: "Perangkat penyimpanan yang menggunakan flash memory dan tidak memiliki piringan mekanis adalah...",
            answers: ["HDD", "SSD", "DVD", "Tape"],
            correct: 1
        },
        {
            question: "Fungsi utama PSU pada komputer adalah...",
            answers: ["Menyimpan file", "Menghasilkan gambar", "Menyediakan dan mengatur suplai daya", "Mengatur DNS"],
            correct: 2
        },
        {
            question: "Kebiasaan yang tepat untuk keamanan komputer adalah...",
            answers: ["Menggunakan password yang sama di semua layanan", "Menonaktifkan update selamanya", "Melakukan backup dan update dari sumber tepercaya", "Membagikan password kepada teman"],
            correct: 2
        }
    ],
    glossary: [
        ["CPU", "Central Processing Unit, komponen yang menjalankan instruksi dan pemrosesan utama."],
        ["RAM", "Random Access Memory, memori kerja sementara yang bersifat volatile."],
        ["ROM", "Read Only Memory, istilah umum untuk memori yang datanya relatif tidak berubah atau hanya dibaca pada konteks tertentu."],
        ["GPU", "Graphics Processing Unit, komponen untuk pemrosesan grafis dan komputasi paralel tertentu."],
        ["PSU", "Power Supply Unit, perangkat yang memasok daya listrik sesuai kebutuhan komputer."],
        ["SSD", "Solid State Drive, media penyimpanan berbasis flash tanpa bagian mekanis bergerak."],
        ["HDD", "Hard Disk Drive, media penyimpanan yang menggunakan piringan magnetik dan komponen mekanis."],
        ["Motherboard", "Papan sirkuit utama tempat berbagai komponen komputer terhubung."],
        ["Driver", "Software yang membantu sistem operasi berkomunikasi dengan hardware tertentu."],
        ["Operating System", "Software inti yang mengelola sumber daya komputer dan menyediakan layanan untuk aplikasi."],
        ["LAN", "Local Area Network, jaringan pada area lokal seperti rumah, kelas, atau laboratorium."],
        ["WAN", "Wide Area Network, jaringan yang mencakup area geografis luas."],
        ["IP Address", "Alamat logis pada jaringan IP untuk identifikasi interface/perangkat."],
        ["MAC Address", "Alamat pada interface jaringan di lapisan data link."],
        ["Switch", "Perangkat jaringan yang menghubungkan banyak perangkat dalam jaringan lokal."],
        ["Router", "Perangkat yang menghubungkan jaringan berbeda dan meneruskan paket berdasarkan rute."],
        ["Access Point", "Perangkat yang menyediakan akses wireless ke jaringan."],
        ["DNS", "Domain Name System, sistem yang membantu menerjemahkan nama domain dan alamat IP."],
        ["Gateway", "Perangkat atau alamat yang menjadi jalur menuju jaringan lain."],
        ["Subnet Mask", "Nilai yang membantu menentukan bagian network dan host pada IPv4."],
        ["Ping", "Utilitas untuk menguji keterjangkauan host dan memperoleh informasi waktu respons."],
        ["Packet", "Unit data yang dikirim melalui jaringan."],
        ["Protocol", "Sekumpulan aturan yang mengatur komunikasi antarperangkat atau aplikasi."],
        ["Firewall", "Mekanisme keamanan yang mengontrol lalu lintas jaringan berdasarkan aturan."],
        ["Malware", "Software berbahaya yang dirancang untuk mengganggu, merusak, atau mengambil keuntungan secara tidak sah."],
        ["Phishing", "Upaya menipu pengguna agar memberikan informasi atau melakukan tindakan tertentu melalui pesan/situs palsu."],
        ["Backup", "Salinan data yang dibuat untuk membantu pemulihan ketika data utama bermasalah."],
        ["Firmware", "Software tingkat rendah yang tertanam pada perangkat dan membantu mengendalikan fungsi hardware."],
        ["Bootloader", "Program yang membantu memulai proses pemuatan sistem operasi."],
        ["Troubleshooting", "Proses sistematis untuk menemukan penyebab masalah dan menentukan tindakan perbaikan."]
    ],
    progress: {
        hardware: false,
        software: false,
        network: false,
        lastQuiz: null
    }
};

/* ================================================================
   DOM REFERENCES
   ================================================================ */
const loginScreen = document.getElementById("loginScreen");
const appShell = document.getElementById("appShell");
const loginForm = document.getElementById("loginForm");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const loginError = document.getElementById("loginError");
const togglePassword = document.getElementById("togglePassword");
const sidebar = document.getElementById("sidebar");
const mobileMenu = document.getElementById("mobileMenu");
const globalSearch = document.getElementById("globalSearch");
const themeToggle = document.getElementById("themeToggle");
const infoBtn = document.getElementById("infoBtn");
const infoModal = document.getElementById("infoModal");
const closeModal = document.getElementById("closeModal");
const modalOk = document.getElementById("modalOk");
const toast = document.getElementById("toast");
const securityLockout = document.getElementById("securityLockout");
const securityCountdown = document.getElementById("securityCountdown");

let currentPage = "dashboard";
let quizIndex = 0;
let quizScore = 0;
let selectedAnswer = null;
let quizFinished = false;
let failedLoginAttempts = 0;
let lockoutActive = false;

/* ================================================================
   STORAGE HELPERS
   ================================================================ */
function loadProgress() {
    try {
        const saved = localStorage.getItem("tjkt_learning_progress");
        if (!saved) return;
        const parsed = JSON.parse(saved);
        APP.progress = { ...APP.progress, ...parsed };
    } catch (error) {
        console.warn("Progress tidak dapat dimuat.", error);
    }
}

function saveProgress() {
    try {
        localStorage.setItem("tjkt_learning_progress", JSON.stringify(APP.progress));
    } catch (error) {
        console.warn("Progress tidak dapat disimpan.", error);
    }
}

function saveTheme(theme) {
    try {
        localStorage.setItem("tjkt_learning_theme", theme);
    } catch (error) {
        console.warn("Tema tidak dapat disimpan.", error);
    }
}

function loadTheme() {
    try {
        return localStorage.getItem("tjkt_learning_theme") || "light";
    } catch (error) {
        return "light";
    }
}

/* ================================================================
   LOGIN
   ================================================================ */
function showApp() {
    loginScreen.classList.add("hidden");
    appShell.classList.remove("hidden");
    updateProgressUI();
    renderGlossary();
    renderQuiz();
}

function showLogin() {
    appShell.classList.add("hidden");
    loginScreen.classList.remove("hidden");
    usernameInput.value = "";
    passwordInput.value = "";
    loginError.textContent = "";
}

loginForm.addEventListener("submit", function(event) {
    event.preventDefault();
    if (lockoutActive) return;
    const username = usernameInput.value.trim();
    const password = passwordInput.value;
    if (username === APP.username && password === APP.password) {
        failedLoginAttempts = 0;
        sessionStorage.setItem("tjkt_logged_in", "true");
        loginError.textContent = "";
        showApp();
        showToast("Login berhasil. Selamat belajar!");
    } else {
        failedLoginAttempts += 1;
        loginScreen.classList.add("security-alert");
        loginError.textContent = "Security warning: kredensial tidak valid (" + failedLoginAttempts + "/3).";
        usernameInput.select();
        if (failedLoginAttempts >= 3) {
            activateSecurityLockout();
        }
    }
});

function activateSecurityLockout() {
    lockoutActive = true;
    sessionStorage.removeItem("tjkt_logged_in");
    securityLockout.classList.remove("hidden");
    document.body.style.overflow = "hidden";
    let remaining = 2;
    securityCountdown.textContent = "Terminating session in " + remaining + "…";
    const timer = setInterval(() => {
        remaining -= 1;
        if (remaining > 0) {
            securityCountdown.textContent = "Terminating session in " + remaining + "…";
            return;
        }
        clearInterval(timer);
        securityCountdown.textContent = "Session terminated.";
        setTimeout(() => {
            window.location.replace("about:blank");
        }, 250);
    }, 1000);
}

togglePassword.addEventListener("click", function() {
    const visible = passwordInput.type === "text";
    passwordInput.type = visible ? "password" : "text";
    togglePassword.textContent = visible ? "Lihat" : "Sembunyikan";
});

document.getElementById("logoutBtn").addEventListener("click", function() {
    sessionStorage.removeItem("tjkt_logged_in");
    showLogin();
});

/* ================================================================
   NAVIGATION
   ================================================================ */
function openPage(pageName) {
    const target = document.getElementById(`page-${pageName}`);
    if (!target) return;
    document.querySelectorAll(".page").forEach(page => page.classList.remove("active"));
    document.querySelectorAll(".nav-btn[data-page]").forEach(button => button.classList.remove("active"));
    target.classList.add("active");
    document.querySelectorAll(`.nav-btn[data-page="${pageName}"]`).forEach(button => button.classList.add("active"));
    currentPage = pageName;
    sidebar.classList.remove("open");
    window.scrollTo({ top: 0, behavior: "smooth" });
}

document.querySelectorAll(".nav-btn[data-page]").forEach(button => {
    button.addEventListener("click", function() {
        openPage(button.dataset.page);
    });
});

document.querySelectorAll("[data-go]").forEach(button => {
    button.addEventListener("click", function() {
        openPage(button.dataset.go);
    });
});

document.addEventListener("click", function(event) {
    const button = event.target.closest("[data-page-link]");
    if (!button) return;
    openPage(button.dataset.pageLink);
});

mobileMenu.addEventListener("click", function() {
    sidebar.classList.toggle("open");
});

/* ================================================================
   THEME
   ================================================================ */
function applyTheme(theme) {
    document.body.classList.toggle("dark", theme === "dark");
    themeToggle.textContent = theme === "dark" ? "☀" : "☾";
}

themeToggle.addEventListener("click", function() {
    const next = document.body.classList.contains("dark") ? "light" : "dark";
    applyTheme(next);
    saveTheme(next);
});

/* ================================================================
   MODAL / TOAST
   ================================================================ */
function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove("show"), 2600);
}

function openInfoModal() {
    infoModal.classList.remove("hidden");
}

function closeInfoModal() {
    infoModal.classList.add("hidden");
}

infoBtn.addEventListener("click", openInfoModal);
closeModal.addEventListener("click", closeInfoModal);
modalOk.addEventListener("click", closeInfoModal);
infoModal.addEventListener("click", function(event) {
    if (event.target === infoModal) closeInfoModal();
});

/* ================================================================
   MATERIAL COMPLETION
   ================================================================ */
function markModuleComplete(moduleName) {
    APP.progress[moduleName] = true;
    saveProgress();
    updateProgressUI();
    showToast(`Modul ${moduleName} ditandai selesai.`);
}

document.getElementById("completeHardware").addEventListener("click", () => markModuleComplete("hardware"));
document.getElementById("completeSoftware").addEventListener("click", () => markModuleComplete("software"));
document.getElementById("completeNetwork").addEventListener("click", () => markModuleComplete("network"));

function updateProgressUI() {
    const completed = APP.modules.filter(module => APP.progress[module]).length;
    const percent = Math.round((completed / APP.modules.length) * 100);
    const dashboardProgress = document.getElementById("dashboardProgress");
    const progressPercent = document.getElementById("progressPercent");
    const progressCount = document.getElementById("progressCount");
    const progressBar = document.getElementById("progressBar");
    const dashCourseBar = document.getElementById("dashCourseBar");
    dashboardProgress.textContent = `${percent}%`;
    progressPercent.textContent = `${percent}%`;
    progressCount.textContent = `${completed} dari ${APP.modules.length} modul inti`;
    progressBar.style.width = `${percent}%`;
    dashCourseBar.style.width = `${percent}%`;
    updateModuleStatus("hardware");
    updateModuleStatus("software");
    updateModuleStatus("network");
    if (APP.progress.lastQuiz) {
        document.getElementById("lastQuizText").textContent = `Skor terakhir: ${APP.progress.lastQuiz.score}/${APP.quiz.length} (${APP.progress.lastQuiz.percent}%). Dikerjakan pada ${APP.progress.lastQuiz.date}.`;
    }
}

function updateModuleStatus(moduleName) {
    const status = document.getElementById(`status${capitalize(moduleName)}`);
    const bar = document.getElementById(`bar${capitalize(moduleName)}`);
    const complete = APP.progress[moduleName];
    status.textContent = complete ? "Selesai" : "Belum selesai";
    bar.style.width = complete ? "100%" : "0%";
}

function capitalize(value) {
    return value.charAt(0).toUpperCase() + value.slice(1);
}

document.getElementById("resetProgress").addEventListener("click", function() {
    const confirmed = confirm("Reset seluruh progress dan hasil kuis?");
    if (!confirmed) return;
    APP.progress.hardware = false;
    APP.progress.software = false;
    APP.progress.network = false;
    APP.progress.lastQuiz = null;
    saveProgress();
    updateProgressUI();
    showToast("Progress berhasil direset.");
});

/* ================================================================
   MATERIAL TAB SCROLLING
   ================================================================ */
document.querySelectorAll(".material-tab").forEach(tab => {
    tab.addEventListener("click", function() {
        document.querySelectorAll(".material-tab").forEach(item => item.classList.remove("active"));
        tab.classList.add("active");
        const target = document.getElementById(tab.dataset.target);
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
});

/* ================================================================
   GLOBAL SEARCH
   ================================================================ */
globalSearch.addEventListener("keydown", function(event) {
    if (event.key !== "Enter") return;
    const query = globalSearch.value.trim().toLowerCase();
    if (!query) return;
    const glossaryMatch = APP.glossary.find(item => item[0].toLowerCase().includes(query) || item[1].toLowerCase().includes(query));
    if (glossaryMatch) {
        openPage("glossary");
        document.getElementById("glossarySearch").value = query;
        renderGlossary(query);
        showToast(`Menampilkan hasil glosarium untuk “${query}”.`);
        return;
    }
    const textMatch = [...document.querySelectorAll(".topic-section, .module-card")].find(element => element.textContent.toLowerCase().includes(query));
    if (textMatch) {
        const parentPage = textMatch.closest(".page");
        if (parentPage) openPage(parentPage.id.replace("page-", ""));
        setTimeout(() => textMatch.scrollIntoView({ behavior: "smooth", block: "center" }), 100);
        showToast(`Materi yang cocok dengan “${query}” ditemukan.`);
        return;
    }
    showToast(`Tidak ada hasil untuk “${query}”.`);
});

/* ================================================================
   GLOSSARY
   ================================================================ */
function renderGlossary(filter = "") {
    const grid = document.getElementById("termGrid");
    const normalized = filter.trim().toLowerCase();
    const results = APP.glossary.filter(item => {
        if (!normalized) return true;
        return item[0].toLowerCase().includes(normalized) || item[1].toLowerCase().includes(normalized);
    });
    grid.innerHTML = "";
    if (!results.length) {
        grid.innerHTML = `<div class="card card-pad" style="grid-column:1/-1"><strong>Tidak ditemukan</strong><p class="muted" style="font-size:12px">Coba kata kunci lain.</p></div>`;
        return;
    }
    results.forEach(item => {
        const card = document.createElement("article");
        card.className = "card term-card";
        card.innerHTML = `<strong>${escapeHtml(item[0])}</strong><p>${escapeHtml(item[1])}</p>`;
        grid.appendChild(card);
    });
}

document.getElementById("glossarySearch").addEventListener("input", function() {
    renderGlossary(this.value);
});

document.getElementById("clearGlossary").addEventListener("click", function() {
    document.getElementById("glossarySearch").value = "";
    renderGlossary();
});

function escapeHtml(value) {
    return value.replace(/[&<>'"]/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#39;",
        '"': "&quot;"
    }[character]));
}

/* ================================================================
   QUIZ ENGINE
   ================================================================ */
function resetQuiz() {
    quizIndex = 0;
    quizScore = 0;
    selectedAnswer = null;
    quizFinished = false;
}

function renderQuiz() {
    const container = document.getElementById("quizContainer");
    if (quizFinished) {
        const percent = Math.round((quizScore / APP.quiz.length) * 100);
        container.innerHTML = `
            <div class="card result-card">
                <div class="result-circle">${percent}%</div>
                <h3>Kuis selesai!</h3>
                <p>Kamu mendapatkan ${quizScore} jawaban benar dari ${APP.quiz.length} soal. Gunakan hasil ini sebagai bahan evaluasi belajar.</p>
                <button class="btn primary" id="restartQuiz">Ulangi Kuis</button>
            </div>`;
        document.getElementById("restartQuiz").addEventListener("click", function() {
            resetQuiz();
            renderQuiz();
        });
        return;
    }
    const item = APP.quiz[quizIndex];
    const percent = Math.round((quizIndex / APP.quiz.length) * 100);
    container.innerHTML = `
        <div class="quiz-progress">
            <div class="quiz-progress-row"><span>Progress kuis</span><span>${quizIndex + 1}/${APP.quiz.length}</span></div>
            <div class="progress-track"><div class="progress-bar" style="width:${percent}%"></div></div>
        </div>
        <div class="card question-card">
            <div class="question-number">SOAL ${quizIndex + 1}</div>
            <h3>${escapeHtml(item.question)}</h3>
            <div class="answer-list">
                ${item.answers.map((answer, index) => `<button class="answer-btn" data-answer="${index}">${String.fromCharCode(65 + index)}. ${escapeHtml(answer)}</button>`).join("")}
            </div>
            <div class="quiz-actions">
                <button class="btn" id="prevQuiz" ${quizIndex === 0 ? "disabled" : ""}>← Sebelumnya</button>
                <button class="btn primary" id="nextQuiz">${quizIndex === APP.quiz.length - 1 ? "Selesai" : "Berikutnya →"}</button>
            </div>
        </div>`;
    document.querySelectorAll(".answer-btn").forEach(button => {
        button.addEventListener("click", function() {
            selectedAnswer = Number(button.dataset.answer);
            document.querySelectorAll(".answer-btn").forEach(itemButton => itemButton.classList.remove("selected"));
            button.classList.add("selected");
        });
    });
    document.getElementById("prevQuiz").addEventListener("click", function() {
        if (quizIndex <= 0) return;
        quizIndex -= 1;
        selectedAnswer = null;
        renderQuiz();
    });
    document.getElementById("nextQuiz").addEventListener("click", function() {
        if (selectedAnswer === null) {
            showToast("Pilih salah satu jawaban terlebih dahulu.");
            return;
        }
        if (selectedAnswer === item.correct) quizScore += 1;
        if (quizIndex === APP.quiz.length - 1) {
            finishQuiz();
            return;
        }
        quizIndex += 1;
        selectedAnswer = null;
        renderQuiz();
    });
}

function finishQuiz() {
    quizFinished = true;
    const percent = Math.round((quizScore / APP.quiz.length) * 100);
    APP.progress.lastQuiz = {
        score: quizScore,
        percent,
        date: new Date().toLocaleString("id-ID")
    };
    saveProgress();
    updateProgressUI();
    renderQuiz();
    showToast(`Kuis selesai dengan skor ${percent}%.`);
}

/* ================================================================
   INITIALIZATION
   ================================================================ */
loadProgress();
applyTheme(loadTheme());

if (sessionStorage.getItem("tjkt_logged_in") === "true") {
    showApp();
}

/* ================================================================
   KEYBOARD SHORTCUTS
   ================================================================ */
document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        closeInfoModal();
        sidebar.classList.remove("open");
    }
    if (event.ctrlKey && event.key.toLowerCase() === "k") {
        event.preventDefault();
        globalSearch.focus();
    }
});

/* ================================================================
   ACCESSIBILITY HELPERS
   ================================================================ */
document.querySelectorAll("button").forEach(button => {
    button.addEventListener("keydown", function(event) {
        if (event.key === "Enter" || event.key === " ") {
            button.classList.add("keyboard-focus");
        }
    });
});
