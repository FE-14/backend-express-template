class ExampleService {
  public static sayHello(call: any, callback: Function) {
    callback(null, { message: 'Hello ' + call.request.name })
  }
}

export default ExampleService