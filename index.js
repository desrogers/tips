// Get process.stdin as the standard input object.
const { stdin, stdout } = process;

// Set the character encoding.
stdin.setEncoding('utf-8');

// Function to take in user input
function prompt(question) {
  return new Promise((resolve, reject) => {
    stdin.resume();
    stdout.write(question);
    stdin.on('data', data => resolve(data.toString().trim()));
    stdin.on('error', err => reject(err));
  });
}

async function init() {
  try {
    const bill = await prompt('How much is the bill? ');
    const percent = await prompt('What percentage would you like to leave as tip? ');
    const split = await prompt('Would you like to split the bill? [Y/n] ');
    let tip;

    switch (split) {
      case ('Y'):
      case ('y'): {
        const party = await prompt('How many ways would you like to split the tip? ');
        tip = parseFloat((Math.abs(bill) * (Math.abs(percent) / 100)) / party);
        const result = (Math.round(tip * 100) / 100).toFixed(2);
        console.log(`\nTip per person: $${result}`);
        break;
      }
      case ('n'): {
        tip = parseFloat(Math.abs(bill) * (Math.abs(percent) / 100));
        const result = (Math.round(tip * 100) / 100).toFixed(2);
        console.log(`\nTip: $${result}`);
        break;
      }
      default:
        console.log('Please answer yes or no by inputting "Y" or "n"');
        break;
    }
    stdin.pause();
  } catch (error) {
    console.log(error);
  }
  process.exit();
}

init();
