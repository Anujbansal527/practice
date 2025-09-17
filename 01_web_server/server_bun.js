import {serve} from "bun";

serve({
  fetch(request) {  
    const url = new URL(request.url);
    if (url.pathname === "/") {
      return new Response("Welcome to the Home Page\n", {
        status: 200,
        headers: { "Content-Type": "text/plain" },//optional
      });
    }
    else if (url.pathname === "/about") {
      return new Response("This is the About Page\n", {
        status: 200,
        headers: { "Content-Type": "text/plain" },
      });
    }
    else if (url.pathname === "/contact") {
      return new Response("This is the Contact Page\n", {
        status: 200,
        headers: { "Content-Type": "text/plain" },
      });
    }
    else {
      return new Response("Page Not Found\n", {
        status: 404,
        headers: { "Content-Type": "text/plain" },
      });
    }
    },
    hostname: "127.0.0.1",
    port: 3001
});

