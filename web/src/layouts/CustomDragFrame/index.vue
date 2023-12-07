<template>
  <div class="CustomDragFrame">
    <div class="CustomDragHeader">
      <div class="CustomDragHeader-BtnGroup">
        <ArrowLeftBold
          class="CustomDragHeader-BtnItem"
          v-show="!($route.name === 'Home')"
          @click="onGoBack"
        />
      </div>
      <div
        class="CustomDragHeader-TitleBar"
        @mousedown="onHandleMouseDown"
        @mouseup="onHandleMouseUp"
        @mouseleave="onHandleMouseUp"
        @dblclick="onEmitWinAction('TOGGLE_MAX_WIN')"
      >
        {{ $route.meta.title }}
      </div>
      <div class="CustomDragHeader-BtnGroup">
        <Remove
          class="CustomDragHeader-BtnItem"
          @click="onEmitWinAction('MIN_WIN')"
        />
        <SwitchButton
          class="CustomDragHeader-BtnItem"
          @click="onEmitWinAction('CLOSE_WIN')"
        />
      </div>
    </div>
    <div class="CustomDragBody">
      <RouterView />
    </div>
  </div>
</template>

<script setup name="CustomDragFrame">
import { useRouter, useRoute } from 'vue-router'
import { Remove, SwitchButton, ArrowLeftBold } from '@element-plus/icons-vue'
const $router = useRouter()
const $route = useRoute()

const onGoBack = () => {
  document.referrer ? $router.go(-1) : $router.push('/')
}

const onEmitWinAction = (type) => {
  if (window && window.$ipc) {
    switch (type) {
      case 'MIN_WIN':
      case 'CLOSE_WIN':
      case 'TOGGLE_MAX_WIN': {
        window.$ipc.winAction({ type })
        break
      }
    }
  } else {
    console.warn('平台暂不支持')
  }
}

const onHandleMouseDown = (e) => {
  if (window && window.$ipc) {
    window.$ipc.winAction({
      type: 'MOVE_WIN',
      payload: { canMoving: true }
    })
  } else {
    console.warn('平台暂不支持')
  }
}

const onHandleMouseUp = (e) => {
  if (window && window.$ipc) {
    window.$ipc.winAction({ type: 'MOVE_WIN', payload: { canMoving: false } })
  } else {
    console.warn('平台暂不支持')
  }
}
</script>

<style lang="scss" scoped>
.CustomDragFrame {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .CustomDragHeader {
    display: flex;
    flex-direction: row;
    align-items: center;
    // -webkit-app-region: drag;
    height: 40px;
    background-color: rgba(0, 0, 0, 0.9); // #409eff;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    .CustomDragHeader-TitleBar {
      height: 100%;
      flex: 1;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      color: #ffffff;
      user-select: none;
      // -webkit-app-region: no-drag;
    }
    .CustomDragHeader-BtnGroup {
      padding: 0 20px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      height: 100%;
      font-size: 16px;
      -webkit-app-region: no-drag;
      .CustomDragHeader-BtnItem {
        width: 1em;
        height: 1em;
        margin: 6px;
        color: #ffffff;
        cursor: pointer;
      }
      .CustomDragHeader-BtnItem:hover {
        color: #f56c6c;
      }
    }
  }
  .CustomDragBody {
    flex: 1 0 0;
    background-color: #ffffff;
    overflow: hidden;
    border: 1px solid rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
  }
}
</style>
