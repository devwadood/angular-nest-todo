import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from '../entities/todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  async create(createTodoDto: CreateTodoDto, userId: number) {
    console.log(createTodoDto, 'createTodoDto');
    const todo = this.todoRepository.create({
      ...createTodoDto,
      user: {
        id: userId,
      },
    });
    return await this.todoRepository.save(todo);
  }

  async findAll(userId: number) {
    return await this.todoRepository.find({
      relations: ['user'],
      order: {
        id: 'ASC',
      },
      where: {
        user: {
          id: userId,
        },
      },
    });
  }

  async findOne(id: number) {
    const todo = await this.todoRepository.findOne({ where: { id } });
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    return todo;
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    const todo = await this.findOne(id);
    Object.assign(todo, updateTodoDto);
    return this.todoRepository.save(todo);
  }

  async remove(id: number) {
    const todo = await this.findOne(id);
    return this.todoRepository.remove(todo);
  }
}
