// TODO: Compiler integration to generate these automatically,
// like a `@wapi` decorator or a `wapi` template tag function.

@external("wapi", "wapi")
declare function wapi_vs(code: string, arg1: string): void;
@external("wapi", "wapi")
declare function wapi_i(code: string): i32;
@external("wapi", "wapi")
declare function wapi_s(code: string): string;

// Example implementations

class Date {
  static now(): i32 {
    return wapi_i(`() => Date.now()`);
  }
  static getTimezoneOffset(): i32 {
    return wapi_i(`() => new Date().getTimezoneOffset()`);
  }
}

namespace console {
  export function log(msg: string): void {
    wapi_vs(`(s) => { console.log(getString(s)) }`, msg);
  }
  export function debug(msg: string): void {
    wapi_vs(`(s) => { console.debug(getString(s)) }`, msg);
  }
  export function info(msg: string): void {
    wapi_vs(`(s) => { console.info(getString(s)) }`, msg);
  }
  export function warn(msg: string): void {
    wapi_vs(`(s) => { console.warn(getString(s)) }`, msg);
  }
  export function error(msg: string): void {
    wapi_vs(`(s) => { console.error(getString(s)) }`, msg);
  }
}

namespace state {
  // Can store arbitrary state on `this`
  export function set(value: string): void {
    wapi_vs(`(v) => { this.myValue = getString(v) }`, value);
  }
  export function get(): string {
    return wapi_s(`() => newString(this.myValue)`);
  }
}

// Example tests

console.log("log");
console.debug("debug");
console.info("info");
console.warn("warn");
console.error("error");
console.log(Date.now().toString());
console.log(Date.getTimezoneOffset().toString());
state.set("hello world");
console.log(state.get());
