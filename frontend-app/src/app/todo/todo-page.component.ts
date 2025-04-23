import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.scss'],
  standalone: false,
})
export class TodoPageComponent {
  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}
