const { exec } = require("child_process");

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

function buyTheThing() {
  exec("npx playwright test", (err, stdout, stderr) => {
    if (!err) {
      return;
    }
    delay(60000)
      .then(() => {
        buyTheThing();
      });
  });
}

buyTheThing();
