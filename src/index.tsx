/* eslint-disable @typescript-eslint/no-unsafe-call */
import dynamic from 'next/dynamic';
import withHydrationOnDemand from './lazy-hydrate';

const EmptyComp = () => null;

export default function lazyLoadHydrate<T>(
  module: ILazyComponent<T>,
  option: ILazyOption = {
    on: [],
    loading: EmptyComp,
  }
): React.ComponentType<ILazyComponentExtended<T>> {
  return withHydrationOnDemand({
    on: option.on,
    onBefore: module, // Make sure we load component before hydrating it
    compatibleMode: option.compatibleMode,
    wrapperProps: {
      ...option.wrapperProps,
    },
  })(
    dynamic(module, {
      loading: option.loading || EmptyComp,
      ssr: true,
    })
  );
}
