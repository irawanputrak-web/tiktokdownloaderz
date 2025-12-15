const form = document.getElementById("downloadForm");
const input = document.getElementById("tiktokUrl");
const statusText = document.getElementById("statusText");
const loading = document.getElementById("loading");
const button = document.getElementById("downloadBtn");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const url = input.value.trim();
    statusText.innerText = "";

    if (!url) {
        statusText.innerText = "❌ Link tidak boleh kosong";
        return;
    }

    const tiktokRegex = /^(https?:\/\/)?(www\.)?(tiktok\.com|vt\.tiktok\.com|vm\.tiktok\.com)\/.+/i;
    if (!tiktokRegex.test(url)) {
        statusText.innerText = "❌ Link bukan TikTok";
        return;
    }

    loading.style.display = "block";
    button.disabled = true;
    button.innerText = "Memproses...";

    try {
        // 🔥 LANGSUNG BUKA ENDPOINT DOWNLOAD
        window.location.href = `http://localhost:3000/download?url=${encodeURIComponent(url)}`;
        statusText.innerText = "✅ Download dimulai";
    } catch (err) {
        statusText.innerText = "❌ Server error";
    }

    loading.style.display = "none";
    button.disabled = false;
    button.innerText = "Download";
});
