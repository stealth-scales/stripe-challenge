import { createFileRoute } from "@tanstack/react-router";
import Money from "../components/icons/money";
import { Card, CardHeader, CardContent } from "../components/ui/Card";
import { CreditCard } from "../components/ui/CreditCard";
import { TransactionTable } from "../components/ui/TransactionTable";
import { ActivityChart } from "../components/ui/ActivityChart";
import {
  getCardQueryKey,
  getCardQuery,
  getCardActivityQuery,
  getCardActivityQueryKey,
} from "../lib/queries";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const cardId = "ic_1I1OFqE8hHKqEw8LK31tUA4U";
  const { data: card } = useQuery({
    queryKey: getCardQueryKey(cardId),
    queryFn: () => getCardQuery(cardId),
  });
  const { data: activity, isLoading: isLoadingActivity } = useQuery({
    queryKey: getCardActivityQueryKey(cardId),
    queryFn: () => getCardActivityQuery(cardId),
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <CreditCard
        cardNumber={card?.data?.last4}
        cardHolder={card?.data?.cardholder.name}
      />

      <div className="border col-span-1 border-gray-200 rounded-md p-4">
        <p className="text-sm text-gray-500">Total Spend</p>
        {isLoadingActivity && (
          <div className="w-full h-8 bg-gray-200 rounded animate-pulse" />
        )}
        {!isLoadingActivity && (
          <h1 className="text-2xl font-bold">
            {(activity?.data?.totalAmount ?? 0 / 100).toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </h1>
        )}
      </div>

      <Card className="lg:col-span-2" variant="outlined">
        <CardHeader
          icon={<Money className="fill-slate-500 w-[20px] h-[20px]" />}
          title="Spending Activity"
        />
        <CardContent>
          <ActivityChart id={cardId} />
        </CardContent>
      </Card>

      <Card className="col-span-1 lg:col-span-2" variant="outlined">
        <CardHeader
          icon={<Money className="fill-slate-500 w-[20px] h-[20px]" />}
          title="Your Transactions"
        />
        <CardContent>
          <TransactionTable cardId={cardId} />
        </CardContent>
      </Card>
    </div>
  );
}
