import { Children, cloneElement } from "react";
import { cn } from "@/lib/utils";

/** Pure-CSS orbit: each child rotates around the centre via the `orbit` keyframe. */
const OrbitingCircles = ({ children, className, reverse, duration = 20, radius = 120, iconSize = 36, speed = 1, path = true }) => {
  const items = Children.toArray(children);
  const dur = duration / speed;
  return (
    <>
      {path && (
        <svg className="pointer-events-none absolute inset-0 size-full" aria-hidden>
          <circle cx="50%" cy="50%" r={radius} fill="none" className="stroke-white/10" strokeWidth="1" strokeDasharray="3 6" />
        </svg>
      )}
      {items.map((child, i) => {
        const angle = (360 / items.length) * i;
        return (
          <div
            key={i}
            style={{
              "--duration": dur,
              "--radius": radius,
              "--angle": angle,
              width: iconSize,
              height: iconSize,
              // anchor every item to the container centre so the orbit is centred regardless of parent layout
              left: "50%",
              top: "50%",
              marginLeft: -iconSize / 2,
              marginTop: -iconSize / 2,
            }}
            className={cn(
              "absolute flex transform-gpu items-center justify-center rounded-full animate-orbit",
              reverse && "[animation-direction:reverse]",
              className
            )}
          >
            {cloneElement(child)}
          </div>
        );
      })}
    </>
  );
};

export default OrbitingCircles;
