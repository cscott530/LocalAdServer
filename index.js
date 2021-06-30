const express = require('express');
const cors = require('cors');

// Create Express Server
const app = express();

// Configuration
const PORT = 3000;
const HOST = "localhost";

// Allow all CORS
app.use(cors());

// Proxy endpoints
app.use('/adserve/', function(req, res) {
   // Sample req: http://localhost:3000/adserve/;ID=123;size=300x250;setID=Top1;type=json;kw=abc123;click=CLICK_MACRO_PLACEHOLDER
   // Path will come in as /;ID=123;size=300x250;setID=Top1;type=json;kw=abc123;click=CLICK_MACRO_PLACEHOLDER
   let path = req.path;
   if (path.startsWith('/')) {
      path = path.substring(1);
   }
   if (path.startsWith(';')) {
      path = path.substring(1);
   }
   console.log(path);

   // For the sake of more easily accessing vars below, just convert the single string into an object
   /* 
   {
      ID: '123',
      size: '300x250',
      ...etc
   }
    */

   // For quicker setup this is very fragile. If any input params change this will prob break.
   const paths = path.split(';');
   const pathAsObject = {};
   paths.forEach(p => {
      pathAsObject[p.split('=')[0]] = p.split('=')[1];
   });
   const size = pathAsObject.size;
   const width = size.split('x')[0];
   const height = size.split('x')[1];
   const kw = pathAsObject.kw;
   // Using picsum because it returns a random image.
   const imageUrl = `https://picsum.photos/${width}/${height}`
   let json = {
      status: 'SUCCESS',
      placements: {
         placement_1: {
            accompanied_html: ``,
            target:`_blank`,
            redirect_url: `https://emarketer.com`,
            // body: `<img src="https://picsum.photos/${width}/${height}" alt="${kw}" />`,
            image_url: imageUrl,
            alt_text: kw,
            width: width,
            height: height
         }
      }
   };
   res.send(json);
});

// Start the Proxy
app.listen(PORT, HOST, () => {
   console.log(`Starting ad server at ${HOST}:${PORT}`);
});