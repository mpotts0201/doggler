import numeral from 'numeral';

// import moment from 'moment';

export function formatCurrency(value) {
    return numeral(value).format('$0,0.00');
}

export function formatCurrencyShort(value) {
    return numeral(value).format('$0,0');
}

// export function formatMonthDay(date) {
//     return date ? moment(date).format('MMM Do') : date;
// }
//
// export function formatShortDate(date) {
//     return date ? moment(date).format('l') : date;
// }
//
// export function formatMonthDayYear(date) {
//     return date ? moment(date).format('LL') : date;
// }

export function formatPercentage(value) {
    return numeral(value).format('0.000%');
}
