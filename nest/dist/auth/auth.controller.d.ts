import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
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
