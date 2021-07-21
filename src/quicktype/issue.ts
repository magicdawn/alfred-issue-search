export interface Issue {
  url: string
  repository_url: string
  labels_url: string
  comments_url: string
  events_url: string
  html_url: string
  id: number
  node_id: string
  number: number
  title: string
  user: User
  labels: Label[]
  state: State
  locked: boolean
  assignee: null
  assignees: any[]
  milestone: null
  comments: number
  created_at: string
  updated_at: string
  closed_at: null
  author_association: AuthorAssociation
  active_lock_reason: null
  body: string
  performed_via_github_app: null
}

export enum AuthorAssociation {
  Owner = 'OWNER',
}

export interface Label {
  id: number
  node_id: string
  url: string
  name: string
  color: string
  default: boolean
  description: null
}

export enum State {
  Open = 'open',
}

export interface User {
  login: string
  id: number
  node_id: string
  avatar_url: string
  gravatar_id: string
  url: string
  html_url: string
  followers_url: string
  following_url: string
  gists_url: string
  starred_url: string
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  events_url: string
  received_events_url: string
  type: Type
  site_admin: boolean
}

export enum Type {
  User = 'User',
}
