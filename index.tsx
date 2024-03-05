
Bun.serve({
    port:3000,
    async fetch(req) {
        const url = new URL(req.url);
        console.log(url.pathname);
        switch(url.pathname) { 
            case "/": { 
                return new Response (Bun.file("./public/components/login.html"))
            } 

            case '/mail': { 

                let payload = await req.json();
                console.log(JSON.stringify(payload))
                console.log(payload);
                console.log('done! /mail')
                return new Response ("true", {
                    headers: { "Content-Type": "text/html" },
                })
            } 

            default: { 
                const path = './public'+url.pathname;
                const file = Bun.file(path);
                const exi = await file.exists();
                if (exi==true) {
                    console.log('done! /public')
                    return new Response (Bun.file(path))
                }
                else {
                    console.log('done 404!')
                    return new Response("404", {
                        headers: { "Content-Type": "text/html" },
                    });
                }
            } 
         } 
    },
  });