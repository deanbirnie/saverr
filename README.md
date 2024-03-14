# Saverr
## Your budeting sidekick! 💸💰

###  About Saverr

Saverr is a budgeting tool I have devloped to solve the problems I have personally experienced with budgeting apps on the market today. The application also happens to be the final portfolio project for my software engineering course with ALX Africa.

### Current State:
#### 👷 Active Development


## 🌐 Public Availability & Hosting:
#### Can I see Saverr in action?

Yes, you absolutely can! You need to realise that the project is NOT in a working state, you should align your expectations accordingly. I have configured the public site to be severely limited to avoid crashing, decrease the attack surface, and otherwise be safe for everyone who tries it. Functionality will be limited and you are not guaranteed to even be able to create an account or login at all. DO NOT USE ANY SENSITIVE INFORMATION YOU DO NOT WANT IN THE PUBLIC DOMAIN WHEN SINGING UP OR SIGNING IN, I TAKE NO RESPONSIBILITY FOR THE PROTECTION OF YOUR INFORMATION AS THE PROJECT IS UNDER ACTIVE DEVELOPMENT. YOU HAVE BEEN WARNED. ACCOUNTS CAN AND WILL BE DELETED DAILY. [Saverr](https://saverr.birnie.co.za)

#### Where is Saverr hosted?

Saverr, while in the early stages of development, is currently hosted at home. I like to use Ubuntu Server (22.04 in this instance) as virtual machines. Nginx is the webserver which listens locally on various ports for requests. These requests come from the Cloudflare tunnel service which sits behind a network acting as a proxy. It relays the communications between a server and the Cloudflare services. This means that no ports need to be exposed, my network remains private and secure. Another perk is that my IP address as well as other information is completely proxied through the Cloudflare network. DDoS protection is also baked right in. 

### Installation:
#### Want to run your own instance of Saverr?

Eventually, Saverr will be properly released with a Docker image that is easy to configure and install. Until then, you'll need to go the long way round. For this installation guide I will walk through the steps I've implemented for the public instance, if you don't want to use something I have, you're going to be on your own in terms of figuring out how to do it and how to solve any issues that may arise.

##### Step 1:

You'll need an Ubuntu server, virtual machine or bare metal, I've used 22.04 LTS.

Install the necessary packages:
`npm install docker.io git curl nginx net-tools`

##### Step 2:

Install Node Version Manager which we'll use to install newer versions of NodeJs.

`curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash`

Install version 21 and set it as the default.

`nvm install 21`

`nvm use 21`

`nvm alias default 21.7.1`

The command `node -v` should now produce `21.7.1`.

##### Step 3:

You'll need to configure some environment variables in order for the app to work.

You'll need to use the Crypto package in NodeJS or a random string generator to come up with very long random strings that shouldn't be shared anywhere.

`export PORT=3175`
`export JWT_ACCESS_TOKEN_SECRET=YourRandomString`
`export JWT_REFRESH_TOKEN_SECRET=YourOherRandomString`
`export DATABASE_URL="file:./dev.db"`

##### Step 4:

Configure Nginx to serve the appropriate files:

Use your text editor of choice to edit this file:

`/etc/nginx/sites-available/saverr`

The contents should be something along these lines (note that this is not my exact config and needs to be configured according to your specific server):

```
server {
    listen 80;
    server_name localhost;

    location /api/ {
        proxy_pass http://localhost:3175;
    }

    location / {
        proxy_pass http://localhost:5174;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico)$ {
        root /var/www/saverr/front-end;
        expires 1y;
        access_log off;
        add_header Cache-Control "public";
    }
}

```

Link this file so it is enabled for Nginx to use:
`ln -s /etc/nginx/sites-available/saverr /etc/nginx/sites-enabled/saverr`

Reload Nginx:
`systemctl reload nginx`

##### Step 5:

Now we need to clone the repository.

Navigate to this directory, creating it if necessary:

`cd /var/www`

`git clone https://github.com/deanbirnie/saverr.git`

`cd /saverr`

Now we need to build and start saverr.

`npm install`

`npm run build`

`npm run start`

##### Step 6:

Create the default user, you can replace any info as per your needs:

```
curl -X POST \
  http://localhost:3175/api/auth/create-user \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Admin",
    "email": "admin@test.com",
    "password": "password"
}'
```

At this point, you'll be able to login, update your information and start using the application. Look forward to the features and updates to come. Feel free to submit issues on GitHub for feature requests etc. I'm happy to read through and implement what I can despiite limited time to sppend on the project.


## 🗺️ Roadmap:
### Complete feature set:

Be able to create, update, and delete budgets, categories, and budget items.

### Planned: Duplicate Budgets:

Be able to duplicate a previous budget so you only need to make a handful of updates for next months budget.

### Planned: Multiple users with roles:

Allow a partner or other people access to your budget with permissions to see particular information or perform certain actions.


Wow, you've made it to the end! Thank you for taking the time to read through my project. I hope it is of benefit to you. Please reach out on [LinkedIn](https://www.linkedin.com/in/dean-birnie/) if you'd like to connect or chat.