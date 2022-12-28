## 基本用法
在 ``template`` 中使用组件
```html
<superwei-combox :candidates="candidates" placeholder="请选择或输入" v-model="selectedItem"></superwei-combox>
```

## API

### Combox Props

|属性名		|类型			|默认值		|说明								|
|:-:		|:-:			|:-:		|:-:								|
|label		|String			|-			|标签文字							|
|value		|String			|-			|combox的值							|
|labelWidth	|String			|auto		|标签宽度，有单位字符串，如:'100px'	|
|placeholder|String			|-			|输入框占位符						|
|candidates	|Array/String	|[]			|候选字段							|
|emptyTips	|String			|无匹配项	|无匹配项时的提示语					|
|selectedBackground	|String			|#f5f7fa	|选中项背景颜色					|
|selectedColor	|String			|#409eff	|选中项文字颜色					|

### Combox Events

|事件称名	|说明					|返回值												|
|:-:		|:-:					|:-:													|
|@input	|combox输入事件	|返回combox值|
