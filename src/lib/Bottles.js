import Module from '../Module.js';
import BottleModel from "./Models/Bottle.js";

export default class extends Module {
    constructor(stage, options) {
        super();

        return new Promise((resolve, reject) => {
            this.stage = stage;
            this.scene = this.stage.scene;

            this.defaults = {};
            this.options = {...this.defaults, ...options};
            this.label = 'BOTTLES';

            wait(0)
                .then(() => {
                    return new BottleModel(this, {
                        debug: true,
                        background: 'images/front01.png',
                        width: 512,
                        height: 1024,
                        className: 'bottle-label',
                        update: true,
                        x: 0,
                        y: -20,
                        z: 0,
                        x_to: 0,
                        y_to: 0,
                        z_to: 0
                    })
                })
                .then(bottle => {
                    this.items.push(bottle);
                    return new BottleModel(this, {
                        debug: true,
                        background: 'images/front02.png',
                        width: 512,
                        height: 1024,
                        className: 'bottle-label',
                        update: true,
                        x: 0,
                        y: -20,
                        z: 0,
                        x_to: -7,
                        y_to: 0,
                        z_to: 0
                    })
                })
                .then(bottle => {
                    this.items.push(bottle);
                    return new BottleModel(this, {
                        debug: true,
                        background: 'images/front03.png',
                        width: 512,
                        height: 1024,
                        className: 'bottle-label',
                        update: true,
                        x: 0,
                        y: -20,
                        z: 0,
                        x_to: 7,
                        y_to: 0,
                        z_to: 0
                    })
                })
                .then(bottle => {
                    this.items.push(bottle);
                    this.emit('ready');
                });

            this.on('ready', () => {
                resolve(this)
            });

        });
    }

    update() {
        this.items.map(i => i.update());
    }

    get bottle() {
        return this.items[0];
    }
}
