import init, {get_sign} from './hello_wasm.js';

const inited = (async () => init())();

(function() {
  const $dom = {
    container: document.querySelector('#sign_demo'),
  }

  const csslink = document.createElement('link');
  csslink.setAttribute('href', './get_sign.css');
  csslink.setAttribute('rel', 'stylesheet');
  document.head.appendChild(csslink);

  $dom.input = document.createElement('input');
  $dom.input.setAttribute('type', 'text');
  $dom.container.appendChild($dom.input);
  $dom.start = document.createElement('input');
  $dom.start.setAttribute('type', 'button');
  $dom.start.value = '获取签名'
  $dom.start.addEventListener('click', async function() {
    await inited;
    const sign = get_sign($dom.input.value);
    $dom.result.innerHTML = sign;
  })
  $dom.container.appendChild($dom.start);

  $dom.result = document.createElement('div');
  $dom.result.classList.add('sign_result')
  $dom.container.appendChild($dom.result)
}());
