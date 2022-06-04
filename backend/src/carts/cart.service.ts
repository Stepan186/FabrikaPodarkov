import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Cart } from './entities/cart.entity';
import { EntityRepository } from '@mikro-orm/postgresql';
import { uuid } from 'aws-sdk/clients/customerprofiles';
import { GetOrCreateCartDto } from './dto/get-or-create-cart.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private cartRepository: EntityRepository<Cart>,
  ) {}

  async getOrCreate(dto: GetOrCreateCartDto) {
    let cart;
    if (dto.id) {
      cart = await this.cartRepository.findOne(dto.id);
    }
    if (!cart) {
      cart = new Cart();
      cart.id = randomUUID();
      await this.cartRepository.persistAndFlush(cart);
    }
    return cart;
  }

  async getCarts() {
    return await this.cartRepository.findAll();
  }

  async getOne(cartId: uuid) {
    return await this.cartRepository.findOne(cartId, {
      populate: ['cartItems', 'cartItems.total'],
    });
  }
}
