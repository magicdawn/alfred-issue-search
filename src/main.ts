import alfy from 'alfy'
import {Octokit} from 'octokit'
import EventEmitter from 'events'
const octokit = new Octokit()

const e = new EventEmitter()

e.on('hello', () => {
  console.log('world')
})

async function main() {
  alfy.log('hello' + alfy.input)
  return

  const run = () => {
    const issues = getIssues()
  }

  alfy.output([
    {
      title: 'Unicorn',
      subtitle: alfy.input,
    },
  ])

  const issues = await octokit.rest.issues.listForRepo({
    owner: 'magicdawn',
    repo: 'magicdawn',
  })

  alfy.log(issues)
}

const cacheKey = 'magicdawn-magicdawn-issues'

function getIssues() {
  return alfy.cache.get(cacheKey)
}

async function refetch() {
  const issues = await octokit.rest.issues.listForRepo({
    owner: 'magicdawn',
    repo: 'magicdawn',
  })

  if (alfy.debug) {
    alfy.log(issues)
  }

  alfy.cache.set(cacheKey, issues)
}

main()
