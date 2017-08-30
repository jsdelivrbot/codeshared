const fs = require('fs');
const Either = require('./Either');
const Task = require('./Task');


let readFile = (fileName, enc) => {
    return fs.readFile(fileName, enc, (err, contents) => {
        console.log('hello');
        return err ? Either.left(err) : Either.of(contents);
    });
}


let writeFile = (fileName, contents) => {
    return fs.writeFile(fileName, contents, (err, s) => {
        return err ? Either.left(err) : Either.right(contents);
    });
}

const fileSource = './../resources/config.json';
const fileDest = './../resources/config1.json';

// const app = readFile(fileSource, 'utf-8')
//     .map(contents => contents.replace(/8/g, '6'))
//     .chain(contents => writeFile(fileDest, contents));


// app.fold(e => console.log(e), x => console.log('success'));

console.log(readFile(fileSource, 'utf-8'));
readFile(fileSource, 'utf-8').map(contents => contents.replace(/8/g, '6'));


const Db = ({
    find: id =>
        new Task((rej, res) =>
            setTimeout(() =>
                res({ id: id, title: `Project ${id}` }), 100))
})

const reportHeader = (p1, p2) =>
    `Report: ${p1.title} compared to ${p2.title}`

Task.of(p1 => p2 => reportHeader(p1, p2))
    .ap(Db.find(20))
    .ap(Db.find(8))
    .fork(console.error, console.log)