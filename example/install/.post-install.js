var fs = require('fs');

function copyFile(srcPath, destPath){
    fs.createReadStream(srcPath).pipe(fs.createWriteStream(destPath));
}

console.log('ELO')
copyFile('install/odata-parser.js', 'node_modules\\odata-parser\\lib\\odata-parser.js');
copyFile('install/queryTransform.js', 'node_modules\\simple-odata-server\\lib\\queryTransform.js');
copyFile('install/odataServer.js', 'node_modules\\simple-odata-server\\lib\\odataServer.js');
console.log('MORDY')
