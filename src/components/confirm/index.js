import myConfirm from '@/components/confirm/useConfirm.vue'
import { createApp } from 'vue'
export const useConfirm = ({ title, content, confirmText, closeText, outClose }) => {
  return new Promise((resolve, reject) => {
    const instance = createApp(myConfirm, {
      title,
      content,
      confirmText,
      closeText,
      outClose,
      confirmFn: () => {
        closeUnmount()
        resolve()
      },
      closeFn: () => {
        closeUnmount()
        reject()
      }
    })

    // 创建一个节点
    const vNode = document.createElement('div')
    // 添加到body元素上
    document.body.appendChild(vNode)
    // 实例挂载到节点上
    instance.mount(vNode)

    // 关闭状态
    // 注册实例并移除节点
    function closeUnmount() {
      instance.unmount()
      document.body.removeChild(vNode)
    }
  })
}
