module.exports = {
  base: '/share/',
  ga: 'UA-48656532-3',
  plugins: {
    '@vuepress/pwa': {
      serviceWorker: true,
      updatePopup: true
    },
    '@vuepress/nprogress': {},
    '@vuepress/medium-zoom': {},
    '@vuepress/last-updated': {},
    '@vuepress/clean-urls': {},
    '@vuepress/blog': {
      postsDir: '/'
    },
    '@vuepress/back-to-top': {},
    '@vuepress/active-header-links': {}
  },
  themeConfig: {
    // 假定是 GitHub. 同时也可以是一个完整的 GitLab URL
    repo: 'TuhuFE/share',
    sidebar: 'auto'
  }
}