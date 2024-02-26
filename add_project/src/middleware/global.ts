import { Request, Response, NextFunction } from 'express';
const whiteList = ['/v1/list'];

export function globalMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log(req.originalUrl, '我收全局的');

  if (whiteList.includes(req.originalUrl)) {
    res.send('小黑子露出鸡脚了吧');
  } else {
    next();
  }
}
