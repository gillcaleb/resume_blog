---
title: 'Blog Setup: Part 1'
excerpt: 'An overview of the networking and environment setup for hosting a Next.js blog app on a Raspberry Pi'
coverImage: '/assets/blog/blog-part-1/cover.jpg'
date: '2021-06-13'
ogImage:
  url: '/assets/blog/blog-part-1/cover.jpg'
---

Welcome! In this series I plan to catalogue my adventures in setting up a personal blog/portfolio website using one of the many Raspberry Pis I have lying about the house.

I'm going to split the documentation for how I built this site into a couple of different posts. The first will deal more with the networking setup and the second with the actual front-end type work. I've included my sources at the bottom for the various projects I pulled code from or used as examples.

## Reverse Proxy
Given that I wasn't too keen on publishing my home IP address, I did some research on potential alternatives, eventually landing on an ssh tunnel to a reverse proxy on Google Cloud.[1] This tutorial was relatively straightforward and by the end of it, I had an HTML page that I could access by typing in the public-facing IP address on Google Cloud. 

## DNS
It's been a couple of years now, but a while back I purchased `calebgill.com` for the fun of it (hey, it was only $15). I hadn't been using it, so I felt like this was an appropriate time to dust it off. I originally bought it on `Domain.com`, but since I like to have everything in one place, I went through the transfer process to get it moved to Google Domains.[^2] Honestly I was expecting it to be an onerous process but it was relatively straightforward and the transfer completed after just a couple of days. 

## Let's Encrypt and Certbot
So at this point, we have a Raspberry Pi hosting our website that is tunnelling to our reverse proxy on Google Cloud which is published under our custom DNS name (in my case, `calebgill.com`)

If we were to navigate to this URL in the browser though, we would get the dreaded "not-https" warning from our browser as there is not currently any cert associated with our site. Let's Encrypt to the rescue! 

If you're looking for a low-cost solution (there are plenty of paid options out there) Let's Encrypt is your best friend as it is completely free. I followed these instructions to install a cert and got it added to my NGINX reverse proxy.[^3]

One extremely important detail is the addition of the `certbot` utility. If you're like me, the idea of manually updating certs every 90 days means that my cert will only ever work for 90 days ;). Thankfully, if you set up a certbot cron job, you never have to worry about expirations again. I love automation. 

## Background the SSH Tunnel
Awesome -- so now you've got a pi-hosted site (without exposing your home IP) that is resolved by a custom DNS name and is TLS enabled.

If you used the reverse proxy tutorial I listed above, it means you'll have to run the  `establish_remote_connection.sh` in order to serve up your website. This creates a bit of a nuisance - namely the fact that it runs as a foreground process and the spawned SSH tunnel will occasionally crash, leaving the site with a 502 error (not the best of looks for a site designed to impress potential employers). 

I did some research on how to set up a persistent ssh tunnel in the background and the general consensus seemed to be that the `autossh` utility was the way to go. The commands  were relatively trivial: 

```sudo apt-get install autossh```

```autossh -f -N -T -R 5000:0.0.0.0:3000 piconnect@$REMOTEADDRESS -o "ServerAliveInterval 30" ```

You'll notice here that I replacted port `80` with port `3000` as that is the one I intend to host the application on. 

A potential future improvement is setting up this commend as a systemd service that launches at device boot (that way, if my pi ever crashed or powered down, I wouldn't have to manually kick off the process again).

Check out [`Blog Part 2`](/posts/blog-part-2) if you're interested in getting an actual application up and running


[1]: https://www.tomshardware.com/how-to/host-public-website-raspberry-pi
[^2]: https://support.google.com/domains/answer/3251236?hl=en&visit_id=637908117935174920-872846835&ref_topic=9003137&rd=1
[^3]: https://www.nginx.com/blog/using-free-ssltls-certificates-from-lets-encrypt-with-nginx/
