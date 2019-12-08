import Module from '../Module.js';
import './ObjectControls.js';

export default class extends Module {
    constructor(stage) {
        super();
        return new Promise((resolve, reject) => {
            this.stage = stage;
            this.label = 'CONTROLS';

            this.options = {
                rotate: this.stage.app.options.rotate || 'orbit'
            };

            if (this.options.rotate === 'orbit') {
                this._ = new ORBITCONTROLS(this.stage.camera._, this.stage.renderer._.domElement);
                this._.enableDamping = true;
                this._.dampingFactor = 0.03;
                this._.enableZoom = true;
                this._.rotateSpeed = 0.2;
                this._.autoRotate = true;
                this._.autoRotateSpeed = 0.05;
            }

            if (this.options.rotate === 'model') {
                this._ = new THREE.ObjectControls(this.stage.camera._, this.stage.renderer._.domElement, this.stage.bottle._.meshes[0]);
                this._.setDistance(8, 36); // set min - max distance for zoom
                this._.setZoomSpeed(0.5); // set zoom speed
                this._.enableVerticalRotation();
                this._.setMaxVerticalRotationAngle(Math.PI / 8, Math.PI / 8);
                this._.enableHorizontalRotation();
                this._.setMaxHorizontalRotationAngle(Math.PI / 8, Math.PI / 8);
                this._.setRotationSpeed(0.02);
            }

            resolve(this);
        });

    }

    update() {
        if (this.options.rotate === 'orbit') {
            this._.update();
        }
    }
}
