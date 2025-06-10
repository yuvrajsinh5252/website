import { UnifiedBackground } from "./unified-background";

export function Background() {
  return (
    <div className="fixed inset-0 -z-10 h-full w-full overflow-hidden">
      <UnifiedBackground />
    </div>
  );
}
