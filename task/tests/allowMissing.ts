import ma = require("azure-pipelines-task-lib/mock-answer");
import tmrm = require("azure-pipelines-task-lib/mock-run");
import path = require("path");

let taskPath = path.join(__dirname, "..", "index.js");
let tmr: tmrm.TaskMockRunner = new tmrm.TaskMockRunner(taskPath);

tmr.setInput("file", "file.tmpl");
tmr.setInput("allowMissing", "true");

let a: ma.TaskLibAnswers = <ma.TaskLibAnswers>{
  which: {
    pip: "/usr/local/bin/pip",
    envtpl: "/usr/local/bin/envtpl",
  },
  exec: {
    "/usr/local/bin/pip install envtpl": {
      code: 0,
      stdout: "",
    },
    "/usr/local/bin/envtpl file.tmpl --allow-missing": {
      code: 0,
      stdout: "",
    },
  },
};

tmr.setAnswers(a);
tmr.run();
