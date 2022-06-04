import { Injectable } from '@nestjs/common';
import { EntityRepository } from '@mikro-orm/postgresql';
import { CartItem } from './entities/cart-item.entity';
import { CartService } from './cart.service';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { uuid } from 'aws-sdk/clients/customerprofiles';
import { InjectRepository } from '@mikro-orm/nestjs';

@Injectable()
export class CartItemsService {
  constructor(
    @InjectRepository(CartItem)
    private repositoryCartItem: EntityRepository<CartItem>,
    private readonly cartService: CartService,
  ) {}

  async addItem(dto: CreateCartItemDto) {
    const cartItem = this.repositoryCartItem.create({
      count: dto.count,
      cart: dto.cartId,
      product: dto.product,
    });
    await this.repositoryCartItem.persistAndFlush(cartItem);
    return await this.cartService.getOne(dto.cartId);
  }

  async removeItem(cartItemId: number) {
    const item = await this.repositoryCartItem.findOne(cartItemId);
    await this.repositoryCartItem.removeAndFlush(item);
    return await this.cartService.getOne(item.cart.id);
  }

  async getItems() {
    return this.repositoryCartItem.findAll({ populate: ['product'] });
  }

  async clearCart(cartId: string) {
    await this.repositoryCartItem.nativeDelete({ cart: cartId });
    return await this.cartService.getOne(cartId);
  }
}
