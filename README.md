## 目标

基于 Web 浏览器的拼图游戏
编程语言：推荐 HTML + JavaScript

题目描述： 实现一个在浏览器中运行的拼图游戏

1. 可以从本机加载一幅图片，打散成若干小块，游戏者可以通过鼠标拖拽小块完成最终的拼图。
2. 拼图的块数可以自由指定，最终用户可以选择拼图的难度，随意指定分成 m 行 n 列。
3. 打散后的矩形块将会随机旋转一个角度，旋转角度仅考虑 90 ° 的倍数，比如说 0 °， 90°， 180°， 270°，以增加游戏的难度。

题目要求：

1. 能够支持 WebKit 内核和另外任意一种非 WebKit 内核的浏览器。
2. 不使用任何三方 JavaScript 类库，包括，但不限于 jQuery。
3. 不推荐界面元素使用绝对布局。
4. 界面美观。
