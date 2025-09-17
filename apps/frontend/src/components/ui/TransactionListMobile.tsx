import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  getCardTransactionsQuery,
  getCardTransactionsQueryKey,
} from "../../lib/queries";
import { TransactionListMobileRow } from "./TransactionListMobileRow";
import { useCallback, useEffect, useRef } from "react";

interface TransactionListMobileProps {
  cardId: string;
  listFilter: "approved" | "all";
}

interface Transaction {
  amount: number;
  created: number;
  id: string;
  description: string | null;
  location: string;
  category: string;
  status: string; // Will be cast to specific type when used
}

// Helper function to format date for grouping
const formatDateForGrouping = (timestamp: number): string => {
  const date = new Date(timestamp * 1000); // Convert Unix timestamp to Date
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  // Check if the date is today
  if (date.toDateString() === today.toDateString()) {
    return "Today";
  }

  // Check if the date is yesterday
  if (date.toDateString() === yesterday.toDateString()) {
    return "Yesterday";
  }

  // For other dates, format as "Month Day, Year"
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

// Helper function to group transactions by date
const groupTransactionsByDate = (transactions: Transaction[]) => {
  const grouped = transactions.reduce((acc, transaction) => {
    const dateKey = formatDateForGrouping(transaction.created);
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(transaction);
    return acc;
  }, {} as Record<string, Transaction[]>);

  // Convert to array and sort by date (most recent first)
  return Object.entries(grouped).sort(([dateA], [dateB]) => {
    // Handle "Today" and "Yesterday" specially
    if (dateA === "Today") return -1;
    if (dateB === "Today") return 1;
    if (dateA === "Yesterday") return -1;
    if (dateB === "Yesterday") return 1;

    // For other dates, parse and compare
    const dateObjA = new Date(dateA);
    const dateObjB = new Date(dateB);
    return dateObjB.getTime() - dateObjA.getTime();
  });
};

export const TransactionListMobile = ({
  cardId,
  listFilter,
}: TransactionListMobileProps) => {
  const {
    data: transactions,
    isLoading: isLoadingTransactions,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["infinite", listFilter],
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => (lastPage as any).data.data.at(-1)?.id,
    queryFn: ({ pageParam }) =>
      getCardTransactionsQuery(
        cardId,
        10,
        pageParam as string | undefined,
        undefined,
        listFilter
      ),
  });

  const observerRef = useRef<HTMLDivElement>(null);

  // Intersection observer for infinite scroll
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;
      if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  useEffect(() => {
    const element = observerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0.1,
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, [handleObserver]);

  if (isLoadingTransactions) {
    return (
      <div className="flex flex-col gap-2">
        {/* Loading skeleton */}
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-16 bg-gray-200 rounded animate-pulse" />
        ))}
      </div>
    );
  }

  const transactionData: Transaction[] =
    transactions?.pages?.flatMap((page) => (page as any).data.data) || [];
  const groupedTransactions = groupTransactionsByDate(transactionData);

  return (
    <div className="flex flex-col gap-4">
      {groupedTransactions.map(([date, dateTransactions]) => (
        <div key={date} className="flex flex-col gap-2">
          {/* Date header */}
          <h3 className="text-sm font-semibold text-indigo-600 px-2 py-1 bg-indigo-50 rounded-md">
            {date}
          </h3>
          {/* Transactions for this date */}
          <div className="flex flex-col gap-2 px-2">
            {dateTransactions.map((transaction) => (
              <TransactionListMobileRow
                key={transaction.id}
                created={transaction.created}
                status={
                  transaction.status as "approved" | "declined" | "pending"
                }
                name={transaction.description ?? "Unknown"}
                amount={transaction.amount}
                location={transaction.location}
                category={transaction.category}
              />
            ))}
          </div>
        </div>
      ))}
      {/* Intersection observer target for infinite scroll */}
      <div ref={observerRef} className="h-1" />

      {/* Loading indicator for fetching more data */}
      {isFetchingNextPage && (
        <div className="flex flex-col gap-2 px-2">
          <div className="text-center text-sm text-gray-500 py-2">
            Loading more transactions...
          </div>
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="h-16 bg-gray-200 rounded animate-pulse" />
          ))}
        </div>
      )}

      {/* End of list indicator */}
      {!hasNextPage && transactionData.length > 0 && (
        <div className="text-center text-sm text-gray-400 py-4">
          No more transactions to load
        </div>
      )}
    </div>
  );
};
