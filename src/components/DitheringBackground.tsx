import { Suspense, lazy } from "react";

const Dithering = lazy(() =>
  import("@paper-design/shaders-react").then((mod) => ({ default: mod.Dithering }))
);

const DitheringBackground = () => (
  <div className="absolute inset-0 z-0 pointer-events-none">
    <Suspense fallback={<div className="w-full h-full" style={{ background: "var(--bg-mid)" }} />}>
      <Dithering
        colorBack="#f5f7fa"
        colorFront="#2563eb"
        speed={0.3}
        scale={3}
        style={{ width: "100%", height: "100%", opacity: 0.35 }}
      />
    </Suspense>
  </div>
);

export default DitheringBackground;
