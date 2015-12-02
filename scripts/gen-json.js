
import Promise from 'bluebird';
import fs from 'fs';
import path from 'path';
import base64image from 'base64-img';


function getJsonForImage(imagePath) {
    let key = path.basename(imagePath);
    return {
      [key]: base64image.base64Sync(imagePath)
    }
}

function genJson(spritesPath, cb) {
    let readDir = Promise.promisify(fs.readdir);
    return readDir(spritesPath)
              .then(entries => entries.map(entry => getJsonForImage(path.join(spritesPath, entry))))
              .reduce((dict, entry) => {
                  return { ...dict, ...entry };
              }, {});
}

module.exports = genJson;

if (require.main === module) {

  if (process.argv.length < 3) {
      throw `\nUSAGE: ${path.basename(process.argv[1])} /path/to/sprites\n`
  }

  var spritesPath = process.argv[2];

  genJson(spritesPath).then(json => {
    console.log(JSON.stringify(json, null, 2));
  });

}
