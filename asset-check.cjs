// Validate deployment paths with Linux-style case sensitivity before publication.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.join(__dirname,'dist');
function walk(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)])}
const files=walk(root),names=new Set(files.map(f=>path.relative(root,f).replaceAll('\\','/'))),references=new Set();
for(const file of files.filter(f=>/\.(js|css|html)$/.test(f))){
 const text=fs.readFileSync(file,'utf8');
 for(const match of text.matchAll(/assets\/[a-zA-Z0-9_./-]+\.(?:png|webp|mp3|wav|json)/g))references.add(match[0]);
 if(file.endsWith('index.html'))for(const match of text.matchAll(/(?:src|href)="([^"#]+\.(?:js|css))"/g))references.add(match[1]);
}
for(let i=1;i<=6;i++)references.add(`assets/menu-live/mist-${i}.webp`);
for(let i=1;i<=4;i++)references.add(`assets/stars/star-${i}.png`);
for(const name of references)assert(names.has(name),'Missing or incorrectly cased deployment file: '+name);
for(const name of names)assert(!/^(audio|categories|menu-live)\//.test(name),'Duplicate resource directory: '+name);
assert([...names].filter(n=>n.startsWith('assets/menu-live/')).every(n=>n.endsWith('.webp')),'Only runtime WebP images belong in deployed menu-live');
console.log(`PASS: ${references.size} resource paths, exact filename case, and clean deployment folders.`);
