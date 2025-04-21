import { Todo } from './todo.entity';
export declare class User {
    id: number;
    email: string;
    password: string;
    name: string;
    todos: Todo[];
}
