---
title: 'AI Garden Hose'
excerpt: 'Apparently you can slap AI onto anything and make it more awesome'
coverImage: '/assets/blog/hose-ai/cover.png'
date: '2024-09-26'
ogImage:
  url: '/assets/blog/hose-ai/cover.png'
---

In some part, this project was inspired by my previous effort to build a Terraform Provider for my sprinkler system. As that work was winding down, with a merry twinkle in my eye, I envisioned using that provider to power a booby trap that would activate my sprinkler system whenever an unwelcome guest got too close to the house. 

But what if we could go even further? What if we could devise a means of both selectively choosing our targets and delivering a concentrated blast of water to this hypothetical interloper? 

Maybe, just maybe, I could accomplish this via **dramatic pause** ......AI??

# The Plan
That was it. Once those charmed words had flickered across my brain, I'd crossed the proverbial Rubicon. My initial vision went something like this: I'd use one of the Raspberry Pi's I have lying around to give me the ability to remotely control a motorized valve attached to the end of my garden hose. Then, I'd connect a camera to the Pi to do live image capture. Finally, and this was the crucial bit, I'd train an ML model to do object detection on that live feed, giving me the ability to automatically differeniate between friend and foe in real time, blasting the latter with a spray from the hose while letting the former proceed unencumbered. 

# The Hardware
I'll admit, I just kind of assumed that someone somewhere had already invented a garden hose valve that could be actuated via GPIO pins. It did take a bit of digging (and U.S. Solid seems to have a near monopoly on this), but in the end I wasn't disappointed as I found a motorized ball valve that would connect to the end of my hose:

![valve actuator](/assets/blog/hose-ai/valve.jpg)

They had a few different varities but I ended up going with the 3 wire option so that I'd be able to turn it on and off without having to supply constant power. I was also intrigued by the fact that it could be powered by 9-24V AC/DC power. I have a bit of an embarrassing thing to admit: AC power scares me. As someone who once planned to major in electrical engineering this admission is all the more humiliating. I could just never quite get the hang of Kerchoff's law, and as such, I have since lived in perpetual fear of touching a live wire. For that reason, I always try to use the absolutely minimum amount of required power. In this case, a 9V battery didn't seem too intimidating and would theoretically fit the bill. 

# The Software

# The Model

# The Result

# My Takeaways
The barrier of entry to doing a project like this has come down **significantly** in the recent past. I've had a kernel of this idea for quite some time, but the amount of time and effort always seemed insurmountable. With the rise of ML-as-a-service platforms, AI code assistants, and ChatGPT , that which would have taken highly specialized knowledge and a great degree of time even 5 years ago can now be prototyped fairly rapidly with a modest degree of know-how. 

However, that "disruption" in ease of access hasn't been symmetric. The hardware/EE resources available seem to really lag where software is at. This definitely feels like a sector that is ripe for "education disruption", particularly if/when robotics has it's "GenAI"-type moment. 

Be careful what images you share of yourself online because your enemies (or friends) make use them to train ML models to spray you with their garden hoses. 


