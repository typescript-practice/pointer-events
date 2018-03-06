# tp-pointer-events

[![Build Status](https://www.travis-ci.org/typescript-practice/pointer-events.svg?branch=master)](https://www.travis-ci.org/typescript-practice/pointer-events)
[![Coverage Status](https://coveralls.io/repos/github/typescript-practice/pointer-events/badge.svg?branch=master)](https://coveralls.io/github/typescript-practice/pointer-events?branch=master)
[![npm version](https://img.shields.io/npm/v/tp-pointer-events.svg?style=flat-square)](https://www.npmjs.com/package/tp-pointer-events)
[![monthly downloads](https://img.shields.io/npm/dm/tp-pointer-events.svg?style=flat-square)](https://www.npmjs.com/package/tp-pointer-events)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![UNPKG](https://img.shields.io/badge/unpkg.com--green.svg)](https://unpkg.com/tp-pointer-events@latest/dist/pointer-events.umd.js)
[![liense](https://img.shields.io/github/license/typescript-practice/pointer-events.svg)]()

## Intro
Extend the mobile-side event touchstart / touchmove / touchend logic to the desktop.


- 解决的问题是?
- 为什么不是pointer事件?
- 为什么不是drag事件?

## Example

```js
import PointerEvents from 'tp-pointer-events';

function pointerDown(e){ 
  // do something
}

function pointerMove(e){ 
  // do something
}

function pointerUp(e){ 
  // do something
}

const pointerEvents = new PointerEvents(this._el, pointerDown, pointerMove, pointerUp, {});
```

## Install

[![NPM Badge](https://nodei.co/npm/tp-pointer-events.png?downloads=true)](https://www.npmjs.com/package/tp-pointer-events)

 
## API


## Development

 - `npm t`: Run test suite
 - `npm start`: Run `npm run build` in watch mode
 - `npm run test:watch`: Run test suite in [interactive watch mode](http://facebook.github.io/jest/docs/cli.html#watch)
 - `npm run test:prod`: Run linting and generate coverage
 - `npm run build`: Generate bundles and typings, create docs
 - `npm run lint`: Lints code
 - `npm run commit`: Commit using conventional commit style ([husky](https://github.com/typicode/husky) will tell you to use it if you haven't :wink:)

## License

MIT
