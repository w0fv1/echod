// 导入 Deno 官方提供的 HTTP 服务器模块（标准库）
import { serve } from "https://deno.land/std/http/server.ts";

// 工具名称，用于提示信息等
const TOOL_NAME = "echod";

// 从命令行参数获取
const args = Deno.args;

function showHelp() {
  console.log(`\nUsage: ${TOOL_NAME} <port>\n`);
  console.log("Options:");
  console.log("  --help, -h      Show this help message\n");
}

// 检查是否需要显示帮助信息
if (args.includes("--help") || args.includes("-h")) {
  showHelp();
  Deno.exit(0);
}

const portArg = args[0] || "8668";
const PORT = parseInt(portArg);

if (isNaN(PORT) || PORT <= 0 || PORT > 65535) {
  console.error(`\u274C Invalid port number: '${portArg}'`);
  showHelp();
  Deno.exit(1);
}

console.log(`\u2728 ${TOOL_NAME} is running at http://localhost:${PORT}/`);

// 服务器处理函数
serve(async (req) => {
  const { pathname, searchParams } = new URL(req.url);

  // 读取请求体（如果有的话）
  let bodyText = await req.text();
  let bodyJson = {};
  try {
    bodyJson = bodyText ? JSON.parse(bodyText) : {};
  } catch (_) {
    bodyJson = { raw: bodyText };
  }

  // 返回所有路径参数、请求体、查询参数
  return new Response(
    JSON.stringify({
      path: pathname,
      query: Object.fromEntries(searchParams.entries()),
      body: bodyJson,
      method: req.method,
      headers: Object.fromEntries(req.headers.entries()),
    }, null, 2),
    {
      headers: { "Content-Type": "application/json" },
    },
  );
}, { port: PORT });
