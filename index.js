'use strict';
const fs = require('fs');
const highland = require('highland');
const printAllFiles = require('./print-files');
const logAllRepos = require('./fetch-github-api');
const files = highland(['../../Documents/hello.txt','../../Documents/instructions.txt']);
printAllFiles(files);
logAllRepos('cowboy');
