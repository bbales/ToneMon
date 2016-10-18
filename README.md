### ToneMon: A WebAudio and Canvas based synthesizer and sequencer

This project was created as a fun way to explore the new WebAudio API, it has been developed and solely
tested on chrome in its current state. The implementation takes advantage of many ES6 constructs such as
imports and classes.

![ToneMon Pic](http://i.imgur.com/Bjg7WkE.png)

#### App-level Dependencies

Currently the only app level dependency is [lodash](https://lodash.com/), which is used for easy array/collection manipulation.

#### Build-level Dependencies

Node.js + npm are required to build this project.

This project uses [WebPack](https://webpack.github.io/) to build/compile ES6 javascript.

##### Build Instructions

Make sure to install the dependencies through npm before building:
`npm install`

To build:
`npm run build`

For development (create a server on localhost):
`npm run watch`
