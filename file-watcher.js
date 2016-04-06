import fs from 'fs';
import highland from 'highland';
import chokidar from 'chokidar';

const recordAllChangesToFile = (monitorFile,recordFile) => {
  const writeStream = fs.createWriteStream('./b.md');
  const watcher = chokidar.watch('./a.md',{persistant:true})
  highland('change',watcher,['path','stats'])
   .map(({path,stats:{size}}) => path+'::'+size)
   .pipe(writeStream);
}
module.exports = recordAllChangesToFile;
