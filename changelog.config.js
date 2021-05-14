module.exports = {
    disableEmoji: true,
    list: ['feature', 'refactor', 'style', 'fix', 'docs', 'jira', 'build'],
    maxMessageLength: 64,
    minMessageLength: 3,
    questions: ['type', 'scope', 'subject'], // 控制提交模板
    scopes: [],
    types: {
        feature: {
            description: '新特性',
            emoji: '🆕',
            value: 'feature'
        },
        refactor: {
            description: '代码重构 && 优化',
            emoji: '🛠',
            value: 'refactor'
        },
        style: {
            description: '样式修改',
            emoji: '💄',
            value: 'style'
        },
        fix: {
            description: 'bug修复（联调阶段 & 提测阶段 && 紧急线上）',
            emoji: '🐛',
            value: 'fix'
        },
        docs: {
            description: '文档修改（文案修改 && 文件更新）',
            emoji: '✏',
            value: 'docs'
        },
        jira: {
            description: '#dddd commit  (与JIRA  结合，相对于fix优先)',
            emoji: '🐛',
            value: 'jira'
        },
        build: {
            description: 'npm run build 打包',
            emoji: '🤖',
            value: 'build'
        }
    }
};
