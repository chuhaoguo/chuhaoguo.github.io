# Porphyrian Tree — 个人网站

学术 · 古典 · 科技感的 AI 哲学研究博客。基于 **Jekyll**，免费托管在 **GitHub Pages**。

---

## 一、如何发布新文章（日常只需要这一步）

1. 在 `_posts/` 文件夹里新建文件，文件名格式必须是：
   `YYYY-MM-DD-英文短标题.md`，例如 `2026-10-05-can-llms-refer.md`
2. 复制 `new-post-template.md` 的内容进去，修改标题、标签、正文（Markdown 语法）。
3. 保存并推送到 GitHub（或者**直接在 GitHub 网页上点 “Add file → Create new file”**）。
4. 约 1 分钟后网站自动更新。首页“Recent writing”、Blog 列表、标签、RSS 都会自动出现新文章。

支持：脚注 `[^1]`、引用 `>`、表格、代码块、数学公式（front matter 写 `math: true`，然后用 `$$ ... $$`）。
图片：放进 `assets/img/`，文章里写 `![说明](/assets/img/xxx.jpg)`。

## 二、常改的地方

| 想改什么 | 改哪个文件 |
|---|---|
| 你的名字、简介、邮箱、学术链接 | `_config.yml` 里的 `author` |
| About Me 页面正文 | `about.md` |
| 首页四根“分枝”（研究方向） | `_data/branches.yml` |
| 翻译菜单里的语言 | `_data/languages.yml` |
| 颜色 | `assets/css/style.css` 顶部的 `--gold`、`--bg` 等变量 |

## 三、上线（第一次，约 15 分钟）

1. 注册 GitHub，新建一个 **public** 仓库，例如 `porphyrian-tree`。
2. 把本文件夹所有文件上传到仓库（网页拖拽上传即可）。
3. 仓库 **Settings → Pages** → Source 选 `Deploy from a branch`，分支 `main`，目录 `/ (root)`，保存。
4. 几分钟后网站就能在 `https://你的用户名.github.io/porphyrian-tree/` 访问
   （在绑定域名之前，若要用这个地址，请把 `_config.yml` 里的 `baseurl` 改为 `"/porphyrian-tree"`）。

## 四、绑定域名 treephilosophy.me

> 2026-09-28 查询时 `treephilosophy.me` 与 `porphyriantree.me`、`porphyriantree.com` 均**未被注册**。
> 学生可以查看 **GitHub Student Developer Pack**，它历来包含 Namecheap 一年免费 `.me` 域名的福利（以当前页面为准）。

1. 在 Namecheap / Cloudflare / Porkbun 购买 `treephilosophy.me`。
2. 在域名商的 DNS 设置中添加：
   - 4 条 **A** 记录，主机 `@`，值分别为
     `185.199.108.153`、`185.199.109.153`、`185.199.110.153`、`185.199.111.153`
   - 1 条 **CNAME** 记录，主机 `www`，值 `你的用户名.github.io`
3. 仓库 **Settings → Pages → Custom domain** 填 `treephilosophy.me`，勾选 **Enforce HTTPS**。
4. 本项目已包含 `CNAME` 文件（内容为 `treephilosophy.me`）。若换域名，同时修改 `CNAME` 和 `_config.yml` 的 `url`。

## 五、翻译系统说明

- 右上角地球图标 → 选择语言，使用 Google 网页翻译整站实时翻译，选择会跨页面保留。
- 选 English 即恢复原文。网站名、代码块、希腊文不会被翻译。
- 这是机器翻译；菜单中已注明。Google 的网页翻译插件官方已不再接受新注册，但目前仍可正常使用；若将来失效，可替换为其他服务，其余部分不受影响。

## 六、本地预览（可选）

需要 Ruby ≥ 3.0：
```bash
bundle install
bundle exec jekyll serve
```
然后打开 http://localhost:4000
