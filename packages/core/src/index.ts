interface IObserveInfo {
  placeholder: HTMLDivElement;
  delay: number;
  setShowing: Function;
}

interface IObserver {
  observe: (params: IObserveInfo) => void;
  unobserve: (params: { placeholder: HTMLDivElement }) => void;
  infoMap?: Map<HTMLDivElement, IObserveInfo>;
  entryDelayCallMap?: Map<HTMLDivElement, any>;
  [key: string]: any;
}

function createObserver(): IObserver {
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: [0, 0.5],
  };

  const infoMap = new Map<HTMLDivElement, IObserveInfo>();
  const entryDelayCallMap = new Map<HTMLDivElement, any>();

  const observer = new window.IntersectionObserver((entries) => {
    for (const entry of entries) {
      const _entry = entry.target as HTMLDivElement;
      if (entry.intersectionRatio > 0.4) {
        const delayCall = entryDelayCallMap.get(_entry);
        if (delayCall) {
          continue;
        }

        const info = infoMap.get(_entry);

        if (!info) {
          continue;
        }

        const { delay, setShowing } = info;

        if (setShowing) {
          entryDelayCallMap.set(
            _entry,
            setTimeout(() => {
              setShowing(true);
            }, delay || 0)
          );
        }
        continue;
      }

      if (entry.intersectionRatio <= 0) {
        clearTimeout(entryDelayCallMap.get(_entry));
        entryDelayCallMap.delete(_entry);
        continue;
      }
    }
  }, options);

  function observe(params: {
    placeholder: HTMLDivElement;
    delay: number;
    setShowing: Function;
  }) {
    const _placeholder = params?.placeholder;
    if (!_placeholder) {
      return;
    }
    infoMap.set(_placeholder, params);
    observer.observe(_placeholder);
  }

  function unobserve(params: { placeholder: HTMLDivElement }) {
    const _placeholder = params?.placeholder;
    if (!_placeholder) {
      return;
    }

    infoMap.delete(_placeholder);
    entryDelayCallMap.delete(_placeholder);
    observer.unobserve(_placeholder);
  }

  return {
    observe,
    unobserve,
    infoMap: infoMap,
    entryDelayCallMap,
  };
}

const defaultObserver = createObserver();

export { createObserver, defaultObserver };
export type { IObserver };
