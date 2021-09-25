/** Command-line tool to generate Markov text. */

const fs = require('fs');
const axios = require('axios');
const markov = require('./markov');

function textFromFile(path) {
    fs.readFile(path, 'utf8', function(err, data) {
      if (err) {
        console.log(err);
        process.exit(1);
      } 
      else {
        makeText(data);
      }
    });
}
  
async function textFromURL(url) {
    let r; 
    try {
      r = await axios.get(url);
    } 
    catch (err) {
      console.log(err);
      process.exit(1);
    }
    makeText(r.data);
}

function makeText(text) {
    let mm = new markov.MarkovMachine(text);
    let generatedText = mm.makeText();
    console.log(generatedText);
}

let option = process.argv[2];
let path = process.argv[3];

if (option == 'file') { textFromFile(path) }
else if (option == 'url') { textFromURL(path) }
else { console.log('Invalid Option'); process.exit(1); }
