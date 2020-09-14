import { Compiler, compilation } from "webpack";
import { ConcatSource, ReplaceSource } from "webpack-sources";
import { SyncWaterfallHook } from "tapable";

const PLUGIN_NAME = "UI5ModuleForUmdPlugin";

export class UI5ModuleForUmdPlugin {

  public apply(compiler: Compiler) {
    compiler.hooks.compilation.tap(PLUGIN_NAME, (compilation) => {
      const { hooks } = compilation.mainTemplate;
      (hooks as typeof hooks & {
        renderWithEntry: SyncWaterfallHook<ConcatSource, compilation.Chunk, string>;
      }).renderWithEntry.tap(PLUGIN_NAME, (source: ConcatSource) => {
        var srcText = source.source();

        // As this function is called more the once and
        // can be called before the UMDMainTemplatePlugin,
        // we should check if there's UMD function in the source
        if (srcText.indexOf("webpackUniversalModuleDefinition") < 0) {
          return source;
        }

        return this.insertSapAmdInSource(source, srcText);
      });
    });
  }

  private insertSapAmdInSource(source: ConcatSource, srcText: string): ConcatSource {
      const amdIf = /if\(.*define\.amd.*\).*\n.*define\(.*factory\);/m
      const replaceSource = new ReplaceSource(source);
      const regexResult = amdIf.exec(srcText);
      if (regexResult) {
        const [ matchedText ] = regexResult;
        const { index  } = regexResult;
        const newCode = 'if (typeof sap === "object" && sap.ui && typeof sap.ui.define === "function")\n' +
        '\tsap.ui.define([], factory);\n' +
        'else ' + matchedText; 
        replaceSource.replace(index, index + matchedText.length - 1, newCode)
        return replaceSource as unknown as ConcatSource;
      }
      return source;
  }
}
