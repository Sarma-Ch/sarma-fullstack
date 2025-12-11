whoami shows current user, 
echo $HOME shows home directory.

"ps aux" lists running processes like bash, python, chrome.

Created hello.sh with echo "Hello, Bash" inside it.

Made it executable using chmod +x hello.sh and ran it. It made the file executable (i.e x ) to owner, group and others 

Used ls -l to check file permissions

Changed permissions with chmod and saw updated output in ls -l.

Started a tiny server using python3 -m http.server 8000.

Visited the server at http://localhost:8000.

I have found the server PID using ps and then stopped it with kill <pid>.

Tried starting two servers on port 3000 I got  “address already in use” error.