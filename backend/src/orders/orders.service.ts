import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';
import { EntityRepository } from '@mikro-orm/postgresql';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { MailerService } from '@nestjs-modules/mailer';
import { uuid } from 'aws-sdk/clients/customerprofiles';
import { OrderItem } from './entities/order-item.entity';
import { CartService } from '../carts/cart.service';
import { CartItemsService } from '../carts/cart-items.service';
import { Collection } from '@mikro-orm/core';
import { randomUUID } from 'crypto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepository: EntityRepository<Order>,
    @InjectRepository(OrderItem)
    private orderItemRepository: EntityRepository<OrderItem>,
    private axios: HttpService,
    private readonly mailerService: MailerService,
    private cartService: CartService,
    private cartItemsService: CartItemsService,
  ) {}

  async deleteOneOrder(orderId: uuid) {
    await this.orderRepository.nativeDelete(orderId);
  }

  async createOrder(dto: CreateOrderDto) {
    const cart = await this.cartService.getOne(dto.cart);
    if (cart.cartItems.length < 1) {
      throw new HttpException(
        'В корзине должен быть хотя бы 1 товар',
        HttpStatus.BAD_REQUEST,
      );
    }
    const order = this.orderRepository.create({
      id: randomUUID(),
      firstName: dto.firstName,
      phone: dto.phone,
      cart: cart.id,
    });
    const items = cart.cartItems.getItems().map((i) =>
      this.orderItemRepository.create({
        product: i.product,
        count: i.count,
        price: i.product.price,
        order: order.id,
      }),
    );
    order.items.set(items);
    console.log(cart.total);
    await this.orderItemRepository.persistAndFlush(items);
    await this.orderRepository.persistAndFlush(order);
    await this.cartItemsService.clearCart(cart.id);

    await this.sendToTelegram(
      order.firstName,
      order.phone,
      order.items,
      order.total,
    );

    await this.sendToMail(
      order.firstName,
      order.phone,
      order.items,
      order.total,
    );

    return order;
  }

  async updateOrder(orderId: uuid, dto) {
    const order = await this.orderRepository.findOne(orderId);
    order.assign(dto);
    await this.orderRepository.flush();
    return order;
  }

  async getOrders() {
    return await this.orderRepository.findAll();
  }

  async getOrder(orderId: uuid) {
    return this.orderRepository.findOne(orderId);
  }

  async sendToMail(
    name: string,
    phone: string,
    items = new Collection<OrderItem>(this),
    total: number,
  ) {
    await this.mailerService.sendMail({
      to: 'kokorin121@yandex.ru', // list of receivers
      from: 'kokorin121@yandex.ru', // sender address
      subject: 'Новый Заказ!', // Subject line
      text: `${'Новый заказ!'}\n${'Имя:'} ${name}\n${'Телефон:'} ${phone}\n${'Товары:'} ${items
        .getItems()
        .map((value, index, array) => {
          return ` ${value.product.title} ${value.count} ${'Шт'} `;
        })}\n${'Итоговая сумма:'} ${total}`, // plaintext body
    });
  }

  async sendToTelegram(
    name: string,
    phone: string,
    items = new Collection<OrderItem>(this),
    total: number,
  ) {
    await firstValueFrom(
      this.axios.post(
        process.env.TELEGRAM_URL +
          process.env.BOT_TOKEN +
          '/sendMessage?chat_id=' +
          process.env.TELEGRAM_CHAT_ID,
        {
          text: `${'Новый заказ!'}\n${'Имя:'} ${name}\n${'Телефон:'} ${phone}\n${'Товары:'} ${items
            .getItems()
            .map((value, index, array) => {
              return ` ${value.product.title} ${value.count} ${'Шт'} `;
            })}\n${'Итоговая сумма:'} ${total}`,
        },
      ),
    );
  }
}
