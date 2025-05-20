import { svelte as sveltePlugin } from "@sveltejs/vite-plugin-svelte";
import esbuild from "esbuild";
import fs from "fs-extra";
import path from "path";
import * as Vite from "vite";
import checker from "vite-plugin-checker";
import { viteStaticCopy } from "vite-plugin-static-copy";
import tsconfigPaths from "vite-tsconfig-paths";


export function getServePorts(defaults = { foundryPort: 30000, serverPort: 30001 }) {
    if (!fs.existsSync('./foundryconfig.json')) { return defaults; }
    const cfg = fs.readJSONSync('./foundryconfig.json');
    return {
        foundryPort: Number(cfg.foundryPort) || defaults.foundryPort,
        serverPort:  Number(cfg.port)        || defaults.serverPort
    };
}


export function basePlugins() {
    return [ checker({ typescript: true }), tsconfigPaths({ loose: true }), sveltePlugin() ];
}
export function prodPlugins() {
    return [
        {
            name: 'minify',
            renderChunk: {
                order: 'post',
                async handler(code: any, chunk: any) {
                    if(!chunk.fileName.endsWith('.mjs')) { return code; }
                    return esbuild.transform(code, {
                        keepNames: true,
                        minifySyntax: true,
                        minifyWhitespace: true
                    });
                }
            }
        },
        ...viteStaticCopy({ targets: [] })
    ];
}
export function devPlugins(outDir: string) {
    // sourcery skip: avoid-function-declarations-in-blocks
    function copyAndNotify(context: any, { glob, wsEvent }: {glob: string, wsEvent: string}) {
        const base = context.file.slice(context.file.indexOf(glob));
        return fs.promises.copyFile(context.file, `${outDir}/${base}`)
            .then(() => context.server.ws.send({
                type: 'custom',
                event: wsEvent,
                data: {
                    path: `systems/fvttnineshadows/${base}`
                }
            }));
    }

    return [
        {
            name: 'touch-vendor-js',
            apply: 'build',
            writeBundle: {
                async handler() {
                    fs.closeSync(fs.openSync(path.resolve(outDir, 'vendor.mjs'), 'w'));
                }
            }
        },
        {
            name: 'hmr-handler',
            apply: 'serve',
            handleHotUpdate(context: any) {
                if (context.file.startsWith(outDir)) { return; }
                if (/\/lang\/.*\.json$/.test(context.file)) {
                    console.log('Lang update:', context.file);
                    return copyAndNotify(context, { glob: 'lang/', wsEvent: 'lang-update' });
                }
                if (/\/templates\/.*\.hbs$/.test(context.file)) {
                    console.log('Template update: ', context.file);
                    return copyAndNotify(context, { glob: 'templates/', wsEvent: 'template-update' });
                }
                return;
            }
        }
    ];
}


const config = Vite.defineConfig(({ command, mode }): Vite.UserConfig => {
    const buildMode = mode === "production" ? "production" : "development";
    const outDir = "dist";
    const { foundryPort, serverPort } = command === 'serve'
        ? getServePorts()
        : { foundryPort: 30000, serverPort: 30001 };
    
    const plugins = [
        ...basePlugins(),
        ...(buildMode === 'production' ? prodPlugins() : devPlugins(outDir))
    ];

    return {
        base: command === 'build' ? './' : '/systems/fvttnineshadows',
        publicDir: 'static',
        define: {
            BUILD_MODE: JSON.stringify(buildMode)
        },
        server: {
            port: serverPort,
            open: '/game',
            proxy: {
                '^(?!/systems/fvttnineshadows/)': `http://localhost:${foundryPort}`,
                '/socket.io': {
                    target: `ws://localhost:${foundryPort}`,
                    ws: true
                }
            }
        },
        plugins,
        css: { devSourcemap: buildMode === 'development' }
    };
});

export default config;
