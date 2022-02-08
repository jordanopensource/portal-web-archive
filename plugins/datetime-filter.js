import Vue from 'vue'
import moment from 'moment'

function languageToLocale(lang) {
  return lang === 'ar' ? 'ar-JO' : 'en-UK'
}

/**
 * @param Date date
 * @param String 'Asia/Amman' timeZoneString
 * @param String 'en-UK' locale
 * @returns the time locale string based on the timeZoneString and locale
 * E.g. for locale 'en-UK' returns '10:30'
 */
const timeWithTimeZone = (date, timeZoneString, locale) => {
  return new Date(
    typeof date === 'string' ? new Date(date) : date
  ).toLocaleString(locale, {
    hour12: false,
    minute: '2-digit',
    hour: 'numeric',
    timeZone: timeZoneString,
  })
}

const fullDate = (dt, lang) => {
  // 25 May 2021
  const options = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }
  return new Intl.DateTimeFormat(languageToLocale(lang), options).format(
    new Date(dt)
  )
}

const dayDate = (dt, lang) => {
  // Tuesday - 5 May
  const weekday = moment(dt).locale(lang).format('dddd')
  const dayMonth = new Intl.DateTimeFormat(languageToLocale(lang), {
    day: 'numeric',
    month: 'long',
  }).format(new Date(dt))
  return `${weekday} - ${dayMonth}`
}

const dayFullDate = (dt, lang) => {
  // Tuesday, 25 May 2021
  const options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }
  return new Intl.DateTimeFormat(languageToLocale(lang), options).format(
    new Date(dt)
  )
}

/**
 * @param Date date
 * @param String 'Asia/Amman' timeZoneString
 * @param String 'en-UK' locale
 * @returns date locale string based on the timeZoneString and locale
 * E.g. for locale 'en-UK' returns 'Saturday, 5 February 2022'
 */
const fullDateWithTimeZone = (date, timeZoneString, locale) => {
  const langLocale = languageToLocale(locale)
  return new Date(
    typeof date === 'string' ? new Date(date) : date
  ).toLocaleString(langLocale, {
    dateStyle: 'full',
    timeZone: timeZoneString,
  })
}

const monthYearDate = (dt, lang) => {
  // May 2021
  const options = {
    month: 'long',
    year: 'numeric',
  }
  return new Intl.DateTimeFormat(languageToLocale(lang), options).format(
    new Date(dt)
  )
}

const monthDate = (dt, lang) => {
  // May
  return new Intl.DateTimeFormat(languageToLocale(lang), {
    month: 'long',
  }).format(new Date(dt))
}

const time = (dt, lang) => {
  return moment(dt).locale(lang).format('HH:mm')
}

const day = (dt, lang) => {
  return moment(dt).locale(lang).format('dddd')
}

const timezone = (dt, lang) => {
  return moment(dt).locale(lang).format('Z')
}

Vue.filter('fullDate', fullDate)
Vue.filter('dayDate', dayDate)
Vue.filter('dayFullDate', dayFullDate)
Vue.filter('monthYearDate', monthYearDate)
Vue.filter('monthDate', monthDate)
Vue.filter('time', time)
Vue.filter('day', day)
Vue.filter('timezone', timezone)
Vue.filter('timeWithTimeZone', timeWithTimeZone)
Vue.filter('fullDateWithTimeZone', fullDateWithTimeZone)
