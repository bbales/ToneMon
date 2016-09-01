import _ from 'lodash';

export default class Str {
    static id(len) {
        len = _.isUndefined(len) ? 5 : len
        return Math.random().toString(36).substring(len)
    }
}
