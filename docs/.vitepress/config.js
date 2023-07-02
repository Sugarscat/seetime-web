import navbar from './nav/navbar'
import sidebar from './nav/sidebar'

export default {
    base: '/seetime-web',
    lang: 'zh-CN',
    title: '见时',
    description: '定时执行自动化任务的平台。',
    themeConfig: {
        nav: navbar,
        logo: '/favicon.ico',
        sidebar: sidebar,
        editLink: {
            pattern: 'https://github.com/Sugarscat/seetime-web/edit/master/docs/:path',
            text: '在 GitHub 上编辑此页'
        },
        socialLinks: [
            {icon: 'github', link: 'https://github.com/Sugarscat/seetime'}
        ],
        // footer: {
        //     mymessage: 'GNU GENERAL PUBLIC LICENSE V3 Licensed',
        //     copyright: '<a href="https://beian.miit.gov.cn/" target="_blank"></a>'
        // }
    },
    lastUpdated: true,
}
