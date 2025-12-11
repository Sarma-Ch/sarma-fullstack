## 1. Create a free VM

Created an Ubuntu VM on azure .

Public IP: 20.55.35.29

## 2. SSH into the server

Added my public SSH key to the VM.

Logged in successfully using SSH.

## 3. Create a non-root user

Created user: sarma

Added to sudo group and logged in

## 4. SSH config

Created sh/config ~/.son my laptop:

Host myserver
    HostName 20.55.35.29
    User sarma
    IdentityFile ~/.ssh/id_rsa

Now, 
By using this 
ssh myserver. I logged into VM without the password

## 5. Installed the tools

git

node / python

htop

jq

curl

Checked the respective versions successfully.

## 6. Mirror local structure

Created:

~/work
~/notes
~/bin by using ~/ I get to know it will directly create folder in root directory


Added sample files:
In the work folder I added file sample.txt

IN the notes folder I added a.txt

In the bin I created hello.sh by doing it as executable 
(chmod +x hello.sh)

## 7. File transfer

Transferred files from laptop to VM using these 

scp file.txt myserver:~/work/
rsync -avz ~/work/myproject myserver:~/work/

## 8. DNS setup

Registered a free DNS hostname on FreeDNS (Afraid.org).

Mapped it to my VM IP: 20.55.35.29

Lastly by using ping I verified i.e ping sarma.chickenkiller.com

## 9. Port awareness

I used this cmd 
sudo ss -tulnp and checked the ports 

