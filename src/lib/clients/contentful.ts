import { dev } from '$app/environment'
import { createClient, type Asset, type AssetQueries, type EntriesQueries, type EntryCollection, type EntrySkeletonType } from 'contentful'
import { redis } from './redis'
import { waitUntil } from '@vercel/functions'

const preview = !!dev
export const content = createClient({
  space: '9go3hfinbv0n',
  host: preview ? 'preview.contentful.com' : 'cdn.contentful.com',
  accessToken: preview ? 'G5T2ShBFZ-yiP9a5Twwdh1ngDBUs5J_VDkyPuYtoxNo' : 'TBiHUDIE_yT5d-we_F0LdbqhbYaQP216caKTnV9GaQE',
}).withoutUnresolvableLinks

// Contentful resolves links by object identity, so the same entry can appear in many
// places (shared refs) and sometimes form true cycles. Clone with a path stack so
// shared refs are duplicated for JSON, and only real cycles are dropped.
const cloneForCache = (value: unknown, stack = new WeakSet<object>()): unknown => {
  if (value === null || typeof value !== 'object') return value
  if (stack.has(value)) return null

  stack.add(value)

  let cloned: unknown
  if (Array.isArray(value)) {
    cloned = value.map((item) => cloneForCache(item, stack))
  } else {
    const out: Record<string, unknown> = {}
    for (const [key, item] of Object.entries(value)) {
      out[key] = cloneForCache(item, stack)
    }
    cloned = out
  }

  stack.delete(value)
  return cloned
}

const cached = async <T>(key: string, fetch: () => Promise<T>): Promise<T> => {
  const hit = await redis.get(key)
  if (hit) {
    console.log('cache hit', key)
    return JSON.parse(hit as string)
  }
  console.log('cache miss', key)
  const value = await fetch()
  try {
    waitUntil(redis.set(key, JSON.stringify(cloneForCache(value))))
  } catch (error) {
    console.error('cache set failed', key, error)
  }
  return value
}

export const cachedEntries = async <T extends EntrySkeletonType>(q: EntriesQueries<T, "WITHOUT_UNRESOLVABLE_LINKS">): Promise<EntryCollection<T, "WITHOUT_UNRESOLVABLE_LINKS", string>> => {
  return cached(JSON.stringify(q), () => content.getEntries(q))
}

export const cachedTags = (): Promise<Awaited<ReturnType<typeof content.getTags>>> => {
  return cached('getTags', () => content.getTags())
}

export const cachedAsset = (id: string, query?: AssetQueries<'WITHOUT_UNRESOLVABLE_LINKS'>): Promise<Asset<'WITHOUT_UNRESOLVABLE_LINKS'>> => {
  return cached(`getAsset:${id}:${JSON.stringify(query ?? {})}`, () => content.getAsset(id, query))
}
