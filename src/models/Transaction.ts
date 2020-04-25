import { uuid } from 'uuidv4';

class Transaction {
  id: string;

  title: string;

  value: number;

  type: 'income' | 'outcome';

  // Model to set pattern when a transaction is created on database
  constructor({ title, value, type }: Omit<Transaction, 'id'>) {
    this.id = uuid();
    this.title = title;
    this.value = value;
    this.type = type;
  }
}

export default Transaction;
