import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

// List all transactions and balance with incomes and outcomes
transactionRouter.get('/', (request, response) => {
  try {
    const transactions = {
      transactions: transactionsRepository.all(),
      balance: transactionsRepository.getBalance(),
    };

    return response.json(transactions);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

// Create a new transactions with income or outcome
transactionRouter.post('/', (request, response) => {
  try {
    const { title, value, type } = request.body;

    const createTransactionService = new CreateTransactionService(
      transactionsRepository,
    );

    const transaction = createTransactionService.execute({
      title,
      value,
      type,
    });

    return response.json(transaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
