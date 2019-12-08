export default class Log {
    constructor() {
        window.consoleLog = console.log;
        console.log = this.log;
    }

    log() {
        if (!window.bottlerOptions)
            return;

        if (!window.bottlerOptions.debug)
            return;

        window.consoleLog.apply(this, arguments);
    }
}
new Log();
