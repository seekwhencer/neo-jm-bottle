import './scss/app.scss';
import './Globals.js';
import QueryString from 'qs';
import Module from './Module.js';
import BottlerTemplate from './lib/Templates/bottler.html';
import Stage from './lib/Stage.js';

export default class extends Module {
    constructor(args) {
        super();
        return new Promise((resolve, reject) => {
            this.label = 'BOTTLER';
            this.options = args;
            this.options.debug = this.options.debug || false;
            this.options.language = this.options.language || 'de';
            this.options.target = this.options.target || document.querySelector('body');
            this.getParams();
            window.bottlerOptions = this.options;
            console.log(this.label, '>>> INIT', this.options);

            this.on('ready', () => {
                resolve(this);
            });

            this.target = toDOM(BottlerTemplate({scope: {}}));
            this.options.target.append(this.target);

            new Stage(this).then(stage => {
                this.stage = stage;
                this.emit('ready');
            });
        });

    }

    getParams() {
        const query = (new URL(document.location)).searchParams.toString();
        const params = QueryString.parse(query, {plainObjects: true});
        this.options = RAMDA.mergeDeepLeft(params, this.options);
    }

    getWidth() {
        return this.target.getBoundingClientRect().width;
    }
    getHeight() {
        return this.target.getBoundingClientRect().height;
    }
}
