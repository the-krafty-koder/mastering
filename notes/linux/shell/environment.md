The shell stores 2 types of environment variables

1. Shell variables - bits of data placed there by the bash
2. Environment variables = "" applications/user

# Examining the environment

Use `bash` or `printenv` to view what is stored in the environment.

- `set` command will display both shell and environment variables
- use `printenv <variable>` or `echo $<variable>` to view contents of a variable.

# How the env is established.

When we log on to the system, the bash program starts and reads a series
of configuration scripts called startup files, which define the default envi-
ronment shared by all users.

There are two kinds.

A login shell session This is one in which we are prompted for our
username and password. This happens when we start a virtual console
session, for example.

A non-login shell session This typically occurs when we launch a ter-
minal session in the GUI.

Startup Files for Login Shell Sessions
/etc/profile - A global configuration script that applies to all users.
~/ .bash_profile A user’s personal startup file. It can be used to extend or override settings in the global configuration script.
~/ .bash_login - If ~/.bash_profile is not found, bash attempts to read this script.
~/ .profile - If neither ~/.bash_profile nor ~/.bash_login is found, bash attempts to read this file. This is the default in Debian-based distributions,
such as Ubuntu.

Startup Files for Non-Login Shell Sessions
/etc/bash.bashrc A global configuration script that applies to all users.
~/ .bashrc A user’s personal startup file. It can be used to extend or override
settings in the global configuration script.

# Modifying the environment

To add directories to path or define additional environment variables, add those to '.bash-profile' / '.profile' . For everything else place the changes in './bashrc'
