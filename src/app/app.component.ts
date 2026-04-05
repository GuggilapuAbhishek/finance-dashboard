import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TransactionsComponent } from "./components/transactions/transactions.component";
import { OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RoleService } from './services/role.service';
import { HeaderComponent } from './components/header/header.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule,HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'finance';
  role: string = 'viewer';
constructor(private roleService: RoleService) {}

toggleRole(event: any) {
  this.roleService.role = event.target.checked ? 'admin' : 'viewer';
}
}
