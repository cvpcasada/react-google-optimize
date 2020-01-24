type Inflight<T> = {
  [key: string]: Promise<T | void>;
};

type Cache<T> = {
  [key: string]: T;
};

export type Resource<T> = {
  read: (key: string, ...args: any[]) => T;
  clear: (key: string) => void;
};

export function createResource<T>(
  getPromise: (key: string, ...args: any[]) => Promise<T>
): Resource<T> {
  let cache: Cache<T> = {};
  let inflight: Inflight<T> = {};
  let errors: { [key: string]: Error } = {};

  function load(key: string, ...args: any[]) {
    inflight[key] = getPromise(key, ...args)
      .then(val => {
        delete inflight[key];
        cache[key] = val;
      })
      .catch(error => {
        errors[key] = error;
      });
    return inflight[key];
  }

  function read(key: string, ...args: any[]): T {
    if (cache[key] !== undefined) {
      return cache[key];
    } else if (errors[key]) {
      throw errors[key];
    } else if (inflight[key]) {
      throw inflight[key];
    } else {
      throw load(key, ...args);
    }
  }

  function clear(key: string) {
    if (key) {
      delete cache[key];
    } else {
      cache = {};
    }
  }

  return { read, clear };
}
