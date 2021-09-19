async function handleRequest(request) {

    const services = {
      a: "https://www.amazon.com/s?k=",
      amazon: "https://www.amazon.com/s?k=",
      define: "https://www.dictionary.com/browse/",
      dict: "https://www.dictionary.com/browse/",
      ebay: "https://www.ebay.com/sch/i.html?&_nkw=",
      g: "https://google.com/search?&q=",
      google: "https://google.com/search?&q=",
      hackernews: "https://hn.algolia.com/?q=",
      hn: "https://hn.algolia.com/?q=",
      images: "https://www.google.com/search?tbm=isch&q=",
      img: "https://www.google.com/search?tbm=isch&q=",
      njalla: "https://njal.la/list/?search=",
      so: "https://stackoverflow.com/search?q=",
      wiki: "https://en.wikipedia.org/wiki/",
      wikipedia: "https://en.wikipedia.org/wiki/",
      youtube: "https://www.youtube.com/results?search_query=",
      yt: "https://www.youtube.com/results?search_query=",
    }
  
    const requestURL = new URL(request.url);
  
    let requestPath = requestURL.pathname.substring(1); // "/youtube/example" becomes "youtube/example"
    
    let serviceTrailingSlash = requestPath.indexOf('/'); // location of "/" in "youtube/example"
    
    let serviceString = requestPath.substring(0, serviceTrailingSlash); // == "youtube"
    
    let queryString = requestPath.substring(serviceTrailingSlash).substring(1); // == "example"
  
    let redirectURL = services[serviceString]; // contains "https://www.youtube.com/results?search_query=" 
    
    // if serviceString matches an existing key
    if (serviceString in services) {
      return Response.redirect(redirectURL + queryString, 302);
    } else return Response.redirect("https://about.netfind.in", 302);
  }
  
  addEventListener("fetch", async event => {
    event.respondWith(handleRequest(event.request))
  })
  