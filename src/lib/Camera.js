import Module from '../Module.js';

export default class extends Module {
    constructor(stage) {
        super();
        return new Promise((resolve, reject) => {
            this.stage = stage;
            this.label = 'CAMERA';
            this._ = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            this._.near = 0;
            this._.position.set(0, 0, 15);
            //this._.position.set(3, -2, 15);
            resolve(this);
        });
    }
}
