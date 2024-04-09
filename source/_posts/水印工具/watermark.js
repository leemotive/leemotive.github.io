function init() {
  const reader = new FileReader();
  reader.onload = function (e) {
    $dom.img.src = e.target.result;
  }
  const $dom = {
    container: document.querySelector('.watermark'),
    trigger: null,
    file: null,
  };
  createElements();
  bindEvents();



  function createElements() {
    const csslink = document.createElement('link');
    csslink.setAttribute('href', './watermark.css');
    csslink.setAttribute('rel', 'stylesheet');
    document.head.appendChild(csslink);

    const operatorContainer = document.createElement('div');
    operatorContainer.classList.add('operator');
    $dom.container.appendChild(operatorContainer);

    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.classList.add('trigger-input');

    const trigger = document.createElement('label');
    trigger.appendChild(input);
    trigger.classList.add('trigger');
    trigger.appendChild(document.createTextNode('选择图片'));
    operatorContainer.appendChild(trigger);

    const content = document.createElement('input');
    content.setAttribute('type', 'text');
    content.setAttribute('placeholder', '请输入水印内容');
    content.value = '水印内容';
    content.classList.add('watermark-content');
    operatorContainer.appendChild(content);

    const color = document.createElement('input');
    color.setAttribute('type', 'color');
    color.classList.add('watermark-color');
    color.value = '#ff0000';
    operatorContainer.appendChild(color);

    const sizeWrapper = getRangeWrapper('字体大小');
    const size = document.createElement('input');
    size.classList.add('size-range')
    size.setAttribute('type', 'range');
    size.setAttribute('min', '6');
    size.setAttribute('max', '50');
    size.value = 40;
    sizeWrapper.appendChild(size);
    operatorContainer.appendChild(sizeWrapper);

    const opacityWrapper = getRangeWrapper('透明度');
    const opacity = document.createElement('input');
    opacity.classList.add('opacity-range')
    opacity.setAttribute('type', 'range');
    opacity.setAttribute('min', '0');
    opacity.setAttribute('max', '1');
    opacity.setAttribute('step', '0.05');
    opacity.value = 0.5;
    opacityWrapper.appendChild(opacity);
    operatorContainer.appendChild(opacityWrapper);

    const hgapWrapper = getRangeWrapper('行间隔');
    const hgap = document.createElement('input');
    hgap.classList.add('hgap-range')
    hgap.setAttribute('type', 'range');
    hgap.setAttribute('min', '0');
    hgap.setAttribute('max', '200');
    hgap.setAttribute('step', '10');
    hgap.value = 8;
    hgapWrapper.appendChild(hgap);
    operatorContainer.appendChild(hgapWrapper);

    const vgapWrapper = getRangeWrapper('字间隔');
    const vgap = document.createElement('input');
    vgap.classList.add('vgap-range')
    vgap.setAttribute('type', 'range');
    vgap.setAttribute('min', '0');
    vgap.setAttribute('max', '200');
    vgap.setAttribute('step', '10');
    vgap.value = 8;
    vgapWrapper.appendChild(vgap);
    operatorContainer.appendChild(vgapWrapper);

    const hoffsetWrapper = getRangeWrapper('水平移动');
    const hoffset = document.createElement('input');
    hoffset.classList.add('hoffset-range')
    hoffset.setAttribute('type', 'range');
    hoffset.setAttribute('min', '-100');
    hoffset.setAttribute('max', '100');
    hoffset.setAttribute('step', '0');
    hoffset.value = 8;
    hoffsetWrapper.appendChild(hoffset);
    operatorContainer.appendChild(hoffsetWrapper);

    const voffsetWrapper = getRangeWrapper('垂直移动');
    const voffset = document.createElement('input');
    voffset.classList.add('voffset-range')
    voffset.setAttribute('type', 'range');
    voffset.setAttribute('min', '-100');
    voffset.setAttribute('max', '100');
    voffset.setAttribute('step', '0');
    voffset.value = 8;
    voffsetWrapper.appendChild(voffset);
    operatorContainer.appendChild(voffsetWrapper);

    const imgContainer = document.createElement('div');
    imgContainer.classList.add('image-container');
    const img = document.createElement('img');
    img.onload = function () {
      setMarkStyle();
    }
    imgContainer.appendChild(img);
    $dom.container.appendChild(imgContainer);

    const mark = document.createElement('div');
    mark.classList.add('marker-word');
    imgContainer.appendChild(mark);

    $dom.trigger = trigger;
    $dom.file = input;
    $dom.img = img;
    $dom.content = content;
    $dom.color = color;
    $dom.mark = mark;
    $dom.size = size;
    $dom.opacity = opacity;
    $dom.hgap = hgap;
    $dom.vgap = vgap;
    $dom.hoffset = hoffset;
    $dom.voffset = voffset;
  }

  function setMarkStyle() {
    $dom.mark.innerText = $dom.content.value || '水印内容';
    $dom.mark.style.color = $dom.color.value;
    $dom.mark.style.opacity = $dom.opacity.value;
    $dom.mark.style.fontSize = `${$dom.size.value}px`;
    $dom.mark.style.top = `${$dom.voffset.value}px`
    $dom.mark.style.left = `${$dom.hoffset.value}px`

    const textShadows = [];
    const markStyles = window.getComputedStyle($dom.mark);
    const imageStyles = window.getComputedStyle($dom.img);
    const hgap = parseInt($dom.hgap.value) + parseInt(markStyles.height);
    const hnum = Math.ceil(parseInt(imageStyles.width) / hgap);
    const vnum = Math.ceil(parseInt(imageStyles.height) / parseInt(markStyles.width) * 1.414);
    const sgap = parseInt($dom.vgap.value)
    for (let v = 0; v < vnum; v++) {
      for (let index = -hnum; index < hnum; index++) {
        textShadows.push(`${index * hgap - v * (parseInt(markStyles.width) + sgap) + Math.abs(index) % 2 * parseInt(markStyles.width)}px ${index * hgap}px`);
      }
    }
    $dom.mark.style.textShadow = textShadows.join(', ');
  }

  function bindEvents() {
    $dom.file.addEventListener('change', e => {
      const file = e.target.files[0];
      reader.readAsDataURL(file);
    })

    $dom.color.addEventListener('change', setMarkStyle);
    $dom.size.addEventListener('input', setMarkStyle);
    $dom.content.addEventListener('blur', setMarkStyle);
    $dom.opacity.addEventListener('input', setMarkStyle);
    $dom.hgap.addEventListener('input', setMarkStyle);
    $dom.vgap.addEventListener('input', setMarkStyle);
    $dom.hoffset.addEventListener('input', setMarkStyle);
    $dom.voffset.addEventListener('input', setMarkStyle);
  }

  function getRangeWrapper(text) {
    const div = document.createElement('div');
    div.classList.add('range-wrapper');
    const span = document.createElement('span');
    span.appendChild(document.createTextNode(text));
    span.style.fontSize = '14px';
    div.appendChild(span);
    return div;
  }

}


init();
