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

            // top left
            this.light1 = new THREE.PointLight(0xddcc99, 1, 40);
            this.light1.position.set(-15, 10 , 20);
            this.light1.castShadow = false;

            // top right
            this.light2 = new THREE.PointLight(0xddcc99, 1, 40);
            this.light2.position.set(15, 10, 10);
            this.light2.castShadow = false;

            // top left
            this.light3 = new THREE.PointLight(0xddcc99, 1, 40);
            this.light3.position.set(-15, -10 , 20);
            this.light3.castShadow = false;

            // top right
            this.light4 = new THREE.PointLight(0xddcc99, 1, 40);
            this.light4.position.set(15, -10, 10);
            this.light4.castShadow = false;



            this.scene.add(this.light1);
            this.scene.add(this.light2);
            this.scene.add(this.light3);
            this.scene.add(this.light4);

            resolve(this);
        });

    }
}
