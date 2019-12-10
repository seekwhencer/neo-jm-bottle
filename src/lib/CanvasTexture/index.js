import Module from '../../Module.js';

export default class extends Module {
    constructor(model, options) {
        super();

        this.model = model;
        this.stage = this.model.stage;
        this.scene = this.stage.scene;
        this.defaults = {
            debug: true
        };
        this.options = {...this.defaults, ...options};
        this.label = 'CANVAS TEXTURE';

        this.canvas = document.createElement('canvas');
        this.canvas.width = this.options.width;
        this.canvas.height = this.options.height;
        this.canvas.className = this.options.className;
        this.canvas.transparent = true;
        this.canvasBackground = document.createElement('img');
        this.canvasBackground.onload = () => {

        };

        this.options.debug ? document.querySelector('body').append(this.canvas) : null;
        this.ctx = this.canvas.getContext('2d');
    }
}
