import * as core from '@actions/core'
import * as github from '@actions/github'

async function run(): Promise<void> {
  try {
    const ms: string = core.getInput('milliseconds')
    const nameToGreet: string = core.getInput('who-to-greet');
    console.log(`Hello ${nameToGreet}!`);

    core.debug(`Waiting ${ms} milliseconds ...`)

    core.debug(new Date().toTimeString())

    const payload = JSON.stringify(github.context.payload, undefined, 2)
    console.log(`The event payload: ${payload}`);

    core.setOutput('time', new Date().toTimeString())
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
