<template>
  <div class="I18nCollector">
    <!-- 头部.当前处在的步骤 -->
    <div class="I18nCollector-Header">
      <el-steps :active="stepBar.current" simple finish-status="success">
        <el-step
          v-for="(item, idx) of stepBar.opts"
          :key="`StepItem-${idx}`"
          :title="item.label"
          @click="onHandleGoToStep(item.value)"
        />
      </el-steps>
    </div>
    <!-- 内容.完成指定步骤需要的页面提示 -->
    <div class="I18nCollector-Body">
      <template v-if="stepBar.current === 0">
        <div class="Step Step1">
          <div class="Step-Body">
            <el-form
              ref="step1FormRef"
              :model="step1.form"
              :rules="step1.formRules"
              label-width="120px"
            >
              <el-form-item label="工程目录" prop="dir">
                <div class="Step1-DirContainer">
                  <el-input v-model="step1.form.dir" type="text" clearable />
                  <el-button
                    class="Step1-DirBtn"
                    @click="onHandleSelectDir"
                    type="primary"
                  >
                    选择工程目录
                  </el-button>
                </div>
              </el-form-item>
              <el-form-item label="项目名称" prop="projectName">
                <el-input
                  v-model="step1.form.projectName"
                  type="text"
                  clearable
                />
              </el-form-item>
              <el-form-item label="Vue版本" prop="vueVersion">
                <el-select
                  v-model="step1.form.vueVersion"
                  clearable
                  style="width: 100%"
                >
                  <el-option
                    v-for="(item, idx) of step1.formOpts.vueVersion"
                    :key="`vueVersion-${item.value}-${idx}`"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="匹配的元素" prop="matchRule">
                <el-checkbox-group v-model="step1.form.matchRule">
                  <el-checkbox
                    v-for="(item, idx) of step1.formOpts.matchRule"
                    :key="`matchRule-${item.value}-${idx}`"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-checkbox-group>
              </el-form-item>
            </el-form>
          </div>
          <div class="Step-Footer">
            <el-button @click="onHandleSubmitStep1" type="primary">
              下一步
            </el-button>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup name="I18nCollector">
import { reactive, ref } from 'vue'

const stepBar = reactive({
  current: 0,
  opts: [
    { label: '配置工程及版本信息', value: 1 },
    { label: '查看结果', value: 2 }
  ]
})
const step1FormRef = ref(null)
const step1 = reactive({
  form: {
    dir: '',
    projectName: '',
    vueVersion: null,
    matchRule: ['$t', 'i18n.global.t']
  },
  formOpts: {
    vueVersion: [
      { label: 'Vue2', value: 2 },
      { label: 'Vue3', value: 3 }
    ],
    matchRule: [
      { label: '$t', value: '$t' },
      { label: 'i18n.global.t', value: 'i18n.global.t' }
    ]
  },
  formRules: {
    dir: [{ required: true, message: '请选择工程目录', trigger: 'blur' }],
    projectName: [
      { required: true, message: '请填写项目名称', trigger: 'blur' }
    ],
    vueVersion: [
      { required: true, message: '请选择vue版本号', trigger: 'blur' }
    ],
    matchRule: [{ required: true, message: '请选择匹配规则', trigger: 'blur' }]
  }
})

/**
 * 调用ipc实现文件夹路径选择
 */
const onHandleSelectDir = async () => {
  if (window && window.$ipc) {
    const res = await window.$ipc.pageAction({ type: 'SELECT_DIR' })
    if (res && !res.errCode && !res.data.canceled) {
      step1.form.dir = res.data.filePaths[0] || ''
      const pkgInfo = await _getPkgInfo(step1.form.dir)
      if (pkgInfo) {
        step1.form.projectName = pkgInfo.name
        step1.form.vueVersion = _getVueVersion(pkgInfo)
      }
    }
  } else {
    console.warn('暂不支持')
  }
}

/**
 * 读取pkg信息
 * @param {*} path
 */
const _getPkgInfo = async (path) => {
  if (window && window.$ipc) {
    const finalParams = {
      type: 'GET_PKG_INFO',
      payload: { path }
    }
    const res = await window.$ipc.pageAction(finalParams)
    if (res && !res.errCode) {
      return res.data
    }
  } else {
    console.warn('暂不支持')
  }
}

/**
 * 根据pkg对象，获取vue版本信息
 * @param {*} pkgVal
 */
const _getVueVersion = (pkgVal, pkgName = 'vue') => {
  let result = null
  const allDeps = { ...pkgVal.dependencies, ...pkgVal.devDependencies }
  const pkgItem = allDeps[pkgName]
  if (pkgItem) {
    const version = pkgItem.replace('^', '').replace('~', '')
    const versionList = version.split('.')
    const majorVersion = (versionList && versionList[0]) || null
    // const minorVersion = (versionList && versionList[1]) || null
    // const patchVersion = (versionList && versionList[2]) || null
    // console.log(majorVersion, '\n', minorVersion, '\n', patchVersion)
    // console.log([majorVersion, minorVersion, patchVersion])
    result = Number(majorVersion)
  }
  return result
}

/**
 * 提交step1的表单
 */
const onHandleSubmitStep1 = () => {
  step1FormRef.value.validate((valid, fields) => {
    if (valid) {
      onHandleNext(1)
    }
  })
}

/**
 * 回到指定的步骤节点
 * @param {*} val
 */
const onHandleGoToStep = (val) => {
  if (val <= stepBar.current) {
    stepBar.current = val - 1
  }
}
/**
 * 下一步
 * @param {*} val
 */
const onHandleNext = (val) => {
  if (val >= 0 && val < stepBar.opts.length) {
    stepBar.current++
  }
}
</script>

<style lang="scss" scoped>
.I18nCollector {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
  /* 头部.当前处在的步骤 */
  .I18nCollector-Header {
    width: 75%;
  }
  /* 内容.完成指定步骤需要的页面提示 */
  .I18nCollector-Body {
    padding: 30px 0;
    width: 75%;
    flex: 1 0 0;
    .Step {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      .Step-Body {
        width: 75%;
        flex: 1;
      }
      .Step-Footer {
        padding: 20px 0;
        text-align: center;
      }
    }
  }
  /* 步骤1 */
  .Step1 {
    .Step1-DirContainer {
      width: 100%;
      display: flex;
      flex-direction: row;
      .Step1-DirBtn {
        margin-left: 10px;
      }
    }
  }
}
</style>
