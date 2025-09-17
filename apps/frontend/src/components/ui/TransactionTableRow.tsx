import { cn } from "../../lib/utils";

export const TransactionTableRow = ({
  created,
  status,
  name,
  amount,
  location,
  category,
}: {
  created: number;
  status: "approved" | "declined" | "pending";
  name: string;
  amount: number;
  location: string;
  category: string;
}) => {
  return (
    <tr className="text-left text-sm text-gray-500 h-12 not-last:border-b border-gray-200">
      <td className="pl-2">
        {new Date(created * 1000).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      </td>
      <td className="hidden lg:table-cell">
        <div
          className={cn("w-fit text-xs uppercase px-2 py-1 rounded-md", {
            "bg-green-100 text-green-800": status === "approved",
            "bg-red-100 text-red-800": status === "declined",
            "bg-yellow-100 text-yellow-800": status === "pending",
          })}
        >
          {status}
        </div>
      </td>
      <td>{name}</td>
      <td className="text-xs text-gray-400">{location}</td>
      <td className="text-xs text-gray-400 hidden lg:table-cell">{category}</td>
      <td className="text-right font-mono pr-2 text-base font-bold">
        {(amount / 100).toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })}
      </td>
    </tr>
  );
};
