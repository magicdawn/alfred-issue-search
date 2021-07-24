import alfy from 'alfy'
import ms from 'ms'

import {Octokit} from 'octokit'
const octokit = new Octokit()

import {RestEndpointMethodTypes} from '@octokit/plugin-rest-endpoint-methods'
type Singular<T> = T extends (infer S)[] ? S : T
type Issue = Singular<RestEndpointMethodTypes['issues']['listForRepo']['response']['data']>

async function main() {
  if (['update'].includes(alfy.input)) {
    await update()
    alfy.output([
      {
        title: 'update complete',
        icon: {
          path: alfy.icon.like,
        },
      },
    ])
    return
  }

  const issues = await getIssues()
  const list: alfy.OutputListItem[] = issues
    .map((i) => {
      return {
        title: i.title,
        subtitle: `#${i.number} ${i.body_text || ''} ${i.labels.map((l) => l.name).join(',')} ${
          i.body_text || ''
        }`,
        arg: i.html_url,
        action: {
          url: i.url,
        },
        icon: {
          path: alfy.icon.like,
        },
      }
    })
    .filter((i) => {
      const searchText = (alfy.input || '').toLowerCase()

      // list all
      if (searchText === 'ls') return true

      /**
       * search
       */

      // by title
      if ((i.title || '').toLowerCase().indexOf(searchText) > -1) return true

      // by subtitle
      if ((i.subtitle || '').toLowerCase().indexOf(searchText) > -1) return true
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

  const issues: Issue[] = await octokit.paginate(octokit.rest.issues.listForRepo, {
    owner: 'magicdawn',
    repo: 'magicdawn',
    per_page: 100,
  })

  // persist
  alfy.cache.set(cacheKey, issues, {maxAge: ms('5d')})

  // use it
  return issues
}

main()
