let fs = require('fs');
let path = require('path');
let _path = path.join(__dirname, '/config/mysql.json')
// fs.readFile(_path, 'utf8', (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });
let str = fs.readFileSync('config/mysql.json', 'utf8');
console.log(str);