import * as path from "path";
import * as assert from "assert";
import * as ttm from "azure-pipelines-task-lib/mock-test";

describe("Sample task tests", function () {
  before(function () {});

  after(() => {});

  it("it should fail if tool returns 1", function (done: MochaDone) {
    this.timeout(1000);

    let tp = path.join(__dirname, "failure.js");
    let tr: ttm.MockTestRunner = new ttm.MockTestRunner(tp);

    tr.run();
    assert.equal(tr.succeeded, false, "should have failed");
    console.log("succeeded :: ", tr.succeeded);
    assert.equal(tr.warningIssues, 0, "should have no warnings");
    console.log("warningIssues :: ", tr.succeeded);
    assert.equal(tr.errorIssues.length, 1, "should have 1 error issue");
    console.log("errorIssues :: ", tr.errorIssues.length);
    assert.equal(tr.errorIssues[0], "Input required: file");
    console.log("errorIssues[0] :: ", tr.errorIssues[0]);

    done();
  });
  // it("should succeed with simple inputs", function (done: MochaDone) {
  //   this.timeout(1000);

  //   let tp = path.join(__dirname, "success.js");
  //   let tr: ttm.MockTestRunner = new ttm.MockTestRunner(tp);

  //   tr.run();
  //   console.log(tr.succeeded);
  //   assert.equal(tr.succeeded, true, "should have succeeded");
  //   assert.equal(tr.warningIssues.length, 0, "should have no warnings");
  //   assert.equal(tr.errorIssues.length, 0, "should have no errors");
  //   console.log(tr.stdout);
  //   assert.equal(
  //     tr.stdout.indexOf("Rendered template") >= 0,
  //     true,
  //     "should display success message"
  //   );
  //   done();
  // });
});
