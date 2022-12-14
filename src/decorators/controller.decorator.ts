export const Controller = (prefix: string = ""): ClassDecorator => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (target: any) => {
    Reflect.defineMetadata("prefix", prefix, target);

    // Since routes are set by our methods this should almost never be true (except the controller has no methods)
    if (!Reflect.hasMetadata("routes", target)) {
      Reflect.defineMetadata("routes", [], target);
    }
  };
};
