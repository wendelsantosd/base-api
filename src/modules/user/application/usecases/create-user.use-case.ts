import { User } from '../../domain/entities/user.entity';
import { randomUUID } from 'crypto';
import { Inject, Injectable } from '@nestjs/common';
import type { IUserRepository } from '../../domain/repositories/user.repository';

interface CreateUserInput {
  name: string;
  email: string;
  password: string;
}

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  execute({ email, name, password }: CreateUserInput): User {
    const user = new User(randomUUID(), name, email, password);
    return this.userRepository.create(user);
  }
}
