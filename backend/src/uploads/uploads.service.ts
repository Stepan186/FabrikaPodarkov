import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import { UpdateUploadDto } from './dto/update-upload.dto';
import { EntityRepository } from '@mikro-orm/postgresql';
import { InjectRepository } from '@mikro-orm/nestjs';
import * as path from 'path';
import * as sharp from 'sharp';
import { Upload, UploadedImage } from './entities/uploud.entity';
import { Express } from 'express';

@Injectable()
export class UploadsService {
  constructor(
    @InjectRepository(Upload) private repository: EntityRepository<Upload>,
  ) {}

  isImage(mimetype: string): boolean {
    return [
      'image/apng',
      'image/bmp',
      'image/gif',
      'image/x-icon',
      'image/jpeg',
      'image/png',
      'image/svg+xml',
      'image/tiff',
      'image/webp',
    ].includes(mimetype);
  }

  async makeSizesArray(
    file: Express.Multer.File,
  ): Promise<Array<UploadedImage>> {
    const img = await sharp(file.buffer);
    const metadata = await img.metadata();
    const maxSize = 300;

    let width: number, height: number;
    if (metadata.width >= metadata.height) {
      width = maxSize;
      height = Math.round(metadata.height * (maxSize / metadata.width));
    } else {
      height = maxSize;
      width = Math.round(metadata.width * (maxSize / metadata.height));
    }

    const img300 = img
      .resize({
        width,
        height,
        fit: 'contain',
      })
      .webp();
    const s3Upload = await this.uploadPublicFile(
      await img300.toBuffer(),
      '.webp',
    );

    return [
      new UploadedImage({
        height,
        width,
        url: s3Upload.Location,
      }),
    ];
  }

  async uploadPublicFile(buffer: Buffer, extension: string) {
    const s3 = new S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      endpoint: process.env.AWS_ENDPOINT,
    });
    return await s3
      .upload({
        Bucket: process.env.AWS_BUCKET,
        Body: buffer,
        Key: uuid() + extension,
      })
      .promise();
  }

  async create(file: Express.Multer.File) {
    const uploadResult = await this.uploadPublicFile(
      file.buffer,
      path.extname(file.originalname),
    );
    const upload = this.repository.create({
      key: uploadResult.Key,
      url: uploadResult.Location,
      type: file.mimetype,
      size: file.size,
      name: file.originalname,
      sizes: this.isImage(file.mimetype) ? await this.makeSizesArray(file) : [],
    });

    await this.repository.persistAndFlush(upload);
    return upload;
  }

  async findOne(id: number): Promise<Upload> {
    return await this.repository.findOne(id);
  }

  async findByIds(ids: number[]): Promise<Upload[]> {
    return await this.repository.find({
      id: {
        $in: ids,
      },
    });
  }

  async update(id: number, data: UpdateUploadDto): Promise<Upload> {
    const upload = await this.repository.findOne(id);
    Object.assign(upload, data);
    await this.repository.flush();
    return upload;
  }

  async remove(id: number) {
    return await this.repository.nativeDelete({ id });
  }
}
