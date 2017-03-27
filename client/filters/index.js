
import moment from 'moment'

export function toTime (timestamp) {
  return moment.unix(timestamp).format('HH:mm')
}

export function toDate (timestamp) {
  return moment(timestamp).format('DD.MM.YYYY')
}
