---
title: 'HashiCorp Vault and You'
excerpt: 'Thoughts and questions for an enterprise considering self-hosting HashiCorp Vault'
coverImage: '/assets/blog/vault-intro/cover.jpg'
date: '2023-07-03'
ogImage:
  url: '/assets/blog/vault-intro/cover.jpg'
---

I'll start by saying a few things right off the bat: first, I'm a big fan of most of the stuff HashiCorp puts out and Vault is no exception. That means you should read this post with a healthy dose of skepticism as there's some inherent bias on my part in favor of HashiCorp. That being said, I have no financial incentive to endorse HashiCorp, so hopefully that counteracts the prior statement just a bit. 

## So you're thinking about using Vault? 
This post is specifically geared towards DevOps engineers who are considering leveraging HashiCorp Vault as part of their enterprise's architecture. I'll only be able to scratch the surface of the content in a single post, so I'll try and focus on the few most important questions you need to answer before you choose Vault or some alternative. 

### Why Vault?
We'll start with some cases when using Vault *doesn't* make sense. 

The first is that if your enterprise uses infrastructure that is entirely contained within a single cloud vendor and doesn't do a tremendously large amount of secrets management type activities. If both of those things are likely to be true well into the future, then you're almost certain better off using your cloud provider's native secrets management offerings (e.g., AWS Secrets Manager or Parameter Store). 

As a corollary to the previous point, if your architecture is more monolithic in nature (and likely to remain so) you probably won't see as much benefit from Vault. Vault is designed to be a central piece of a modern, microservice architecture. Its bevy of supported auth methods, for example, makes a lot less sense if all you ever plan on using is AppRole. At a certain point, if all you really need is a place to store some K/V secrets, then you might look into other options. 

On the flip side, if you're company is looking to set up a multi-region, multi-cloud, service-mesh enabled architecture (as is all the rage these days), then Vault probably makes more sense. This is especially true if you see a wide variety of applications and resources needing to use Vault - where it really shines (in addition to its security model), is its ability to integrate with other common DevOps tools and products. 

### To self host or nay? 
There are a few primary questions to answer in this category. The first question has to do with resources. Upfront, I would budget 6 months of a senior SRE's time towards setting up Vault, followed by 30% of their time into perpetuity for maintenance. To put that in dollar amounts, if we assume an base annual salary of 180k, then year one will probably cost you approximately 117K in labor and another 5-8k in infrastructure hosting costs. Every subsequent year will be ~50k in maintenance and another ~10k in infrastructure costs. *Cue spit take*. If this seems high to you, then you probably should consider some form of managed option. This is probably a bit of an overestimation but cloud infrastructure projects *rarely* come in ahead of schedule and under budget, so I always attempt to aim a little high. 

As an aside here, from personal experience organizations usually do a pretty poor job of taking the opportunity cost of an engineer's time into account. I've noticed (at least in teams I've been a part of) that an engineer's time is treated like a sunk cost vs. unspent capital. If you're reading this and you're a manager: don't fall prey to this fallacy. Your team should always be working on the highest value feature that you can't buy for less dollar-hours then it would take to build and maintain. Alright, back to Vault. 

The next thing to consider is the question of complexity. The more established complexity in your internal architecture, the more difficult the initial setup of Vault will be. As with many projects, if you integrate Vault early in the lifecycle of your ecosystem, you'll have a much easier time in the long run and will arguably be better able to utilize its feature-rich offering. On the flip side, if you're bringing Vault into an organization with a large degree of established infrastructure that spans many regions, accounts, service meshes, on-prem resources, etc. then you're going to have a much harder time of it. It's not impossible, but the challenge you'll face is managing all the context and complexity of keeping the system design in your head as you establish the patterns of access and usage. 

Finally, the question of data sovereignty. Depending on your company's legal or procedural governance around where your data is stored and who has access to it, this might be what seals the deal. If done well, self hosting is the most effective way you can buy down 3rd party risk in this department. If keeping your data in house is important to you, then this is the way to go. 

## In summary
Ultimately, choosing to use HashiCorp Vault needs to be a long term commitment to fully realize its potential and to see a full return on your investment. All the more so if you've chosen to self host. If you don't have institutional buy-in, then you're going to have a tough time of it. 

I just recently finished up a major Vault project for my current employer, so all these concepts are on the forefront of my mind. I plan to write more about this topic in the future, particularly because there were a few unaddressed or poorly documented use-cases that I had to wrestle through, and it would bring me joy if I could spare others that heartache. Until then, enjoy your tinkering! 