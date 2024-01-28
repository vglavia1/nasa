type ReturnType<T> = { [K in keyof T]: K };

const keyMirror = <T>(obj: T): ReturnType<T> =>
  Object.keys(obj).reduce(
    (prev, cur) => ({ ...prev, [cur]: cur }),
    {} as ReturnType<T>,
  );

export default keyMirror;
