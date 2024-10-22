const express = require('express');
const Transaction = require('../models/transaction.model.js');
const Category = require('../models/category.model.js');
const router = express.Router();

// Add a new transaction
router.post('/transactions', async (req, res) => {
  const { type, category, amount, description } = req.body;
  try {
    const transaction = new Transaction({ type, category, amount, description });
    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all transactions
router.get('/transactions', async (req, res) => {
  try {
    const transactions = await Transaction.find().populate('category');
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a transaction by ID
router.get('/transactions/:id', async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id).populate('category');
    if (!transaction) return res.status(404).json({ message: 'Transaction not found' });
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a transaction
router.put('/transactions/:id', async (req, res) => {
  try {
    const { type, category, amount, description } = req.body;
    const transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      { type, category, amount, description },
      { new: true }
    );
    if (!transaction) return res.status(404).json({ message: 'Transaction not found' });
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a transaction
router.delete('/transactions/:id', async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndDelete(req.params.id);
    if (!transaction) return res.status(404).json({ message: 'Transaction not found' });
    res.json({ message: 'Transaction deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Summary route
router.get('/summary', async (req, res) => {
  try {
    const transactions = await Transaction.find();
    const income = transactions
      .filter((t) => t.type === 'income')
      .reduce((acc, curr) => acc + curr.amount, 0);
    const expenses = transactions
      .filter((t) => t.type === 'expense')
      .reduce((acc, curr) => acc + curr.amount, 0);
    const balance = income - expenses;
    res.json({ totalIncome: income, totalExpenses: expenses, balance });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
