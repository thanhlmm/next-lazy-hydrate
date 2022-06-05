/// <reference types="next" />

type AnyFunction = (...args: unknown[]) => unknown;
type IEvent = 'delay' | 'visible' | 'idle' | keyof HTMLElementEventMap;
type IEventOption = IEvent | [IEvent, any];
type IWrapperProps = Record<string, any> | JSX.IntrinsicElements['section'];

interface ILazyOption {
  on?: IEventOption[];
  onBefore?: () => Promise<any>;
  whenInputPending?: boolean;
  isInputPendingFallbackValue?: boolean;
  disableFallback?: boolean;
  wrapperProps?: IWrapperProps;
}

type ILazyComponent<T> = LoaderComponent<T>;
type IExtendedProps<T> = {
  wrapperProps?: IWrapperProps;
  forceHydration?: boolean;
} & T;
type ILazyComponentExtended<T> = ILazyComponent<IExtendedProps<T>>;
