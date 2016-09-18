import Tool from '../util/tool'

export default class AudioObj {
    constructor(actx, name) {
        this.id = Tool.id()
        this._name = name;

        // AudioContext
        this.ctx = actx
    }
}
