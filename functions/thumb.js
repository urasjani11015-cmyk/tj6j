// thumb.js - Generating Canvas Image with Play Overlay & GIF Headers

const express = require('express');
const { createCanvas, loadImage } = require('canvas');
const app = express();

app.get('/thumb', async (req, res) => {
    try {
        // 1. Canvas Dimensions Set Karein (Dimensions based on your image)
        const width = 1614;
        const height = 858;
        const canvas = createCanvas(width, height);
        const ctx = canvas.getContext('2d');

        // 2. Main Background Image Load Karein
        // Apni main image ka URL yahan Dalein
        const mainImageUrl = 'ththth.jpg'; 
        const image = await loadImage(mainImageUrl);
        
        // Canvas par Image draw karein
        ctx.drawImage(image, 0, 0, width, height);

        // 3. Middle me Video Play Icon Overlay Banayein
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = 50;

        // Semi-transparent dark circle
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2, false);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
        ctx.fill();
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#ffffff';
        ctx.stroke();

        // Play Triangle Icon
        ctx.beginPath();
        ctx.moveTo(centerX - 15, centerY - 25);
        ctx.lineTo(centerX + 25, centerY);
        ctx.lineTo(centerX - 15, centerY + 25);
        ctx.closePath();
        ctx.fillStyle = '#ffffff';
        ctx.fill();

        // 4. Facebook/Browser Trick: Content-Type GIF Set Karein
        res.setHeader('Content-Type', 'image/gif');
        res.setHeader('Cache-Control', 'public, max-age=86400');

        // Canvas output ko buffer banakar send karein
        const buffer = canvas.toBuffer('image/png'); // Sending image buffer with GIF header
        res.send(buffer);

    } catch (error) {
        console.error('Error generating thumbnail:', error);
        res.status(500).send('Error generating thumbnail');
    }
});

// Server Start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Thumbnail server running on port ${PORT}`);
});
