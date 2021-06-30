## Purpose

I didn't want to have a bunch of conditional logic for serving up ads.

## Running/Usage

`npm run start` will start the server at `localhost:3000`.

## Other project usage:

In the project that you want to use ads, simply set the ad server url to `http://localhost:3000`. The rest of the format should be handled properly.

## Notes

- This is not the most robust thing. It's a quick and dirty placeholder, there are probably bugs.
- TODOs:
  - Randomly return a `body` property with HTML (but not always) to ensure front-end is compatible
  - Randomly have a slow return (like 5 seconds or so)
  - Randomly have `status` != `'SUCCESS'`
