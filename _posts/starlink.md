---
title: 'Satellite Tracker'
excerpt: 'Building a predictive satellite constellation tracker using Django and PyEphem'
coverImage: '/assets/blog/starlink/cover.png'
date: '2022-07-29'
ogImage:
  url: '/assets/blog/starlink/cover.png'
---

This was one of my favorite projects from last year and I'm just now getting around to writing about it. If you'd like to skip straight to the salient code, you can find it on my [github](https://github.com/gillcaleb/satellitetracker.git). 

## Overview
I'm a big fan of all things space related - whether it's astronomy, rocket tech, or figuring out how we're going to get to Mars within my lifetime - it never fails to pique my interest. That's why I've followed the Starlink project so closely these last several years. It's an ambitious and revolutionary idea - one that numerous others have only had limited success with (if you've ever tried using satellite internet in the last 10 years, you know what I'm talking about). However, by owning every aspect of the deployment (e.g. building your own rockets to launch your satellites with), it seems as though Elon Musk might finally have cracked the case on this one. I've also been following Project Kuiper (essentially Amazon's answer to Starlink). Interestingly enough, they're both owned by billionaires who have their own rocket companies - I'm just waiting for Richard Branson to announce his own satellite internet company. Regardless, I'll be curious to see how the two stack up once they're both orbiting over our head. For now though it seems Starlink is leaps and bounds ahead of the competition. 

Okay, okay, enough backstory already. The idea for this project was to use the publically available TLE (Two Line Element) data on a handy website called [`Celestrak`](https://celestrak.org/NORAD/elements/gp.php?GROUP=starlink&FORMAT=tle) to generate the real-time positions of every satellite in the Starlink constellation. For those of us who aren't orbital mechanics wizards, the python PyEphem module makes this kind of predictive analysis relatively trivial to do. 

Because I'm a very visual person, I wanted to be able to display this data somewhere useful, so I used the KML (keyhole markup language) library in Python to generate a file that would be able to render in Google Earth. 

Using a relatively basic Django setup (forgive my lack of a ~fancy frontend), I was then able to serve this file every few seconds to achieve a real-time update of the consetellation in Google Earth. Check it out:

![starlink_constellation](/assets/blog/starlink/constellation.jpg)

Pretty cool, right? It's amazing what kind of insights you can achieve from just a simple data file and a little predictive analysis. For example, let's check out the poles:

![poles](/assets/blog/starlink/poles2.jpg)

Some of the immediately neat things we can tell are that Starlink does not currently operate at the poles (makes sense but you rarely see them advertise that fact). That being said, we can tell from this image that it looks like they're starting to test out their polar capability (good news if you work at the South Pole or find yourself on a cargo vessel or airplane headed over a polar route). Notice there is also a clustering of new satellites - let's take a closer look: 

![starlinkcluster](/assets/blog/starlink/starlinkcluster.jpg)

Looks like we've found a relatively recent lauch as evidenced by the tight clustering of this fleet. Over the next few months, I'd expect we'll see them space themselves out as they navigate towards their permanent orbits. Pretty freaking cool if you ask me. 



## Bonus Session - Kubernetify 
To give a little backstory, I decided to extend this project a little bit further to practice my kubernetes skills. If you're interested, you can checkout the code, but the basic components were the Django deployment itself (I created a very basic Dockerfile for it), along with Celery, Flower, Redis, and Postgres deployments. The Celery and Redis deployments powered some of my backend tasks (namely, updating the constellation positions and occasionally doing a DB pull to refresh the TLE data). Of course, the Postgres deployment was my database. 

It took a little bit of time but by the end I was relatively pleased with the results - here's a screen grab of all the pods associated with the project. You can find my implementation underneath the /kuberentes folder in the k8s-deploy branch. 

![kubectl](/assets/blog/starlink/kubectl.jpg)

## Wrapping Up
So there you have it. There are tons of ways you can continue to adapt this project (for example, it's desinged to be very easy to change which constellation you want to look it...GPS or satellite TV, for instance). If nothing else, I find this to be a very helpful educational tool when it comes to understanding orbits, like the difference between LEO vs. geosynchronos etc. I hope you enjoyed it! 
