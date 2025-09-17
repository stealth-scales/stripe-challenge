import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  getCardActivityQuery,
  getCardActivityQueryKey,
} from "../../lib/queries";

interface ActivityData {
  totalTransactions: number;
  totalAmount: number;
  activity: {
    [category: string]: {
      amount: number;
      count: number;
    };
  };
}

export const ActivityChart = ({ id }: { id: string }) => {
  const { data: activityResponse, isLoading } = useQuery({
    queryKey: getCardActivityQueryKey(id),
    queryFn: () => getCardActivityQuery(id),
  });

  const activityData = activityResponse?.data as ActivityData | undefined;
  const [hiddenCategories, setHiddenCategories] = useState<Set<string>>(
    new Set()
  );

  if (isLoading) {
    return (
      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-2 space-y-3 ">
        {[...Array(9)].map((_, i) => (
          <div
            key={i}
            className="flex h-8 items-center space-x-3 col-span-1 border border-gray-200 rounded-md p-2"
          >
            <div className="w-4 h-4 bg-gray-200 rounded animate-pulse" />
            <div className="flex-1 h-4 bg-gray-200 rounded animate-pulse" />
            <div className="w-16 h-4 bg-gray-200 rounded animate-pulse" />
          </div>
        ))}
      </div>
    );
  }

  if (!activityData?.activity) {
    return (
      <div className="text-gray-500 text-center py-8">
        No activity data available
      </div>
    );
  }

  // Sort categories by amount (descending)
  const sortedCategories = Object.entries(activityData.activity)
    .filter(([category]) => category && category !== "undefined")
    .sort(([, a], [, b]) => b.amount - a.amount);

  if (sortedCategories.length === 0) {
    return (
      <div className="text-gray-500 text-center py-8">
        No categorized transactions found
      </div>
    );
  }

  // Filter out hidden categories for the bar
  const visibleCategories = sortedCategories.filter(
    ([category]) => !hiddenCategories.has(category)
  );
  const totalVisibleAmount = visibleCategories.reduce(
    (sum, [, data]) => sum + Math.abs(data.amount),
    0
  );

  const toggleCategory = (category: string) => {
    const newHidden = new Set(hiddenCategories);
    if (newHidden.has(category)) {
      newHidden.delete(category);
    } else {
      newHidden.add(category);
    }
    setHiddenCategories(newHidden);
  };

  const formatAmount = (amount: number) => {
    return `${(Math.abs(amount) / 100).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    })}`;
  };

  // Simple color palette
  const simpleColors = [
    "bg-blue-500",
    "bg-green-500",
    "bg-purple-500",
    "bg-orange-500",
    "bg-pink-500",
    "bg-teal-500",
    "bg-red-500",
    "bg-indigo-500",
    "bg-yellow-500",
    "bg-cyan-500",
  ];

  return (
    <div className="w-full space-y-4">
      {/* The line with segments */}
      <div className="w-full h-4 bg-gray-200 rounded-sm overflow-hidden flex">
        {visibleCategories.map(([category, data]) => {
          // Find the original index to maintain consistent colors
          const originalIndex = sortedCategories.findIndex(
            ([cat]) => cat === category
          );
          const percentage =
            totalVisibleAmount > 0
              ? (Math.abs(data.amount) / totalVisibleAmount) * 100
              : 0;
          const colorClass = simpleColors[originalIndex % simpleColors.length];

          return (
            <div
              key={category}
              className={colorClass}
              style={{ width: `${percentage}%` }}
              title={`${category}: ${formatAmount(data.amount)}`}
            />
          );
        })}
      </div>

      {/* Category legend with toggle */}
      <div className="space-y-2 grid grid-cols-1 lg:grid-cols-3 gap-2">
        {sortedCategories.map(([category, data], index) => {
          const colorClass = simpleColors[index % simpleColors.length];
          const isHidden = hiddenCategories.has(category);

          return (
            <div
              key={category}
              onClick={() => toggleCategory(category)}
              className={`flex h-8 items-center text-xs justify-between p-2 rounded cursor-pointer transition-all ${
                isHidden
                  ? "bg-gray-100 opacity-50"
                  : "bg-white hover:bg-gray-50 border border-gray-200"
              }`}
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`w-4 h-4 rounded-sm ${colorClass} ${
                    isHidden ? "opacity-30" : ""
                  }`}
                />
                <span
                  className={`font-medium ${
                    isHidden ? "text-gray-400 line-through" : "text-gray-700"
                  }`}
                >
                  {category}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span
                  className={`font-semibold ${
                    isHidden ? "text-gray-400" : "text-gray-900"
                  }`}
                >
                  {formatAmount(data.amount)}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {hiddenCategories.size > 0 && (
        <div className="text-xs text-gray-500 text-center">
          Click categories to show/hide them from the chart
        </div>
      )}
    </div>
  );
};
