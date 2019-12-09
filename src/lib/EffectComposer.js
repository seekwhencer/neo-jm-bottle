import Module from '../Module.js';

import {EffectComposer} from '../../node_modules/three/examples/jsm/postprocessing/EffectComposer.js';
import {RenderPass} from '../../node_modules/three/examples/jsm/postprocessing/RenderPass.js';
import {UnrealBloomPass} from '../../node_modules/three/examples/jsm/postprocessing/UnrealBloomPass.js';

export default class extends Module {
    constructor(stage) {
        super();
        return new Promise((resolve, reject) => {
            this.stage = stage;
            this.scene = this.stage.scene;

            this.label = 'EFFECT COMPOSER';

            this.options = {
                bloom: {
                    exposure: 1,
                    bloomStrength: 3,
                    bloomThreshold: 0,
                    bloomRadius: 50
                }
            };

            this.bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
            this.bloomPass.threshold = this.options.bloom.bloomThreshold;
            this.bloomPass.strength = this.options.bloom.bloomStrength;
            this.bloomPass.radius = this.options.bloom.bloomRadius;

            this.renderScene = new RenderPass(this.stage.scene._, this.stage.camera._);

            this._ = new EffectComposer(this.stage.renderer._);
            this._.addPass(this.renderScene);
            this._.addPass(this.bloomPass);

            this.stage.renderer._.toneMapping = THREE.ReinhardToneMapping;

            resolve(this);
        });

    }

    update(){
        //console.log(this.label, '>>> RENDER');
        this._.render();
    }
}
