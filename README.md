# wapi

An experiment to create a minimal yet viable Web-first Wasm/JS bridge that works today. Similar to Emscripten's `EM_ASM`, but with most glue code contained in the Wasm binary for ease of use.

## Usage

```ts
import wapi from "./index.js"

const wapiEnv = {
  getString(ptr) { ... }, // compiler-specific
  ...
}
const module = await WebAssembly.instantiate(theModule, { wapi: wapi(wapiEnv) })
...
```

## How it works

Constructing a `wapi` environment creates an object to be imported into Wasm with two properties:

* `call`, which executes the JS code given to it from within WebAssembly while caching it for further calls and
* `env`, which is the common environment of all wapi calls

Upon construction, own properties of the initially provided `wapiEnv` (that then becomes `env`) are added to the scope of the JS code that will be executed, just as if these were globals:

```ts
// Init common environment
const wapiEnv = {
  hello() { ... }
  world(a) { ... }
}
WebAssembly.instantiate(theModule, { wapi: wapi(wapiEnv) })

// Within WebAssembly (pseudo-code)
wapi.call(`() => hello()`)
wapi.call(`(a) => world(a)`, a)
```

Works best with some level of compiler integration abstracting the `wapi.call`s away, but doesn't strictly require it as long as a compiler supports generating imports of the same name with multiple signatures.

## How it performs

The JS magic used has some overhead, as it looks up the cached version of the code using a branch and then calls it indirectly, per call. Experiments indicate that a `wapi.call` (just the call, the code it executes is unaffected) is about 35-50% slower than a normal import call in V8. If the code being run performs non-trivial work anyway, this overhead seems to be neglectable. Otherwise it may depend.

## How large is it

[That large](./index.js) plus compiler-specific integration, e.g. to read strings from linear memory in the respective language's string encoding.

## Building

```
npm install
npm run asbuild
```

## Testing

```
npm test
```
