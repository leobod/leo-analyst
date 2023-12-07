import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')

/**
 * day.js版本格式化日期时间
 * @param str
 * @param format      YYYY-MM-DD HH:mm:ss
 * @returns {string}
 */
export const formatDate = (str, format) => {
  return dayjs(str).format(format)
}

const toDate = (d) => {
  return dayjs(d).toDate()
}

/**
 * dayjs转Date
 * @param str
 * @return {Date}
 */
export const dayjsToDate = (str) => {
  return dayjs(str).toDate()
}

export const getStartOfHour = (d, h = 'HH') =>
  formatDate(d, `YYYY/MM/DD ${h}:00:00`)
const getStartOfDay = (d) => formatDate(d, 'YYYY/MM/DD 00:00:00')
const getEndOfDay = (d) => formatDate(d, 'YYYY/MM/DD 23:59:59')
const getStartOfWeek = (d) => {
  const date = toDate(d)
  const r = toDate(d)
  if (date.getDay() === 0) {
    r.setDate(date.getDate() - 6)
  } else {
    r.setDate(date.getDate() - (date.getDay() - 1))
  }
  return getStartOfDay(r)
}
export const getEndOfWeek = (d) => {
  const date = toDate(d)
  const r = toDate(d)
  if (date.getDay() === 0) {
    r.setDate(date.getDate())
  } else {
    r.setDate(date.getDate() + (7 - date.getDay()))
  }
  return getEndOfDay(r)
}
export const getStartOfMonth = (d) => formatDate(d, 'YYYY/MM/01 00:00:00')

export const getMaxDateOfMonth = (d) => {
  const date = toDate(d)
  date.setDate(1)
  date.setMonth(date.getMonth() + 1)
  date.setDate(0)
  return date.getDate()
}

export const getEndOfMonth = (d) => {
  const lastDate = getMaxDateOfMonth(d)
  return formatDate(d, `YYYY/MM/${lastDate} 23:59:59`)
}

export const getCloserDateTime = (
  d,
  interval = 15,
  step = 0,
  type = 'ceil'
) => {
  const date = toDate(d)
  let numberInterval
  if (type === 'ceil') {
    /* 取上整 */
    numberInterval = Math.ceil(date.getMinutes() / interval)
  } else if (type === 'floor') {
    /* 取下整 */
    numberInterval = Math.floor(date.getMinutes() / interval)
  } else if (type === 'round') {
    /* 四舍五入 */
    numberInterval = Math.floor(date.getMinutes() / interval)
  } else {
    numberInterval = Math.ceil(date.getMinutes() / interval)
  }
  date.setHours(date.getHours(), (numberInterval + step) * interval, 0, 0)
  return date
}

/**
 * 是否是今天
 * @param d
 * @returns {number} 返回2明天之后，返回1今天，返回0昨天之前
 */
export const getIsToday = (d) => {
  const date = toDate(d)
  const now = new Date()
  let result = 0

  if (date.getFullYear() > now.getFullYear()) {
    result = 2
  } else if (date.getFullYear() < now.getFullYear()) {
    result = 0
  } else {
    if (date.getMonth() > now.getMonth()) {
      result = 2
    } else if (date.getMonth() < now.getMonth()) {
      result = 0
    } else {
      if (date.getDate() > now.getDate()) {
        result = 2
      } else if (date.getDate() < now.getDate()) {
        result = 0
      } else {
        result = 1
      }
    }
  }
  return result
}
