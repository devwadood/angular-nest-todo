import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';

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
  displayedColumns: string[] = ['id', 'title', 'completed'];

  constructor(private todoService: TodoService) {}

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
}