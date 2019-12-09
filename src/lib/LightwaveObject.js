import {LWOLoader} from '../../node_modules/three/examples/jsm/loaders/LWOLoader.js';
import Module from '../Module.js';
import CanvasTexture from './CanvasTexture/index.js';

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
        this.bottleFrontLabelMaterial.emissiveIntensity = 5; // this is for the brightness
        this.bottleFrontLabelMaterial.shading = THREE.SmoothShading;

        // only the image mapped... drop it. the canvas contains the background image
        //this.textureLoader = new THREE.TextureLoader();
        //this.bottleFrontLabelTexture = this.textureLoader.load("images/front01.png");
        //this.bottleFrontLabelTexture.encoding = THREE.sRGBEncoding;
        //this.bottleFrontLabelMaterial.map = this.bottleFrontLabelTexture;

        new CanvasTexture(this, {
            debug: true,
            background: 'images/front01.png',
            width: 600,
            height: 1200,
            className: 'bottle-label'
        }).then(canvasTexture => {
            this.canvasTexture = canvasTexture;
            this.labelCanvasTexture = new THREE.Texture(this.canvasTexture.canvas);
            this.bottleFrontLabelMaterial.map = this.labelCanvasTexture;
            this.bottleFrontLabelMaterial.emissiveMap = this.labelCanvasTexture;
        });

        console.log(this.label, '>>> MATERIALS:', this.bottleMaterial, this.bottleFrontLabelMaterial);
    }

    update() {
        if(this.canvasTexture)
            this.canvasTexture.drawCanvas();
    }

}
