import Module from '../Module.js';

export default class extends Module {
    constructor(stage) {
        super();
        return new Promise((resolve, reject) => {
            this.stage = stage;
            this.scene = this.stage.scene;
            this.label = 'LIGHT';

            this.ambient = new THREE.AmbientLight(0x404040);
            this.scene.add(this.ambient);

            this.light1 = new THREE.PointLight(0xddcc99, 1, 9);
            this.light1.position.set(2, 5, 3);
            this.light1.castShadow = false;

            this.light2 = new THREE.PointLight(0xddcc99, 1, 9);
            this.light2.position.set(-2, -10, 5);
            this.light2.castShadow = false;

            this.light3 = new THREE.PointLight(0xddcc99, 1, 0);
            this.light3.position.set(-50, -20, 50);
            this.light3.castShadow = false;

            this.scene.add(this.light1);
            this.scene.add(this.light2);
            this.scene.add(this.light3);

            resolve(this);
        });

    }
}
