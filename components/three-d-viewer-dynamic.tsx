"use client";

import dynamic from "next/dynamic";

const ThreeDViewer = dynamic(() => import("./three-d-viewer"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div
        className="size-10 rounded-full border-2 border-muted border-t-primary animate-spin"
        role="status"
        aria-label="Chargement du modèle 3D"
      />
    </div>
  ),
});

export { ThreeDViewer };
