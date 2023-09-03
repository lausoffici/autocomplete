export function debounce<Params extends any[]>(func: Function, delay: number) {
  let timer: ReturnType<typeof setTimeout>;

  return function (...args: Params) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
}
