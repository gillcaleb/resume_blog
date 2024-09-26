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

As nice as it would be, you unfortunately cannot just directly connect the GPIO pins to the valve input pins and call it a day. In order to power the motor in the valve, I knew I'd need another component beyond just a battery and a motor in order to implement the desired logic. What I needed was a way to control the current supply to the motor (the battery) via voltage (the GPIO pin output). Enter the MOSFET. If I speak too much about MOSFETs I'll quickly end up in over my depth but at a high level, they enable you to control the flow of electricity from the source and drain terminals by changing the amount of voltage applied at the gate terminal. Awesome. 

I bought a MOSFET off Amazon and with a bit of research came up with this diagram. 

[] picture of circuit. 

Cool. I set about wiring it all up but quickly realized that I'd forgotten to procure a connector for my 9V battery. Because I couldn't be bothered to spend $2 and way a few days. I figured I'd try to make my own. Turns out, however, that if you're willing to sacrifice a 9V battery, you can rip the top off of it and solder on a +/- lead to make your own. Neat stuff. 

[] picture of makeshift connector

I wired it all up, ran a simple GPIO pin output test and......nothing happend. Ugh. I reran the code a few times and I noticed that there was a very faint clicking sound coming from the motor. To test and see if my motor was working at all, I connected it directly to the battery and the motor turned just fine. After reading through various electronics forums a common theme is that the gate voltage needed for a MOSFET to functionally work is often higher than the advertised value. For my particular model of MOSFET it seemed as though the common consensus is that you'd need at least 4.5V...which was a bummer because the Pi GPIO pin maxes out at 3.3V. I found a few example circuits on these forums that would theoretically overcome this by means of stepping up the voltage by using the 9V battery as the gate voltage which could then be controlled by a transistor with a lower gate voltage threshold and so forth. I tried a few of these circuits to no avail. I can't remember where I found it but ultimately decided to take the advice of a user who urged against "arcane, Rube Goldberg kluges" in favor of just buying a MOSFET with a gate threshold voltage that would work with 3.3V of input. Once it arrived I swapped it in and BOOM, it turned the valve on the very first time I ran the code. 

# The Software

# The Model

# The Result

# My Takeaways
The barrier of entry to doing a project like this has come down **significantly** in the recent past. I've had a kernel of this idea for quite some time, but the amount of time and effort always seemed insurmountable. With the rise of ML-as-a-service platforms, AI code assistants, and ChatGPT , that which would have taken highly specialized knowledge and a great degree of time even 5 years ago can now be prototyped fairly rapidly with a modest degree of know-how. 

However, that "disruption" in ease of access hasn't been symmetric. The hardware/EE resources available seem to really lag where software is at. This definitely feels like a sector that is ripe for "education disruption", particularly if/when robotics has it's "GenAI"-type moment. 

Be careful what images you share of yourself online because your enemies (or friends) make use them to train ML models to spray you with their garden hoses. 


