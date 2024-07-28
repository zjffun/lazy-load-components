import type { IObserver } from "@lazy-load-components/core";
import { defaultObserver } from "@lazy-load-components/core";
import { CSSProperties, useEffect, useRef, useState } from "react";

function LazyLoadComponents(props: {
  delay?: number;
  disabled?: boolean;
  placeholderClass?: string;
  placeholderStyle?: CSSProperties;
  beforeSetShowing?: any;
  observer?: IObserver;
  children?: any;
  placeholder?: any;
}) {
  const {
    delay,
    disabled,
    placeholderClass,
    placeholderStyle,
    beforeSetShowing,
    observer,
    children,
    placeholder,
  } = props;

  const [showing, setShowing] = useState(disabled);
  const placeholderRef = useRef<HTMLDivElement>(null);

  const _observer = observer || defaultObserver;

  function _setShowing(
    value: boolean,
    info?: { entry: IntersectionObserverEntry }
  ) {
    let _value = value;

    const beforeSetShowingResult = beforeSetShowing?.(value, info);

    if (typeof beforeSetShowingResult === "boolean") {
      _value = beforeSetShowingResult;
    }

    setShowing(_value);
  }

  function observe() {
    if (!placeholderRef.current) {
      console.warn(
        "[react-lazy-load-components] observe failed, placeholderRef is null"
      );
      return;
    }

    _observer.observe({
      placeholder: placeholderRef.current,
      delay: delay,
      setShowing,
    });
  }

  function unobserve() {
    if (!placeholderRef.current) {
      console.warn(
        "[react-lazy-load-components] unobserve failed, placeholderRef is null"
      );
      return;
    }

    _observer.unobserve({
      placeholder: placeholderRef.current,
    });
  }

  useEffect(() => {
    if (disabled) {
      unobserve();
      _setShowing(true);
    } else {
      observe();
    }

    return () => {
      unobserve();
    };
  }, [disabled]);

  return (
    <>
      {showing && children}
      <div
        ref={placeholderRef}
        className={placeholderClass}
        style={{
          ...placeholderStyle,
          display: showing ? "none" : "block",
        }}
      >
        {!showing && placeholder}
      </div>
    </>
  );
}

export default LazyLoadComponents;
