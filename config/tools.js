// 插件：保存时clear日志
class CleanTerminalPlugin {
    constructor(options = {}) {
        this.time = 0;
    }

    apply(compiler) {
        this.useCompilerHooks(compiler);
    }

    useCompilerHooks(compiler) {
        compiler.hooks.afterCompile.tap('CleanTerminalPlugin', () => this.clearConsole());
    }

    clearConsole() {
        if (this.time > 2) {
            console.clear();
        } else {
            this.time++;
        }
    }
}

module.exports = {
    CleanTerminalPlugin
};
