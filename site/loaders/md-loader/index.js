const fs = require('fs');
const os = require('os');
const path = require('path');
const marked = require('marked');
const Prism = require('node-prismjs');
const gm = require('gray-matter');
const ejs = require('ejs');

const MdLoaderPlugin = require('./plugin');

let transformer;
module.exports = function(source) {
  const {content, data: meta} = gm(source);

  initializeTransformer({
    resourcePath: this.resourcePath,
    content,
    meta,
  });

  // 解析 markdown 文件
  transformer.parse();

  return transformer.wrap();
}

module.exports.MdLoaderPlugin = MdLoaderPlugin;

function initializeTransformer(options) {
  if (!transformer) {
    transformer = new Transformer(options);
  } else {
    transformer.init(options)
  }
}

class Transformer {
  constructor(options) {
    this.init(options);
  }

  init({resourcePath, content, meta}) {
    this.resourcePath = resourcePath;
    this.content = content;
    this.meta = meta;

    const resourcePathInfo = path.parse(resourcePath);

    this.filename = resourcePathInfo.base;
    this.moduleName = path.basename(resourcePathInfo.dir);

    this.isDoc = ['doc.md'].includes(this.filename);

    this.vueRequires = [];
    this.markdownRequires = [];

    // markdown 文件转换成 vue 组件后的 template
    this.vueTemplateCode = '';
  }

  parse() {
    // 在 doc.md 文件头部需要添加 h1 标签，内容是模块的大驼峰名字和中文名字
    const header = this.isDoc && (this.forPcSite || this.isDesktopPage) ? `<h1>${pascalCase(this.moduleName)} ${pascalCase(this.meta.title || '')}</h1>` : '';
    this.vueTemplateCode = `<article>
    ${header}
    ${marked(this.content)}
  </article>`;
  }

  /**
   * 将 markdown 文件解析出来的 vue 模板，通过 ejs 包装为一个 vue 单文件组件
   *
   * @returns
   * @memberof Transformer
   */
  wrap() {
    const renderer = Transformer.getEjsRenderer('wrap.ejs');
    const PascalCaseComponentNames = [];
    const imports = [];
    const visibleList = [];

    // markdownDemos 中存储的是通过 ::: demo 这种形式引入的 markdown 文件，此处需要添加 import 依赖目标 markdown 文件
    this.markdownRequires.forEach(([tagName, requirePath]) => {
      const PascalCaseName = pascalCase(tagName);
      imports.push(`import ${PascalCaseName} from '${formatRelativePath(requirePath)}.md';`);
      PascalCaseComponentNames.push(`${PascalCaseName},`);
    });

    // vueDemos中在存储的是通过 ``` 写的示例代码块被转成 Vue 组件后的名字，此处需要添加 import 依赖对应的 vue 文件
    this.vueRequires.forEach((name, index) => {
      let PascalCaseName = name.replace(/(?:^|-)(\w)/g, (str, word) => word.toUpperCase());
      PascalCaseComponentNames.push(`${PascalCaseName},`);
      imports.push(`import ${PascalCaseName} from './${name}';`);
      visibleList.push(`visible${index}: false,`);
    });

    return renderer({
      template: this.vueTemplateCode,
      imports: imports.join(os.EOL),
      visibleList: visibleList.join(`${os.EOL}      `),
      PascalCaseComponentNames: PascalCaseComponentNames.join(`${os.EOL}    `),
    });
  }

  /**
   * 获取模板文件的渲染函数，有缓存逻辑，避免每次都重新编译模板
   *
   * @static
   * @param {String} name 模板名称
   * @returns 渲染函数
   * @memberof Transformer
   */
  static getEjsRenderer(name) {
    if (!this[name]) {
      const ejsTemplate = fs.readFileSync(path.resolve(__dirname, 'template', name), 'utf-8');
      this[name] = ejs.compile(ejsTemplate);
    }
    return this[name];
  }
}


const renderer = new marked.Renderer();
renderer.code = function(code, lang) {
  const highlighted = Prism.highlight(code, resolvePrismLanguage(lang))
  const highlightedWithPreTag = `<pre v-pre><code>${highlighted}</code></pre>`;
  if (!lang.endsWith(' demo')) {
    // 代码块语言类型不是 demo 结尾，认为这是一个普通代码块，只做高亮就够了
    return highlightedWithPreTag;
  }

  // 语言类型是 demo 结尾的，需要处理成 vue 组件引入的方式
  const demoIndex = transformer.vueRequires.length;
  const demoTagName = `${transformer.moduleName}-${path.basename(transformer.filename, '.md').replace('-4-mobile', '')}-${demoIndex}`;

  transformer.vueRequires.push(demoTagName);
  return `
    <section class="demo-block">
      <div class="demo-preview"><${demoTagName}></${demoTagName}></div>
      <div class="code-block" v-if="visible${demoIndex}">${highlightedWithPreTag}</div>
      <div class="code-switch" @click="onToggleCodeView(${demoIndex})">
        <i :class="[visible${demoIndex} ? 'el-icon-arrow-up' : 'el-icon-arrow-down']"></i>
      </div>
    </section>`;

}
marked.setOptions({renderer});


/**
 * 获取代码块的语言
 *
 * @param {*} lang
 * @returns
 */
function resolvePrismLanguage(lang) {
  const langs = lang.split(/\s+/);
  if (langs.includes('demo')) {
    // demo 块始终使用 html 语言渲染
    return Prism.languages.html;
  }
  return Prism.languages[langs[0]] || Prism.languages.autoit;
}


function pascalCase(s) {
  return s.replace(/(?:^|-)(\w)/g, (m, word) => word.toUpperCase());
}
/**
 * path.relative 返回的相对的路径，如果是当前路径，前面没有 ./
 * 此方法在需要的时候用于在前面自动加载当前路径
 * @param {String} p
 */
function formatRelativePath(p) {
  return p.startsWith('.') || path.isAbsolute(p) ? p : `./${p}`;
}
