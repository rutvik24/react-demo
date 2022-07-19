const { spawn } = require("child_process");
const shell = require("shelljs");

const config = {
  stage: ".envStg",
  prod: ".envProd",
  test: ".envTest",
  develop: ".envDev",
};

function runCommand(command, args, options = undefined) {
  const spawned = spawn(command, args, options);

  return new Promise((resolve) => {
    spawned.stdout.on("data", (data) => {
      const response = data.toString();
      resolve(response);
    });

    spawned.stderr.on("data", (data) => {
      console.error("err", data.toString());
    });

    spawned.on("close", () => {
      resolve();
    });
  });
}

const main = async () => {
  const currentBranch = "main";
  console.log(currentBranch);
  let env = config[currentBranch];
  if (!env) {
    env = config.develop;
  }
  console.log(env);
  const path = `./env.config/${env}`;
  shell.cp(path, "./.env");
};

main();
