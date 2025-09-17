import React, { useState, useRef, useCallback, useEffect } from "react";
import { cn } from "../../lib/utils";

interface CreditCardProps {
  cardNumber?: string;
  cardHolder?: string;
  className?: string;
}

const CreditCard = React.forwardRef<HTMLDivElement, CreditCardProps>(
  (
    { cardNumber = "1234", cardHolder = "John Doe", className, ...props },
    ref
  ) => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        setMousePosition({ x, y });
      },
      []
    );

    const handleMouseLeave = useCallback(() => {
      // Reset to center position when mouse leaves
      setMousePosition({ x: 50, y: 50 });
    }, []);

    useEffect(() => {
      if (ref) {
        if (typeof ref === "function") {
          ref(cardRef.current);
        } else {
          (ref as React.MutableRefObject<HTMLDivElement | null>).current =
            cardRef.current;
        }
      }
    });

    return (
      <div
        ref={cardRef}
        className={cn(
          "cc-card flex p-4 drop-shadow-lg relative overflow-hidden flex-row justify-between items-center from-indigo-500 to-blue-800 bg-gradient-to-b rounded-lg cursor-pointer transition-all duration-300",
          className
        )}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        {...props}
        style={{
          transition: "transform 0.3s ease-in-out",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Card Content */}
        <div className="flex flex-col opacity-90 relative z-10">
          <div className="text-white text-xl font-semibold font-mono">
            **** **** **** {cardNumber}
          </div>
          <div className="text-white text-sm font-mono">{cardHolder}</div>
        </div>
        <img
          src="/Visa_Brandmark_White_RGB_2021.png"
          className="h-6 object-contain"
        />

        {/* Reflection Effect */}
        <div
          className="absolute top-0 left-0 blur-sm"
          style={{
            transition: "all 0.3s ease-in-out",
            transform: `translate(${(mousePosition.x - 50) * 0.75}px, ${
              (mousePosition.y - 50) * 0
            }px)`,
          }}
        >
          <div
            className="absolute w-24 h-72 -top-24 left-0 rotate-45  mix-blend-color-dodge opacity-10"
            style={{
              background: `white`,
            }}
          />

          {/* Additional subtle glow effect */}
          <div
            className="absolute w-12 h-48 -top-12 left-42 rotate-45 mix-blend-color-dodge opacity-10"
            style={{
              background: `white`,
            }}
          />
        </div>
      </div>
    );
  }
);

CreditCard.displayName = "CreditCard";

export { CreditCard };
export type { CreditCardProps };
