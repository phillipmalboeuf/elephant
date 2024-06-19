import { DateTime } from 'luxon'
import { languageTag } from './paraglide/runtime'

export const money = (value: any) => {
  const currency = Intl.NumberFormat('fr-CA', {
    style: 'currency',
    currency: 'CAD',
    // maximumFractionDigits: 0
  })
  return currency.format(value)
}

export const date = (value: string) => {
  return DateTime.fromISO(value).setLocale('en-US').toLocaleString({ day: '2-digit', month: '2-digit', year: '2-digit' }).replaceAll('/', '.')
}

export const time = (value: string, timezone: number) => {
  return DateTime.fromISO(value).setLocale('en-US').setZone(`UTC${timezone}`).toLocaleString({ hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).replaceAll('/', '.')
}

export const feet = (meters: number) => {
  if (languageTag() !== 'en-US') { return meters + "m" }
  const value = meters * 3.280839895
  return new Intl.ListFormat(undefined, { style: "narrow", type: "unit" }).format([
    new Intl.NumberFormat(undefined, {
      style: "unit",
      unit: "foot",
      unitDisplay: "narrow",
      maximumFractionDigits: 0
    }).format(Math.floor(value)),
    new Intl.NumberFormat(undefined, {
      style: "unit",
      unit: "inch",
      unitDisplay: "narrow",
      maximumFractionDigits: 0
    }).format(value % 1 * 12)
  ])
}