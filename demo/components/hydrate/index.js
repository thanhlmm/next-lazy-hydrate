import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import ReactDOM from 'react-dom'
import useNearScreen from './useNearScreen'

const EMPTY_HTML = { __html: '' }
const isServer = typeof window === 'undefined'

export default function ProgressiveHydration({ children }) {
  const ref = useRef(null)
  const isNearScreen = useNearScreen({ ref })
  const [isHydrated, setHydrated] = useState(false);

  // useEffect(
  //   function () {
  //     const { current: el } = ref
  //     // CLIENT:
  //     // If we want to force the hydration OR the element is near screen
  //     // then we hydrate the content to get the functionality ready
  //     if (isNearScreen) {
  //       console.log("Start replace", el, el.hasChildNodes());
  //       const action = el.hasChildNodes() ? 'hydrate' : 'render'
  //       ReactDOM[action](children, el)
  //     }
  //   },
  //   [children, isNearScreen]
  // )

  const startHydate = () => {
    const { current: el } = ref
    // CLIENT:
    // If we want to force the hydration OR the element is near screen
    // then we hydrate the content to get the functionality ready
    console.log("Start replace", el, el.hasChildNodes());
    const action = el.hasChildNodes() ? 'hydrate' : 'render'
    // const action = 'render';
    ReactDOM[action](children, el, (arg) => {
      console.log(arg);
    })
  }

  const startHydrate2 = () => {
    const el = document.createElement('div');
    el.id = 'here';
    document.body.appendChild(el);
    setHydrated(true);
  }

  // SERVER: Just render the content as usual
  if (isServer) {
    return <div ref={ref} id="hydrate">{children}</div>
  }

  if (isHydrated) {
    console.log({ isHydrated });
    return ReactDOM.createPortal(<div ref={ref} id="hydrate">{children}</div>, document.getElementById('hydrate'));
    // return <div ref={ref} id="hydrate">{children}</div>
  }

  // CLIENT: Avoid hydration until we say so
  return (
    <div
      ref={ref}
      onClick={startHydate}
      id="hydrate"
      suppressHydrationWarning
      dangerouslySetInnerHTML={EMPTY_HTML}
    />
  )
}