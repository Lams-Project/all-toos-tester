/* =========================================================
ALX TOOLS
ALL-IN-ONE TOOL APPLICATION
app.js
========================================================= */

/* =========================================================
DOM
========================================================= */

const searchInput =
document.getElementById("searchInput");

const heroSearch =
document.getElementById("heroSearch");

const cards =
document.querySelectorAll(".tool-card");

const filters =
document.querySelectorAll(".filter");

const noResult =
document.getElementById("noResult");

const modal =
document.getElementById("toolModal");

const modalContent =
document.getElementById("modalContent");

const sidebar =
document.getElementById("sidebar");

const menuBtn =
document.getElementById("menuBtn");

const themeBtn =
document.getElementById("themeBtn");

/* =========================================================
SEARCH
========================================================= */

function searchTools(query) {

query =
    String(query || "")
    .toLowerCase()
    .trim();

let found = 0;

cards.forEach(card => {

    const name =
        (card.dataset.name || "")
        .toLowerCase();

    const category =
        (card.dataset.category || "")
        .toLowerCase();

    const visible =
        name.includes(query) ||
        category.includes(query);

    if (visible) {

        card.style.display = "";

        found++;

    } else {

        card.style.display = "none";

    }

});

if (noResult) {

    noResult.style.display =
        found === 0
        ? "block"
        : "none";

}

}

/* TOP SEARCH */

if (searchInput) {

searchInput.addEventListener(
    "input",
    () => {

        if (heroSearch) {

            heroSearch.value =
                searchInput.value;

        }

        searchTools(
            searchInput.value
        );

    }
);

}

/* HERO SEARCH */

if (heroSearch) {

heroSearch.addEventListener(
    "input",
    () => {

        if (searchInput) {

            searchInput.value =
                heroSearch.value;

        }

        searchTools(
            heroSearch.value
        );

    }
);

}

/* ENTER SEARCH */

if (heroSearch) {

heroSearch.addEventListener(
    "keydown",
    event => {

        if (event.key === "Enter") {

            runSearch();

        }

    }
);

}

function runSearch() {

const query =
    heroSearch
    ? heroSearch.value
    : "";

searchTools(query);

const tools =
    document.getElementById("tools");

if (tools) {

    tools.scrollIntoView({
        behavior: "smooth"
    });

}

}

/* =========================================================
CATEGORY FILTER
========================================================= */

filters.forEach(filter => {

filter.addEventListener(
    "click",
    () => {

        filters.forEach(item => {

            item.classList.remove(
                "active"
            );

        });

        filter.classList.add(
            "active"
        );

        const category =
            filter.dataset.filter;

        let found = 0;

        cards.forEach(card => {

            const cardCategory =
                card.dataset.category;

            if (
                category === "all" ||
                cardCategory === category
            ) {

                card.style.display = "";

                found++;

            } else {

                card.style.display =
                    "none";

            }

        });

        if (noResult) {

            noResult.style.display =
                found === 0
                ? "block"
                : "none";

        }

    }
);

});

/* =========================================================
SIDEBAR
========================================================= */

if (menuBtn) {

menuBtn.addEventListener(
    "click",
    () => {

        sidebar.classList.toggle(
            "open"
        );

    }
);

}

/* CLOSE SIDEBAR AFTER CLICK */

document
.querySelectorAll(".nav-item")
.forEach(item => {

    item.addEventListener(
        "click",
        () => {

            if (sidebar) {

                sidebar.classList.remove(
                    "open"
                );

            }

        }
    );

});

/* =========================================================
THEME
========================================================= */

if (themeBtn) {

themeBtn.addEventListener(
    "click",
    () => {

        document.body.classList.toggle(
            "light-mode"
        );

        const light =
            document.body.classList.contains(
                "light-mode"
            );

        themeBtn.textContent =
            light
            ? "☀"
            : "☾";

    }
);

}

/* =========================================================
MODAL
========================================================= */

function openTool(tool) {

if (!modal || !modalContent) {
    return;
}

modalContent.innerHTML =
    getToolHTML(tool);

modal.classList.add(
    "show"
);

}

function closeTool() {

if (!modal) {
    return;
}

modal.classList.remove(
    "show"
);

}

/* CLICK OUTSIDE */

if (modal) {

modal.addEventListener(
    "click",
    event => {

        if (
            event.target === modal
        ) {

            closeTool();

        }

    }
);

}

/* ESCAPE */

document.addEventListener(
"keydown",
event => {

    if (
        event.key === "Escape"
    ) {

        closeTool();

    }

}

);

/* =========================================================
TOOL TEMPLATE
========================================================= */

function toolHeader(
iconClass,
icon,
title,
description
) {

return `

    <div class="tool-header">

        <div class="tool-icon ${iconClass}">
            ${icon}
        </div>

        <h2>${title}</h2>

        <p>${description}</p>

    </div>

`;

}

