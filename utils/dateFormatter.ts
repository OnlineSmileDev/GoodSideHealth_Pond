import moment from 'moment/moment'

export const dateFormatter = (date) => moment(date).format('LL')
