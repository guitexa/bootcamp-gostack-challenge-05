import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface CreateTransaction {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  // Use the database instantiated
  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  // Create a new transaction
  public execute({ title, value, type }: CreateTransaction): Transaction {
    const findEnoughBalance = this.transactionsRepository.getBalance().total;

    if (value > findEnoughBalance && type === 'outcome') {
      throw Error('You have no funds to withdraw');
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return transaction;
  }
}

export default CreateTransactionService;
