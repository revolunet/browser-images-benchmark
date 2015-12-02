import Promise from 'bluebird';
import fs from 'fs';
import path from 'path';
import base64image from 'base64-img';


function getClassName(fileName) {
    return fileName.substring(0, fileName.lastIndexOf('.'));
}

function getClassForImage(imagePath) {
    let className = getClassName(path.basename(imagePath));
    let url = base64image.base64Sync(imagePath);
    return `.${className} {background-image:url(${url})}`;
}

function genCss(spritesPath, cb) {
    let readDir = Promise.promisify(fs.readdir);
    return readDir(spritesPath).then(entries => entries.map(entry => getClassForImage(path.join(spritesPath, entry)))).then(lines => lines.join('\n'));
}

module.exports = genCss;

if (require.main === module) {

  if (process.argv.length < 3) {
      throw `\nUSAGE: ${path.basename(process.argv[1])} /path/to/sprites\n`
  }

  var spritesPath = process.argv[2];

  genCss(spritesPath).then(css => {
    console.log(css);
  });

}
