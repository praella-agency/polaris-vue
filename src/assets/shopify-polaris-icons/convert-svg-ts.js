const fs = require('fs')
const {promisify} = require('util')
const asyncReadFile = promisify(fs.readFile)

async function returnSvg(fileName) {
    let data = '';
    let svgData = [];
    if(fileName) {
        data = await asyncReadFile('svg/' + fileName)
        fileName = fileName.replace('.svg', '');
        svgData[fileName] = data.toString()
    }

    // since fs.readFile returns a buffer, we should probably convert it to a string.
    return svgData;
}

function readSvg() {
    fs.readdirSync(__dirname+'/svg/').forEach(file => {
        // file = file.replace(/(\w)(\w*)/g,
        returnSvg(file).then(data => {
            for (let svgData in data) {
                if (data.hasOwnProperty(svgData)) {
                    fs.writeFileSync('newImages/' + svgData + '.ts',
                        'export default ' + '`' + data[svgData] + '`;'
                    );
                }
            }
        }).catch(err => {
            console.error(`Failed to read svg: ${err}`)
        })
    });
}

readSvg();
