# 概述

本项目的核心是一个在 Cursor 中使用的 MCP 插件。通过启动一个 MCP Server，并在 Cursor 中注册之后，可以从提示词中获取 Figma 文档的 URL。通过该 URL 调用 Figma API 获取对应设计稿的原始图片，之后发送给 Dify 进行处理，根据图片结合 RAG 生成对应前端代码并返回给 Cursor。

# 解决了什么问题

当前，Cursor 本身可以按照用户需求生成代码，然而在前端开发方面，还存在一些限制：
* 前端需要根据设计稿实现代码，而 Cursor 目前只支持从本地上传图片的方式来使用，这要求前端工程师现在 Figma 中导出对应的图片，下载到本地，然后上传到 Cursor 中，导致流程繁琐
* Cursor 在最新版中虽然支持了 MCP，然而目前只支持返回值为 text 的 MCP，而不支持返回图片的 MCP，这导致无法简单开发一个从 Figma API 导出图片并返回给 Cursor 的 MCP Server 来实现对应功能，而需要将导出的图片传递给 Dify Workflow，在 Dify 中编排识别图片并生成代码的流程，并将最终代码返回给 Cursor，之后 Cursor 将该代码作为示例，结合项目信息，生成最终的代码

# 项目介绍和启动方式

## horizon-ui-chakra-nextjs

用于测试的前端项目，需要用 Cursor 打开

## figma-mcp

MCP Server 相关代码。启动方式：
```bash
pnpm install
pnpm build
pnpm start --figma-api-key=XXX --dify-api-key=XXX --port=3322
```
如何获取 Figma API KEY：https://help.figma.com/hc/en-us/articles/8085703771159-Manage-personal-access-tokens

启动后，需要在 Corsur 中加载该 MCP：https://docs.cursor.com/context/model-context-protocol#adding-an-mcp-server-to-cursor

type 选择 SSE，url 输入 http://localhost:3322/sse

## dify

对应的 Dify 流程 yaml 文件。导入后，需要设置 Chakra UI 组件库文档的知识库来要求模型结合该文档来生成代码。

## chakra-docs

设置知识库时，如果使用 Firecrawl 或 JinaAI 出现问题，可以临时使用该目录下的 result.mdx 文件作为替代

# 使用方式

在 Cursor 的 Composor 中，输入提示词，并指定 Figma 文件的 url。例如：
```
帮我从这个 Figma 文件生成代码： @https://www.figma.com/design/k5JGv8OEFpLtUMLShXQlzK/DashStack---Free-Admin-Dashboard-UI-Kit---Admin-%26-Dashboard-Ui-Kit---Admin-Dashboard-(Community)?node-id=0-10131&t=4EQWtdU9d0lFOy02-4  。使用对应 MCP 的 get_code 方法，根据返回的示例生成代码。
```
