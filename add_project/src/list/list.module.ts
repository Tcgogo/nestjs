import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ListService } from './list.service';
import { ListController } from './list.controller';
import { List } from 'src/middleware/list';

@Module({
  controllers: [ListController],
  providers: [ListService],
})
export class ListModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(List).forRoutes({
    //   path: 'list',
    //   version: '1',
    //   method: RequestMethod.ALL,
    // });
    consumer.apply(List).forRoutes(ListController);
  }
}
