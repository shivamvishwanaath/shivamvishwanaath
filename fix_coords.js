const fs = require('fs');
let data = fs.readFileSync('lib/investigation-data.ts', 'utf8');

let idx = 0;
data = data.replace(/x:\s*-?\d+,\s*y:\s*-?\d+/g, (match) => {
    const col = 6;
    const x = (idx % col) * 350 + 80 + (Math.floor(Math.random() * 30) - 15);
    const y = Math.floor(idx / col) * 320 + 80 + (Math.floor(Math.random() * 30) - 15);
    idx++;
    return 'x: ' + x + ',\n      y: ' + y;
});

fs.writeFileSync('lib/investigation-data.ts', data, 'utf8');
console.log('Tightened ' + idx + ' coordinates.');
