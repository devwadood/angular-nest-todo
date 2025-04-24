import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoFormComponent } from './todo-form/todo-form.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoPageComponent } from './todo-page.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TodoService } from './todo.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from '../auth/auth.module';
import { MatDialogModule } from '@angular/material/dialog';
import { TodoEditDialogComponent } from './todo-edit-dialog/todo-edit-dialog.component';

@NgModule({
  declarations: [
    TodoFormComponent,
    TodoListComponent,
    TodoPageComponent,
    TodoEditDialogComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatTableModule,
    MatCheckboxModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    AuthModule,
    HttpClientModule,
    RouterModule.forChild([
      { path: 'list', component: TodoListComponent },
      { path: 'form', component: TodoFormComponent },
      { path: 'all', component: TodoPageComponent },
      { path: '**', redirectTo: 'all' }
    ])
  ],
  exports: [
    TodoPageComponent,
    RouterModule
  ],
  providers: [TodoService]
})
export class TodoModule { }
