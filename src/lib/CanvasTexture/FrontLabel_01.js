import CanvasTexture from "./index.js";

export default class extends CanvasTexture {
    constructor(model, options) {
        super(model, options);

        return new Promise((resolve, reject) => {
            this.model = model;
            this.stage = this.model.stage;
            this.scene = this.stage.scene;
            this.defaults = {
                debug: true,
                background: 'images/front01.png',
                width: 600,
                height: 1200,
                className: 'bottle-label',
                update: true
            };
            // this defaults override the root class options, and the given options overrides all
            this.options = {...this.options, ...this.defaults, ...options};

            this.label = 'CANVAS TEXTURE';
            this.on('ready', () => resolve(this));
            this.canvasBackground.src = this.options.background;
            this.emit('ready');
        });
    }

    /**
     * this function is very custom to draw the canvas
     */
    drawCanvas() {
        if (!this.ctx)
            return;

        this.ctx.save();
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.canvasBackground, 0, 0, this.options.width, this.options.height);

        this.ctx.translate(-150, 350);
        this.ctx.rotate(-Math.PI / 12.5);
        this.ctx.fillStyle = 'black';
        this.ctx.font = '40pt Exo-Black';
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.fillText(new Date().getTime(), this.canvas.width / 2, this.canvas.height / 2);

        this.update();
        this.ctx.restore();
    }

    /**
     * i dont know why, but it seems that this is a trigger.
     * but it is needed to update the mapped texture
     * called from the stage.update() as stage.bottle.update()
     */
    update() {
        this.options.update ? this.model.labelCanvasTexture.needsUpdate = true : null;
    }
}

