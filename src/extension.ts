import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import * as child_process from 'child_process';
import { spawn } from 'node-pty';


export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('classroomplugin.run', () => {
        // The code you place here will be executed every time your command is executed
        // Display a message box to the user
        vscode.window.showInformationMessage('ran the command successfully');
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            // Get the file path of the active document
            const filePath = editor.document.uri.fsPath;
            if (filePath.endsWith('.c')) {
                // Compile and run the C program in the terminal
                const outputFilePath = path.join(path.dirname(filePath), path.basename(filePath, '.c'));
                const terminal = vscode.window.createTerminal('C Program');

                // Create a log file to store compilation errors (append mode)
                const logFilePath = path.join(path.dirname(filePath), 'compile_errors.txt');
                const logStream = fs.createWriteStream(logFilePath, { flags: 'a' });

                const debugLogFilePath = path.join(path.dirname(filePath), 'debug_log.txt');

                // Add a delay of 1 second before sending the text
                setTimeout(() => {
                    const compileCommand = `gcc -g "${filePath}" -o "${outputFilePath}" 2>&1`;

                    // Show the terminal explicitly
                    terminal.show();

                    // Send the compile command to the terminal
                    terminal.sendText(compileCommand);

                    // Create a child process for the compile command
                    const compileProcess = child_process.exec(compileCommand);

                    // Redirect output and errors to the log file
                    compileProcess.stdout?.on('data', (data) => {
                        const timestamp = new Date().toLocaleString();
                        const output = data.toString();
                        logStream.write(`${timestamp} - ${output}`); // Append the data with timestamp to the log file
                    });

                    compileProcess.stderr?.on('data', (data) => {
                        const timestamp = new Date().toLocaleString();
                        const error = data.toString();
                        logStream.write(`${timestamp} - ${error}`); // Append the data with timestamp to the log file
                    });

                    // Listen for the exit event to capture the exit code
                    compileProcess.on('exit', (exitCode) => {
                        if (exitCode === 0) {
                            // Compilation successful, run the program without leading dot-slash
                            terminal.sendText(`"${outputFilePath}"`);
                            // setTimeout(() => {
                            //     const debugLogStream = fs.createWriteStream(debugLogFilePath, { flags: 'a' });
                            //     debugLogStream.write(`\n\nGDB Debug Log - ${new Date().toLocaleString()}\n\n`);

                            //     const gdbCommand = `lldb "${outputFilePath}"`;
                            //     const logOnCommand = 'log enable on all';
                            //     const runCommand = 'run';
                            //     const logOffCommand = 'log enable off';
                            //     const scriptCommand = 'script -a debug_log.txt';
                            //     const quitCommand = 'quit';
                            //     setTimeout(() => {
                            //         terminal.sendText(gdbCommand);
                            //     }, 1000);
                            //     setTimeout(() => {
                            //         terminal.sendText(logOnCommand);
                            //     }, 1250);
                            //     setTimeout(() => {
                            //         terminal.sendText(runCommand);
                                 
                            //     }, 1500);
                            //     setTimeout(() => {
                            //         terminal.sendText(logOffCommand);
                                 
                            //     }, 2000);
                            //     setTimeout(() => {
                            //         terminal.sendText(scriptCommand);
                                    
                            //     }, 2500);
                            //     setTimeout(() => {
                            //         terminal.sendText(quitCommand);
                                    
                            //     }, 3000);
                                
                               
                                
                               
                                

                            //     // Create a debug log stream for GDB session
                                
                            // }, 1000); // 1000 milliseconds = 1 second
                        } else {
                            // Compilation error, write the error to the log file
                            vscode.window.showErrorMessage('Compilation failed. See compile_errors.txt for details.');
                        }
                        setTimeout(() => {
                            terminal.sendText('git add .');
                            const commitMessage = `committed ${new Date().toLocaleString()}`;
                            terminal.sendText(`git commit -m "${commitMessage}"`);
                            terminal.sendText('git push');
                            
                        }, 3000);
                        // Add Git commands regardless of compilation success
                        
                    });
                }, 1000); // 1000 milliseconds = 1 second
            } else {
                vscode.window.showErrorMessage('The active document is not a C program.');
            }
        }
    });

    context.subscriptions.push(disposable);
}