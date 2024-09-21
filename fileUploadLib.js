
const express = require('express');
const multer = require('multer');
const path = require('path');


const upload = multer({
    dest: 'uploads/', // Destination folder for uploaded files
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
    fileFilter: (req, file, cb) => {
        // Only allow specific file types (e.g., images)
        const fileTypes = /jpeg|jpg|png|gif/;
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimeType = fileTypes.test(file.mimetype);
        
        if (extname && mimeType) {
            return cb(null, true);
        } else {
            cb('Error: File type not supported!');
        }
    }
});

// Initialize the upload route
function setupUploadRoutes(app) {
    app.post('/upload', upload.single('file'), (req, res) => {
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }
        res.send(`File uploaded successfully: ${req.file.originalname}`);
    });
}

module.exports = { setupUploadRoutes };
