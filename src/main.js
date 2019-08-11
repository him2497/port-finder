const { promisify } = require('util');
const child_process = require('child_process')
const exec = promisify(require('child_process').exec)
// const exec = require('child_process').exec

const readline = require('readline');
let colors = require('colors');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

export function checkPortNumber() {
  rl.question('What port number do you want to check?'.underline.yellow + "\nPort No: ".red, async (answer) => {
      answer = parseInt(answer)
      if(isNaN(answer)){
          rl.close()
          throw new Error ("Please enter a number")
      }
      
      // const result = await exec('lsof -i tcp:'+answer)
      rl.close();
      // let command = (`lsof -i tcp | grep ${answer}`)
      let command = `lsof -i tcp | grep ${answer}`
      let result = await systemSync(command)
  
      if(result === undefined){
        console.log(`Port ${answer} is open for use`.bold.green)
      }else {
        console.log(result.inverse)
      }
    });
}

function systemSync(cmd) {
  try {
    return child_process.execSync(cmd).toString();
  } 
  catch (error) {
    error.status;  
    error.message; 
    error.stderr;  
    error.stdout;
  }
};


