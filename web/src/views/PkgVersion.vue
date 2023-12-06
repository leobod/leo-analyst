<template>
  <div class="PkgVersion">
    <div class="PkgVersion-Left">
      <div class="PkgVersion-Content">
        <ElInput v-model="dirRef" type="text" clearable />
      </div>
      <div class="PkgVersion-Content">
        <ElButton @click="selectDir" type="primary">选择文件夹</ElButton>
        <ElButton
          type="primary"
          :disabled="dirRef === ''"
          style="margin-left: 6px"
          @click="getVersion"
        >
          获取版本号
        </ElButton>
      </div>
    </div>
    <div class="PkgVersion-Right">
      <div class="PkgVersion-Content">
        <ElInput v-model="versionRef" type="text" />
      </div>
    </div>
  </div>
</template>

<script setup name="PkgVersion">
import { ref } from 'vue'

const dirRef = ref('')
const versionRef = ref('')

const selectDir = async () => {
  if (window && window.$ipc) {
    const res = await window.$ipc.pageAction({ type: 'SELECT_DIR' })
    if (res && !res.errCode && !res.data.canceled) {
      dirRef.value = res.data.filePaths[0] || ''
    }
  }
}

const getVersion = async () => {
  if (window && window.$ipc) {
    const finalParams = {
      type: 'GET_PKG_INFO',
      payload: { path: dirRef.value }
    }
    console.log(finalParams)
    const res = await window.$ipc.pageAction(finalParams)
    if (res && !res.errCode) {
      console.log(res.data)
    }
  }
}
</script>

<style lang="scss" scoped>
.PkgVersion {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  padding: 30px;
  box-sizing: border-box;
  .PkgVersion-Left {
    height: 100%;
    flex: 1 0 0;
    display: flex;
    flex-direction: column;
    align-content: center;
    padding: 0 10px;
  }
  .PkgVersion-Right {
    height: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-content: center;
    border-left: 1px solid #e6e6e6;
    padding: 0 10px;
  }
  .PkgVersion-Content {
    width: 100%;
    display: flex;
    flex-direction: row;
    margin-bottom: 20px;
  }
}
</style>
