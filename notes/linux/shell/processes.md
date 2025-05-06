# Viewing processes

The `ps` command is used to view a snapshot of processes.
`ps x` - used to list all processes including ones on other terminals
`top` - used to dynamically view processes. A continously updating view.

# Process states

R - Running. This means the process is running or ready to run.
S - Sleeping. The process is not running; rather, it is waiting for an event, such
as a keystroke or network packet.
D - Uninterruptible sleep. The process is waiting for I/O such as a disk drive.
T - Stopped. The process has been instructed to stop. You’ll learn more about
this later in the chapter.
Z - A defunct or “zombie” process. This is a child process that has terminated
but has not been cleaned up by its parent.
< - A high-priority process. It’s possible to grant more importance to a process,
giving it more time on the CPU. This property of a process is called niceness.
A - process with high priority is said to be less nice because it’s taking more
of the CPU’s time, which leaves less for everybody else.
N - A low-priority process. A process with low priority (a nice process) will get
processor time only after other processes with higher priority have been
serviced.

# Controlling processes

Use `<command> &` to place a process in the background
Use `fg %<jobid>` to return process to the foreground
Use `bg %<jobid>` to return resume a stopped process in the background
Use CTRL+Z to stop a process and place it to the background.
Use `jobs` to list the jobs that have been launched from the terminal.

# Signals

The `kill -<signal> <pid>` command is used to kill processes. The default signal is to terminate

Use `killall` to send signals to multiple processes

# Shutting down the system

Use the following
• halt
• poweroff
• reboot
• shutdown
