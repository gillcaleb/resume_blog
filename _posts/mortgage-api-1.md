---
title: 'FastAPI Intro'
excerpt: 'Basic FastAPI integration'
coverImage: '/assets/blog/mortgage-api-1/cover.png'
date: '2023-03-17'
ogImage:
  url: '/assets/blog/mortgage-api-1/cover.png'
showMortgageRate: true
---

Tada! The date and mortgage rate you see in the card was pulled from the Freddie Mac website dynamically via an API call. 

## Overview
This post is going to tackle one of the most important aspects of full stack development - the process of integrating a front end app with a backend API. At least anecdotally, a large marjority of the job postings for typical SWE rolls get broken out into FE and BE roles. To a large degree this makes sense - we're oftentimes most productive when we're able to specialize in a given area. Within any organization though, you need liasons. People who understand the critical aspects of how to make otherwise disjoint components integrate seamlessly. In today's post, I'm going to sketch a rough outline of how I integrated the front end of this application with a backend API powered by Python's FastAPI. For the purposes of today's example I'm going to create an API which fetches and returns the average weekly mortgage rate in the U.S. 

## FastAPI
I love FastAPI. It does a lot of things well and is exceptional when it comes to rapid prototyping. The fact that I could have the API (albeit a very simple one) done in less than 20 minutes is awesome. The documention is also quite extensive. For today's example I went as bare bones as possible. Just a main.py file with a single function called `mortgage_rate`. Below is the bones of the code:

    from fastapi import FastAPI
    import requests

    app = FastAPI()

    @app.get("/mortgage_rate")
    async def get_mortgage_rate():
      # URL of the Freddie Mac website to scrape
      url = "https://www.freddiemac.com/pmms/pmms_archives"
      response = requests.get(url, headers=headers)

There you have it. That's a FastAPI app which fetches the Freddie Mac page in question without too much hassle. I further added a BeautifulSoup package that extracts the actual mortgage rate from the path in question. 

In order to deploy this I whipped up a basic Dockerfile that exposes port 8000 and then ran it as a background process on my GCP VM similar to how I host the Next.js app. 

## Next.js
There are plenty of places you could integrate this into the front end. I was looking for the most low-effort proof of concept that I could think of. What I did was create a component called mortgage-rate.js which (along with other basic scaffolding), made the following call:

    const response = await fetch("https://calebgill.com/api/mortgage_rate");
 
 We'll come back to that API in a second. Next, I added a conditional called showMortgageRate which is embedded in the .md file's metadata. If the conditional isn't present (or is false), then no mortgage-rate-card is renderered. This probably isn't the best pattern for large scale app development but for our immediate purposes it works just fine. 

## Nginx 
This is the critical piece that allows the frontend to access the backend. There are different ways you could approach it, but because I was hoping to leverage my existing Nginx setup, I chose to append the api to the base url (as opposed to a subdomain like api.calebgill.com). All it comes down to is adding the following proxy_pass block:

    location /api/mortgage_rate {
      proxy_pass http://0.0.0.0:8000/mortgage_rate;
    }

Bingo! Now just restart Nginx and watch it start serving up the content! 

## Wrapping up
I know that's a very top level overview of how things are implemented (and admittedly I glossed over a numerous issues that cropped up along the way). I hope it helps give a general understanding of how the pieces fit together. Next steps here would involve adding more and more routes to the API to perform needed functions, and eventually adding a database so that it doesn't have to do a dynamic HTTP request every time the endpoint gets called. 

Another word, more on the mortgage_rate function itself. It was surprising hard to give places to pull this data from. I guess it makes sense, but the providers of this data make it as difficult as they can for folks like me to scrape information from their website. They have numerous little tricks and tactics (like dynamic loading), to fluster a basic HTTP request. I suppose this makes sense - at the end of the day they don't want 3rd parties (like me) to pull their data and then repackage and sell it. There are ways around this, like using a more robust tool like Selenium, but that was wayyyy more involved than I wanted to get. 

Hope you enjoyed and have fun writing your own APIs! 
