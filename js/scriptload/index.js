const express = require('express');
const path = require('path');

const app = express();

app.get('/css.css', (req, res) => {
  console.log('get css start', new Date())
  res.set('Cache-Control', 'no-store');
  res.set('content-type', 'text/css');
  res.sendFile(path.resolve(__dirname, 'css.css'));
  console.log('return css', new Date());
})

app.get('/cachecss.css', (req, res) => {
  // res.set('Expires', new Date('2021/02/23 00:00:00').toUTCString());
  res.set('Cache-Control', 'public, max-age=0, must-revalidate');
  res.sendFile(path.resolve(__dirname, 'css.css'));
})

app.get('/cachejs.js', (req, res) => {
  // res.set('Expires', new Date('2021/02/23 00:00:00').toUTCString());
  res.set('Cache-Control', 'public, max-age=60');
  res.sendFile(path.resolve(__dirname, 'js.js'));
})

app.get('/', (req, res) => {
  res.set('Cache-Control', 'no-store');
  res.sendFile(path.resolve(__dirname, 'html.html'))
})

app.get('/long.js', (req, res) => {
  console.log('get js start', new Date())
  setTimeout(function() {
    res.sendFile(path.resolve(__dirname, 'long.js'));
    console.log('return long.js', new Date());
  }, 5000)
})

app.get('/js2.js', (req, res) => {
  console.log('get js start', new Date())
  res.set('Cache-Control', 'no-store');
  res.sendFile(path.resolve(__dirname, 'js2.js'));
  console.log('return js', new Date());
})

app.get('/js.js', (req, res) => {
  console.log('get js start', new Date())
  res.set('Cache-Control', 'no-store');
  res.sendFile(path.resolve(__dirname, 'js.js'));
  console.log('return js', new Date());
})

app.get('/require.html', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'require.html'))
})
app.get('/testrequire.js', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'testrequire.js'))
})

app.listen(3000, () => {
  console.log('app started');
})
