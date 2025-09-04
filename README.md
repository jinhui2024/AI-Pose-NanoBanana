# AI Pose Animator 🕺✨

An AI Studio application that brings static images to life by re-posing people according to a hand-drawn stick figure. Built with React and the Gemini API.

<!-- 
  TODO: To make this link work, open this project in your AI Studio, 
  click the "Share" button at the top right, get the link, 
  and paste it here, replacing the placeholder URL.
-->
**[➡️ Open and run this project in AI Studio](https://ai.studio/apps/drive/1PEMBcGY7_2drGlYl7c-ZN6BHjaX7fygm)**

## How It Works

This application demonstrates the powerful image editing capabilities of the Gemini `gemini-2.5-flash-image-preview` model. It follows a simple three-step process:

1.  **Upload an Image**: Start by uploading a photo of a person.
2.  **Draw a Pose**: Use the interactive canvas to draw a simple stick-figure outline of the desired pose.
3.  **Generate**: Click the "Generate New Pose" button. The application sends the original image, your drawing, and a specific prompt to the Gemini API, which then generates a new image with the person in the new pose.

## Key Features

-   **Interactive Canvas**: Easily draw and clear poses.
-   **Drag-and-Drop Upload**: Conveniently upload images.
-   **Real-time Previews**: See your uploaded image and drawing side-by-side.
-   **Responsive Design**: Works smoothly on various screen sizes.
-   **Powered by Gemini**: Leverages Google's state-of-the-art multimodal model for high-quality image generation.

## Technical Details

-   **Framework**: React
-   **AI Model**: `gemini-2.5-flash-image-preview` via the `@google/genai` SDK.
-   **Styling**: Tailwind CSS (via CDN)
-   **Environment**: Designed to run directly in **Google AI Studio** without any local setup.

This project is a great example of how to build interactive, creative AI applications using Gemini's multimodal capabilities.
