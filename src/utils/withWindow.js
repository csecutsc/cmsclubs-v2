const hasWindow = typeof window !== `undefined`;
export default (func, defaultReturn) => {
    if (hasWindow) return func;
    else return () => defaultReturn;
};