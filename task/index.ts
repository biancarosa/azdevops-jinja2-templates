import tl = require("azure-pipelines-task-lib/task");
import trm = require("azure-pipelines-task-lib/toolrunner");

async function run() {
  try {
    console.log("EXECUTING COMMANDS");

    await tl
      .tool(tl.which("pip"))
      .arg(["install", "envtpl"])
      .exec();

    await tl
      .tool(tl.which("bash"))
      .arg(["envtpl", tl.getInput("file", true) || ""])
      .exec();
    console.log("rendered");
  } catch (err) {
    tl.setResult(tl.TaskResult.Failed, err.message);
  }
}

run();
