import { cn } from "../../lib/utils";

export default function Dog({ className }: { className?: string }) {
  return (
    <img
      src="/dog6.png"
      className={cn(className, "w-[48px] h-[48px] mix-blend-multiply")}
      style={{ imageRendering: "pixelated" }}
    />
  );
}
