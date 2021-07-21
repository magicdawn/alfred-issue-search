import Conf from 'conf'

export const input: string

export namespace OutputListItem {
  type ModKeys = 'alt' | 'cmd'

  type IconType = string

  interface ModItem {
    valid?: boolean
    arg?: string
    subtitle?: string
  }

  type Mod = {
    [k in ModKeys]: ModItem
  }

  interface ActionObject {
    text?: string | string[]
    url?: string
    file?: string
    auto?: string
  }
  type Action = string | string[] | ActionObject
}

export interface OutputListItem {
  uid?: string
  title?: string
  subtitle?: string
  arg?: string

  icon?: {
    type?: OutputListItem.IconType
    path?: string
  }

  valid?: boolean

  match?: string

  //
  autocomplete?: string

  type?: 'default' | 'file' | 'file:skipcheck'

  mods?: OutputListItem.Mod

  action?: OutputListItem.Action

  text?: object

  quicklookurl?: string
}

export function output(
  list: OutputListItem[],
  options?: {
    returnInterval?: number
  }
)

export function log(value: any): void
export function error(error: Error | string): void

export function matches(input: any, list: any, item?: any)

export function inputMatches(list: any, item?: any)

export function fetch(url: string, options: any): Promise<unknown>

export const config: Conf

export const userConfig: Map<string, string | number | boolean>

export const cache: Conf

export const debug: boolean

type IconKeys = 'info' | 'warning' | 'error' | 'alert' | 'like' | 'delete'
export const icon: {
  [k in IconKeys]: string
} & {
  get: (name: string) => string
}

interface WorkflowMeta {
  name?: string
  version?: string
  uid?: string
  bundleId?: string
}
export const meta: WorkflowMeta

interface AlfredMeta {
  version: string
  theme: string
  themeBackground: string
  themeSelectionBackground: string
  themeSubtext: unknown
  data: string
  cache: string
  preferences: string
  preferencesLocalHash: string
}
export const alfred: AlfredMeta
