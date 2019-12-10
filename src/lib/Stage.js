import Module from '../Module.js';
import Scene from './Scene.js';
import Camera from './Camera.js';
import Renderer from './Renderer.js';
import Light from './Light.js';
import Controls from './controls.js';
import BottleModel from './Models/Bottle.js';
import EffectComposer from './EffectComposer.js';

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
                    return new EffectComposer(this);
                })
                .then(composer => {
                    this.composer = composer;
                    return new Light(this);
                })
                .then(light => {
                    this.light = light;
                    return new BottleModel(this, {
                        debug: true,
                        background: 'images/front01.png',
                        width: 600,
                        height: 1200,
                        className: 'bottle-label',
                        update: true
                    });
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
        this.update();
        this.renderer._.render(this.scene._, this.camera._);
        requestAnimationFrame(() => this.animate());
    }

    onWindowResize() {
        const width = this.app.getWidth();
        const height = this.app.getHeight();

        this.camera._.fov = this.camera.options.fov || 75;
        this.camera._.aspect = width / height;
        this.camera._.near = this.camera.options.near || 0.1;
        this.camera._.far = this.camera.options.far || 1000;

        this.renderer._.setSize(width, height);
        this.camera._.updateProjectionMatrix();

        this.update();
    }

    update(){
        if (this.controls) {
            this.controls.update();
        }

        if (this.composer) {
            //this.composer.update();
        }

        if (this.light) {
            this.light.update();
        }

        if (this.bottle) {
            this.bottle.update();
        }
    }
}
