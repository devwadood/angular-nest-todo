import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
export declare class AuthService {
    private userRepository;
    private jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    register(registerDto: RegisterDto): Promise<{
        id: number;
        email: string;
        name: string;
        todos: import("../entities/todo.entity").Todo[];
    }>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
    }>;
}
