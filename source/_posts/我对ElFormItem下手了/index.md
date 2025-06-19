---
title: 我对ElFormItem下手了
author: 柚子816
toc: true
comment: true
date: 2025-06-19 20:32:53
tags:
  - validate
  - form
category: 前端
cover: ./cover.jpg
---

ElFormItem 是 Element Plus 中的一个组件，用于在表单中显示和管理表单字段。它通常与 ElForm 组件一起使用，用于构建表单。但是，在使用 ElFormItem 时，你可能会遇到下面两个问题

## 问题一：错误信息中显示的prop而不是label
在使用 Element Plus 的 ElFormItem 组件时，当表单验证失败时，错误信息中显示的是 prop 属性的值，而不是 label 属性的值。这是因为 Element Plus 的 ElFormItem 组件默认情况下会将 prop 属性的值作为错误信息的一部分进行显示。但是这种显示方式可能会导致错误信息的可读性和理解性下降。

## 问题二：错误信息默认都是英文的
在Element Plus的中使用了async-validator进行表单验证, 而async-validator默认的错误信息都是英文的, 而不是中文的, 这就导致了错误信息的可读性和理解性下降。尤其在一些多国语言的项目中, 错误信息是需要支持多国语言的。

## 求人不如求己
其实在Element Plus的仓库的issues中已经有人提过这个问题, 但是一直没有解决。俗话说求人不如求己, 所以我还是自己想方法吧

## 解决方法
要解决上面的问题，需要实现以下功能
1. 校验失败时，错误信息中显示的是 label 属性的值，而不是 prop 属性的值。
2. 增加messageLabel属性，有些表单不显示label, 但是需要显示错误信息, 所以增加messageLabel属性, 用于显示错误信息。
3. 支持国际化，错误信息需要支持多国语言。

## 代码

```typescript
// MyFormItem.ts
import { ElFormItem, formItemProps } from "element-plus";
import { defineComponent, watchEffect } from "vue";

export default defineComponent({
  extends: ElFormItem,
  props: {
    ...formItemProps,
    messageLabel: {
      type: String,
      default: ''
    }
  },
  setup(props, ctx) {
    let exposed: any;
    const render = ElFormItem.setup?.(props, {
      ...ctx,
      expose(exp) {
        exposed = exp;
        ctx.expose?.(exp);
      }
    });

    watchEffect(() => {
      if (exposed.validateMessage.value && exposed.validateState.value === 'error') {
        exposed.validateMessage.value = exposed.validateMessage.value.replace(props.prop, props.messageLabel || props.label);
      }
    });

    return render;
  }
})
```
没有办法让ElFormItem直接使用label/messageLabel占位错误信息，所以退而求其次，使用prop占位错误信息，然后在watchEffect中替换为label/messageLabel。这样最大的问题就是如果错误消息模板中出现和prop相同的字符串，可能会被错误替换。但是目前没有更好的方法。

这样在原本使用ElFormItem直接替换成MyFormItem就可以了

国际化的问题更好解决一点，async-validator支持自定义错误信息模板，这样async-validator在校验表单字段的时候就可以使用自定义的错误信息了

```typescript
import Schema from 'async-validator';

Object.assign(Schema.messages, {
  default: '字段 %s 验证失败',
  required: '%s是必填字段',
  enum: '%s 必须是 %s 中的一个',
  whitespace: '%s 不能为空',
  date: {
    format: '%s 日期 %s 无效, 格式应为 %s',
    parse: '%s 日期无法解析, %s 无效',
    invalid: '%s 日期 %s 无效',
  },
  types: {
    string: '%s 不是有效的 %s',
    method: '%s 不是有效的 %s (function)',
    array: '%s 不是有效的 %s',
    object: '%s 不是有效的 %s',
    number: '%s 不是有效的 %s',
    date: '%s 不是有效的 %s',
    boolean: '%s 不是有效的 %s',
    integer: '%s 不是有效的 %s',
    float: '%s 不是有效的 %s',
    regexp: '%s 不是有效的 %s',
    email: '%s 不是有效的 %s',
    url: '%s 不是有效的 %s',
    hex: '%s 不是有效的 %s',
  },
  string: {
    len: '%s 长度必须为 %s 个字符',
    min: '%s 长度不能少于 %s 个字符',
    max: '%s长度不能超过 %s 个字符',
    range: '%s 长度应在 %s 和 %s 个字符之间',
  },
  number: {
    len: '%s 必须等于 %s',
    min: '%s 不能小于 %s',
    max: '%s 不能大于 %s',
    range: '%s 应在 %s 和 %s 之间',
  },
  array: {
    len: '%s 长度必须为 %s',
    min: '%s 长度不能少于 %s',
    max: '%s 长度不能超过 %s',
    range: '%s 长度应在 %s 和 %s 之间',
  },
  pattern: {
    mismatch: '%s 值 %s 不匹配模式 %s',
  },
});
```

配合i18n使用就可以了，在切换语言的时候，更新这些错误信息模板就可以了

---
如果发现有什么问题或者有更好的解决方法，欢迎留言交流。
