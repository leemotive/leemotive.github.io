const cheerio = require('cheerio');

/** @type {import('hexo')} */
const hxo = hexo;

/** @type {import('warehouse/dist/types/virtual').default} */
const asset_dir = hxo.database._models.Post.schema.path('asset_dir');
const oAssetDirGetter = asset_dir.getter;
asset_dir.get(function(...args) {
  const dir = oAssetDirGetter.call(this, ...args);
  return dir.replace(/index\/$/, '');
})


/** @type {import('warehouse/dist/types/virtual').default} */
const asset_path = hxo.database._models.PostAsset.schema.path('path');
const oAssetPathGetter = asset_path.getter;
asset_path.get(function(...args) {
  const dir = oAssetPathGetter.call(this, ...args);
  return dir.replace(/index\/([^/]+)$/, '$1');
})

hxo.extend.filter.register('after_post_render', function(data) {

  const $ = cheerio.load(data.content);

  Array.from($('blockquote')).forEach(ele => {
    const inner = $(ele).text().trim();
    if (inner.startsWith('建议')) {
      $(ele).addClass('quote-tip')
      $(ele).html($(ele).html().replace(/\s*建议\s*/, '<span class="quote-type">建议</span>'))
    } else if (inner.startsWith('警告')) {
      $(ele).addClass('quote-warn');
      $(ele).html($(ele).html().replace(/\s*警告\s*/, '<span class="quote-type">警告</span>'))
    } else if (inner.startsWith('危险')) {
      $(ele).addClass('quote-danger');
      $(ele).html($(ele).html().replace(/\s*危险\s*/, '<span class="quote-type">危险</span>'))
    }
  })

  Array.from($('figure.highlight table')).forEach(ele => {
    $(ele).addClass('code-table')
  })

  data.content = $('body').html()
})
