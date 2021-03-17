export default function wapi(env) {
  const fns = {};
  return (codePtr, ...args) => {
    let fn = fns[codePtr];
    if (!fn) fns[codePtr] = fn = Function.apply(null, Object.keys(env).concat(`return ${env.getString(codePtr)}`)).apply(env, Object.values(env));
    return fn(...args);
  };
}
