<template>
  <div class="Home">
    <div class="ActionList">
      <div
        class="ActionItem"
        v-for="(item, idx) of model.actionList"
        :key="`ActionItem-${idx}-${item.path}`"
        @click="onRouterTo(item)"
      >
        <div class="ActionItem-Icon">
          <SvgIcon :name="item.icon" />
        </div>
        <div class="ActionItem-Label">
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup name="Home">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import SvgIcon from '@/components/SvgIcon/index.vue'
const $router = useRouter()

const model = reactive({
  actionList: [
    { name: '包分析', path: '/Analyser/PkgAnalyser', icon: 'code-simple' },
    { name: '页面分析', path: '/Analyser/PageAnalyser', icon: 'compile' },
    {
      name: '多语言收集',
      path: '/Analyser/I18nCollector',
      icon: 'info-collect'
    }
  ]
})

const onRouterTo = (item) => {
  $router.push({
    path: item.path,
    query: item.query ? item.query : {}
  })
}
</script>

<style lang="scss" scoped>
.Home {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;

  .ActionList {
    width: 100%;
    padding: 50px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    .ActionItem {
      width: 120px;
      height: 120px;
      padding: 6px;
      margin-right: 30px;
      margin-bottom: 30px;
      border: 1px solid #e6e6e6;
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      .ActionItem-Icon {
        flex: 1 0 0;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 15px;
        svg {
          width: 35px;
          height: 35px;
        }
      }
      .ActionItem-Label {
        margin-bottom: 10px;
        font-size: 16px;
        line-height: 18px;
        text-align: center;
      }
    }
    .ActionItem:hover {
      color: #ffffff;
      background-color: #409eff;
      border-color: #409eff;
      svg {
        fill: #ffffff;
      }
    }
  }
}
</style>
