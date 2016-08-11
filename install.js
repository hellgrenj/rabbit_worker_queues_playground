var shelljs = require('shelljs');
const npmInstall = (dir) => {
    if (shelljs.exec('npm install').code !== 0) {
        console.log('npm install failed in directory ' + dir);
    } else {
        console.log('npm install succeeded in directory ' + dir);
    }
};
shelljs.cd('./worker');
npmInstall('worker');
shelljs.cd('..');
shelljs.cd('./producer');
npmInstall('producer');
