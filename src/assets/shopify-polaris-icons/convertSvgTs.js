const fs = require('fs')
const {promisify} = require('util')
const asyncReadFile = promisify(fs.readFile)

// readSvg();
getOldIcons();

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

// To Add Old Icons in index.ts
function toPascalCase(file) {
    return file
        .replace(new RegExp(/[-_]+/, 'g'), ' ')
        .replace(new RegExp(/[^\w\s]/, 'g'), '')
        .replace(
            new RegExp(/\s+(.)(\w+)/, 'g'),
            ($1, $2, $3) => `${$2.toUpperCase() + $3.toLowerCase()}`
        )
        .replace(new RegExp(/\s/, 'g'), '')
        .replace(new RegExp(/\w/), s => s.toUpperCase());
}

function getOldFileNames() {
    let oldData = [];
    fs.readdirSync(__dirname + '/oldImages/').forEach(file => {
        let oldFileName = file;

        let newFileName = file.replace('.ts', '');
        newFileName = toPascalCase(newFileName) + '.ts';
        // newFileName = newFileName.replace(/Monotone\.ts|Twotone\.ts|\.ts/, '').concat('.ts');
        fs.rename('oldImages/'+oldFileName, 'oldImages/'+newFileName, () => {});

        oldData.push(newFileName);
    });

    return [...new Set(oldData)];
}

function getNewFileNames() {
    let newData = [];
    fs.readdirSync(__dirname + '/images/').forEach(file => {
        newData.push(file);
    });

    return newData;
}

function getOldIcons() {
    let oldIcons = getOldFileNames().filter(x => !getNewFileNames().includes(x));

    oldIcons.forEach(file => {
        file = file.replace('.ts', '');
        fs.appendFileSync('index.ts',
            'export { default as ' + file + ' } from \'./oldImages/' + file + '\';\n',
            {
                encoding: "utf8",
                flag: "a+",
                mode: 0o666
            });
    });
}
