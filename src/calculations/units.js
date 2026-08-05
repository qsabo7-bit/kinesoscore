/** Mass and distance helpers. Calculations use consistent internal units. */

export const LB_PER_KG = 2.2046226218
export const KM_PER_MILE = 1.609344

export const MASS_UNITS = [
  { value: 'lb', label: 'lb' },
  { value: 'kg', label: 'kg' },
]

export const DISTANCE_UNITS = [
  { value: 'mi', label: 'mi' },
  { value: 'km', label: 'km' },
]

export const HEIGHT_UNITS = [
  { value: 'in', label: 'in' },
  { value: 'cm', label: 'cm' },
]

export const CM_PER_INCH = 2.54

export function lbToKg(pounds) {
  return pounds / LB_PER_KG
}

export function kgToLb(kilograms) {
  return kilograms * LB_PER_KG
}

export function miToKm(miles) {
  return miles * KM_PER_MILE
}

export function kmToMi(kilometers) {
  return kilometers / KM_PER_MILE
}

/**
 * Convert a mass value between lb and kg.
 * @param {number} value
 * @param {'lb' | 'kg'} from
 * @param {'lb' | 'kg'} to
 */
export function convertMass(value, from, to) {
  if (!Number.isFinite(value) || from === to) return value
  return from === 'lb' ? lbToKg(value) : kgToLb(value)
}

/**
 * Convert a distance value between mi and km.
 * @param {number} value
 * @param {'mi' | 'km'} from
 * @param {'mi' | 'km'} to
 */
export function convertDistance(value, from, to) {
  if (!Number.isFinite(value) || from === to) return value
  return from === 'mi' ? miToKm(value) : kmToMi(value)
}

export function inToCm(inches) {
  return inches * CM_PER_INCH
}

export function cmToIn(centimeters) {
  return centimeters / CM_PER_INCH
}

/**
 * Convert a height value between in and cm.
 * @param {number} value
 * @param {'in' | 'cm'} from
 * @param {'in' | 'cm'} to
 */
export function convertHeight(value, from, to) {
  if (!Number.isFinite(value) || from === to) return value
  return from === 'in' ? inToCm(value) : cmToIn(value)
}

/**
 * Normalize height to centimeters for metabolic formulas.
 * @param {number} value
 * @param {'in' | 'cm'} unit
 */
export function toCm(value, unit) {
  return unit === 'in' ? inToCm(value) : value
}

/**
 * Normalize an entered distance to miles for race formulas / RunRepeat scoring.
 * @param {number} value
 * @param {'mi' | 'km'} unit
 */
export function toMiles(value, unit) {
  return unit === 'km' ? kmToMi(value) : value
}

/**
 * Format a numeric field after unit conversion.
 * @param {number} value
 * @param {number} decimals
 */
export function formatConverted(value, decimals = 1) {
  if (!Number.isFinite(value)) return ''
  const factor = 10 ** decimals
  return String(Math.round(value * factor) / factor)
}
