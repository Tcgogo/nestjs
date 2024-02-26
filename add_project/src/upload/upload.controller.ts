import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  UploadedFile,
  Res,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { Response } from 'express';
import { zip } from 'compressing';

@Controller({
  path: 'upload',
  version: '1',
})
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('album')
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file: any) {
    return {
      file,
    };
  }

  @Get('export')
  downloadFile(@Res() res: Response) {
    const url = join(__dirname, `../images/1708939588669.jpeg`);
    res.download(url);
  }

  @Get('stream')
  async dowmstream(@Res() res: Response) {
    const url = join(__dirname, `../images/1708939588669.jpeg`);
    const tarStream = new zip.Stream();
    await tarStream.addEntry(url);
    res.setHeader('Content-Type', 'application/octet-stream');

    res.setHeader('Content-Disposition', `attachment; filename=tcgogo`);

    tarStream.pipe(res);
  }

  // @Get()
  // findAll() {
  //   return this.uploadService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.uploadService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUploadDto: UpdateUploadDto) {
  //   return this.uploadService.update(+id, updateUploadDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.uploadService.remove(+id);
  // }
}
