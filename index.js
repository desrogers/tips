/*
Some additional requirements for your application:

- The bill value must be a positive float but your application must
  handle user input that might be a negative or 0 dollar amount
  (i.e. error handling).
- The user input percentage for the tip must be a positive float.
- The returned value must be a float rounded to two decimal points
  (i.e. accurate dollars and cents).
*/

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

async function main() {
  try {
    const bill = await prompt('How much is the bill? ');
    const percent = await prompt('What percentage would you like to leave as tip? ');
    const split = await prompt('Would you like to split the bill? (y/n) ');
    let tip;

    switch (split) {
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
        console.log('Please answer yes or no by inputting "y" or "n"');
        break;
    }
    stdin.pause();
  } catch (error) {
    console.log(error);
  }
  process.exit();
}

main();
