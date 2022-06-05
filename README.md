# next-lazy-hydrate

Lazy load and hydrate component on demand. Deal with Nextjs performance without compromise

[![npm package][npm-img]][npm-url]
[![Build Status][build-img]][build-url]
[![Downloads][downloads-img]][downloads-url]
[![Issues][issues-img]][issues-url]
[![Semantic Release][semantic-release-img]][semantic-release-url]

https://user-images.githubusercontent.com/9281080/172057426-88394b3b-c259-4db0-b674-d996565fe9c2.mp4

https://user-images.githubusercontent.com/9281080/172057438-4a3fed9c-b232-4d95-b1e4-e968910df667.mp4

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

## API

### lazyHydrate(dynamicImport, options?)

#### dynamicImport

Type: `() => Promise<React.ComponentType>`

A function return `import()` in dynamic loading type

#### options

You can custom `on` to which event you'd like listen before hydrating start

Refer to: https://github.com/valcol/react-hydration-on-demand#options

##### postfix

Type: `string`
Default: `rainbows`

Lorem ipsum.

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
