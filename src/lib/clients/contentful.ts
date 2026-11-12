import { createClient, type Asset, type AssetQueries, type EntriesQueries, type EntryCollection, type EntrySkeletonType } from 'contentful'
import { redis } from './redis'
import { waitUntil } from '@vercel/functions'

const preview = true
export const content = createClient({
  space: '9go3hfinbv0n',
  host: preview ? 'preview.contentful.com' : 'cdn.contentful.com',
  accessToken: preview ? 'G5T2ShBFZ-yiP9a5Twwdh1ngDBUs5J_VDkyPuYtoxNo' : 'TBiHUDIE_yT5d-we_F0LdbqhbYaQP216caKTnV9GaQE',
}).withoutUnresolvableLinks

const cached = async <T>(key: string, fetch: () => Promise<T>): Promise<T> => {
  const hit = await redis.get(key)
  if (hit) {
    console.log('cache hit', key)
    return JSON.parse(hit as string)
  }
  console.log('cache miss', key)
  const value = await fetch()
  waitUntil(redis.set(key, JSON.stringify(value)))
  return value
}

export const cachedEntries = async <T extends EntrySkeletonType>(q: EntriesQueries<T, "WITHOUT_UNRESOLVABLE_LINKS">): Promise<EntryCollection<T, "WITHOUT_UNRESOLVABLE_LINKS", string>> => {
  return cached(JSON.stringify(q), () => content.getEntries(q))
}

export const cachedTags = (): Promise<Awaited<ReturnType<typeof content.getTags>>> => {
  return cached('getTags', () => content.getTags())
}

export const cachedAsset = (id: string, query?: AssetQueries<'WITHOUT_UNRESOLVABLE_LINKS'>): Promise<Asset> => {
  return cached(`getAsset:${id}:${JSON.stringify(query ?? {})}`, () => content.getAsset(id, query))
}
