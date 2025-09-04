# AI 姿态绘画 🕺✨

可用于 AI Studio 的应用，可根据手绘火柴人图重新调整人物姿势，让静态图像姿态发生变化。受益于Nano Banana 的角色一致性的控制，基于 React 和 Gemini API 构建。

## 使用方法：

1. 先打开你自己的 AI Studio 并登录；
2. 点击下方的 Demo 即可；
3. AIStudio每天对各模型有使用额度限制，自行查看Free层级对用的额度 [➡️ 额度限制](https://ai.google.dev/gemini-api/docs/rate-limits?hl=zh-cn)；
   
**[➡️ 在 AiStudio 中打开并运行此项目](https://ai.studio/apps/drive/1PEMBcGY7_2drGlYl7c-ZN6BHjaX7fygm)**

## 工作原理：

此apps应用程序演示了 Gemini gemini-2.5-flash-image-preview (也就是Nano Banana)模型强大的图像编辑功能。它遵循简单的三步流程：

1. 上传图片：首先上传一个人的照片。
2. 绘制姿势：使用交互式画布绘制所需姿势的简单火柴人轮廓。
3. 生成：点击“生成新姿势”按钮。应用程序会将原始图像、你的绘图以及特定提示发送到 Gemini API，然后后者会生成一张包含新姿势人物的新图像。

## 主要特点：

- 交互式画布：轻松绘制和清晰姿势。
- 点击上传：方便地上传图像。
- 实时预览：并排查看您上传的图像和绘图。
- 响应式设计：可在各种屏幕尺寸上顺利运行。
- 我们利用 Google 刚刚上新的Nano Banana 进行测试。

**AI 模型：通过 @google/genai SDK 的 gemini-2.5-flash-image-preview。**

**样    式：Tailwind CSS（通过 CDN）**

**环    境：本设计是让大家直接在 Google AI Studio 中运行，无需在本地配置环境。**
