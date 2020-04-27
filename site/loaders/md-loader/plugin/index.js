/**
 * @description 将指定目录内的 markdown 文件中示例代码块解析为 vue 组件，
 * 每个示例作为一个文件放入编译系统供对应的 markodwn 文件进行依赖
 * 移动端文档站点构建过程中，每一份 markdown 文件都拷贝一个 -4-mobile.md
 *
 * @author lijie <lijie@xports.cn>
 */
const fs = require('fs');
const path = require('path');
const dir = require('node-dir');

class MdLoaderPlugin {
  constructor(options) {
    this.options = options;
  }
  apply(compiler) {
    compiler.hooks.beforeCompile.tapAsync('MdLoaderPlugin', (params, callback) => {
      // const {paths} = this.options;
      const paths = [path.resolve(__dirname, '../../../../')]
      collectDocuments(paths).then(demos => {
        demos.forEach(demo => {
          const {codes, stats, fileDir, filePath} = demo;
          const dirBaseName = path.basename(fileDir);
          const fileBaseName = path.basename(filePath, '.md');
          codes.forEach((code, i) => {
            const modulePath = path.resolve(fileDir, `${dirBaseName}-${fileBaseName}-${i}.vue`);
            const moduleStats = Object.assign(stats);
            moduleStats.size = code.length;
            compiler.inputFileSystem._statStorage.data.set(modulePath, [null, stats]);
            compiler.inputFileSystem._readFileStorage.data.set(modulePath, [null, code]);
          });
        });
        callback();
      }).catch(e => {
        callback(e)
      });
    });
  }
}

module.exports = MdLoaderPlugin;

function collectDocuments(paths) {
  const promises = paths.map(function mapPath2Promise(p) {
    return new Promise(function(resolve, reject) {
      dir
        .promiseFiles(p)
        .then(files => {
          resolve(files.filter(file => path.extname(file) === '.md'));
        })
        .catch(e => reject(e));
    });
  });

  return Promise.all(promises).then(function(files) {
    const paths = files.flat();
    return paths.map(function(filePath) {
      const markdownContent = fs.readFileSync(filePath, 'utf8');
      const stats = fs.statSync(filePath);
      // 示例代码的语言类型需要是 demo 结尾，通过些正则表达式解析出文档中所有的示例代码内容
      // node 10.19.0 版本不支持matchAll方法，只能用exec方法了
      const matchDemoReg = /```(?:\w+ )?demo((\n|.)*?)```/g;
      let match = matchDemoReg.exec(markdownContent);
      const demos = [];
      while (match) {
        demos.push(match[1]);
        match = matchDemoReg.exec(markdownContent);
      }

      return {
        codes: demos,
        stats,
        filePath,
        fileDir: path.dirname(filePath),
      };
    });
  });
}
