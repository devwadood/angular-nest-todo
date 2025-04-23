// src/todo/todo.service.ts
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environments';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Todo } from './dto/todo.interface'; // Assume you have a Todo model

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = `${environment.apiBaseUrl}`;
  private refreshNeeded$ = new Subject<void>();

  constructor(private http: HttpClient) { }

  get refreshNeeded() {
    return this.refreshNeeded$.asObservable();
  }

  create(createTodoDto: CreateTodoDto): Observable<Todo> {
    const token = localStorage.getItem('access_token');
    return this.http.post<Todo>(`${this.apiUrl}/todos`, createTodoDto, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).pipe(
      tap(() => {
        this.refreshNeeded$.next();
      })
    );
  }

  findAll(): Observable<Todo[]> {
    const token = localStorage.getItem('access_token');
    return this.http.get<Todo[]>(`${this.apiUrl}/todos`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  findOne(id: number) {
    const token = localStorage.getItem('access_token');
    return this.http.get<any>(`${this.apiUrl}/todos/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    const token = localStorage.getItem('access_token');
    return this.http.put<any>(`${this.apiUrl}/todos/${id}`, updateTodoDto, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  remove(id: number) {
    const token = localStorage.getItem('access_token');
    return this.http.delete<any>(`${this.apiUrl}/todos/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }
}