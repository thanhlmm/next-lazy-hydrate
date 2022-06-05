/**

MIT License

Copyright (c) 2019 Valentin Colmant

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
// https://github.com/valcol/react-hydration-on-demand/blob/master/src/index.js

/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';

const isClientSide = typeof window !== 'undefined';

declare const navigator: any; // Fix experiment property

const eventListenerOptions = {
  once: true,
  capture: true,
  passive: true,
};

const getDisplayName = (WrappedComponent: React.ComponentType) => {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
};

const withHydrationOnDemandServerSide =
  ({ wrapperProps }: ILazyOption) =>
  (WrappedComponent: React.ComponentType) =>
  ({ ...props }) =>
    (
      <section data-hydration-on-demand={true} {...wrapperProps}>
        <WrappedComponent {...props} />
      </section>
    );

const withHydrationOnDemandClientSide =
  ({
    disableFallback = false,
    isInputPendingFallbackValue = true,
    on = [],
    onBefore,
    whenInputPending = false,
    wrapperProps,
  }: ILazyOption) =>
  (WrappedComponent: React.ComponentType) => {
    const WithHydrationOnDemand = ({ forceHydration = false, ...props }) => {
      const rootRef = useRef<HTMLElement>(null);
      const cleanupFunctions = useRef<AnyFunction[]>([]);

      const isInputPending = () => {
        // eslint-disable-next-line
        const isInputPending = navigator?.scheduling?.isInputPending?.();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return isInputPending ?? isInputPendingFallbackValue;
      };

      const getDefaultHydrationState = () => {
        const isNotInputPending = whenInputPending && !isInputPending();
        return (isNotInputPending || forceHydration) && !onBefore;
      };

      const [isHydrated, setIsHydrated] = useState(getDefaultHydrationState());

      const cleanUp = () => {
        cleanupFunctions.current.forEach(fn => fn());
        cleanupFunctions.current = [];
      };

      const hydrate = async () => {
        cleanUp();
        if (isHydrated) return;

        if (onBefore) {
          await onBefore();
        }
        setIsHydrated(true);
      };

      const initDOMEvent = (
        type: keyof HTMLElementEventMap,
        getTarget = () => rootRef.current
      ) => {
        const target = getTarget();
        target?.addEventListener(type, hydrate, eventListenerOptions);
        cleanupFunctions.current.push(() => {
          if (!target) return;
          target.removeEventListener(type, hydrate, eventListenerOptions);
        });
      };

      const initTimeout = (delay = 2000) => {
        if (delay <= 0) return;

        const timeout = setTimeout(hydrate, delay);
        cleanupFunctions.current.push(() => clearTimeout(timeout));
      };

      const initIdleCallback = () => {
        if (!('requestIdleCallback' in window)) {
          initTimeout();
          return;
        }

        const idleCallback = requestIdleCallback(
          () => requestAnimationFrame(() => hydrate()),
          {
            timeout: 500,
          }
        );

        if (!('cancelIdleCallback' in window)) return;

        cleanupFunctions.current.push(() => {
          cancelIdleCallback(idleCallback);
        });
      };

      const initIntersectionObserver = (getOptions = Function.prototype) => {
        if (!('IntersectionObserver' in window)) {
          void hydrate();
          return;
        }

        if (!rootRef.current) {
          void hydrate();
          return;
        }

        const options = getOptions();
        const observer = new IntersectionObserver(([entry]) => {
          if (!entry.isIntersecting || !(entry.intersectionRatio > 0)) return;

          void hydrate();
        }, options);

        cleanupFunctions.current.push(() => {
          if (!observer) return;
          observer.disconnect();
        });

        observer.observe(rootRef.current);
      };

      const initEvent = (type: IEvent, options?: any) => {
        switch (type) {
          case 'delay':
            initTimeout(options);
            break;
          case 'visible':
            initIntersectionObserver(options);
            break;
          case 'idle':
            initIdleCallback();
            break;
          default:
            initDOMEvent(type, options);
        }
      };

      useLayoutEffect(() => {
        if (isHydrated) return;

        if (forceHydration) {
          void hydrate();
          return;
        }

        const wasRenderedServerSide = !!rootRef.current?.getAttribute(
          'data-hydration-on-demand'
        );
        const shouldHydrate = !wasRenderedServerSide && !disableFallback;

        if (shouldHydrate) void hydrate();
      }, [forceHydration]);

      useEffect(() => {
        if (isHydrated) return;

        on.forEach(event =>
          Array.isArray(event) ? initEvent(...event) : initEvent(event)
        );
        return cleanUp;
      }, []);

      if (!isHydrated)
        return (
          <section
            ref={rootRef}
            dangerouslySetInnerHTML={{ __html: '' }}
            suppressHydrationWarning
            {...wrapperProps}
          />
        );

      return (
        <section {...wrapperProps}>
          <WrappedComponent {...props} />
        </section>
      );
    };

    WithHydrationOnDemand.displayName = `withHydrationOnDemand(${getDisplayName(
      WrappedComponent
    )})`;

    return WithHydrationOnDemand;
  };
const withHydrationOnDemand = (options: ILazyOption = {}) => {
  if (isClientSide) return withHydrationOnDemandClientSide(options);

  return withHydrationOnDemandServerSide(options);
};

export default withHydrationOnDemand;
