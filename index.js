const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());

app.get("/download", (req, res) => {
    const url = req.query.url;

    if (!url) {
        return res.status(400).send("URL kosong");
    }

    res.setHeader(
        "Content-Disposition",
        'attachment; filename="video-tiktok.mp4"'
    );
    res.setHeader("Content-Type", "video/mp4");

    const cmd = `yt-dlp -f mp4 -o - "${url}"`;

    exec(cmd, { maxBuffer: 1024 * 1024 * 200 }, (err, stdout) => {
        if (err) {
            console.error("YTDLP ERROR:", err);
            return res.status(500).end("Download gagal");
        }
        res.end(stdout);
    });
});

app.listen(3000, () => {
    console.log("✅ Server jalan di http://localhost:3000");
});
