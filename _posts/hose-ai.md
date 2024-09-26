---
title: 'AI Garden Hose'
excerpt: 'Apparently you can slap AI onto anything and make it more awesome'
coverImage: '/assets/blog/hose-ai/cover.png'
date: '2024-09-26'
ogImage:
  url: '/assets/blog/hose-ai/cover.png'
---

In some part, this project was inspired by my previous effort to build a Terraform Provider for my sprinkler system. As that work was winding down, with a merry twinkle in my eye, I envisioned settingm using that provider to power a booby trap that would activate my sprinkler system whenever an unwelcome guest got too close to the house. 

But what if we could go even further? What if we could push the envelope even more and devise a means of selectively choosing our targets and delivering a concentrated blast of water to this hypothetical interloper? 

Maybe, just maybe, I could accomplish this via **dramatic pause** AI??

# The Plan
That was it. Once the mere thought of incorporating AI flickered across my brain, I'd crossed the proverbial Rubicon. My initial vision went something like this: I'd use one of the Raspberry Pi's I have lying around to give me the ability to remotely control a motorized valve attached to the end of my garden hose. Then, I'd connect a camera to the Pi to do live image capture. Finally, and this was the crucial bit, I'd train an ML model to do object detection on that live feed, giving me the ability to automatically differeniate between friend and foe prior to activating my ad hoc water cannon. 

# The Hardware
I'll admit, I just kind of assumed that someone somewhere had already invented a garden hose valve that could be actuated via a Raspberry Pis GPIO pins. It did take a bit of digging (and U.S. Solid seems to have a near monopoly on this), but in the end I wasn't disappointed as I found a motorized ball valve that would connect to the end of my hose:

![valve actuator](/assets/blog/hose-ai/valve.jpg)

They had a few different varities but I ended up going with the 3 wire option so that I'd be able to turn it on and off without having to supply constant power. I'll be completely honest: