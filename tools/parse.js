const fs = require('fs')
const R = require("ramda");
const lines = fs.readFileSync("./questions.txt").toString().split("\n");
const questions = [];
let reset = true;
lines.forEach(R.pipe(R.trim(), (line)=>{
    if(line == "reset") {
        reset = true;
        return;
    }
    else if(line == "* must provide value"){
        R.last(questions).isRequired = true;
        return;
    }
    else if(reset) {
        questions.push({question: line, options: []});
        reset = false;
    } else {
        R.last(questions).options.push(line);
    }
}));
fs.writeFileSync("./questions.json", JSON.stringify(questions,null,2));
