const fs = require('fs')
const {promisify} = require('util')
const asyncReadFile = promisify(fs.readFile)

async function returnSvg(fileName) {
    let data = '';
    let fileData = [];
    if (fileName) {
        data = await asyncReadFile('svg/' + fileName)
        fileName = fileName.replace('.svg', '');
        fileData[fileName] = data.toString()
    }
    return fileData;
}

function readSvg() {
    fs.readdirSync(__dirname + '/svg/').forEach(file => {
        returnSvg(file).then(data => {
            Object.keys(data).forEach(function (key) {
                fs.writeFileSync('images/' + key + '.ts',
                    'export default ' + '`' + data[key] + '`;');
                fs.writeFileSync('index.ts',
                    'export { default as ' + key + ' } from \'./images/' + key + '\';\n',
                    {
                        encoding: "utf8",
                        flag: "a+",
                        mode: 0o666
                    });
            })
        }).catch(err => {
            console.error(`Failed to read svg: ${err}`)
        })
    });
}

readSvg();