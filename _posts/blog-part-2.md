---
title: 'Blog Setup: Part 2'
excerpt: 'Next.js blog application deployment and configuration on a Raspberry Pi'
coverImage: '/assets/blog/blog-part-2/cover.jpg'
date: '2021-06-13'
ogImage:
  url: '/assets/blog/blog-part-2/cover.jpg'
---

One of the reasons I decided to create this blog in the first place was to try my hand at front end development, with a particular empahsis on some of the newer tools out there. I've been meaning to take the plunge with React for quite some time now and this seemed like a fun (and useful) project to do just that. Read on to learn more about it!

Note: if you're interested in hosting this on Raspberry Pi, check out [`Blog Part 1`](/posts/blog-part-1) if you haven't already.

## Basic Next.js Blog App
The backbone of this blog is the Next.js `blog-starter` example code. I know it's cheating a little bit  but knowing myself, I needed to get something out there that I could iterate and improve on and starting from scratch on a tech stack I'm not as familiar with seemed like a recipe for disaster. 

The example code was extremely easy to deploy thanks to the very thorough and easy-to-understand docs on the Next.js website. I just followed the directions on their site and from there I deployed the blog-start example.

## Header Fixes
With the basic building blocks in place, it was time to start the customization process. The first thing I wanted to do was set up a few routing links in the main page's header. I decided these would be `About`, `Resume`, and `Contact`. 

In order to accomplish this, I edited the existing `Intro` component, changing out the existing right hand bootstrap container to utilize the handy `Link` component. Next.js makes routing a breeze and I made things even simpler on myself by routing the `About` page to a my introductory blog post. I went ahead and did the same for `Resume` and `Contact` with the main difference that I set these up to route to their own URL stub (e.g. `/resume` and `/contact` respectively)

## Footer Updates
First thing I did to improve the footer was remove the boilerplate code that was previous there and to adjust the size of the footer (I like a narrow ribbon). The two things I wanted to accomplish in the footer were:

1. Setup a link to my social media accounts (and since all I have is LinkedIn that should be pretty easy). 

2. Enable a lightmode/darkmode button. 

In order to accomplish these items in one step, I followed the tutorial I found online by Manu Arora [^1] (I also adapted the Resume and Contact page from code that he provided as well).

Essentially for the footer though, both of the elements in question could be represented as icons, so I created a `ThemeChanger` component that included the LinkedIn icon as well. The component simply returns the two icons, with the address of my LinkedIn being pulled from the data section. 

So far so good - but how do we handle dark mode? As a newbie when it comes to web design, this intially seemed like it would be well above my pay grade. Never fear! The `next-theme` module makes this incredibly easy...essentially it was reduced down to a single line:

``` onClick={() => setTheme(theme === "dark" ? "light" : "dark")} ```

Boom. That's it. Granted, it's not totally perfect - there are still elements of the page that don't behave quite right (I assume the color change isn't being inhereited hence why they stay light/dark at inappropriate times). All that can be sorted out later though. With just a few lines of code we've got dark mode working at ~90%. 

## Resume and Contact Page
Again, both of these were adapted from the Manu Arora projects given that I don't quite yet have the React chops to build stuff from scratch. In the end though I was very pleased with how they both turned out. I continue to be impressed at how powerful the components in React can be when building something like this. That's the power of D.R.Y I suppose.

For the contact page I originally wanted to set it up to automatically send me an email with the salient information when a user submits data. Upon doing a fair amount of research though, it seems like Gmail locked down this type of capability a while back so tools like `nodemailer` don't really work anymore. I went down the route of exploring managed services (namely SendGrid which is now owned by Twilio) but it started to consume more time than I was willing to dedicate towards it (there was an invovled verification process to prove I wasn't a spammer which I guess is a good thing). In the end I just put up some basic JS handling code which clears the form and says "thanks for submitting" on submit without actually handling the data. If you'd really like to get in touch, LinkedIn is your best bet :)  

## Running in the Background
If you recall from the first post, we have an SSH tunnel set up to listen on port 3000 on our Raspberry Pi. Because I don't want to leave a terminal open with that process running, I used `pm2` to background the process via the following command:

```pm2 start npm --name "blog" -- start```


[^1]: https://www.freecodecamp.org/news/how-to-build-a-portfolio-site-with-nextjs-tailwindcss/