const fs = require('fs');
const path = require('path');

//create Folder.
fs.mkdir(path.join(__dirname, '/test'), {}, err => {
    if (err) throw err;
    console.log('Folder created...');
}); 

//create and write to file
fs.writeFile(path.join(__dirname, '/test', 'hello.txt'), 'Hello Worlds', err => {
    if (err) throw err;
    console.log('File written to...');

    //appending to file.
    fs.appendFile(path.join(__dirname, '/test', 'hello.txt'), 'I love node JS', err => {
        if (err) throw err;
        console.log('File written to...');
    });
}); 

//Read File.
fs.readFile(path.join(__dirname, '/test', 'hello.txt'), 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
});

//Renaming file.
fs.rename(
    path.join(__dirname, '/test', 'hello.txt'),
    path.join(__dirname, '/test', 'helloworld.txt'),
    err => {
        if (err) throw err;
        console.log('File renamed...');
    }
);