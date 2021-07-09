const fs = require('fs');

getNewIcons();

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
    fs.readdirSync(__dirname + '/images/').forEach(file => {
        let newFileName = file.replace('.ts', '');
        newFileName = toPascalCase(newFileName) + '.ts';
        newFileName = newFileName.replace(/Monotone\.ts|Twotone\.ts|\.ts/, '').concat('.ts');

        oldData.push(newFileName);
    });
    return [...new Set(oldData)];
}

function getNewFileNames() {
    let newData = [];
    fs.readdirSync(__dirname + '/newImages/').forEach(file => {
        newData.push(file);
    });

    return newData;
}

function getNewIcons() {
    let oldFiles = getOldFileNames();
    let newFiles = getNewFileNames();

    let oldIcons = oldFiles.filter(x => !newFiles.includes(x));
    let newIcons = newFiles.filter(x => !oldFiles.includes(x));

    console.log('OldIcons', oldIcons);
    console.log('newIcons', newIcons);
}
