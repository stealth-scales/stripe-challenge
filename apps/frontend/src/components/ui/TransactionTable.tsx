import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  getCardTransactionsQueryKey,
  getCardTransactionsQuery,
} from "../../lib/queries";
import { TransactionTableRow } from "./TransactionTableRow";

interface TransactionTableProps {
  cardId: string;
  listFilter: "approved" | "all";
}

export const TransactionTable = ({
  cardId,
  listFilter,
}: TransactionTableProps) => {
  const [afterId, setAfterId] = useState<string | undefined>(undefined);
  const [beforeId, setBeforeId] = useState<string | undefined>(undefined);
  //   const [status, setStatus] = useState<"approved" | "all">(listFilter);
  const [pages, setPages] = useState<number>(0);
  const [lastNextPageHasMore, setLastNextPageHasMore] =
    useState<boolean>(false);

  const { data: transactions, isLoading: isLoadingTransactions } = useQuery({
    queryKey: getCardTransactionsQueryKey(
      cardId,
      10,
      afterId,
      beforeId,
      listFilter
    ),
    queryFn: () =>
      getCardTransactionsQuery(cardId, 10, afterId, beforeId, listFilter),
  });

  useEffect(() => {
    if ((afterId || (!beforeId && !afterId)) && transactions?.data?.has_more) {
      setLastNextPageHasMore(true);
    }
  }, [afterId, transactions?.data?.has_more]);

  useEffect(() => {
    setPages(0);
    setAfterId(undefined);
    setBeforeId(undefined);
  }, [listFilter]);

  return (
    <div className="flex flex-col gap-2">
      {/* <div className="flex gap-2 items-center">
        <button
          onClick={() => {
            setStatus("all");
            setPages(0);
            setAfterId(undefined);
            setBeforeId(undefined);
          }}
          className="text-xs text-blue-500 disabled:text-gray-500 p-2 rounded-md border border-blue-500"
        >
          All Transactions
        </button>
        <button
          onClick={() => {
            setStatus("approved");
            setPages(0);
            setAfterId(undefined);
            setBeforeId(undefined);
          }}
          className="text-xs text-blue-500 disabled:text-gray-500 p-2 rounded-md border border-blue-500"
        >
          Approved Transactions
        </button>
        <button className="text-xs text-blue-500 disabled:text-gray-500 p-2 rounded-md border border-blue-500">
          Declined Transactions
        </button>
      </div> */}
      <table>
        <thead>
          <tr className="text-left text-slate-500 text-sm">
            <th className="font-medium pl-2">Date</th>
            <th className="font-medium hidden lg:table-cell">Status</th>
            <th className="font-medium">Name</th>
            <th className="font-medium">Location</th>
            <th className="font-medium hidden lg:table-cell">Category</th>
            <th className="text-right font-medium pr-2">Amount</th>
          </tr>
        </thead>
        <tbody>
          {isLoadingTransactions &&
            [...Array(10)].map((_, index) => (
              <tr>
                <td colSpan={6} className="text-center h-12 relative">
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
              location={transaction.location}
              category={transaction.category}
            />
          ))}
        </tbody>
      </table>
      <div className="flex gap-2 text-xs justify-between items-center">
        <div className="">
          <p className="text-gray-500">Page {pages + 1}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setBeforeId(transactions?.data?.data.at(0)?.id ?? "");
              setPages(pages - 1);
              setAfterId(undefined);
            }}
            disabled={pages === 0 || isLoadingTransactions}
            className="cursor-pointer drop-shadow-xs text-gray-700 bg-white border border-gray-200 rounded-md px-2 py-1 disabled:cursor-not-allowed disabled:text-gray-500 disabled:bg-gray-100"
          >
            Load Previous
          </button>
          <button
            onClick={() => {
              setAfterId(transactions?.data?.data.at(-1)?.id ?? "");
              setPages(pages + 1);
              setBeforeId(undefined);
            }}
            disabled={!lastNextPageHasMore || isLoadingTransactions}
            className="cursor-pointer drop-shadow-xs text-gray-700 bg-white border border-gray-200 rounded-md px-2 py-1 disabled:cursor-not-allowed disabled:text-gray-500 disabled:bg-gray-100"
          >
            Load More
          </button>
        </div>
      </div>
    </div>
  );
};
