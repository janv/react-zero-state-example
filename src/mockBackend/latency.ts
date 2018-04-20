const DELAY = {
  MIN: 400,
  MAX: 700
}

const getDelay = () => Math.floor(Math.random() * DELAY.MAX) + DELAY.MIN;

const delay = <T>(value:T, delay:number) => new Promise<T>(
  resolve => setTimeout(() => resolve(value), delay)
);

// function withLatency<T>(x:T[]):Promise<T[]>
function withLatency<T>(x:Promise<T>|T):Promise<T> {
  if (x instanceof Promise) {
    return x;
  }

  if (Array.isArray(x)) {
    return delay(x, x.map(getDelay).reduce((sumDelays, itemDelay) => sumDelays + itemDelay, 0));
  }

  return delay(x, getDelay());
}

export {
  withLatency
}
