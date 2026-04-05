import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionService } from '../../services/transaction.service';
import { Chart } from 'chart.js/auto';
import { InsightsComponent } from "../insights/insights.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, InsightsComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  transactions: any[] = [];

  income = 0;
  expense = 0;
  balance = 0;
  topCategory = '';

  constructor(private transactionService: TransactionService) {}
loading = true;

ngOnInit() {
  this.loading = true;

  setTimeout(() => {
    this.loadData();
    this.loading = false;
  }, 800); // fake smooth loading
}

  loadData() {
    this.transactions = this.transactionService.getTransactions();

    this.transactions = this.transactions.filter(t =>
      t.date && t.amount > 0 && t.category && t.type
    );

    this.calculateValues();
    this.getTopCategory();

    // destroy old charts
    Chart.getChart('pieChart')?.destroy();
    Chart.getChart('lineChart')?.destroy();

    this.createPieChart();
    this.createLineChart();
  }

  calculateValues() {
    this.income = this.transactions
      .filter(t => t.type === 'income')
      .reduce((a, b) => a + b.amount, 0);

    this.expense = this.transactions
      .filter(t => t.type === 'expense')
      .reduce((a, b) => a + b.amount, 0);

    this.balance = this.income - this.expense;
  }

  createPieChart() {
    let map: any = {};

    this.transactions.forEach(t => {
      if (t.type === 'expense') {
        map[t.category] = (map[t.category] || 0) + t.amount;
      }
    });

    new Chart('pieChart', {
      type: 'pie',
      data: {
        labels: Object.keys(map),
        datasets: [{
          data: Object.values(map)
        }]
      }
    });
  }

  createLineChart() {
    const dates = this.transactions.map(t => t.date);

    let balance = 0;
    const data = this.transactions.map(t => {
      balance += t.type === 'income' ? t.amount : -t.amount;
      return balance;
    });

    new Chart('lineChart', {
      type: 'line',
      data: {
        labels: dates,
        datasets: [{
          label: 'Balance Trend',
          data: data,
          tension: 0.4
        }]
      }
    });
  }

  getTopCategory() {
    let map: any = {};

    this.transactions.forEach(t => {
      if (t.type === 'expense') {
        map[t.category] = (map[t.category] || 0) + t.amount;
      }
    });

    this.topCategory = Object.keys(map).reduce((a, b) =>
      map[a] > map[b] ? a : b
    , '');
  }
}