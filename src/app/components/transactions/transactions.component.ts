import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RoleService } from '../../services/role.service';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  editingId: number | null = null;

  newTransaction = {
    date: '',
    amount: null as number | null,
    category: '',
    type: 'expense'
  };

  transactions: any[] = [];
  filteredTransactions: any[] = [];
  searchText = '';

  constructor(
    private transactionService: TransactionService,
    public roleService: RoleService
  ) {}

  ngOnInit() {
    this.loadData();

    this.transactionService.subscribe(() => {
      this.loadData();
    });
  }

  loadData() {
    this.transactions = this.transactionService.getTransactions();

    this.transactions = this.transactions.filter(t =>
      t.date && t.amount > 0 && t.category && t.type
    );

    this.filteredTransactions = this.transactions;

    this.createChart();
  }

  filterTransactions() {
    this.filteredTransactions = this.transactions.filter(t =>
      t.category.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  addTransaction() {
    if (!this.newTransaction.date || !this.newTransaction.amount || !this.newTransaction.category) {
      alert('Fill all fields');
      return;
    }

    this.transactionService.addTransaction({
      ...this.newTransaction,
      category: this.newTransaction.category.toLowerCase(),
      id: Date.now()
    });

    this.resetForm();
  }

  editTransaction(t: any) {
    this.editingId = t.id;

    this.newTransaction = {
      date: t.date,
      amount: t.amount,
      category: t.category,
      type: t.type
    };
  }

  updateTransaction() {
    if (this.editingId === null) return;

    this.transactionService.updateTransaction({
      ...this.newTransaction,
      id: this.editingId
    });

    this.editingId = null;
    this.resetForm();
  }

  deleteTransaction(id: number) {
    this.transactionService.deleteTransaction(id);
  }

  resetForm() {
    this.newTransaction = {
      date: '',
      amount: null,
      category: '',
      type: 'expense'
    };
  }

  createChart() {
    if (Chart.getChart('transactionChart')) {
      Chart.getChart('transactionChart')?.destroy();
    }

    let map: any = {};

    this.transactions.forEach(t => {
      if (t.type === 'expense') {
        map[t.category] = (map[t.category] || 0) + t.amount;
      }
    });

    new Chart('transactionChart', {
      type: 'pie',
      data: {
        labels: Object.keys(map),
        datasets: [{
          data: Object.values(map)
        }]
      }
    });
  }
}