import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  getCardTransactionsQueryKey,
  getCardTransactionsQuery,
} from "../../lib/queries";
import { TransactionTableRow } from "./TransactionTableRow";

interface TransactionTableProps {
  cardId: string;
}

export const TransactionTable = ({ cardId }: TransactionTableProps) => {
  const [afterId, setAfterId] = useState<string | undefined>(undefined);
  const [beforeId, setBeforeId] = useState<string | undefined>(undefined);
  const [pages, setPages] = useState<number>(0);
  const [lastNextPageHasMore, setLastNextPageHasMore] =
    useState<boolean>(false);

  const { data: transactions, isLoading: isLoadingTransactions } = useQuery({
    queryKey: getCardTransactionsQueryKey(cardId, 10, afterId, beforeId),
    queryFn: () => getCardTransactionsQuery(cardId, 10, afterId, beforeId),
  });

  useEffect(() => {
    if ((afterId || (!beforeId && !afterId)) && transactions?.data?.has_more) {
      setLastNextPageHasMore(true);
    }
  }, [afterId, transactions?.data?.has_more]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 items-center">
        <button className="text-sm text-blue-500 disabled:text-gray-500 p-2 rounded-md border border-blue-500">
          All Transactions
        </button>
        <button className="text-sm text-blue-500 disabled:text-gray-500 p-2 rounded-md border border-blue-500">
          Approved Transactions
        </button>
        <button className="text-sm text-blue-500 disabled:text-gray-500 p-2 rounded-md border border-blue-500">
          Declined Transactions
        </button>
      </div>
      <table>
        <thead>
          <tr className="text-left text-slate-500">
            <th className="font-medium">Date</th>
            <th className="font-medium">Status</th>
            <th className="font-medium">Name</th>
            <th className="text-right font-medium">Amount</th>
          </tr>
        </thead>
        <tbody>
          {isLoadingTransactions &&
            [...Array(10)].map((_, index) => (
              <tr>
                <td colSpan={4} className="text-center h-12 relative">
                  <div className="absolute inset-2 bg-gray-100 rounded-md animate-pulse"></div>
                </td>
              </tr>
            ))}
          {transactions?.data?.data.map((transaction) => (
            <TransactionTableRow
              key={transaction.id}
              created={transaction.created}
              status={transaction.status as "approved" | "declined" | "pending"}
              name={transaction.description ?? "Unknown"}
              amount={transaction.amount}
            />
          ))}
        </tbody>
      </table>
      <div className="flex gap-2">
        <button
          onClick={() => {
            setBeforeId(transactions?.data?.data.at(0)?.id ?? "");
            setPages(pages - 1);
            setAfterId(undefined);
          }}
          disabled={pages === 0}
          className="text-sm text-blue-500 disabled:text-gray-500"
        >
          Load Previous
        </button>
        <button
          onClick={() => {
            setAfterId(transactions?.data?.data.at(-1)?.id ?? "");
            setPages(pages + 1);
            setBeforeId(undefined);
          }}
          disabled={!lastNextPageHasMore}
          className="text-sm text-blue-500 disabled:text-gray-500"
        >
          Load More
        </button>
      </div>
    </div>
  );
};
