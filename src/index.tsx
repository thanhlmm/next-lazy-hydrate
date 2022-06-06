/* eslint-disable @typescript-eslint/no-unsafe-call */
import dynamic from 'next/dynamic';
import withHydrationOnDemand from './lazy-hydrate';

let moduleId = 0; // Static counter
export default function lazyLoadHydrate<T>(
  module: ILazyComponent<T>,
  option: ILazyOption = {
    on: [],
  }
): React.ComponentType<ILazyComponentExtended<T>> {
  moduleId++;
  return withHydrationOnDemand({
    on: option.on,
    onBefore: module, // Make sure we load component before hydrating it
    wrapperProps: {
      ...option.wrapperProps,
      'data-hydration-id': `c-${moduleId}`,
    },
  })(
    dynamic(module, {
      loading: () => {
        const componentHTML = window.document.querySelector(
          `[data-hydration-id=c-${moduleId}]`
        )?.innerHTML;

        if (!componentHTML) {
          return null;
        }

        return (
          <div
            suppressHydrationWarning
            dangerouslySetInnerHTML={{ __html: componentHTML }}
          />
        );
      },
      ssr: true,
    })
  );
}
