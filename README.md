# echod

一个基于 **Deno** 的超轻量本地 Echo 测试服务器。

> 📡 快速回显 HTTP 请求的路径、查询参数、请求体和头部信息，适合开发调试。

---

## 安装

使用 `deno install` 直接安装到本地命令行工具：

```bash
deno install --allow-net --name echod https://raw.githubusercontent.com/w0fv1/echod/refs/heads/main/echod.ts
```

- `--allow-net`：允许网络访问（必须）
- `--name echod`：安装后命令名叫 `echod`
- `https://raw.githubusercontent.com/...`：你的 echod 源码地址

---

## 使用方法

### 启动服务器

```bash
echod 8668
```

- `8668` 是服务器监听的端口（可以换成任意可用端口）
- 如果不指定端口，默认使用 **8668**

启动后，你会看到：

```bash
✨ echod is running at http://localhost:8668/
```

---

### 示例请求

发送一个带参数和请求体的请求：

```bash
curl -X POST "http://localhost:8668/test?foo=bar" -H "Content-Type: application/json" -d '{"hello":"world"}'
```

返回 JSON 内容示例：

```json
{
  "path": "/test",
  "query": {
    "foo": "bar"
  },
  "body": {
    "hello": "world"
  },
  "method": "POST",
  "headers": {
    "content-type": "application/json",
    "user-agent": "curl/8.0.1",
    ...
  }
}
```

---

## 帮助信息

查看帮助指令：

```bash
echod --help
```

输出：

```
Usage: echod <port>

Options:
  --help, -h      Show this help message
```

---

## 注意事项

- 需要安装 **Deno**（版本 1.30+ 推荐）  
  👉 安装 Deno: https://deno.land/#installation
- 默认使用 Deno 最新版标准库
- 本工具适合开发环境调试使用，不建议直接用于生产环境

---

## License

MIT License
