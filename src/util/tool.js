import _ from 'lodash';

export default class Tool {
    static id(len) {
        len = _.isUndefined(len) ? 5 : len
        return Math.random().toString(36).substring(len)
    }

    static setAll(array, prop, value) {
        array.map(o => _.set(o, prop, value));
    }
}
