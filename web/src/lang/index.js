import { createI18n } from 'vue-i18n'
import zh from './zh'
// import en from './en'
// import jp from './jp'
// 创建 i18n
const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  allowComposition: false,
  locale: localStorage.getItem('lang') || 'zh',
  messages: {
    zh
    // en,
    // jp
  }
})

export default i18n
