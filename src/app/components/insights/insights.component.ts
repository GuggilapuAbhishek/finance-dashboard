import { Component } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-insights',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './insights.component.html',
  styleUrl: './insights.component.css'
})
export class InsightsComponent {

  transactions: any[] = [];
  topCategory: string = 'No Data';
  totalExpense: number = 0;

  constructor(private transactionService: TransactionService) {}

  ngOnInit() {
    this.loadData();

    this.transactionService.subscribe(() => {
      this.loadData(); // 🔥 auto update
    });
  }

  loadData() {
    this.transactions = this.transactionService.getTransactions();
    this.calculateInsights();
  }

  calculateInsights() {
    let map: any = {};
    this.totalExpense = 0;

    this.transactions.forEach(t => {
      if (t.type === 'expense') {
        map[t.category] = (map[t.category] || 0) + t.amount;
        this.totalExpense += t.amount;
      }
    });

    const keys = Object.keys(map);

    this.topCategory = keys.length
      ? keys.reduce((a, b) => (map[a] > map[b] ? a : b))
      : 'No Data';
  }

}
