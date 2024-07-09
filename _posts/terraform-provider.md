---
title: 'Sprinkler System Terraform Provider'
excerpt: 'Because what's the point of Terraform if you can't use it to terraform'
coverImage: '/assets/blog/terraform-provider/cover.jpg'
date: '2024-07-09'
ogImage:
  url: '/assets/blog/terraform-provider/cover.jpg'
---

This past spring, I had an Orbit Bhyve Outdoor Irrigation system timer added to my house. I've never owned an irrigation system before and now that it's operational I've been having wayyyyy too much fun playing around with the different settings. The timer comes with a relatively straightforward IPhone app and web interface that lets you do things like set schedules and run ad hoc sprinkler sessions. 

Most folks would probably just set a schedule and let it do it's thing, but as I was tinkering with my lawn a few weeks ago, it got me thinking: could I use Terraform to control my sprinkler system? After all - why do things the easy way when you can spend hours building redundant automation? All jokes aside, I'm always looking for ways to expand my breadth and depth of understanding of the tech I use on a daily basis and I'm also a firm believer that you learn best when you're having fun. This project seemed like a great opportunity to do both. 

## Initial Exploration and Fundamentals

Before I set about starting, I wanted to make sure that some fundamental components were in place for this to be a feasible project:

1. That a Terraform Provider didn't already exist. While this wasn't a hard requirement, it definitely takes the wind out of your sails a bit to know you're reinventing the wheel. Turns out that there was not one, which wasn't terribly surprising given that it's a somewhat obscure piece of yard tech. 
2. API Access and documentation. As I was doing my research, I quickly came to the conclusion that the Orbit API is *not* officially documented. However, there are a couple of very clever people out there who have set about reverse engineering some of the imporant API calls and have used it to build their own clients. I found [this JS implementation by Brian Armstrong](https://github.com/blacksmithlabs/orbit-bhyve-remote) to be immensely helpful. 

So far so good! Before we go any further, it's important to lay a bit of the ideological groundwork for what a Terraform provider is and how you interact with it. Terraform, at its core, is essentially a finite state machine: you track state and change that state based on a series of inputs and outputs. In order to perform that state change, you need a way to interact with the end resources themselves (in our case, a sprinkler system). This is where your API client comes into play. The first step in writing a Terraform provider is writing an API client that integrates well with the CRUD operations and reconciliations that the Terraform provider will eventually mediate. A well written client makes the Terraform provider implementation far more seamless. That's a sentiment that's widely shared across the community as far as I can tell and could be distilled down to the following: shove all your API weirdness into the internals of the client. 

## Writing an API Client

Terraform providers (and their associated clients) are written almost exclusively in Golang. So the first 

## Writing the Provider 

## Closing Thoughts

I'll fully acknowledge that most aspects of this project were rather contrived. First, the app already had a very functional client for accomplishing the desired operations. Next, the very premise of running your sprinkler system from your CLI is probably something that only appeals to a subset of software professionals so the number of people who would conceiveably ever use this is extremely low. Probably only me. Finally, the resource itself that I implemented doesn't make a ton of sense in Terraform for the simple reason that it was stateless. When you run a sprinkler zone, it runs for a few minutes and never again unless you manually run it...so tracking the state is largely pointless. It would have been a bit more prudent to implement some of the schedule features in the provider, but I didn't because it's far more rewarding to see your sprinklers instantaneously pop up out of the ground at the click of the keyboard than it is to have a schedule run 12 hours later. 

All that being said, I had a blast with this project. I use Terraform on a regular basis as part of my professional capacity, so getting to 

