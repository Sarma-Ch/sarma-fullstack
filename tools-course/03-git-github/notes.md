# Notes : Git & GitHub Setup 

- Installed Git 
- Configured username and email
- Generated SSH key
- Added SSH key to GitHub
- Cloned the repo using SSH
- Learned basic Git commands: add, commit, push, pull

# Binary file awareness 

I do not commit large media files , data dumps , zip/tar files, compiled binaries, they are large and unecessarily increase the size of repo
These files make the Git hard to track the file and also slow down the pushing etc
Data dumps are large exported files that contain raw data so it unnecessarily increase the repo size
Binary files are not readable so they cannot be diffed . So, basically git struggles with them.
So, we do not store them inside the Git, it ensures repos perfromance and a cleaner project history.

