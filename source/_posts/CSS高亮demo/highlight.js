const $search = document.querySelector('#search');
const $artical = document.querySelector('#artical');

$search.addEventListener('input', (e) => {
  const value = e.target.value;
  if (!value) {
    CSS.highlights.clear();
    return;
  }

  const indexes = [];

  while (true) {
    const last = indexes.length ? indexes.at(-1) + value.length : 0;
    const index = info.text.indexOf(value, last);
    if (index === -1) {
      break;
    }
    indexes.push(index);
  }

  const ranges = [];
  const starts = Object.keys(info).map(Number);
  indexes.forEach((start, index) => {
    const rangeStart = starts.findLast(a => a <= start);
    const range = new Range();
    range.setStart(info[rangeStart], start - rangeStart);
    const end = start + value.length;
    const rangeEnd = starts.findLast(a => a <= end);
    range.setEnd(info[rangeEnd], end - rangeEnd);

    ranges.push(range)
  });

  if (!ranges.length) {
    CSS.highlights.clear();
  }

  const highlights = new Highlight(...ranges);
  CSS.highlights.set('hi', highlights);
});

const info = collectInfo();

function collectInfo(text) {

  const texts = {
    text: '',
  };
  const nodes = [...$artical.childNodes];

  while (nodes.length) {
    const top = nodes.shift();
    if (top.nodeType === Node.TEXT_NODE) {
      texts[texts.text.length] = top;
      texts.text += top.data;
    } else if (top.childNodes) {
      nodes.unshift(...top.childNodes);
    }
  }

  return texts;
}
