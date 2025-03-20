const express = require('express');
const router = express.Router();
const { receipts } = require('./process'); // Import receipts
const { format, parseISO } = require('date-fns');

// Function to calculate points based on receipt
function calculatePoints(receipt) {
    let points = 0;
    let llmPoints = 5;

    // One point for every alphanumeric character in the retailer name
    points += (receipt.retailer.match(/[a-z0-9]/gi) || []).length;

    // 50 points if the total is a round dollar amount with no cents
    if (parseFloat(receipt.total) % 1 === 0) {
        points += 50;
    }

    // 25 points if the total is a multiple of 0.25
    if (parseFloat(receipt.total) % 0.25 === 0) {
        points += 25;
    }

    // 5 points for every two items on the receipt
    points += Math.floor(receipt.items.length / 2) * 5;

    // Points for item description length
    receipt.items.forEach(item => {
        if (item.shortDescription.trim().length % 3 === 0) {
            points += Math.ceil(parseFloat(item.price) * 0.2);
        }
    });

    // 6 points if the day in the purchase date is odd
    const day = new Date(receipt.purchaseDate).getDate();
    if (day % 2 !== 0) {
        points += 6;
    }

    // 10 points if the time of purchase is after 2:00pm and before 4:00pm
    const [hour, minute] = receipt.purchaseTime.split(':').map(Number);
    if (hour === 14 || (hour === 15 && minute === 0)) {
        points += 10;
    }

    if (receipt.total > points) {
        points += llmPoints;
    }

    return points;
}

// GET /receipts/{id}/points
router.get('/:id/points', (req, res) => {
    const id = req.params.id;
    const receipt = receipts[id];

    if (!receipt) {
        return res.status(404).json({ error: "No receipt found for that ID. Please verify input." });
    }

    const points = calculatePoints(receipt);
    console.log(`points: ${points}`);
    res.status(200).json({ points });
});

module.exports = router;
