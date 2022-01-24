import Vue from 'vue'
import moment from 'moment'

function lang2locale(lang) {
  return lang === 'ar' ? 'ar-JO' : 'en-UK'
}

// Convert a date to the desired time zone
const convertTZ = (date, tzString, locale) => {
  return new Date(
    typeof date === 'string' ? new Date(date) : date
  ).toLocaleString(locale, {
    hour12: false,
    minute: '2-digit',
    hour: 'numeric',
    timeZone: tzString,
  })
}

const fullDate = (dt, lang) => {
  // 25 May 2021
  const options = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }
  return new Intl.DateTimeFormat(lang2locale(lang), options).format(
    new Date(dt)
  )
}

const dayDate = (dt, lang) => {
  // Tuesday - 5 May
  const weekday = moment(dt).locale(lang).format('dddd')
  const dayMonth = new Intl.DateTimeFormat(lang2locale(lang), {
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
  return new Intl.DateTimeFormat(lang2locale(lang), options).format(
    new Date(dt)
  )
}

const fullDateTz = (date, tzString, locale) => {
  return new Date(
    typeof date === 'string' ? new Date(date) : date
  ).toLocaleString(locale, {
    dateStyle: 'full',
    timeZone: tzString,
  })
}

const monthYearDate = (dt, lang) => {
  // May 2021
  const options = {
    month: 'long',
    year: 'numeric',
  }
  return new Intl.DateTimeFormat(lang2locale(lang), options).format(
    new Date(dt)
  )
}

const monthDate = (dt, lang) => {
  // May
  return new Intl.DateTimeFormat(lang2locale(lang), { month: 'long' }).format(
    new Date(dt)
  )
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
Vue.filter('convertTZ', convertTZ)
Vue.filter('fullDateTz', fullDateTz)
