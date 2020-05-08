# background-clip

指定背景属性覆盖的范围，默认 `border-box`

- border-box

  背景覆盖到边框，如果边框有且透明，可以看到 border 位置也是背景图片的

- padding-box

  背景只覆盖到 padding 区域，padding 以外看不到背景

- content-box

  背景只覆盖到 content 区域，content 以外看不到背景

- text (Only Webkit)

  前景文字的形状作为背景显示区域，文字以外看不到背影



`background-position` 的原点位置不会受这个影响，原点位置始终是从 padding 区域左上角开始的

