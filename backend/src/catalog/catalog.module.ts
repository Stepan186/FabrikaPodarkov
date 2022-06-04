import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Attribute } from './attributes/attribute.entity';
import { Product } from './products/product.entity';
import { AttributesController } from './attributes/attributes.controller';
import { AttributesService } from './attributes/attributes.service';
import { CategoriesService } from './categories/categories.service';
import { ProductsService } from './products/products.service';
import { ProductsAttributesService } from './products-attributes/products-attributes.service';
import { CategoriesController } from './categories/categories.controller';
import { ProductsController } from './products/products.controller';
import { ProductsAttributesController } from './products-attributes/products-attributes.controller';
import { HttpModule } from '@nestjs/axios';
import { FillersService } from './fillers/fillers.service';
import { Filler } from './fillers/filler.entity';
import { Package } from './package/package.entity';
import { ProductGroup } from './product-groups/product-group.entity';
import { Tag } from './tags/tag.entity';
import { ProductGroupService } from './product-groups/product-group.service';
import { FillersController } from './fillers/fillers.controller';
import { ProductGroupController } from './product-groups/product-group.controller';
import { TagsService } from './tags/tags.service';
import { PackageService } from './package/package.service';
import { TagsController } from './tags/tags.controller';
import { PackingsController } from './package/package.controller';
import { ProductAttribute } from './products-attributes/product-attribute.entity';
import { Category } from './categories/category.entity';

@Module({
  imports: [
    MikroOrmModule.forFeature([
      Attribute,
      Category,
      Product,
      ProductAttribute,
      Filler,
      Package,
      ProductGroup,
      Tag,
    ]),
    HttpModule,
  ],
  exports: [ProductsService],
  providers: [
    AttributesService,
    CategoriesService,
    ProductsService,
    ProductsAttributesService,
    FillersService,
    ProductGroupService,
    TagsService,
    PackageService,
  ],
  controllers: [
    AttributesController,
    CategoriesController,
    ProductsController,
    ProductsAttributesController,
    FillersController,
    ProductGroupController,
    TagsController,
    PackingsController,
  ],
})
export class CatalogModule {}