function getToolHTML(tool) {

/* =====================================================
   TIKTOK DOWNLOADER
===================================================== */

if (tool === "tiktok") {

    return (

        toolHeader(
            "pink",
            "♪",
            "TikTok Downloader",
            "Masukkan URL TikTok untuk memproses media publik."
        )

        + `

        <div class="tool-form">

            <input
                class="input"
                id="downloadURL"
                placeholder="https://www.tiktok.com/...">

            <select
                class="input"
                id="downloadFormat">

                <option value="mp4">
                    MP4 Video
                </option>

                <option value="mp3">
                    MP3 Audio
                </option>

                <option value="jpg">
                    JPG
                </option>

                <option value="png">
                    PNG
                </option>

            </select>

            <button
                class="primary-btn"
                onclick="handleDownloader()">

                ⚡ Process URL

            </button>

            <div
                class="result-box"
                id="downloadResult">
            </div>

        </div>

        `

    );

}


/* =====================================================
   YOUTUBE DOWNLOADER
===================================================== */

if (tool === "youtube") {

    return (

        toolHeader(
            "red",
            "▶",
            "YouTube Downloader",
            "Masukkan URL video yang boleh kamu gunakan."
        )

        + `

        <div class="tool-form">

            <input
                class="input"
                id="downloadURL"
                placeholder="https://youtube.com/...">

            <select
                class="input"
                id="downloadFormat">

                <option value="mp4">
                    MP4 Video
                </option>

                <option value="mp3">
                    MP3 Audio
                </option>

            </select>

            <button
                class="primary-btn"
                onclick="handleDownloader()">

                Process URL

            </button>

            <div
                class="result-box"
                id="downloadResult">
            </div>

        </div>

        `

    );

}


/* =====================================================
   IMAGE CONVERTER
===================================================== */

if (tool === "image-converter") {

    return (

        toolHeader(
            "purple",
            "▧",
            "Image Converter",
            "Konversi JPG, PNG dan WEBP langsung di browser."
        )

        + `

        <div class="tool-form">

            <div class="file-drop">

                🖼️

                <br><br>

                Pilih gambar

                <br><br>

                <input
                    type="file"
                    id="imageFile"
                    accept="image/*">

            </div>

            <select
                class="input"
                id="imageFormat">

                <option value="image/png">
                    PNG
                </option>

                <option value="image/jpeg">
                    JPG
                </option>

                <option value="image/webp">
                    WEBP
                </option>

            </select>

            <button
                class="primary-btn"
                onclick="convertImage()">

                Convert Image

            </button>

            <div
                class="result-box"
                id="imageResult">
            </div>

        </div>

        `

    );

}


/* =====================================================
   IMAGE COMPRESSOR
===================================================== */

if (tool === "compressor") {

    return (

        toolHeader(
            "blue",
            "▣",
            "Image Compressor",
            "Kompres gambar menggunakan browser kamu."
        )

        + `

        <div class="tool-form">

            <div class="file-drop">

                📦

                <br><br>

                Pilih gambar

                <br><br>

                <input
                    type="file"
                    id="compressFile"
                    accept="image/*">

            </div>

            <button
                class="primary-btn"
                onclick="compressImage()">

                Compress Image

            </button>

            <div
                class="result-box"
                id="compressResult">
            </div>

        </div>

        `

    );

}


/* =====================================================
   IMAGE RESIZER
===================================================== */

if (tool === "resizer") {

    return (

        toolHeader(
            "cyan",
            "↔",
            "Image Resizer",
            "Atur ukuran gambar sesuai kebutuhan."
        )

        + `

        <div class="tool-form">

            <input
                class="input"
                type="file"
                id="resizeFile"
                accept="image/*">

            <input
                class="input"
                type="number"
                id="resizeWidth"
                placeholder="Width">

            <input
                class="input"
                type="number"
                id="resizeHeight"
                placeholder="Height">

            <button
                class="primary-btn"
                onclick="resizeImage()">

                Resize Image

            </button>

            <div
                class="result-box"
                id="resizeResult">
            </div>

        </div>

        `

    );

}


/* =====================================================
   VIDEO
===================================================== */

if (tool === "video") {

    return (

        toolHeader(
            "orange",
            "▶",
            "Video Tool",
            "Pilih video lokal untuk melihat informasi file."
        )

        + `

        <div class="tool-form">

            <div class="file-drop">

                🎬

                <br><br>

                <input
                    type="file"
                    id="videoFile"
                    accept="video/*">

            </div>

            <button
                class="primary-btn"
                onclick="inspectVideo()">

                Inspect Video

            </button>

            <div
                class="result-box"
                id="videoResult">
            </div>

        </div>

        `

    );

}


/* =====================================================
   AUDIO
===================================================== */

if (tool === "audio") {

    return (

        toolHeader(
            "green",
            "♫",
            "Audio Tool",
            "Pilih audio lokal untuk melihat informasi file."
        )

        + `

        <div class="tool-form">

            <div class="file-drop">

                🎧

                <br><br>

                <input
                    type="file"
                    id="audioFile"
                    accept="audio/*">

            </div>

            <button
                class="primary-btn"
                onclick="inspectAudio()">

                Inspect Audio

            </button>

            <div
                class="result-box"
                id="audioResult">
            </div>

        </div>

        `

    );

}


/* =====================================================
   QR GENERATOR
===================================================== */

if (tool === "qr") {

    return (

        toolHeader(
            "yellow",
            "▦",
            "QR Generator",
            "Buat QR Code dari teks atau URL."
        )

        + `

        <div class="tool-form">

            <input
                class="input"
                id="qrInput"
                placeholder="https://example.com">

            <button
                class="primary-btn"
                onclick="generateQR()">

                Generate QR

            </button>

            <div
                class="result-box"
                id="qrResult">
            </div>

        </div>

        `

    );

}


/* =====================================================
   JSON FORMATTER
===================================================== */

if (tool === "json") {

    return (

        toolHeader(
            "cyan",
            "{}",
            "JSON Formatter",
            "Format dan validasi JSON dengan cepat."
        )

        + `

        <div class="tool-form">

            <textarea
                id="jsonInput"
                placeholder='{"name":"ALX","tools":20}'></textarea>

            <button
                class="primary-btn"
                onclick="formatJSON()">

                Format JSON

            </button>

            <div
                class="result-box"
                id="jsonResult">
            </div>

        </div>

        `

    );

}


/* =====================================================
   BASE64
===================================================== */

if (tool === "base64") {

    return (

        toolHeader(
            "violet",
            "⌁",
            "Base64 Encoder / Decoder",
            "Encode dan decode text menggunakan Base64."
        )

        + `

        <div class="tool-form">

            <textarea
                id="baseInput"
                placeholder="Masukkan teks..."></textarea>

            <button
                class="primary-btn"
                onclick="encodeBase64()">

                Encode

            </button>

            <br><br>

            <button
                class="primary-btn"
                onclick="decodeBase64()">

                Decode

            </button>

            <div
                class="result-box"
                id="baseResult">
            </div>

        </div>

        `

    );

}


/* =====================================================
   URL TOOL
===================================================== */

if (tool === "url") {

    return (

        toolHeader(
            "blue",
            "🔗",
            "URL Encoder / Decoder",
            "Encode atau decode string URL."
        )

        + `

        <div class="tool-form">

            <textarea
                id="urlInput"
                placeholder="Masukkan URL..."></textarea>

            <button
                class="primary-btn"
                onclick="encodeURL()">

                Encode URL

            </button>

            <br><br>

            <button
                class="primary-btn"
                onclick="decodeURL()">

                Decode URL

            </button>

            <div
                class="result-box"
                id="urlResult">
            </div>

        </div>

        `

    );

}


/* =====================================================
   PASSWORD
===================================================== */

if (tool === "password") {

    return (

        toolHeader(
            "green",
            "⚿",
            "Password Generator",
            "Generate password secara lokal di browser."
        )

        + `

        <div class="tool-form">

            <input
                class="input"
                type="number"
                id="passwordLength"
                value="16"
                min="4"
                max="128">

            <button
                class="primary-btn"
                onclick="generatePassword()">

                Generate Password

            </button>

            <br><br>

            <input
                class="input"
                id="passwordResult"
                readonly
                placeholder="Generated password">

        </div>

        `

    );

}


return `

    <div class="tool-header">

        <h2>Tool tidak ditemukan</h2>

        <p>
            Tool yang kamu pilih belum tersedia.
        </p>

    </div>

`;

}

