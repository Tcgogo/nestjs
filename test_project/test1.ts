// 类装饰器
const currency: ClassDecorator = (target) => {
  console.log(target);
};

// 属性装饰器
const currency1: PropertyDecorator = (target, key) => {
  console.log(target, key);
};

// 参数装饰器
const currency2: ParameterDecorator = (target, key, index) => {
  console.log(target, key, index);
};

// 方法装饰器
const currency3: MethodDecorator = (target, key, descriptor) => {
  console.log(target, key, descriptor);
};

@currency
class Xiaoman {

  @currency1
  public name: string;
  constructor() {
    this.name = "";
  }
  
  @currency3
  getName(name: string, @currency2 age: number) {
    return this.name;
  }
}
