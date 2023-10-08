# ClassroomPlugin - Visual Studio Code Extension

**ClassroomPlugin** is a Visual Studio Code extension that simplifies the process of compiling and running C programs while also providing integration with Git for version control. This extension is designed to streamline the development workflow, making it easier for students and developers to work on C programming assignments and projects.

## Features

- Compile and run C programs directly from Visual Studio Code.
- Automatic error detection and logging of compilation errors.
- Integration with Git for version control, allowing you to commit and push changes effortlessly.
- Debugging support with the option to use GDB (GNU Debugger) for advanced debugging capabilities (coming soon).

## Prerequisites

Before using **ClassroomPlugin**, ensure you have the following prerequisites installed on your system:

- Visual Studio Code: [Download Visual Studio Code](https://code.visualstudio.com/Download)
- GCC (GNU Compiler Collection): Required for compiling C programs.
- Git: Required for version control integration.

## Installation

1. Open Visual Studio Code.
2. Go to the Extensions view by clicking on the Extensions icon in the Activity Bar on the side of the window.
3. Search for "ClassroomPlugin" in the Extensions view search bar.
4. Click the Install button to install the extension.
5. Once installed, you can access the extension's functionality.

## Usage

1. Open a C program file (.c) in Visual Studio Code.
2. Click on the "Run" button in the top-right corner of the editor, or use the keyboard shortcut to trigger the extension.

   - **Keyboard Shortcut:** `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (macOS), then type "Run C Program" and press Enter.

3. The extension will compile and run the C program in the integrated terminal.
4. Compilation errors, if any, will be logged in the `compile_errors.txt` file in the same directory as your source code.

## Configuration

You can customize the behavior of the extension by modifying the settings. To access the settings, go to File > Preferences > Settings, search for "ClassroomPlugin," and adjust the options as needed.

## Roadmap

- Support for debugging with GDB (GNU Debugger).
- Enhanced error reporting and diagnostics.
- Additional Git-related features for version control.
- Integration with popular C libraries and frameworks.

## Feedback and Contributions

We welcome your feedback and contributions to improve this extension. If you encounter any issues, have suggestions for improvements, or would like to contribute to the project, please visit the [GitHub repository](https://github.com/BlackCat-klein/ClassroomPlugin) for ClassroomPlugin.

