<template>
  <div class="container f" v-if="show" @click.self="cancelPop(true)">
    <div class="confirm-main" :class="show ? 'enter-animatian' : 'leave-animation'">
      <div class="title f">
        {{ props.title }}
      </div>
      <div class="content f">
        {{ props.content }}
      </div>
      <div class="footer">
        <div class="confirm f" @click="props.confirmFn">
          {{ props.confirmText }}
        </div>
        <div class="close f" @click="props.closeFn">{{ props.closeText }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const props = withDefaults(
  defineProps<{
    title?: string | undefined
    content?: string | undefined
    confirmText?: string | undefined
    closeText?: string | undefined
    outClose?: boolean | undefined
    confirmFn: Function
    closeFn: Function
  }>(),
  {
    title: '提醒',
    content: '确认删除?',
    confirmText: '确认',
    closeText: '取消',
    outClose: true,
    confirmFn: () => {
      console.log('confirm')
    },
    closeFn: () => {
      console.log('cancel')
    }
  }
)

const show = ref(true)

const cancelPop = (value = false) => {
  if(value && props.outClose) {
    show.value = false
  }
}

</script>

<style lang="scss" scoped>
.f {
  display: flex;
  align-items: center;
  justify-content: center;
}
.enter-animatian {
  animation: identifier 0.3s ease-out;
}
.leave-animation {
  animation: leave 0.3s ease-out;
}
.container {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba($color: #000000, $alpha: 0.3);
  .confirm-main {
    width: 500px;
    height: 300px;
    background-color: #ffffff;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    .title {
      height: 50px;
      border-bottom: 1px solid rgba($color: #000000, $alpha: 0.1);
      padding: 20px;
      box-sizing: border-box;
    }
    .content {
      flex: 1;
    }
    .footer {
      border-top: 1px solid rgba($color: #000000, $alpha: 0.1);
      height: 70px;
      display: flex;
      .confirm {
        border-right: 1px solid rgba($color: #000000, $alpha: 0.1);
        flex: 1;

        &:hover {
          background-color: rgba($color: #000000, $alpha: 0.2);
          cursor: pointer;
        }
      }
      .close {
        flex: 1;
        &:hover {
          background-color: rgba($color: #000000, $alpha: 0.2);
          cursor: pointer;
        }
      }
    }
  }
}

@keyframes identifier {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes leave {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
</style>
