import Module from '../../Module.js';
import BottleModel from "./Bottle.js";

export default class extends Module {
    constructor(stage, options) {
        super();

        return new Promise((resolve, reject) => {
            this.stage = stage;
            this.scene = this.stage.scene;

            this.defaults = {};
            this.options = {...this.defaults, ...options};
            this.label = 'BOTTLES';

            new BottleModel(this, {
                debug: true,
                background: 'images/front01.png',
                width: 512,
                height: 1024,
                className: 'bottle-label',
                update: true
            }).then(bottle => {
                this.bottle = bottle;
                this.emit('ready');
            });

            this.on('ready', () => {
                resolve(this)
            });

        });
    }
}
