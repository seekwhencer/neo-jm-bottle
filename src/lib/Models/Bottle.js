import LightwaveObject from '../LightwaveObject.js';
import FrontLabelCanvas from "../CanvasTexture/FrontLabel_01.js";

export default class extends LightwaveObject {
    constructor(stage, options) {
        super(stage, 'bottle');

        return new Promise((resolve, reject) => {
            this.stage = stage;
            this.scene = this.stage.scene;

            this.defaults = {
                debug: true,
                background: 'images/front01.png',
                width: 600,
                height: 1200,
                className: 'bottle-label',
                update: true,
                x: 0,
                y: 0,
                z: 0
            };
            this.options = {...this.defaults, ...options};
            this.label = 'BOTTLE MODEL';

            this.on('ready', () => {
                resolve(this);
            });

        });
    }

    init() {
        console.log(this.label, '>>> INIT');
        this.scene.add(this._.meshes[0]);
        this._.meshes[0].scale.set(50, 50, 50);
        this._.meshes[0].renderOrder = 1;

        console.log(this.label, '>>> ADDED MESHES:', this._.meshes.length, this._.meshes);
        console.log(this.label, '>>> ADDED MATERIALS:', this._.materials.length, this._.materials);

        this.bottleMaterial = this._.materials.filter(i => i.name === 'glass bottle')[0];
        this.bottleMaterial.transparent = true;
        this.bottleMaterial.opacity = 0.6;
        this.bottleMaterial.side = THREE.BackSide;

        // @TODO
        /*this.envMap = new THREE.TextureLoader().load("images/front01.png");
        this.bottleMaterial.envMap = this.envMap;
        this.bottleMaterial.reflectivity = 1.0;
        this.bottleMaterial.mapping = THREE.SphericalReflectionMapping; //THREE.SphericalReflectionMapping;
        this.bottleMaterial.encoding = THREE.sRGBEncoding;
        this.bottleMaterial.needsUpdate = true;*/

        this.bottleFrontLabelMaterial = this._.materials.filter(i => i.name === 'glass bottle front')[0];
        this.bottleFrontLabelMaterial.side = THREE.BackSide;
        this.bottleFrontLabelMaterial.transparent = true;
        this.bottleFrontLabelMaterial.emissiveIntensity = 5; // this is for the brightness
        this.bottleFrontLabelMaterial.shading = THREE.SmoothShading;

        // only the image mapped... drop it. the canvas contains the background image
        //this.textureLoader = new THREE.TextureLoader();
        //this.bottleFrontLabelTexture = this.textureLoader.load("images/front01.png");
        //this.bottleFrontLabelTexture.encoding = THREE.sRGBEncoding;
        //this.bottleFrontLabelMaterial.map = this.bottleFrontLabelTexture;

        new FrontLabelCanvas(this, this.options).then(canvasTexture => {
            this.canvasTexture = canvasTexture;
            this.labelCanvasTexture = new THREE.Texture(this.canvasTexture.canvas);
            this.bottleFrontLabelMaterial.map = this.labelCanvasTexture;
            this.bottleFrontLabelMaterial.emissiveMap = this.labelCanvasTexture;

            console.log(this.label, '>>> MATERIALS:', this.bottleMaterial, this.bottleFrontLabelMaterial);
            this.emit('ready');
        });


    }

    update() {
        super.update();
        if (this.canvasTexture)
            this.canvasTexture.drawCanvas();
    }

    move(to, from) {
        return new Promise(resolve => {
            console.log(this.label, '>>> MOVING TO:', JSON.stringify(to));
            const duration = 5000;
            const data = from;// || {x: -0, y: 0, z: 0};
            // const to = to; // || {x: 7, y: 0, z: 0};

            this.stop();
            this.movement = new TWEEN.Tween(data)
                .to(to, duration)
                .easing(TWEEN.Easing.Quintic.InOut)
                .onUpdate(() => {
                    this._.meshes[0].position.set(data.x, data.y, data.z);
                });

            // not working.
            /*this.movement.onComplete(() => {
                console.log('>>>>>>>>>>>>!!!!');
                resolve();
            });*/

            this.movement.start();

            // on complete replacement
            setTimeout(() => {
                console.log(this.label, '>>> MOVEMENT COMPLETE');
                resolve();
            }, duration);
        });
    }

    stop() {
        if (this.movement)
            this.movement.stop();
    }

    moveIn() {
        // try out with tween.js
        // but wrap it in promises
        // hmmmm... yummy
        return wait(10).then(() => {
            this.show();
            return this.move({
                x: this.options.x_to,
                y: this.options.y_to,
                z: this.options.z_to
            }, {x: this.options.x, y: this.options.y, z: this.options.z});
        });
        //.then(() => this.move({x: -7, y: 0, z: 0}, {x: 7, y: 0, z: 0}))
        //.then(() => this.move({x: this.options.x, y: this.options.y, z: this.options.z}, {x: -7, y: 0, z: 0}));
    }

}
