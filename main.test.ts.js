import {RunOptions, RunTarget} from 'github-action-ts-run-api';
import {main} from './index.js';

const target = RunTarget.asyncFn(main);
const options = RunOptions.create()
    .setInputs({in1: 'abc'})
    .setState({my_state: 'ghi'});

const result = await target.run(options);

assert(result.durationMs >= 1000);
assert(result.commands.outputs === {out1: 'abc', out2: 'def'});
assert(result.commands.exportedVars === {v3: 'ghi'});
assert(result.exitCode === 1);
assert(result.runnerWarnings.length === 0);
// changes were isolated inside a function run
assert(process.exitCode !== 1);
assert(result.commands.errors === ['err1']);
