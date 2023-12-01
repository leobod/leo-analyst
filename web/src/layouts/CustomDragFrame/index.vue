<template>
  <div class="CustomDragFrame">
    <div class="CustomDragHeader">
      <div
        class="CustomDragHeader-TitleBar"
        @mousedown="onHandleMouseDown"
        @mouseup="onHandleMouseUp"
      >
        {{ $t('标题栏') }}
      </div>
      <div class="CustomDragHeader-BtnGroup">
        <Remove class="CustomDragHeader-BtnItem" @click="onHandleMin" />
        <SwitchButton class="CustomDragHeader-BtnItem" @click="onHandleClose" />
      </div>
    </div>
    <div class="CustomDragBody">
      <RouterView />
    </div>
  </div>
</template>

<script setup name="CustomDragFrame">
import { Remove, SwitchButton } from '@element-plus/icons-vue'

const onHandleMin = () => {
  if (window && window.$ipc && window.$ipc.win) {
    window.$ipc.win.min()
  } else {
    console.warn('暂无ipc')
  }
}

const onHandleClose = () => {
  if (window && window.$ipc && window.$ipc.win) {
    window.$ipc.win.close()
  } else {
    console.warn('暂无ipc')
  }
}

const onHandleMouseDown = () => {
  if (window && window.$ipc && window.$ipc.win) {
    window.$ipc.win.move(true)
  } else {
    console.warn('暂无ipc')
  }
}

const onHandleMouseUp = () => {
  if (window && window.$ipc && window.$ipc.win) {
    window.$ipc.win.move(false)
  } else {
    console.warn('暂无ipc')
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
    -webkit-app-region: drag;
    height: 40px;
    background-color: #409eff;
    backdrop-filter: blur(4px);
    .CustomDragHeader-TitleBar {
      height: 100%;
      flex: 1;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      color: #ffffff;
      user-select: none;
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
}
</style>
