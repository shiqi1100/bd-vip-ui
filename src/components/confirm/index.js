import confirm from '@/components/confirm/confirm.vue'
import { createApp } from 'vue'
export default ({ title, content, confirmText, closeText, outClose }) => {
  return new Promise((reslove, reject) => {
    const instance = createApp(confirm, {
      title, 
      content, 
      confirmText, 
      closeText, 
      outClose,
      confirmFn: () => { 
        closeUnmount()
        reslove()
      },
      closeFn: () => {
        closeUnmount()
        reject()
      }
    })
  
    // 创建一个节点
    const vnode = document.createElement('div')
    // 添加到body元素上
    document.body.appendChild(vnode)
    // 实例挂载到节点上
    instance.mount(vnode)

    // 关闭状态
    // 注册实例并移除节点
    function closeUnmount() {
      instance.unmount(vnode)
      document.body.removeChild(vnode)
    }
  })
}