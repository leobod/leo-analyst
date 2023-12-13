<template>
  <div class="CustomDragFrame">
    <div class="CustomDragHeader">
      <div
        class="CustomDragHeader-TitleBar"
        @mousedown="onHandleMouseDown"
        @mouseup="onHandleMouseUp"
        @dblclick="onEmitWinAction('TOGGLE_MAX_WIN')"
      >
        <div class="CustomDragHeader-BtnGroup">
          <div
            class="CustomDragHeader-BtnItem mr-10"
            :class="{
              'CustomDragHeader-BtnItem_disable': !!($route.name === 'Home')
            }"
            @click="onGoBack"
          >
            <SvgIcon name="win-prev" />
          </div>
        </div>
        <div class="CustomDragHeader-Title">
          {{ $route.meta.title }}
        </div>
      </div>
      <div class="CustomDragHeader-BtnGroup">
        <div
          class="CustomDragHeader-BtnItem ml-10"
          @click="onEmitWinAction('MIN_WIN')"
        >
          <SvgIcon name="win-min" />
        </div>
        <div
          class="CustomDragHeader-BtnItem ml-10"
          @click="onEmitWinAction('TOGGLE_MAX_WIN')"
        >
          <SvgIcon :name="layout.isMax ? 'win-restore' : 'win-max'" />
        </div>
        <div
          class="CustomDragHeader-BtnItem ml-10 mr-10"
          @click="onEmitWinAction('CLOSE_WIN')"
        >
          <SvgIcon name="win-close" />
        </div>
      </div>
    </div>
    <div class="CustomDragBody">
      <RouterView />
    </div>
  </div>
</template>

<script setup name="CustomDragFrame">
import { reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import SvgIcon from '@/components/SvgIcon/index.vue'
import { Min, ToggleMax, IsMax, Close, Move } from '@/api/ipc/Win'
const $router = useRouter()
const $route = useRoute()

const layout = reactive({
  isMax: true
})

const onGoBack = () => {
  if (!($route.name === 'Home')) {
    document.referrer ? $router.go(-1) : $router.push('/')
  }
}

const onEmitWinAction = async (type) => {
  try {
    switch (type) {
      case 'MIN_WIN':
        await Min()
        break
      case 'CLOSE_WIN': {
        await Close()
        break
      }
      case 'TOGGLE_MAX_WIN': {
        await ToggleMax()
        layout.isMax = await IsMax()
        break
      }
    }
  } catch (e) {
    console.warn(e)
  }
}

const onHandleMouseDown = async (e) => {
  try {
    await await Move({ canMoving: true })
  } catch (e) {
    console.warn(e)
  }
}

const onHandleMouseUp = async (e) => {
  try {
    await await Move({ canMoving: false })
  } catch (e) {
    console.warn(e)
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
    background-color: #f4f4f5;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
    .CustomDragHeader-TitleBar {
      height: 100%;
      flex: 1;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      color: #73767a;
      user-select: none;
      font-size: 12px;
      padding: 6px 0;
      box-sizing: border-box;
    }
    .CustomDragHeader-Title {
      height: 100%;
      width: 30%;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      background-color: #e9e9eb;
      border-radius: 6px;
      flex-wrap: nowrap;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      border: 1px solid rgba(0, 0, 0, 0.2);
    }
    .CustomDragHeader-BtnGroup {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      .CustomDragHeader-BtnItem {
        height: 100%;
        aspect-ratio: 1;
        box-sizing: border-box;
        padding: 6px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        svg {
          width: 16px;
          height: 16px;
          fill: #000000;
        }
      }
      .CustomDragHeader-BtnItem:hover {
        background-color: #dedfe0;
        border-radius: 6px;
      }
      .CustomDragHeader-BtnItem_disable {
        cursor: not-allowed;
        svg {
          fill: #b1b3b8;
        }
      }
      .CustomDragHeader-BtnItem_disable:hover {
        background-color: transparent;
        svg {
          fill: #b1b3b8;
        }
      }
    }
  }
  .CustomDragBody {
    flex: 1 0 0;
    background-color: #ffffff;
    overflow: hidden;
    border: 1px solid rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
  }
}
</style>
