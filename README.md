# React ABR Lookup
A modern react.js implementation of the ABR lookup service at https://abr.business.gov.au/json/. Original ABR APIs are JSONP, this provides a node.js proxy to call them using native fetch. Built on standard CRA (Create React App).

## Recommended runtime
node.js 10.13.0, npm 6.4.1 (should work in older releases as well but untested)

## What's cool about it?
- uses modern react techniques like suspense, lazy and cache
- snapshot testing suspense components with jest (includes mocking)
- simple 3 component design
- no state, data fetching dependencies (all vanilla react)
- child tree runtime error handling

## Explain the benefits of suspense, lazy and cache?
Use the following search use case to see benefits:
- enter your guid via the url (see below)
- open your chrome console and keep the network tab open
- search for "bunnings"
- when the results arrive your will see a "chunk.js" load - basically the results comp loaded on-demand
- hit the first result on screen. You will see another "chunk.js" load (another comp loaded on-demand)
- go back via "Search again" and search for "bunnings" again
- you will see the network api request loaded from cache, hit the first result and its loaded from cache as well (react cache in action)
- all the above is done using vanilla react

## Is it prod ready?
NO! it was built in around 4 hours and uses a lot of experimental features which should be prod ready in next react release. A more prod ready pattern would be to skip the suspense, lazy and cache and instead use regular lifecycle hooks (componentDidMount) to fetch api data and Higher Order Components (HOC) to do the `loading...` effect before content arrives. Sample code for this pattern is in another repo I have [here](https://github.com/newbreedofgeek/react-16-experiments/tree/master/src/HigherOrderComponent)

## How can I run it?
`npm start`
- launch the api proxy and react dev server for dev mode

`npm test`
- unit test mode for live TDD (as your code) - the first time you run tests you may need to hit `a - run all tests`

`npm build`
- build your prod react pack

`npm run start-prod`
- run in prod mode

## Make sure you feed your guid via querystring or APIs wont show data
http://localhost:3000/?guid=bxxxxx-5xxxx-xxxx0-9xxxx-xxxxxa

## Running via Docker locally
- build your image `docker build -t react-abr-lookup .`
- run your image `docker run -p 49160:49160 -d react-abr-lookup`

## Considerations / Limitations
- as mentioned above, this is not prod ready due to some experimental react tech but can be converted to be easily
- maxduration in suspense seems to have some issues
- snapshot testing is done for comps using `react-test-renderer` (which is still in early stage). I would usually use enzyme which is more stable and support better async rendering

## Improvements
- better react list keys (current ABNs are used and they can repeat)
- implement paging for name search
- add routing via react-router
- folder structure of src should be cleaned up
- SASS instead of CSS
- Complete unit tests for api, cache, index
- use React.Memo to improve render performance
- npm shows a "1 high severity vulnerability" from a nested module, need to investigate and fix
- snapshot testing covers full app use case (search for something and see details) - but coverage can be improved to support end-to-end workflow and boundary cases like no search results and errors etc
- add acn search mocks and tests
- the "details" page is very lite at the moment, can show all available api details by extending util.standardizeResult