import {LWOLoader} from '../../node_modules/three/examples/jsm/loaders/LWOLoader.js';
import Module from '../Module.js';

export default class extends Module {
    constructor(stage, model) {
        super();

        this.stage = stage;
        this.scene = this.stage.scene;
        this.label = 'LIGHTWAVE OBJECT';

        //this.loader.manager.onLoad = (l) => {
        //    console.log(this.label, '>>> SOMETHING LOADED', l);
        //};

        this.on('model-not-found', () => {
            console.log(this.label, '>>> MODEL NOT FOUND:', model);
        });

        this
            .load(model)
            .then(() => {
                this.init();
            })
            .catch(() => {
                this.emit('model-not-found');
            });
    }

    load(model) {
        return new Promise((resolve, reject) => {
            this.loader = new LWOLoader();
            this.loader.setResourcePath('./');
            this.loader.load(`models/${model}.lwo`,
                obj => {
                    this._ = obj;
                    this.hide();
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

    update() {
        //... do something here
    }

    show(){
        this._.meshes[0].visible = true;
    }

    hide(){
        this._.meshes[0].visible = false;
    }

}
