const { spawn } = require("child_process");

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

function cmd(...command) {
  let p = spawn(command[0], command.slice(1));
  return new Promise((resolveFunc) => {
    p.stdout.on("data", (x) => {
      process.stdout.write(x.toString());
    });
    p.stderr.on("data", (x) => {
      process.stderr.write(x.toString());
    });
    p.on("exit", (code) => {
      resolveFunc(code);
    });
  });
}

async function buyTheThing() {
  let exitCode = 1;
  do {
    exitCode = await cmd("npx", "playwright", "test");
    console.log("Product is out of stock, retrying in 1 minute...");
    await delay(2000);
  } while (exitCode === 1);
}

buyTheThing();
