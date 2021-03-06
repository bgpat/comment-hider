import * as core from '@actions/core'
import {Client} from './client'

async function run(): Promise<void> {
  try {
    const token: string = core.getInput('github_token')
    const userName: string = core.getInput('hide_user_name')
    const reason: string = core.getInput('hide_reason')

    const cli = new Client(token)
    const ids = await cli.SelectComments(userName)
    for (const id of ids) {
      await cli.HideComment(id, reason)
    }
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
