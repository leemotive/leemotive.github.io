# text-align

用于文本对齐方式的设定，最常用的莫过于left, right, center了。在css3中增加了几个非常实用的选项

- justify 
  
  当使用left的时候，文本换行后，右侧可能参差不齐，这是时候就可以使用这个justify属性了，最后一行不受影响
  
- justify-all 
  
  最后一行也会被两端对齐（貌似浏览器还不支持）
  
- start 
  
  这个和direction有关系，如果direction设为rtl，则文本靠右，如果是ltr，则文本靠左
  
- end
  
  和start相反
  
- match-parent 和inherit一致使用继承，但是start和end属性继承下来是相对父级的direction

由于justify-all不被浏览器支持，可以使用text-align-last属性，只作用于最后一行文本（包括单行文本）可选值和text-align基本一致


如果writing-mode被设置成vertial类型的，那上left为上，right为下
