---
title: 'Blog Setup: Part 3 - DevOps Time! '
excerpt: 'On containerization, deployment, and otherwise preparing the example blog application for deployment into the cloud'
coverImage: '/assets/blog/blog-part-3/cover.jpg'
date: '2022-07-27'
ogImage:
  url: '/assets/blog/blog-part-3/cover.jpg'
---

In this post I'm going to walk through the steps I took to containerize the Next.js blog application I built and deployed on a Raspberry Pi in [`Blog Part 1`](/posts/blog-part-1) and [`Blog Part 2`](/posts/blog-part-2).

I decided to take this step for a couple of reasons. The first is that while the Raspberry Pi makes for a great (and cheap) method for a small hobby deployment, it's probably not the best solution for a production level website. Nothing worse than having the portfolio website you're trying to use to court potential employers crash on you. The second is that I wanted to practice and document some DevOps components for my portfolio and it seemed like this was the perfect opportunity to accomplish both of those objectives. 

Read on to see my approach! 

## General Approach
If you followed along in my previous posts, you know that I currently have a micro VM in GCP that is running an NGINX server with an SSH tunnel to my local Raspberry Pi. My approach to this next phase was to keep the VM and simply containerize my application and deploy it locally on that same VM. This should work because of the following lines of code in my `/etc/nginx/sites-enabled` config file:

```python
location / {
    proxy_pass http://0.0.0.0:3001;
}
```

Basically what this means is that as long as my application is published via localhost port 3001, then NGINX should be able to reach it. 

## Next.js in Docker
To start I added a Dockerfile to the root directory of my next.js blog project with the following contents:

```text
FROM node:18.7

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN npm install --global pm2

COPY ./package*.json ./

RUN npm config set unsafe-perm true

RUN npm install --production 

COPY ./ ./

RUN npm run build --verbose

EXPOSE 3000

USER node

CMD [ "pm2-runtime", "npm", "--", "start" ]

```

Going line-by-line, here's what's happening with this file. First, we define the image - I chose node:18.7 (the version of node I'm running locally). An important note on this -- the node image is thicc. By the time it finishes building it's well over 1GB. Most of the time online you'll see folks opt for a much smaller, lighter image class like `alpine`. I initially tried using the alpine equivalent but I ran into massive issues with the npm dependencies (in particular `sharp`) because the binaries were not available in the alpine distro. Instead of going through a potentially complicated binary download process, I just went with the full-sized image. It's defintely worth revisiting down the line in order to shrink the image down considerably. 

Next you have the `RUN mkdir` and `WORKDIR` directory - this is just setting up the location on the container that we'll be working from. 

Following that, because we want the app to autolaunch on any potential crashes we're also going to install `pm2` globally with an npm install. 

Okay, now we get to the broader installation with the following lines:

```text
RUN npm config set unsafe-perm true
RUN npm install --production 
```

I added the `unsafe-perm` line because the `sharp` module was continuing to give me fits and this line fixed it. Following that it runs the installation. 

It's worth noting at this step I was originally getting a bunch of errors about `module not found: tailwindcss` - which was odd to me because it was installed and working just fine locally. After some googling around, it seemed like the most effective fix was to delete the package.lock.json and do a reinstall. I ran the follwing commands and it got me unstuck:

``` sudo rm package.lock.json```
``` npm install tailwindcss@latest postcss@latest autoprefixer@latest```

The `COPY` command simply moves the file over and then the `npm build run --verbose` generates our production build. I'll dive into why I added the `--verbose` option a little further down. 

Finally we make the user `node` (to avoid giving undue priviliege), we expose port 3000 on the container, and then run the app using PM2.

If you're saying, "Now wait a minute, I thought you used port 3001 above?". Stay tuned and I'll explain further down. 

Finally a general housekeeping note - it's always good to add a .dockerignore to avoid adding a bunch of gunk. I found a standard Next.js one online - you can see it here:

```text
.git/
.gitignore
**/.gitkeep
**/.DS_Store
.next/
.dockerignore
Dockerfile
docker-compose.yml
node_modules/
**/node_modules
nginx/
README.md
```

## Building your container! 
Whew - alright I know that was a lot but I promise it will make our lives easier in the long run. 

If you're following along with this tutorial, at this point I'm going to assume that you've got Docker up and running locally (if you don't there are plenty of articles online about how to get it set up). In order to kickoff a build of your image you'll want to run the following command:

