const express = require('express');
const app = express();
const multer = require('multer');
const path = require('path');

// Set storage engine for file uploads
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, // Limit file size to 1MB
}).single('myImage');

// Serve static files from the 'public' folder
app.use(express.static('public'));

// Route for uploading file
app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.send('Error uploading file');
        } else {
            if (req.file == undefined) {
                res.send('No file selected');
            } else {
                res.send(`File uploaded successfully: ${req.file.filename}`);
            }
        }
    });
});

// Route to serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
