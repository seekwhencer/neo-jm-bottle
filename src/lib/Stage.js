import Module from '../Module.js';
import Scene from './Scene.js';
import Camera from './Camera.js';
import Renderer from './Renderer.js';
import Light from './Light.js';
import Controls from './controls.js';
import LightwaveObject from './LightwaveObject.js';

export default class extends Module {
    constructor(args) {
        super();
        return new Promise((resolve, reject) => {
            this.app = args;
            this.label = 'STAGE';

            this.on('ready', () => {
                this.draw();
                resolve(this);
            });

            new Scene(this)
                .then(scene => {
                    this.scene = scene;
                    return new Camera(this);
                })
                .then(camera => {
                    this.camera = camera;
                    return new Renderer(this);
                })
                .then(renderer => {
                    this.renderer = renderer;
                    return new Light(this);
                })
                .then(light => {
                    this.light = light;
                    return new LightwaveObject(this, 'bottle');
                })
                .then(bottle => {
                    this.bottle = bottle;
                    return new Controls(this);
                })
                .then(controls => {
                    this.controls = controls;
                    this.emit('ready');
                });
        });
    }

    add(element) {
        this.scene.add(element);
    }

    draw() {
        this.app.target.appendChild(this.renderer._.domElement);
        requestAnimationFrame(() => this.animate());
        window.addEventListener('resize', () => this.onWindowResize(), false);
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        if (this.controls)
            this.controls.update();

        this.renderer._.render(this.scene._, this.camera._);
    }

    onWindowResize() {
        const dim = this.app.target.getBoundingClientRect();
        this.camera._.aspect = dim.width / dim.height;
        this.camera._.updateProjectionMatrix();
        this.renderer._.setSize(dim.width, dim.height);
        if (this.controls)
            this.controls.update();
    }
}
