import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import * as session from 'express-session';
import { globalMiddleware } from './middleware/global';
import * as cors from 'cors';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // 添加版本控制
  app.enableVersioning({
    // RESTful 版本控制
    // URI Versioning	版本将在请求的 URI 中传递（默认）
    // Header Versioning	自定义请求标头将指定版本
    // Media Type Versioning	请求的Accept标头将指定版本
    type: VersioningType.URI,
  });
  app.use(
    session({
      secret: 'tcgogo',
      name: 'tc.session',
      rolling: true,
      cookie: {
        maxAge: null,
      },
    }),
  );

  console.log(
    '%c []-31',
    'font-size:13px; background:#336699; color:#fff;',
    join(__dirname, 'images'),
  );
  app.useStaticAssets(join(__dirname, 'images'), {
    prefix: '/tcgogo',
  });
  app.use(globalMiddleware);
  app.use(cors());
  await app.listen(3000);
}
bootstrap();
