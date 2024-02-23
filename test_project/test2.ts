import axios, { AxiosResponse } from "axios";

const Get = (url: string): MethodDecorator => {
  return (target, key, descriptor) => {
    // 函数本身
    const targetFn = descriptor.value as TargetFn;

    axios.get(url).then((res) => {
      targetFn(res, {
        status: 200,
      });
    }).catch((err) => {
      targetFn(err, {
        status: 500,
      });
    })
  };
};

class Controller {
  constructor() {}

  @Get('https://api.apiopen.top/api/getHaoKanVideo?page=0&size=10')
  getList(...args: Parameters<TargetFn>) {
    const [res, param] =args;
    console.log('%c [param]-9', 'font-size:13px; background:#336699; color:#fff;', param);
    console.log('%c [res]-9', 'font-size:13px; background:#336699; color:#fff;', res);
  }
}

type TargetFn = (
  res: AxiosResponse<any, any>,
  param: { status: number }
) => void;




// const c = new Controller();
// c.getList()