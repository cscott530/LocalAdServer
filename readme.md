## Purpose

I didn't want to have a bunch of conditional logic for serving up ads.

## Running/Usage

- `npm run start` will start the server at `localhost:3000`.
- To consume ads, in the project that's displaying ads, set the ad server url to `http://localhost:3000`, and make sure it's set to not serve up the static `TEST_AD` values, if applicable. 
- The paths and variables that are otherwise in place for preview/production should match what this server accepts.

## Notes

- This is not the most robust thing. It's a quick and dirty placeholder, there are probably bugs.
- I reverse engineered a response based on what other projects accept/expect. Some assumptions may be wrong.
- Ideas for improvement:
  - Use .env to allow tuning of random occurrences and setting port without modifying source.
  - Better logging
