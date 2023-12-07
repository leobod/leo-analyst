<template>
  <div class="I18nCollector">
    <div class="I18nCollector-Left">
      <div class="I18nCollector-Content">
        <ElInput v-model="model.dirPath" type="text" clearable />
      </div>
      <div class="I18nCollector-Content">
        <ElButton @click="selectDir" type="primary">选择工程目录</ElButton>
        <ElButton
          type="primary"
          :disabled="model.dirPath === ''"
          style="margin-left: 6px"
          @click="getVersion"
        >
          解析工程
        </ElButton>
      </div>
    </div>
    <div class="I18nCollector-Right">
      <div class="I18nCollector-Content">
        <div>
          <pre class="I18nCollector-Pre">{{ model.result }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup name="I18nCollector">
import { reactive } from 'vue'

const model = reactive({
  dirPath: '',
  result: ''
})

const selectDir = async () => {
  if (window && window.$ipc) {
    const res = await window.$ipc.pageAction({ type: 'SELECT_DIR' })
    if (res && !res.errCode && !res.data.canceled) {
      model.dirPath = res.data.filePaths[0] || ''
    }
  }
}

const getVersion = async () => {
  if (window && window.$ipc) {
    const finalParams = {
      type: 'GET_PKG_INFO',
      payload: { path: model.dirPath }
    }
    console.log(finalParams)
    const res = await window.$ipc.pageAction(finalParams)
    if (res && !res.errCode) {
      model.result = JSON.stringify(res.data, null, 4)
    }
  }
}
</script>

<style lang="scss" scoped>
.I18nCollector {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  padding: 30px;
  box-sizing: border-box;
  .I18nCollector-Left {
    height: 100%;
    flex: 1 0 0;
    display: flex;
    flex-direction: column;
    align-content: center;
    padding: 0 10px;
  }
  .I18nCollector-Right {
    height: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-content: center;
    border-left: 1px solid #e6e6e6;
    padding: 0 10px;
  }
  .I18nCollector-Content {
    width: 100%;
    display: flex;
    flex-direction: row;
    margin-bottom: 20px;

    .I18nCollector-Pre {
      line-height: 1.5;
      font-family: SourceHanSansSC;
    }
  }
}
</style>
