import { Suspense, lazy } from "react";

const Dithering = lazy(() =>
  import("@paper-design/shaders-react").then((mod) => ({ default: mod.Dithering }))
);

const DitheringBackground = () => (
  <div className="absolute inset-0 z-0 pointer-events-none">
    <Suspense fallback={<div className="w-full h-full" style={{ background: "var(--bg-mid)" }} />}>
      <Dithering
        colorBack={[0.96, 0.97, 0.98]}
        colorFront={[0.15, 0.39, 0.92]}
        speed={0.3}
        scale={3}
        style={{ width: "100%", height: "100%", opacity: 0.35 }}
      />
    </Suspense>
  </div>
);

export default DitheringBackground;
