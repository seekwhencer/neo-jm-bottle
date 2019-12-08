import Module from '../Module.js';

export default class extends Module {
    constructor(stage) {
        super();
        return new Promise((resolve, reject) => {
            this.stage = stage;
            this.app = this.stage.app;
            this.label = 'SCENE';
            this._ = new THREE.Scene();
            resolve(this);
        });
    }

    add(element) {
        this._.add(element);
    }
}
