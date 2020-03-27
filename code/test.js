function resolveUrlVariable(template, url) {
  const templateArr = template.replace(/^\/|\/$/g, '').split('/')
  const urlArr = url.replace(/^\/|\/$/g, '').split('/')
  if (templateArr.length !== urlArr.length) {
    return null
  }

  let params = {}
  for(let index = 0; index < templateArr.length; index++) {
    const templatePath = templateArr[index]
    const urlPath = urlArr[index]

    if (templatePath.startsWith(':')) {
      params[templatePath.replace(':', '')] = possibleNumber(urlPath)
    } else if (templatePath !== urlPath) {
      return null
    }
  }
  return params;
}

function possibleNumber(num) {
  // 可以为数字的尝试转换为数字
  let possibleNum = +num
  if (String(+possibleNum) === num) {
    return possibleNum
  }
  return num
}

console.log(resolveUrlVariable('/user/:id/:cate', '/user/766666666666666666666666666666/89'))
