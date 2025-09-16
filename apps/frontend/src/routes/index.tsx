import { createFileRoute } from "@tanstack/react-router";
import Money from "../components/icons/money";
import { Card, CardHeader, CardContent } from "../components/ui/Card";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader
          icon={<Money className="fill-slate-500 w-[20px] h-[20px]" />}
          title="Your Transactions"
        />
        <CardContent className="flex flex-col gap-2">
          <table>
            <thead>
              <tr className="text-left text-slate-500">
                <th className="font-medium">Date</th>
                <th className="font-medium">Name</th>
                <th className="text-right font-medium">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-left text-sm text-gray-500 h-12 ">
                <td className="pl-2">2025-01-01</td>
                <td>Transaction 1</td>
                <td className="text-right font-mono pr-2">$100</td>
              </tr>
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
