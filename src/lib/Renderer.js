import Module from '../Module.js';

export default class extends Module {
    constructor(stage) {
        super();
        return new Promise((resolve, reject) => {
            this.stage = stage;
            this.app = this.stage.app;
            this.label = 'RENDERER';

            this._ = new THREE.WebGLRenderer({
                antialias: true,
                shadowMap: {
                    enabled: true,
                    type: THREE.PCFSoftShadowMap
                },
                alpha: true,
            });
            const dim = this.app.target.getBoundingClientRect();
            this._.setSize(dim.width, dim.height);
            resolve(this);
        });
    }
}
