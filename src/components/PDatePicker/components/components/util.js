import DateUtil from './date_util/native';
const getDateUtil = (dateUtil = 'native') => {
    if (dateUtil instanceof Object)
        return dateUtil;
    else if (typeof dateUtil === 'string' || dateUtil instanceof String) {
        return DateUtil;
    }
}

export { getDateUtil }
