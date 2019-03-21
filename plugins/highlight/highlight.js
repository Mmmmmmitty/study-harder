import Vue from 'vue'
import 'highlight.js/styles/monokai-sublime.css' //代码片段高亮样式
import hljs from 'highlight.js'//代码片段高亮js
// 定义代码高亮自定义指令 
Vue.directive('highlight', function (el) {
  let blocks = el.querySelectorAll('pre code');
  blocks.forEach((block) => {
    hljs.highlightBlock(block)
  })
})