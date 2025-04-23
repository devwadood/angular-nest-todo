import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoDto {
  @ApiProperty({ example: 'Buy groceries' })
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: false })
  @IsNotEmpty()
  completed: boolean;
}