``` docker build -t <name of image:tag> . ```

That should execute your Dockerfile commands and generate a Docker image with a production build of the Next.js app inside. It's entirely possible you'll have some errors during this process - just follow the log trace and consult with the docs and online forums around these issues. That's part of the reason I added the `--verbose` flag to the build command...my build was taking an eternity and I was trying to figure out why. 

## Getting your container in the right place and other trials
During this phase I'm going to walk you through what happened to me at this point in the project. It's more a cautionary tale than instructional, so if you want to get things up and running just skip to the next step. 

At this point I wanted to move my Docker image to my VM in GCP. There are a couple of ways you could do this (including a push/pull to and from DockerHub). Since I already had an SSH tunnel set up I figured I could just leverage that so I did a simple SCP of the image from my Pi up to the cloud VM. 

This is where things started to get a little hairy. First, to keep costs low I mentioned that I used a t1-micro instance. That comes with a default disk size of 10GB, and when you're dealing in Docker images that start to approach 1.5GB you run out of space VERY quickly. I encountered that problem almost immediately after I copied the image over. To get around this issue I paused my VM and bumped up the disk size from 10GB to 25GB. 

Then came the kicker. After doing a `docker load < image`, I tried executing it with a `docker run` command, only to be greeted with the following error:

```WARNING: The requested image's platform (linux/arm/v7) does not match the detected host platform (linux/amd64)``` 

Ugh. I was frustrated with myself for not thinking ahead of time about the implications of building it on a RPi and running it elsewhere. In all fairness, it IS a container right?? Shouldn't it be architecture agnostic?? I guess I'm asking too much. In searching for a solution I found several answers that said you can pass a specified platform via the `--platform linux/amd64` command. I did that and reran it, and while it actually executed the container it immediately errored out in a way that indicated a serious issue. *Sigghhhhhh* 

Plan B it is then. I decided the next simplest action would simply be to exec into my VM, download the code from Github, and then build it locally on the host platform, thereby solving my architecture problem. I did just that and things were going along nicely until I reached the `npm run build` command of the Docker build. That's when things ground to a halt. I probably spent 1.5 hours watching to see if it would complete and it never did. After growing tired of waiting around, I did two things. The first was to add the `--verbose` flag to make sure it wasn't hanging up on a process and silently failing. The second was to up the resources on my VM. I figured I would go incrementally, so I changed it from a micro instance to a small instance. I reran the build and it completed in less than 30 seconds. What a relief. Definitely worth the .06 extra cents to not wait around for another 2 hours. 

So after a lot of (mostly self-inflicted) heartache I finally had a working Docker image in the right location. 

## Deploying your app 
Assuming you have your Docker image on your server now, the final step is pretty simple, just a basic `docker run` command. Here's what I used:

```docker run -d -p 3001:3000 localhost:5000/<image:tag>```

To briefly explain the two flags, the `-d` backgrounds the process and `-p` (shorthand for `--publish`) exposes the port. The syntax is hostport:containerport. If you remember from our Dockerfile we are running the app on 3000 and in our NGINX we configured it to listen on 3001 locally - hence why our command is `3001:3000` (you'll see a lot of examples use the same port for both but I like to make them different to make it explicitly clear which is which).

So there you have it -- if you navigate to the host name you should see your website up and running. 


## Wrapping up
As always there are plenty of lessons learned (e.g. pay attention to platform architecture and don't skimp on VM resources haha). There are also plenty of additional improvements that you could add to make this even more DevOps-y. A couple that come to mind would be setting up a git pipeline that does the docker build on a MR to master to automate the image build, and a script locally to switch to the new image. And of course there's always the additon of K8s...but I'll save that for another time. 


