module.exports = {
    base: '/blog/',

    title: '前端进阶之路',
    description: '条条大路通罗马',
    head: [
        ['link', { rel: 'icon', href: '/favicon.ico' }],
    ],
    markdown: {
        lineNumbers: true
    },
    themeConfig: {
        sidebarDepth: 2,
        lastUpdated: 'Last Updated',
        nav:[
            { text: '前端积累', link: '/web_pieces/' },
            { text: '算法积累', link: '/arithmetic/' },
            { text: '代码块', link: '/codes/' },
            { text: '关于我', link: '/about/' },
            { text: 'Github', link: 'https://github.com/HQ-Lin' },
        ],
        sidebar:{
            '/web_pieces/': [
                '/web_pieces/network',
                '/web_pieces/js-basics',
                '/web_pieces/vue',
                '/web_pieces/test',
            ],
            '/arithmetic/': [],
            '/codes/': [],
        }
    }
};
