---
title: 'K3s Cluster on Raspberry Pi Network'
excerpt: 'Instructions for setting up a K3s network on your home network'
coverImage: '/assets/blog/k3s/cover.png'
date: '2022-07-26'
ogImage:
  url: '/assets/blog/k3s/cover.png'
---

Got some spare Raspberry Pis lying around? Want to practice with Kuberentes in a microprocessor environment but don't know how? Trying to containerize your smarthome apps but don't want all the overhead? Congrats - you've come to the right place! 

## Background
K3s is a fully funcitonal release of Kubernetes designed to be light-weight and useful in resource constrained environments (think IoT and certain Edge computing cases). I personally enjoy using it for smarthome related IoT projects (also because it's a fun way to practice K8s that gives you more network exposure than say KinD clusters do).

## What you need
Not much. Just a few spare Raspberry Pi's and an internet connection. 

## Getting the server setup
The idea behind the cluster is that you have one K3s server node and then an arbitrary number of K3s agents. Most folks would suggest at least 3 for redundancy's sake but because I'm lazy (and don't want to commit ALL my Pis to this project) I'm just going to use 2 - a server and an agent. 

The install script is easy. Assuming you have a headless setup on your Pis, just SSH into the instance you'd like to be your K3s server and run this command:

`curl -sfL https://get.k3s.io | sh -`

Very important note: (and one that I screwed up the first time though) - if you do not have unique hostnames on your various Pis (again I'm lazy so I hadn't changed them) then you MUST pass a `K3S_NODE_NAME` environment variable with a unique name when you run this script. That would make the command something like this:

`curl -sfL https://get.k3s.io | K3S_NODE_NAME=<name of server instance> sh -`

Good deal. Run that. 

Did you get some weird error about the cgroup in the /boot/cmdline.txt? Not to worry, just do exactly what the error tells you to do with that file. Be advised that you SHOULD NOT insert a line break. Don't do it. Don't even think about it. 

Run it again and you should be all set. To verify that your server is running, execute the following command:

`sudo k3s kubectl get node`

and you should see your node has started up. 

A couple of things to note before we move on to setting up the agent. 

The first is that the `kubeconfig` file is located at `/etc/rancher/k3s/k3s.yaml`. It's important to note because it's different than the standard `$HOME/.kube/config` file so you may run into trouble if you're using kubectl that has not been installed by K3s. You can always pass it explicitly with the `--kubeconfig` flag. 

Next we will need to use the server access token in order to register the agents. Find it using the following command: 

`sudo cat /var/lib/rancher/k3s/server/node-token`

Copy the output and keep it handy because we'll need it very soon. You should also make note of your server's IP address (run ifconfig if you don't know it already).

## Setting up the agent 
The process for setting up the agent nodes is more or less the same as the server, just with a few additions. 

Once again we'll run the curl command to install it, with a few additional flags added:

```curl -sfL https://get.k3s.io | K3S_URL=https://<serveripaddress>:6443 K3S_TOKEN=<tokenfrompreviousstep> K3S_NODE_NAME=<nameofnode> sh -```

You may hit the cgroup error again. That's fine. Just fix it like you fixed the first one. 

Once you fix the error and restart you should see your node join the cluster (it may take a few min).

![k3s nodes](/assets/blog/k3s/getnodes.png)

Wash. Rinse. Repeat until you have added all your desired Pis added to the cluster. 

## In review
So there you have it. Easy as Pi. 

There are tons of cool projects you can run now that you have a functioning cluster - the possibilites are limitless. At a minimum it gives you the ability to play around with K8s on an actual network (as opposed to Minikube or KinD). I'll post further if I continue to expand on this project - until then have a great Kubernetes day. 


