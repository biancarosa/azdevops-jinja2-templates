import tl = require("azure-pipelines-task-lib/task");
import fs = require("fs");

async function renderFileTemplate(file: string, allowMissing: boolean) {
  let args = [file];
  if (allowMissing === true) {
    args.push("--allow-missing");
  }
  await tl.tool(tl.which("envtpl")).arg(args).exec();
  console.log("Rendered template on file", file);
}

async function run() {
  try {
    let file = tl.getInput("file", false) || "";
    let dir = tl.getInput("dir", false) || "";
    if (file == "" && dir == "") {
      tl.setResult(tl.TaskResult.Failed, "Input required: file or dir");
      return
    }

    let allowMissing = tl.getBoolInput("allowMissing");
    console.log("Setting up vars");
    await tl.getVariables().forEach((variable) => {
      process.env[variable.name] = variable.value;
    });

    console.log("Install envtpl");
    await tl.tool(tl.which("pip")).arg(["install", "envtpl"]).exec();
    console.log("Envtpl Installed");

    if (file != "") {
      await renderFileTemplate(file, allowMissing)
    } else {
      console.log("Reading files on dir", dir)
      fs.readdir(dir, function(err, files) {
        console.log(files, "files")
        if (err) {
          console.log("Error getting directory information.")
        } else {
          files.forEach(function(file) {
            let fullFilePath = `${dir}/${file}`;
            renderFileTemplate(fullFilePath, allowMissing)
          })
        }
      }) 
    }
  } catch (err) {
    tl.setResult(tl.TaskResult.Failed, err.message);
  }
}

run();
