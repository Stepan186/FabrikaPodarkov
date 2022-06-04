import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { User } from './user.entity';
import { EntityRepository } from '@mikro-orm/postgresql';
import { CreateUserDto } from './dto/create-user.dto';
import { PasswordService } from '../auth/password.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: EntityRepository<User>,
    private passwordService: PasswordService,
  ) {}

  async processUserFields(dto: Partial<CreateUserDto>) {
    if (dto.password) {
      dto.password = await this.passwordService.hashPassword(dto.password);
    }
  }

  async createUser(dto: CreateUserDto) {
    const userWithSamePhone = await this.userRepository.findOne({
      phone: dto.phone,
    });
    if (userWithSamePhone) {
      throw new BadRequestException(
        'Пользователь с таким телефоном уже существует',
      );
    }
    await this.processUserFields(dto);
    const user = this.userRepository.create(dto);
    await this.userRepository.persistAndFlush(user);
    return user;
  }

  async getAll() {
    return await this.userRepository.findAll();
  }

  async findByPhone(phone: string): Promise<User> {
    return await this.userRepository.findOne(
      {
        phone,
      },
      { populate: ['permissions'] },
    );
  }

  async getOrCreate(data: CreateUserDto): Promise<User> {
    const user = await this.userRepository.findOne(data);
    // if (!user) {
    //   user = this.userRepository.create({
    //     ...data,
    //     cart: new Cart(),
    //   });
    //   await this.userRepository.persistAndFlush(user);
    // }
    return user;
  }

  async getProfile(id: string): Promise<User> {
    return await this.userRepository.findOneOrFail(id);
    // if (res.phone === process.env.SUPERADMINS) {
    //   res.permissions = new Collection<Permission>(
    //     res,
    //     await this.permissionsService.getAll(),
    //   );
    // }
    // return res;
  }

  // async getProfile(userId) {
  //   const res = await this.userRepository.findOneOrFail(userId);
  //   const isSuperAdmin = String(process.env.SUPERADMINS)
  //     .split(',')
  //     .includes(res.phone);
  //   if (isSuperAdmin) {
  //   }
  // }

  async findOne(id: string) {
    return await this.userRepository.findOneOrFail(
      { id },
      {
        populate: ['permissions'],
        refresh: true,
      },
    );
  }
}
