# 终端锦囊 · CheatDeck

**在线访问：https://linuxhobby.github.io/CheatDeck/**

一组命令速查单页（Cheat Sheet），覆盖 Hermes Agent、Tailscale、Proxmox VE、VPS 部署四个场景。标签页切换，随时速查。

纯原生 HTML/CSS/JS，零外部依赖，离线可用。

## 速查表一览

| 速查表 | 命令数 | 文件 | 说明 |
|--------|--------|------|------|
| Hermes Agent | ~170 条 | `hermes-command.html` | CLI 命令 + 对话内斜杠命令，含标签说明与动态路由 |
| Tailscale | ~76 条 | `tailscale-command.html` | 连接、诊断、Funnel/Serve、Lock、Debug 等全量命令 |
| PVE | ~257 条 | `pve-command.html` | qm / pct / pvesm / pveum / pveceph / ZFS / HA 等全分类 |
| VPS 相关 | ~33 条 | `vps-command.html` | linuxhobby/ProxmoxVE 与 xray-v2ray-install 一键部署脚本汇总 |

## 功能特性

- **标签页切换** — `index.html` 一个页面内切换全部速查表，支持 `#hash` 直达（如 `index.html#pve`）
- **实时搜索** — 输入即过滤，匹配命令名 + 描述
- **整卡复制** — 点击任意命令卡片，复制完整命令到剪贴板
- **键盘快捷键** — 按 `/` 快速聚焦搜索框，`Esc` 退出
- **深色模式** — 自动跟随系统 `prefers-color-scheme`
- **统一外观** — 全站共用 `assets/shared.css` + `assets/shared.js`，含 SVG logo 与 favicon

## 使用方式

### 本地打开

用浏览器打开 `index.html`，通过顶部标签页切换各速查表；右侧「独立打开 ↗」可单独打开某个页面。

也可以直接打开单个文件：

```
open index.html
open hermes-command.html
```

### GitHub Pages 部署

推送到 `main` 分支后即可在线访问：

```
https://linuxhobby.github.io/CheatDeck/
```

## 文件结构

```
CheatDeck/
├── index.html                  # 标签页首页（Hermes / Tailscale / PVE / VPS）
├── hermes-command.html         # Hermes Agent 指令速查
├── tailscale-command.html      # Tailscale CLI 命令速查
├── pve-command.html            # Proxmox VE 命令速查
├── vps-command.html            # VPS 部署速查
├── assets/
│   ├── shared.css              # 全站统一样式
│   ├── shared.js               # 全站渲染/搜索/复制逻辑
│   ├── logo.svg                # 主 logo（终端 + 四色标签）
│   └── favicon.svg             # 简化版 favicon
├── Hermes Agent 指令速查.md     # Hermes Agent Markdown 源文档
├── Tailscale CLI Reference.md  # Tailscale Markdown 源文档
└── README.md
```

## 技术栈

纯原生 HTML + CSS + JavaScript，无构建步骤、无包管理器、无 CDN。

- 命令数据硬编码在各页面的 `const data = [...]` 数组中，渲染逻辑统一在 `assets/shared.js`
- 渲染时统一做 HTML 转义，命令中的 `<template>` 等写法不会被浏览器误解析
- GitHub 风格配色，深色/浅色模式通过 `@media (prefers-color-scheme: dark)` 自动切换

## 更新命令

编辑对应 HTML 文件的 `data` 数组即可，每条命令的结构：

```js
{ cmd: "命令名", desc: "中文说明" }
```

信息块（如标签说明、注意事项）使用 `{ cat: "分类名", type: "info", items: [{ label, desc }] }`。

## 参考来源

- **Hermes Agent** — [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) 命令注册表
- **Proxmox VE** — [PVE 官方文档](https://pve.proxmox.com/pve-docs/) · [linuxhobby/ProxmoxVE](https://github.com/linuxhobby/ProxmoxVE)
- **Tailscale** — [Tailscale CLI 文档](https://tailscale.com/kb/1241/tailscale-cli)
- **VPS 部署** — [linuxhobby/xray-v2ray-install](https://github.com/linuxhobby/xray-v2ray-install)

## License

MIT
