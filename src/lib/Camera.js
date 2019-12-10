import Module from '../Module.js';

export default class extends Module {
    constructor(stage) {
        super();
        return new Promise((resolve, reject) => {
            this.stage = stage;
            this.app = this.stage.app;
            this.label = 'CAMERA';

            this.options = {
                fov: 30,
                aspect: this.stage.app.getWidth() / this.stage.app.getHeight(),
                near: 0.1,
                far: 1000
            };

            this._ = new THREE.PerspectiveCamera(this.options.fov, this.options.aspect, this.options.near, this.options.far);
            this._.near = 0;
            this._.position.set(0, 0, 35);
            resolve(this);
        });
    }
}
