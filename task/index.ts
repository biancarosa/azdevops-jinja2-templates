import tl = require("azure-pipelines-task-lib/task");
import trm = require("azure-pipelines-task-lib/toolrunner");

async function run() {
  try {
    let file: string | undefined = tl.getPathInput("file", true);
    console.log(file);
    var bash: trm.ToolRunner = tl.tool(tl.which("bash", true));
    bash.arg("pip install envtpl");
    bash.arg("envtpl " + file);
  } catch (err) {
    tl.setResult(tl.TaskResult.Failed, err.message);
  }
}

run();
