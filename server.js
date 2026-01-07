const express = require('express');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const app = express();

// Otomatis buat folder uploads
const uploadDir = path.join(__dirname, 'public/uploads');
if (!fs.existsSync(uploadDir)) { fs.mkdirSync(uploadDir, { recursive: true }); }

const storage = multer.diskStorage({
    destination: 'public/uploads/',
    filename: (req, file, cb) => {
        cb(null, 'bukti-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/upload', upload.single('proof'), (req, res) => {
    if (req.file) { res.json({ success: true, filename: req.file.filename }); }
    else { res.json({ success: false }); }
});

app.listen(3000, '0.0.0.0', () => {
    console.log('🚀 Server NO FA$T Aktif di http://localhost:3000');
});

