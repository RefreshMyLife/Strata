let fs = require('fs');
let versionTxt = fs.readFileSync('./version.json', 'utf8');
let versionJson = JSON.parse(versionTxt);

let [a,b,c] = versionJson.version.split('.').map(x => Number(x));

if (++c > 99) {
    c = 0;
    if (++b > 99) {
        b = 0;
        a++;
    }
}

let v = `${a}.${b}.${c}`;
console.log(`Version updated to ${v}`);
fs.writeFileSync('./version.json', JSON.stringify({ version: v }, null, 4));
