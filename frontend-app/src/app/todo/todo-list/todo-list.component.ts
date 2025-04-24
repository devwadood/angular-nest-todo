// src/app/todo/todo-list/todo-list.component.ts
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TodoService } from '../todo.service';
import { TodoEditDialogComponent } from '../todo-edit-dialog/todo-edit-dialog.component';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  standalone: false,
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  displayedColumns: string[] = ['id', 'title', 'completed', 'actions'];

  constructor(private todoService: TodoService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadTodos();
    this.todoService.refreshNeeded.subscribe(() => {
      this.loadTodos();
    });
  }

  private loadTodos() {
    this.todoService.findAll().subscribe((todos) => {
      this.todos = todos;
    });
  }

  editTodo(todo: Todo) {
    const dialogRef = this.dialog.open(TodoEditDialogComponent, {
      width: '300px',
      data: { todo }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const updatedTodo = { ...todo, ...result };
        this.todoService.update(updatedTodo.id, updatedTodo).subscribe(() => {
          this.loadTodos();
        });
      }
    });
  }

  deleteTodo(id: number) {
    this.todoService.remove(id).subscribe(() => {
      this.loadTodos();
    });
  }
}