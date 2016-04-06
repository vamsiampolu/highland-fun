'use strict';
const highland = require('highland');
const fs = require('fs');
module.exports = (files) => {
  const addEndCard = x => x + '\nx---   THE END   ---x';
  const readFile = highland.wrapCallback(
    (fname,cb) => fs.readFile(fname,'utf8',cb)
  );
  const readAllFiles = highland.map(
     highland.compose(
        highland.map(addEndCard),
        readFile
     )
  );
  readAllFiles(files).parallel(3).each(highland.log)
}
