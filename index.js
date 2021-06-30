const express = require('express');
const cors = require('cors');

// Create Express Server
const app = express();

// Configuration
const PORT = 3000;
const HOST = "localhost";

// Enable CORS, otherwise these will fail
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
   const imageUrl = `https://picsum.photos/${width}/${height}`

   // Give some unpredictability to simulate a real server. Returns 1-max, inclusive
   const getRandomInt = (max) => Math.floor(Math.random() * max) + 1;
   // Rarely make things fail
   const status = getRandomInt(50) === 50 ? 'FAILURE' : 'SUCCESS';
   if (status !== 'SUCCESS') {
      console.log(`FORCING FAILURE RESPONSE FOR ${size}`);
   }

   // Periodically make it slow to ensure page doesn't shift
   const slowReturn = getRandomInt(10) === 10;
   if (slowReturn) {
      console.log(`FORCING DELAYED RESPONSE FOR ${size}`);
   }
   const delay = slowReturn ? 1500 : 1;

   // If returning the body, this entire HTML is used in the ad, in place of building it piece-meal
   const returnFullBody = getRandomInt(5) === 5;
   if (returnFullBody) {
      console.log(`FORCING BODY HTML FOR ${size}`);
   }

   // Accompanied HTML should get rendered after the image ad, if no body is included.
   const includeAccompaniedHtml = getRandomInt(3) === 3;
   if (includeAccompaniedHtml) {
      console.log(`INCLUDING ACCOMPANIED_HTML FOR ${size}`);
   }
   const accompanied = includeAccompaniedHtml ? `<div data-accompanied-html="true"></div>` : ``;

   const body = returnFullBody ? `<div data-body="true"><img src="${imageUrl}" alt="${kw}" /></div>` : ``;
   // Using picsum because it returns a random image.
   let json = {
      status: status,
      placements: {
         placement_1: {
            accompanied_html: accompanied,
            target:`_blank`,
            redirect_url: `https://emarketer.com`,
            body: body,
            image_url: imageUrl,
            alt_text: kw,
            width: width,
            height: height
         }
      }
   };
   
   setTimeout(() => res.send(json), delay);
});

// Start the Proxy
app.listen(PORT, HOST, () => {
   console.log(`Starting ad server at ${HOST}:${PORT}`);
});