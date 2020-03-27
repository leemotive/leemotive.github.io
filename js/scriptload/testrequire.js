require.config({
  paths: {
    'jquery': 'https://cdn.bootcss.com/jquery/3.4.1/jquery',
    'zpeto': 'https://cdn.bootcss.com/zepto/1.2.0/zepto'
  }
})

requirejs(['zpeto'], function($, j) {
  console.log($, '\n', j);
})
