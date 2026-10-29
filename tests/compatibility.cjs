const fs=require('fs'), acorn=require('acorn'), assert=require('assert'), vm=require('vm');
for(const n of fs.readdirSync('app').filter(n=>n.endsWith('.js'))) {acorn.parse(fs.readFileSync('app/'+n,'utf8'),{ecmaVersion:5}); console.log('ES5 parse:',n);}
for(const n of ['style.css','birthday.css']) assert(!/(?:^|[;{\s])(?:inset|gap|backdrop-filter)\s*:|\b(?:var|clamp|min|max)\(/m.test(fs.readFileSync('app/'+n,'utf8')),n+' unsupported CSS');
const ctx={window:{}};vm.runInNewContext(fs.readFileSync('app/birthday-config.js','utf8'),ctx);
for (const key of ['name','message','signature']) assert.strictEqual(typeof ctx.window.BIRTHDAY[key], 'string');
assert(ctx.window.BIRTHDAY.name.length && ctx.window.BIRTHDAY.message.length);
console.log('Birthday config / legacy CSS checks passed. Not a TV runtime test.');
