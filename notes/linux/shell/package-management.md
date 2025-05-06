# Packaging systems

Most distributions fall into 2 camps of packaging systems

1. Debian style (.deb) - Debian, Ubuntu, Linux mint etc
2. Red hat style (.rpm) - Fedora, CentOS, OpenSuSe

# Finding a package in a repo

Debian
`sudo apt-get update`
`apt-cache search <search-string>`

Red Hat
`yum search search_string`

# Installing a package from a repo

```
apt-get update
apt-get install <package-name>
```

Red-hat
`yum install <package-name>`

# Installing a package file

`dpkg i <package-file>`
`rpm -i package_file`

# Removing a package

`apt-get remove <package-name>`
`yum erase <package-name>`

# Updating packages from a repository

Intall updates to all packages

```
apt-get update
apt-get upgrade
```

# Listing installed packages

`dpkg -l `
`rpm -qa`

# Check whether a package is installed

`dpkg -s <package-name>`
`rpm -q package-name`

# Finding which package installed a file

`dpkg -S file_name`
`rpm -qf file_name`
