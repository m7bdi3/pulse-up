"use client";

import React, {
  useCallback,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";
import type {
  TConductorInstance,
  TPresetProps,
  TRunAnimationParams,
} from "react-canvas-confetti/dist/types";

type ConfettiProps = Omit<TPresetProps, "Conductor"> & {
  Conductor?: TPresetProps["Conductor"];
  duration?: number;
};

export interface ConfettiRef {
  startConfetti: (params?: TRunAnimationParams) => void;
}

const canvasStyles: React.CSSProperties = {
  position: "fixed",
  pointerEvents: "none",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
  zIndex: 100,
};

const Confetti = forwardRef<ConfettiRef, ConfettiProps>(
  ({ duration = 200, ...props }, ref) => {
    const conductorRef = useRef<TConductorInstance | null>(null);

    const onInit: TPresetProps["onInit"] = useCallback(({ conductor }: any) => {
      conductorRef.current = conductor;
    }, []);

    const startConfetti = useCallback(
      (params: TRunAnimationParams = { speed: 1 }) => {
        if (conductorRef.current) {
          conductorRef.current.run({ ...params, duration });
        }
      },
      [duration]
    );

    useImperativeHandle(ref, () => ({
      startConfetti,
    }));

    return (
      <Fireworks
        {...props}
        onInit={onInit}
        style={{ ...canvasStyles, ...props.style }}
        
      />
    );
  }
);

Confetti.displayName = "Confetti";

export default Confetti;
