import os from 'os'
import fse from 'fs-extra'
import alfy from 'alfy'
import {Octokit} from 'octokit'
import EventEmitter from 'events'
import {Issue} from './quicktype/issue'
import ms from 'ms'

const octokit = new Octokit()

// const e = new EventEmitter()
// e.on('hello', () => {
//   console.log('world')
// })

async function main() {
  if (['update'].includes(alfy.input)) {
    await update()
    alfy.log('update complete')
    return
  }

  const issues = await getIssues()
  const list: alfy.OutputListItem[] = issues
    .filter((i) => {
      const searchText = alfy.input

      // list all
      if (searchText === 'ls') return true

      // search
      if (i.title.indexOf(searchText) > -1) return true
    })
    .map((i) => {
      return {
        title: i.title,
        subtitle: i.title + i.labels + i.id,
        arg: i.html_url,
        action: {
          url: i.url,
        },
      }
    })

  if (!list.length) {
    list.push({title: 'Not Found', icon: {path: alfy.icon.alert}})
  }

  alfy.output([...list])
}

function update() {
  alfy.cache.delete(cacheKey)
  return getIssues()
}

const cacheKey = 'magicdawn/magicdawn/issues'

async function getIssues(): Promise<Issue[]> {
  const cachedIssues = alfy.cache.get(cacheKey) as Issue[]
  if (cachedIssues?.length) {
    return cachedIssues
  }

  const res = await octokit.rest.issues.listForRepo({
    owner: 'magicdawn',
    repo: 'magicdawn',
  })
  const issues = res.data as Issue[]

  // persist
  alfy.cache.set(cacheKey, issues, {maxAge: ms('5d')})

  // use it
  return issues
}

main()
