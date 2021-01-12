/* eslint-disable @typescript-eslint/ban-types */

class ExampleService {
  public static sayHello(call: any, callback: Function) {
    callback(null, { message: "Hello " + call.request.name });
  }
  public static async create(call: any, callback: Function) {
    callback(null, { message: "Hello " + call.request.name });
  }
}

export default ExampleService;
