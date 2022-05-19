<script setup lang="ts">
import 'luna-object-viewer/luna-object-viewer.css'
// import 'luna-console/luna-console.css'
import LunaConsole from 'luna-console'
import { onConsoleCommand } from './useTerminal'

const target = ref<HTMLElement>()

watch(target, () => {
  const el = unref(target)

  if (el) {
    const con = new LunaConsole(el)

    onConsoleCommand(([command, x]) => {
      con[command](x)
    })
  }
})

// import { useTerminal } from '.'

// const target = ref<HTMLElement>()
// const container = ref<HTMLElement>()
// const { fit } = useTerminal(target)
// const { width, height } = useElementBounding(container)

// watchDebounced([width, height], () => {
//   if (target.value)
//     fit()
// }, { debounce: 100 })
</script>

<template>
  <div ref="target">
    Hello
  </div>
  <!-- <div
    ref="container"
    h-full
    relative
    w-full
  >
    <div
      ref="target"
      relative
      flex-1
      pt-1
      pl-1
      h-full
      overflow-hidden
    />
  </div> -->
</template>

<style>
@font-face{
  font-family:luna-console-icon;
  src:url('data:application/x-font-woff;charset=utf-8;base64,d09GRgABAAAAAAasAAsAAAAACnAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAAI4AAADcIsYnIk9TLzIAAAGYAAAAPgAAAFZWmlGRY21hcAAAAdgAAAD2AAACyDioZ9NnbHlmAAAC0AAAAZgAAAH8Lq6nDGhlYWQAAARoAAAAMQAAADZ25cSzaGhlYQAABJwAAAAdAAAAJAgCBBRobXR4AAAEvAAAABkAAABYGAH//GxvY2EAAATYAAAAGAAAAC4J8glUbWF4cAAABPAAAAAfAAAAIAEjAFBuYW1lAAAFEAAAASkAAAIWm5e+CnBvc3QAAAY8AAAAcAAAAJ7qA/7MeJxNjTsOwjAQRJ8TJzE2hPBrKBBHQByAAiGqFBRcIBVCiqhyBA7O2AgRr9Y7M2+lxQCeAyeyy7W9U/fd8GKL5fsiH2vTPx8d7ufEbJpO/aagYc+RM7fEjBKnmiRuySmZUTNNf0wybYSRj9VoO4iU7NQh+Up8qelZs5EupP75Shfm2oz3Kmkvt/gARcgJKwAAeJxjYGQUZ5zAwMrAwNTJdIaBgaEfQjO+ZjBi5ACKMrAyM2AFAWmuKQwHGHQ/srGAuDEsTGBhRhABALQ1CMwAAHiczdJNbsIwEIbh1+QHQsJviNRFF1XX7aEQRZQNRQjEHXqgrnopn4B+E8+qqip117GeRB4nk4lloAAyeZIcwicBiw9lQ5/PGPf5nHfNV8yVyXlmzZY9R05cuMbydtOqZTfsOCh7Vjb02e8RVMXGHfc8aDxqwFKVF7QMtdLpmzUVDSOmTJjpnUH/3YJSBcofqv4Wyz8+b6FuWvXSjW1SV30r1sl/icYuofFZh+1+Yn+7dnPZuIW8uFa2big7t5JXZzX3znbh4Gp5c5UcnfVyciM5u6lc3ESuTnsZQ2JnLQ4S7J4ldjZjntj5jEVi5zaWCeUXWN4q9AAAeJxdUMFOU0EUnTMzb2o1FB5O5wENg31k5mExVEo7jSGBEuO6CStDmtbIBuiKBYg/gRu/ABO3/ocscOEXsHBpogtWvFfnvQgxJnduztx7zknuIXQyIYSDE9IgLwmBmIZI1pDYbTSxBqeW4KvrVKSmaaRKFZREE7YJIyONSLW6W37bLiRxscXNTH1zbnFqlnJ5Eu+G9MnT8JBy9l69ELx69Ohd9JCryrwcU07TbCU5H4y+jQbnyco/EF+8x1/eaX03bCzR8IgGwVn0WC/I8YOzaLGS+4+p4K8O/lcXkPhj/CP0ig1JQIhJyugCxz3o7LqH4YUH0L3swlMK3q+CV/HMbhkJAqlarm1jgd+97DpnfsKPeH15eT2+l9L5OJ/kcjZJfY6MU++wQPzI+PRECUJjo97aAtqupaqhFLHtRLHNf1Kwn9lAOid9L7tV9nzVldNL3dC+NmrGOGM+sme2VrO335Mda3foXlXravY57zemY23HkLs72RsW5JegDjZK99FnPPtwl8FX1i92IfAax6yfvkWf/AHb1F1JeJxjYGRgYABi3/mPYuP5bb4ycLOABKI4H+9rgNH//zIwsDCzMAElOBhAJAMAQ2IK+QAAAHicY2BkYGBhAAEWhv9///9lYWZgZEAFYgBbLQQgAAAAeJxjYGBgYGH4/58FTIPZf2FsSgAAM58EEwAAAHicY2AAgjyGJoYlDI8YPjD8ww8BeTMTR3icY2BkYGAQY3BhYGYAASYg5gJCBob/YD4DABGFAXQAeJxlkD1uwkAUhMdgSAJSghQpKbNVCiKZn5IDQE9Bl8KYtTGyvdZ6QaLLCXKEHCGniHKCHChj82hgLT9/M2/e7soABviFh3p5uG1qvVq4oTpxm/Qg7JOfhTvo40W4S38o3MMbpsJ9POKdO3j+HZ0BSuEW7vEh3Kb/KeyTv4Q7eMK3cJf+j3APK/wJ9/HqDdPIFLEp3FIn+yy0Z3n+rrStUlOoSTA+WwtdaBs6vVHro6oOydS5WMXW5GrOrs4yo0prdjpywda5cjYaxeIHkcmRIoJBgbipDktoJNgjQwh71b3UK6YtKvq1VpggwPgqtWCqaJIhlcaGyTWOrBUOPG1K1zGt+FrO5KS5zGreJCMr/u+6t6MT0Q+wbaZKzDDiE1/kg+YO+T89EV6oAAAAeJxtxksOgjAUQNF3kaIW/x9cBYtqgEAnLXlp0+1rwtQzuVcq2Vj5r6NiR42hYc+BI5aWE2cuXLlx58GTF286PmIm1ajGhzWnJub0S12cBjs4nVI/xhLabdXPS2JCiXgCK5lEwTHQMzKziHwBqnYYpg==') format('woff')
}
[class*=' luna-console-icon-'],[class^=luna-console-icon-]{
  display:inline-block;
  font-family:luna-console-icon!important;
  font-size:16px;
  font-style:normal;
  -webkit-font-smoothing:antialiased;
  -moz-osx-font-smoothing:grayscale
}
.luna-console-icon-error:before{
  content:'\f101'
}
.luna-console-icon-input:before{
  content:'\f102'
}
.luna-console-icon-output:before{
  content:'\f103'
}
.luna-console-icon-warn:before{
  content:'\f104'
}
.luna-console-icon-caret-down:before{
  content:'\f105'
}
.luna-console-icon-caret-right:before{
  content:'\f106'
}
.luna-console{
  @apply relative overflow-y-auto h-full dark:bg-[#202124] text-sm;
  -webkit-overflow-scrolling:touch;
  will-change: scroll-position;
  cursor:default;
  /* background:#fff;
  overflow-y:auto;
  height:100%;
  position:relative;
  font-size:12px;
  font-family:Menlo,Consolas,Lucida Console,Courier New,monospace */
}
.luna-console-hidden{
  display:none
}
.luna-console-fake-logs{
  position:absolute;
  left:0;
  top:0;
  pointer-events:none;
  visibility:hidden;
  width:100%
}
.luna-console-fake-logs *{
  overflow:hidden;
  color:#000;
  position:static
}
.luna-console-logs{
  padding-top:1px;
  position:absolute;
  width:100%
}
.luna-console-log-container{
  box-sizing:content-box
}
.luna-console-header{
  white-space:nowrap;
  display:flex;
  font-size:11px;
  color:#545454;
  border-top:1px solid transparent;
  border-bottom:1px solid #ccc
}
.luna-console-header .luna-console-time-from-container{
  overflow-x:auto;
  -webkit-overflow-scrolling:touch;
  padding:3px 10px
}
.luna-console-nesting-level{
  width:14px;
  flex-shrink:0;
  margin-top:-1px;
  margin-bottom:-1px;
  position:relative;
  border-right:1px solid #ccc
}
.luna-console-nesting-level.luna-console-group-closed::before{
  content:''
}
.luna-console-nesting-level::before{
  border-bottom:1px solid #ccc;
  position:absolute;
  top:0;
  left:0;
  margin-left:100%;
  width:5px;
  height:100%;
  box-sizing:border-box;
}
.luna-console-log-item {
  @apply relative flex flex-row border-y-1;
  margin-top:-1px;
}
.luna-console-log-item:after{
  content:'';
  display:block;
  clear:both
}
.luna-console-log-item .luna-console-code{
  display:inline;
  font-family:Menlo,Consolas,Lucida Console,Courier New,monospace
}
.luna-console-log-item .luna-console-code .luna-console-keyword{
  /* color:#881280 */
  @apply text-[#63b3d4];
}
.luna-console-log-item .luna-console-code .luna-console-number{
  color:#1c00cf
}
.luna-console-log-item .luna-console-code .luna-console-operator{
  color:grey
}
.luna-console-log-item .luna-console-code .luna-console-comment{
  color:#236e25
}
.luna-console-log-item .luna-console-code .luna-console-string{
  color:#1a1aa6
}
.luna-console-log-item a{
  color:#15c!important
}
.luna-console-log-item .luna-console-icon-container{
  margin:0 -6px 0 10px
}
.luna-console-log-item .luna-console-icon-container .luna-console-icon{
  line-height:20px;
  font-size:12px;
  color:#333;
  position:relative
}
.luna-console-log-item .luna-console-icon-container .luna-console-icon-caret-down,.luna-console-log-item .luna-console-icon-container .luna-console-icon-caret-right{
  top:0;
  left:-2px
}
.luna-console-log-item .luna-console-icon-container .luna-console-icon-error{
  top:1px;
  @apply text-red-500;
}
.luna-console-log-item .luna-console-icon-container .luna-console-icon-warn{
  top:1px;
  @apply text-yellow-600;
  /* color:#e8a400 */
}
.luna-console-log-item .luna-console-count{
  @apply
    bg-[#63b3d4]
    text-green-900
    font-bold font-mono
    ml-2 mt-[5px] min-w-4 h-4
    flex place-items-center place-content-center
    rounded-full;
  font-size: 10px;
  /* background:#8097bd; */
  /* padding:2px 4px;
  color:#000;
  border-radius:10px;
  font-size:12px;
  float:left;
  margin:1px -6px 0 10px */
}
.luna-console-log-item .luna-console-log-content-wrapper{
  flex:1;
  overflow:hidden
}
.luna-console-log-item .luna-console-log-content{
  padding:3px 0;
  margin:0 10px;
  overflow-x:auto;
  -webkit-overflow-scrolling:touch;
  white-space:pre-wrap;
  -webkit-user-select:text;
  -moz-user-select:text;
  -ms-user-select:text;
  user-select:text
}
.luna-console-log-item .luna-console-log-content *{
  -webkit-user-select:text;
  -moz-user-select:text;
  -ms-user-select:text;
  user-select:text
}

.luna-console-log-item.luna-console-html table,.luna-console-log-item.luna-console-table {
  @apply py-4 px-2 border-[#3a3a3a];
}

.luna-console-log-item.luna-console-html table,.luna-console-log-item.luna-console-table table{
  width:100%;
  border-collapse:collapse;
  overflow:hidden;
  @apply text-white text-sm font-mono;
}
.luna-console-log-item.luna-console-html table th,.luna-console-log-item.luna-console-table table th{
  @apply bg-[#292a2d] text-white text-left font-normal text-xs;
}
.luna-console-log-item.luna-console-html table td,.luna-console-log-item.luna-console-html table th,.luna-console-log-item.luna-console-table table td,.luna-console-log-item.luna-console-table table th{
  @apply border-1 border-[#494c50] px-1 py-1 text-xs font-mono;
  /* border:1px solid #ccc; */
  /* padding:3px 10px */
}
.luna-console-log-item.luna-console-html table tr:nth-child(even),.luna-console-log-item.luna-console-table table tr:nth-child(even){
  /* background:#f2f7fd */
  @apply bg-[#292a2d];
}
.luna-console-log-item.luna-console-error{
  @apply bg-[#280001] text-[#fb7782] border-[#5a0003] z-50;
}
.luna-console-log-item.luna-console-error .luna-console-stack{
  padding-left:1.2em;
  @apply text-white;
}
.luna-console-log-item.luna-console-error .luna-console-count{
  background:red
}
.luna-console-log-item.luna-console-debug{
  z-index:20
}
.luna-console-log-item.luna-console-input{
  border-bottom-color:transparent
}
.luna-console-log-item.luna-console-warn{
  @apply bg-[#332a06] text-[#e39a32] border-[#655313] z-40;
}
.luna-console-log-item.luna-console-warn .luna-console-count{
  background:#e8a400
}
.luna-console-log-item.luna-console-info{
  z-index:30
}

.luna-console-log-item.luna-console-log {
  @apply bg-[#202124] text-light-900 border-[#3a3a3a] z-30;
}

.luna-console-log-item.luna-console-group,.luna-console-log-item.luna-console-groupCollapsed{
  font-weight:700
}
.luna-console-abstract .luna-console-key{
  @apply text-[#63b3d4];
}
.luna-console-abstract .luna-console-number{
  color:#1c00cf
}
.luna-console-abstract .luna-console-null{
  color:#5e5e5e
}
.luna-console-abstract .luna-console-string{
  @apply text-[#47d7c7];
}
.luna-console-abstract .luna-console-boolean{
  color:#0d22aa
}
.luna-console-abstract .luna-console-special{
  color:#5e5e5e
}
</style>
