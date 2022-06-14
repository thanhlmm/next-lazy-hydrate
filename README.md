# next-lazy-hydrate

[![npm package][npm-img]][npm-url]
[![Build Status][build-img]][build-url]
[![Downloads][downloads-img]][downloads-url]
[![Issues][issues-img]][issues-url]
[![Semantic Release][semantic-release-img]][semantic-release-url]

Lazy load and hydrate component on demand. Deal with Nextjs performance without compromise.

## Feature
- Render component in SSR (Good for SEO)
- Only load and hydrate when needed (Good for page Speed)

This package is heavily based on https://github.com/valcol/react-hydration-on-demand

| Before                                                                                                                                                                 | After                                                                                                                                                                  |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <img width="1079" alt="Screen Shot 2022-06-05 at 22 31 29" src="https://user-images.githubusercontent.com/9281080/172058282-fd2cb125-68c1-4d71-9ca8-5f13ba6c55ba.png"> | <img width="1079" alt="Screen Shot 2022-06-05 at 22 31 19" src="https://user-images.githubusercontent.com/9281080/172058303-7e9d29ba-d83b-4189-b23b-74bb7a355001.png"> |
| [https://next-lazy-hydrate-origin.vercel.app/](https://next-lazy-hydrate-origin.vercel.app/)                                                                           | [https://next-lazy-hydrate-optimized.vercel.app/](https://next-lazy-hydrate-optimized.vercel.app/)                                                                     |
| [Live check PageSpeed](https://pagespeed.web.dev/report?url=https%3A%2F%2Fnext-lazy-hydrate-origin.vercel.app%2F&form_factor=mobile)                                   | [Live check PageSpeed](https://pagespeed.web.dev/report?url=https%3A%2F%2Fnext-lazy-hydrate-optimized.vercel.app%2F&form_factor=mobile)                                |



https://user-images.githubusercontent.com/9281080/172079813-a49db8c0-c64d-4589-941d-bf027b22433a.mov

[Read more about Islands Architecture here](https://www.patterns.dev/posts/islands-architecture/)

## Install

```bash
npm install next-lazy-hydrate
```

## Usage

```ts
import lazyHydrate from 'next-lazy-hydrate';

// Lazy hydrate when scroll into view
const WhyUs = lazyHydrate(() => import('../components/whyus'));

// Lazy hydrate when users hover into the view
const Footer = lazyHydrate(
  () => import('../components/footer', { on: ['hover'] })
);

const HomePage = () => {
  return (
    <div>
      <AboveTheFoldComponent />
      {/* ----The Fold---- */}
      <WhyUs />
      <Footer />
    </div>
  );
};
```

[Demo how to use it](https://github.com/thanhlmm/next-lazy-hydrate/blob/main/demo/pages/index.js)

# API

```
lazyHydrate(dynamicImport, options?)
```

## dynamicImport

Type: `() => Promise<React.ComponentType>`

A function return `import()` in dynamic loading type

## Options

### `on: Array`

An array of events who will trigger the hydration.
Can contains event names directly or as an array of `['event name', options]`.

```js
import lazyHydrate from 'next-lazy-hydrate'

const Card = lazyHydrate(
  () => import("../Card"),
  {
      on: ["visible", ["scroll", () => document], ["delay", 5000]],
  }
);
```

Support [all DOM events](https://developer.mozilla.org/en-US/docs/Web/Events) and more :

| Event name                                                                | Options                                                                                                                                                                 | Description                                                                                                                    |
| ------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| [**all DOM events**](https://developer.mozilla.org/en-US/docs/Web/Events) | `getTarget: Function` who return the event target (default: the wrapped component)                                                                                      |
| **delay**                                                                 | `delay: Number` in ms (default value: 2000)                                                                                                                             | Scheduled hydration.                                                                                                           |
| **visible**                                                               | `getOptions: Function` who return an [intersectionObserver options](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver) object (default: no options) | Requires IntersectionObserver. **Polyfill not included.** If unsupported the component is directy hydrated.                    |
| **idle**                                                                  |                                                                                                                                                                         | Requires requestIdleCallback. **Polyfill not included.** If unsupported the component will be hydrated with a delay of 2000ms. |

### `whenInputPending: Boolean` (optional, default: false)

When set to true use `navigator.scheduling.isInputPending` to check if there is a pending user input on mount. If that's the case, hydration will be delayed using the strategies defined in the `on` option to allow the browser to handle the user input.
If there is no pending input, the component will be hydrated directly to be interactive as fast as possible.

See https://github.com/WICG/is-input-pending for more infos.

### `isInputPendingFallbackValue: Boolean` (optional, default: true)

The default value returned on browsers who don't implements `navigator.scheduling.isInputPending` when `whenInputPending` set to true.

### `disableFallback: Boolean` (optional, default: false)

If set at true the component will not be rendered client side if not rendered server side.

## Props

### `wrapperProps: Object` (optional)

Props that are applied to the div which wraps the provided component.

```js
import lazyHydrate from 'next-lazy-hydrate';
import Card from "../Card";

const Card = lazyHydrate(
  () => import("../Card"),
  {
      on: ["delay"],
  }
);

export default class App extends React.Component {
    render() {
        return (
            <Card
                title="my card"
                wrapperProps={{
                    className: "customClassName",
                    style: { display: "contents" },
                }}
            />
        );
    }
}
```

### `forceHydration: Boolean` (optional, default: false)

Force the hydration of the component.

Explore my project 🤩: https://thanhle.blog/en/project


[build-img]: https://github.com/thanhlmm/next-lazy-hydrate/actions/workflows/release.yml/badge.svg
[build-url]: https://github.com/thanhlmm/next-lazy-hydrate/actions/workflows/release.yml
[downloads-img]: https://img.shields.io/npm/dt/next-lazy-hydrate
[downloads-url]: https://www.npmtrends.com/next-lazy-hydrate
[npm-img]: https://img.shields.io/npm/v/next-lazy-hydrate
[npm-url]: https://www.npmjs.com/package/next-lazy-hydrate
[issues-img]: https://img.shields.io/github/issues/thanhlmm/next-lazy-hydrate
[issues-url]: https://github.com/thanhlmm/next-lazy-hydrate/issues
[codecov-img]: https://codecov.io/gh/thanhlmm/next-lazy-hydrate/branch/main/graph/badge.svg
[codecov-url]: https://codecov.io/gh/thanhlmm/next-lazy-hydrate
[semantic-release-img]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-release-url]: https://github.com/semantic-release/semantic-release
[commitizen-img]: https://img.shields.io/badge/commitizen-friendly-brightgreen.svg
[commitizen-url]: http://commitizen.github.io/cz-cli/
