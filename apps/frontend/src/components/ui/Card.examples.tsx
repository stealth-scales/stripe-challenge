import React from "react";
import { Card, CardHeader, CardContent } from "./Card";
import Money from "../icons/money";

// Example usage of the Card component with different variants and configurations
export function CardExamples() {
  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Card Component Examples</h1>

      {/* Default variant with header and content */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Default Card</h2>
        <Card>
          <CardHeader
            icon={<Money className="fill-slate-500 w-[20px] h-[20px]" />}
            title="Default Card"
          />
          <CardContent>
            <p>This is a default card with a gradient background.</p>
          </CardContent>
        </Card>
      </div>

      {/* Outlined variant */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Outlined Card</h2>
        <Card variant="outlined">
          <CardHeader title="Outlined Card" />
          <CardContent>
            <p>This is an outlined card with a white background.</p>
          </CardContent>
        </Card>
      </div>

      {/* Gradient variant */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Gradient Card</h2>
        <Card variant="gradient" size="lg">
          <CardHeader
            icon={<Money className="fill-blue-500 w-[24px] h-[24px]" />}
            title="Blue Gradient"
          />
          <CardContent padding="lg">
            <p>This is a blue gradient card with larger padding.</p>
          </CardContent>
        </Card>
      </div>

      {/* Card without header */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Content Only Card</h2>
        <Card variant="filled" size="sm">
          <CardContent padding="sm">
            <p>This card only has content, no header.</p>
          </CardContent>
        </Card>
      </div>

      {/* Custom styling */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Custom Styled Card</h2>
        <Card className="max-w-md">
          <CardHeader
            className="text-purple-600"
            icon={<Money className="fill-purple-500 w-[20px] h-[20px]" />}
          >
            Custom Header Content
          </CardHeader>
          <CardContent className="bg-purple-50 border-purple-200">
            <p>
              This card uses custom styling and demonstrates using children in
              the header.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Grid of small cards */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Card Grid</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {["Card 1", "Card 2", "Card 3"].map((title, index) => (
            <Card
              key={index}
              variant={index % 2 === 0 ? "default" : "outlined"}
            >
              <CardHeader title={title} />
              <CardContent>
                <p>Content for {title}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
