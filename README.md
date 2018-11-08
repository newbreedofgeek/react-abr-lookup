# React ABR Lookup
A modern reactjs implementation of the ABR lookup service at https://abr.business.gov.au/json/. Original ABR APIs are JSONP, this provides a node.js proxy to call them using native fetch. Built on standard CRA (Create React App).

## Recommended runtime
node.js 10.13.0, npm 6.4.1 (should work in older releases as well but untested)

## What's cool about it?
- uses modern react techniques like suspense, lazy and cache
- snapshot testing suspense components with jest (includes mocking)
- simple 3 component design
- no state, data fetching dependencies (all vanilla react)
- child tree runtime error handling

## Is it prod ready?
NO! it was built in arund 4 hours and uses a lot of expremental features which should be prod ready in next react release. A more prod ready pattern would be to skip the suspense, lazy and cache and instead use regular lifecyle hooks (componentDidMount) to fetch api data and Higer Order Components (HOC) to do the `loading...` effect before content arrives. Sample code for this pattern is in another repo I have [here](https://github.com/newbreedofgeek/react-16-experiments/tree/master/src/HigherOrderComponent)

## How can I run it?
`npm start`
launch the api proxy and react dev server for dev mode

`npm test`
unit test mode for live TDD (as your code)

`npm build`
build your prod react pack

`npm run start-prod`
run in prod mode

## Make sure you feed your guid via querystring of APIs wont show data
http://localhost:3000/?guid=bxxxxx-5xxxx-xxxx0-9xxxx-xxxxxa

## Considerations / Limitations
- as mentioned above, this is not prod ready but can be converted to be easily
- maxduration in suspense seems to have some issues
- snapshot testing is done for comps using react-test-renderer (which is still in early stage). I would usually use enzyme which is more stable and support better async rendering

## Improvements
- better react list keys (current ABNs are used and they cna repeat)
- implement paging for name search
- folder structure of src should be cleaned up
- SASS instead of CSS
- Complete unit tests for api, cache, index
- use React.Memo to improve render performance