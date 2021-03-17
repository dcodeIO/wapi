import loader from "@assemblyscript/loader";
import wapi from "../index.js";
import fs from "fs";

const wapiEnv = {};
const myModule = await loader.instantiate(fs.promises.readFile("build/untouched.wasm"), { wapi: { wapi: wapi(wapiEnv) } });
wapiEnv.getString = myModule.exports.__getString;
wapiEnv.newString = myModule.exports.__newString;
myModule.exports._start();
