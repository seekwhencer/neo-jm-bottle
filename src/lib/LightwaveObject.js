import {LWOLoader} from '../../node_modules/three/examples/jsm/loaders/LWOLoader.js';
import Module from '../Module.js';

export default class extends Module {
    constructor(stage, model) {
        super();
        return new Promise((resolve, reject) => {
            this.stage = stage;
            this.scene = this.stage.scene;
            this.label = 'LIGHTWAVE OBJECT';

            this.on('ready', () => resolve(this));

            //this.loader.manager.onLoad = (l) => {
            //    console.log(this.label, '>>> SOMETHING LOADED', l);
            //};

            this
                .load(model)
                .then(() => {
                    this.initObject();
                    this.emit('ready');
                })
                .catch(() => {
                    this.emit('ready');
                });

        });
    }

    load(model) {
        return new Promise((resolve, reject) => {
            this.loader = new LWOLoader();
            this.loader.setResourcePath('./');
            this.loader.load(`models/${model}.lwo`,
                obj => {
                    this._ = obj;
                    console.log(this.label, '>>> LOADED');
                    resolve();
                },
                xhr => {
                    console.log(this.label, '>>> XHR:', (xhr.loaded / xhr.total * 100) + '% LOADED');
                },
                err => {
                    console.error(this.label, '>>> ERROR');
                    reject();
                });
        });
    }

    initObject() {
        this.scene.add(this._.meshes[0]);
        this._.meshes[0].scale.set(50, 50, 50);
        this._.meshes[0].renderOrder = 1;

        console.log(this.label, '>>> ADDED MESHES:', this._.meshes.length, this._.meshes);
        console.log(this.label, '>>> ADDED MATERIALS:', this._.materials.length, this._.materials);

        this.bottleMaterial = this._.materials.filter(i => i.name === 'glass bottle')[0];
        this.bottleMaterial.transparent = true;
        this.bottleMaterial.opacity = 0.6;
        this.bottleMaterial.side = THREE.BackSide;

        this.bottleFrontLabelMaterial = this._.materials.filter(i => i.name === 'glass bottle front')[0];
        this.bottleFrontLabelMaterial.side = THREE.BackSide;
        this.bottleFrontLabelMaterial.transparent = true;

        //this.textureLoader = new THREE.TextureLoader();
        //this.bottleFrontLabelTexture = this.textureLoader.load("images/front01.png");
        //this.bottleFrontLabelTexture.encoding = THREE.sRGBEncoding;
        //this.bottleFrontLabelMaterial.map = this.bottleFrontLabelTexture;
        //this.bottleFrontLabelMaterial.map.anisotropy = 0;

        this.initCanvas();

        this.labelTexture = new THREE.Texture(this.canvas);
        this.bottleFrontLabelMaterial.shading = THREE.SmoothShading;
        this.bottleFrontLabelMaterial.map = this.labelTexture;
        this.bottleFrontLabelMaterial.emissiveMap = this.labelTexture;
        this.bottleFrontLabelMaterial.emissiveIntensity = 5; // this is for the brightness

        console.log(this.label, '>>> MATERIALS:', this.bottleMaterial, this.bottleFrontLabelMaterial);
    }

    initCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.width = 600;
        this.canvas.height = 1200;
        this.canvas.className = "bottle-label";
        document.querySelector('body').append(this.canvas);
        this.ctx = this.canvas.getContext('2d');
    }

    drawCanvas() {
        if (!this.ctx)
            return;

        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = 'white';
        this.ctx.font = '40pt Arial';
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.fillText(new Date().getTime(), this.canvas.width / 2, this.canvas.height / 2);

        // i dont know why, but it seems that this is a trigger.
        // maybe triggered with a setter
        // but it is needed to update the mapped texture
        this.labelTexture.needsUpdate = true;
    }

    update() {
        this.drawCanvas();
    }

}
