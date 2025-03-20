const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

// In-memory storage for receipts
const receipts = {};

// Function to validate receipt data
const isValidReceipt = (receipt) => {
    const { retailer, purchaseDate, purchaseTime, items, total } = receipt;

    // Check if required fields exist and are properly formatted
    if (!retailer || !purchaseDate || !purchaseTime || !items || !total) {
        return false;
    }

    // Ensure items is an array with at least one item
    if (!Array.isArray(items) || items.length === 0) {
        return false;
    }

    // Validate total is a number
    if (isNaN(total) || total <= 0) {
        return false;
    }

    return true;
};

// POST /receipts/process
router.post('/process', (req, res) => {
    const receipt = req.body;

    // Validate receipt data
    if (!isValidReceipt(receipt)) {
        return res.status(400).json({ error: "The receipt is invalid. Please verify input." });
    }

    // Generate a unique ID for the receipt
    const id = uuidv4();

    // Store the receipt
    receipts[id] = receipt;
    console.log(`id: ${id}`);

    res.status(200).json({ id });
});

module.exports = { router, receipts };
