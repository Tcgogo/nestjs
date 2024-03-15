import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { ListService } from './list.service';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { ListPipe } from './list.pipe';
import { Request } from 'express';
import { RoleGuard } from './list.guard';

@Controller({
  path: 'list',
  version: '1',
})
@UseGuards(RoleGuard)
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Post()
  create(@Body(ListPipe) createListDto: CreateListDto) {
    console.log(
      '%c [createListDto]-24',
      'font-size:13px; background:#336699; color:#fff;',
      createListDto,
    );
    return this.listService.create(createListDto);
  }

  @Get()
  findAll() {
    return 123;
  }

  @Get('test')
  @SetMetadata('role', ['admin'])
  getIp(@Req() request: Request): string {
    const ipAddress = request.ip;
    return `Your IP address is ${ipAddress}`;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.listService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateListDto: UpdateListDto) {
    return this.listService.update(+id, updateListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.listService.remove(+id);
  }
}
