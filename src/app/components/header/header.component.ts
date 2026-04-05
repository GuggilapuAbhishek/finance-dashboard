import { Component } from '@angular/core';
import { RoleService } from '../../services/role.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, FormsModule,CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'] 
})
export class HeaderComponent {

  searchText: string = '';

  constructor(private roleService: RoleService,private router: Router) {}

  toggleRole(event: any) {
    this.roleService.role = event.target.checked ? 'admin' : 'viewer';
  }

  toggleDarkMode(event: any) {
    const isDark = event.target.checked;

    if (isDark) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }

  onSearch() {
    console.log(this.searchText);
  }
  isTransactionsPage() {
  return this.router.url.includes('transactions');
}
}