const SYSTEM_NAME = "blog-clm-show"

/** 缓存数据时用到的 Key */
class CacheKey {
  static TOKEN = `${SYSTEM_NAME}-token-key`
  static USER_INFO = `${SYSTEM_NAME}-user-info`
  static CONFIG_LAYOUT = `${SYSTEM_NAME}-config-layout-key`

  static SIDEBAR_STATUS = `${SYSTEM_NAME}-sidebar-status-key`
  static LEFT_STATUS = `${SYSTEM_NAME}-left-status-key`

  static ACTIVE_THEME_NAME = `${SYSTEM_NAME}-active-theme-name-key`
  static VISITED_VIEWS = `${SYSTEM_NAME}-visited-views-key`
  static CACHED_VIEWS = `${SYSTEM_NAME}-cached-views-key`
}

export default CacheKey
