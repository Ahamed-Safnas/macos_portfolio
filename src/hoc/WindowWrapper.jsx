import useWindowStore from "#store/window.js";
import { useGSAP } from "@gsap/react";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

const windowWrapper = (Component,windowKey) => {

  const Wrapped = (props) => {
    const { focusWindow, windows } = useWindowStore();
    const {isOpen, zIndex } = windows[windowKey];
    const ref = useRef(null);

    useGSAP(() => {
        const el = ref.current;
        if (!el || !isOpen) return;

        el.style.display = "block";

        gsap.fromTo(
            el,
            { scale: 0.8, opacity: 0 ,y: 40},
            { scale: 1, opacity: 1, duration: 0.4, ease: "power3.out", y: 0 },
        );

    },[isOpen]);

    useGSAP(() => {
        const el = ref.current;
        if (!el) return;

        const [instance] = Draggable.create(el,{onPress:() => 
            focusWindow(windowKey)});

        return () => instance.kill();
    },[]);

    useLayoutEffect(() => {
        const el = ref.current;
        if (!el) return;
        el.style.display = isOpen ? "block" : "none";
    }, [isOpen]);

    return <section
    id={windowKey}
    ref={ref}
    className="absolute"
    style={{ zIndex }}
    >
        <Component {...props} />
    </section>

  };

  Wrapped.displayName = `windowWrapper(${Component.displayName || Component.name || 'Component'})`;
  return Wrapped;
};

export default windowWrapper;