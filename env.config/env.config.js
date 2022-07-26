const { spawn } = require("child_process");
const shell = require("shelljs");

const config = {
  stage: ".envStg",
  prod: ".envProd",
  test: ".envTest",
  develop: ".envDev",
};

const main = async () => {
  const currentBranch = "develop";
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
