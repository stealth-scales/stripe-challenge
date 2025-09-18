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
import { useState } from "react";
import { cn } from "../lib/utils";
import { TransactionListMobile } from "../components/ui/TransactionListMobile";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  // If you want to change the card...
  const cardId = "ic_1I1OFqE8hHKqEw8LK31tUA4U";

  const { data: card } = useQuery({
    queryKey: getCardQueryKey(cardId),
    queryFn: () => getCardQuery(cardId),
  });
  const { data: activity, isLoading: isLoadingActivity } = useQuery({
    queryKey: getCardActivityQueryKey(cardId),
    queryFn: () => getCardActivityQuery(cardId),
  });

  const [listFilter, setListFilter] = useState<"all" | "approved">("approved");

  return (
    <div className="grid z-10 grid-cols-1 lg:grid-cols-2 gap-4 relative">
      <CreditCard
        cardNumber={card?.data?.last4}
        cardHolder={card?.data?.cardholder.name}
      />

      <div className="border col-span-1 bg-white border-gray-200 rounded-md p-4">
        {isLoadingActivity && (
          <div className="w-full h-6 mb-1 bg-gray-200 rounded animate-pulse" />
        )}
        {!isLoadingActivity && (
          <p className="text-sm text-gray-500">Total Spend</p>
        )}
        {isLoadingActivity && (
          <div className="w-full h-8 bg-gray-200 rounded animate-pulse" />
        )}
        {!isLoadingActivity && (
          <h1 className="text-2xl font-bold">
            {((activity?.data?.totalAmount ?? 0) / 100).toLocaleString(
              "en-US",
              {
                style: "currency",
                currency: "USD",
              }
            )}
          </h1>
        )}
        {isLoadingActivity && (
          <div className="w-full h-4 mt-1 bg-gray-200 rounded animate-pulse" />
        )}
        {!isLoadingActivity && (
          <p className="text-xs text-gray-500">
            {activity?.data?.averageAmount && (
              <span className="text-sm text-gray-500">
                Average Spend:{" "}
                {(activity?.data?.averageAmount / 100).toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </span>
            )}
          </p>
        )}
      </div>

      <Card className="lg:col-span-2" variant="filled">
        <CardHeader
          icon={<Money className="fill-slate-500 w-[20px] h-[20px]" />}
          title="Spending Activity"
        />
        <CardContent>
          <ActivityChart id={cardId} />
        </CardContent>
      </Card>

      <Card className="col-span-1 lg:col-span-2" variant="filled">
        <CardHeader
          icon={<Money className="fill-slate-500 w-[20px] h-[20px]" />}
          title="Your Transactions"
          className="flex flex-col lg:flex-row justify-between items-center"
        >
          <div className="flex flex-row justify-end gap-2 flex-1 text-xs font-sans tracking-normal">
            <button
              onClick={() => setListFilter("all")}
              className={cn(
                "text-gray-500 px-2 box-border border border-transparent rounded-md py-1 cursor-pointer",
                {
                  "text-gray-700 bg-white border border-gray-200 rounded-md px-2  drop-shadow-xs":
                    listFilter === "all",
                }
              )}
            >
              All Authorizations
            </button>
            <button
              onClick={() => setListFilter("approved")}
              className={cn(
                "text-gray-500 px-2 box-border border border-transparent rounded-md py-1 cursor-pointer",
                {
                  "text-gray-700 bg-white border border-gray-200 rounded-md px-2  drop-shadow-xs":
                    listFilter === "approved",
                }
              )}
            >
              Approved Transactions
            </button>
          </div>
        </CardHeader>
        <CardContent className="hidden lg:block">
          <TransactionTable cardId={cardId} listFilter={listFilter} />
        </CardContent>
        <div className="block lg:hidden">
          <TransactionListMobile cardId={cardId} listFilter={listFilter} />
        </div>
      </Card>
    </div>
  );
}
