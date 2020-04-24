import tl = require("azure-pipelines-task-lib/task");

async function run() {
  try {
    let file = tl.getInput("file", true) || "";
    let allowMissing = tl.getBoolInput("allowMissing");
    console.log("Setting up vars");
    await tl.getVariables().forEach((variable) => {
      process.env[variable.name] = variable.value;
    });

    console.log("Install envtpl");
    let args = ["install", "envtpl"];
    if (allowMissing === true) {
      args.push("--allow-missing");
    }
    await tl.tool(tl.which("pip")).arg(args).exec();
    console.log("Envtpl Installed");

    await tl.tool(tl.which("envtpl")).arg([file]).exec();
    console.log("Rendered template");
  } catch (err) {
    tl.setResult(tl.TaskResult.Failed, err.message);
  }
}

run();
