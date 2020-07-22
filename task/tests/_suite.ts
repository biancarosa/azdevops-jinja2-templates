import * as path from "path";
import * as assert from "assert";
import * as ttm from "azure-pipelines-task-lib/mock-test";
import fs = require("fs");

describe("Test suite for task", function () {
  before(function () { });

  after(() => { });

  it("it should fail if tool returns 1", function (done) {
    this.timeout(2000);

    let tp = path.join(__dirname, "failure.js");
    let tr: ttm.MockTestRunner = new ttm.MockTestRunner(tp);

    tr.run();
    assert.equal(tr.succeeded, false, "should have failed");
    assert.equal(tr.warningIssues, 0, "should have no warnings");
    assert.equal(tr.errorIssues.length, 1, "should have 1 error issue");
    assert.equal(tr.errorIssues[0], "Input required: file or dir");

    done();
  });
  it("should succeed with simple inputs", function (done) {
    this.timeout(1000);

    let tp = path.join(__dirname, "success.js");
    let tr: ttm.MockTestRunner = new ttm.MockTestRunner(tp);

    tr.run();
    assert.equal(tr.succeeded, true, "should have succeeded");
    assert.equal(tr.warningIssues.length, 0, "should have no warnings");
    assert.equal(tr.errorIssues.length, 0, "should have no errors");
    assert.equal(
      tr.stdout.indexOf("Rendered template on file file.tpl") >= 0,
      true,
      "should display success message"
    );
    done();
  });
  it("should succeed with dir inputs", function (done) {
    this.timeout(1000);

    let tp = path.join(__dirname, "successWithDir.js");
    let tr: ttm.MockTestRunner = new ttm.MockTestRunner(tp);

    fs.mkdirSync("testDir");
    fs.writeFileSync("testDir/file1.tpl", "oi");
    fs.writeFileSync("testDir/file2.tpl", "oi");

    tr.run();
    assert.equal(tr.succeeded, true, "should have succeeded");
    assert.equal(tr.warningIssues.length, 0, "should have no warnings");
    assert.equal(tr.errorIssues.length, 0, "should have no errors");
    assert.equal(
      tr.stdout.indexOf("Rendered template on file testDir/file1.tpl") >= 0,
      true,
      "should display success message"
    );
    assert.equal(
      tr.stdout.indexOf("Rendered template on file testDir/file2.tpl") >= 0,
      true,
      "should display success message"
    );

    fs.unlinkSync("testDir/file1.tpl");
    fs.unlinkSync("testDir/file2.tpl");
    fs.rmdirSync("testDir");
    done();
  });
  it("should succeed with allow missing", function (done) {
    this.timeout(1000);

    let tp = path.join(__dirname, "allowMissing.js");
    let tr: ttm.MockTestRunner = new ttm.MockTestRunner(tp);

    tr.run();
    assert.equal(tr.succeeded, true, "should have succeeded");
    assert.equal(tr.warningIssues.length, 0, "should have no warnings");
    assert.equal(tr.errorIssues.length, 0, "should have no errors");
    assert.equal(
      tr.stdout.indexOf("Rendered template on file file.tpl") >= 0,
      true,
      "should display success message"
    );
    done();
  });
});
