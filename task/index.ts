import tl = require("azure-pipelines-task-lib/task");

async function run() {
  try {
    console.log("Setting up vars");
    await tl.getVariables().forEach(variable => {
      process.env[variable.name] = variable.value;
    });

    console.log("Install envtpl");
    await tl
      .tool(tl.which("pip"))
      .arg(["install", "envtpl"])
      .exec();
    console.log("Envtpl Installed");

    await tl
      .tool(tl.which("envtpl"))
      .arg([tl.getInput("file", true) || ""])
      .exec();
    console.log("Rendered template");
  } catch (err) {
    tl.setResult(tl.TaskResult.Failed, err.message);
  }
}

run();