/* =========================================================
DOWNLOADER
========================================================= */

function handleDownloader() {

const url =
    document.getElementById(
        "downloadURL"
    ).value.trim();

const format =
    document.getElementById(
        "downloadFormat"
    ).value;

const result =
    document.getElementById(
        "downloadResult"
    );

if (!url) {

    showResult(
        result,
        "⚠ Masukkan URL terlebih dahulu."
    );

    return;

}

showResult(
    result,

    `
    <b>URL diterima.</b>

    <br><br>

    Format:
    <b>${format.toUpperCase()}</b>

    <br><br>

    <small>
    Downloader API belum disambungkan.
    Frontend sudah siap untuk menerima
    endpoint backend.
    </small>
    `

);

}

/* =========================================================
IMAGE CONVERTER
========================================================= */

function convertImage() {

const file =
    document.getElementById(
        "imageFile"
    ).files[0];

const format =
    document.getElementById(
        "imageFormat"
    ).value;

const result =
    document.getElementById(
        "imageResult"
    );

if (!file) {

    showResult(
        result,
        "⚠ Pilih gambar terlebih dahulu."
    );

    return;

}

const reader =
    new FileReader();

reader.onload = event => {

    const img =
        new Image();

    img.onload = () => {

        const canvas =
            document.createElement(
                "canvas"
            );

        canvas.width =
            img.width;

        canvas.height =
            img.height;

        const ctx =
            canvas.getContext(
                "2d"
            );

        ctx.drawImage(
            img,
            0,
            0
        );

        const data =
            canvas.toDataURL(
