export default function wapi(e){const f={};return{env:e,call:(c,...a)=>(f[c]||(f[c]=Function(...Object.keys(e).concat(`return ${e.getString(c)}`)).apply(e,Object.values(e))))(...a)}}
