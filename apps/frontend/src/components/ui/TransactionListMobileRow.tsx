import Check from "../icons/check";
import Clock from "../icons/clock";
import X from "../icons/X";

export const TransactionListMobileRow = ({
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
    <div className="flex flex-row gap-3 items-center">
      <div>
        {status === "approved" && <Check className="w-6 h-6 text-green-500" />}
        {status === "declined" && <X className="w-6 h-6 text-red-500" />}
        {status === "pending" && <Clock className="w-6 h-6 text-yellow-500" />}
      </div>
      <div>
        <p>{name}</p>
        <p className="text-xs text-gray-400">{location}</p>
      </div>
      <div className="flex-1 text-right">
        <p>
          {(amount / 100).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </p>
        <p className="text-xs text-gray-400">{category}</p>
      </div>
    </div>
  );
};
