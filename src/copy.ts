import { spawn } from 'node-pty';

const shell = 'zsh'; // Specify "zsh" as the shell

const pty = spawn(shell, [], {
  name: 'xterm-color',
  cols: 80,
  rows: 30,
  cwd: process.cwd(),
  env: process.env,
});

pty.onData((data: string) => {
  // Handle the output from the Zsh shell here
  process.stdout.write(data);
});

// Example: Send a command to the Zsh shell
function sendCommandToTerminal(command: string) {
  pty.write(command + '\r');
}

// Example: Send a command to the Zsh shell and handle the output
sendCommandToTerminal('ls -l');

// You can add more commands and interactions as needed

// Handle user input for interacting with the Zsh shell
process.stdin.on('data', (data : string) => {
  pty.write(data);
});

// Handle terminal exit
pty.onExit(() => {
  console.log('Terminal session ended.');
});

// Handle SIGINT (Ctrl+C) to gracefully exit
process.on('SIGINT', () => {
  pty.kill();
  process.exit();
});
