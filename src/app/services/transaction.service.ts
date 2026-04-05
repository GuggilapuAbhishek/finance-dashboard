import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor() {}

  private defaultData = [
    { id: 1, date: '2026-03-01', amount: 5000, category: 'salary', type: 'income' },
    { id: 2, date: '2026-03-02', amount: 200, category: 'food', type: 'expense' },
    { id: 3, date: '2026-03-03', amount: 1000, category: 'shopping', type: 'expense' }
  ];

  listeners: any[] = [];

  subscribe(fn: any) {
    this.listeners.push(fn);
  }

  notify() {
    this.listeners.forEach(fn => fn());
  }

  getTransactions() {
    const data = localStorage.getItem('transactions');
    return data ? JSON.parse(data) : this.defaultData;
  }

  saveTransactions(data: any[]) {
    localStorage.setItem('transactions', JSON.stringify(data));
  }

  addTransaction(tx: any) {
    const current = this.getTransactions();
    current.push(tx);
    this.saveTransactions(current);
    this.notify();
  }

  deleteTransaction(id: number) {
    let current = this.getTransactions();
    current = current.filter((t: { id: number; }) => t.id !== id);
    this.saveTransactions(current);
    this.notify();
  }

  updateTransaction(updated: any) {
    let current = this.getTransactions();

    current = current.map((t: { id: any; }) =>
      t.id === updated.id ? updated : t
    );

    this.saveTransactions(current);
    this.notify();
  }
}