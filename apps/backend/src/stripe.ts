import Elysia from "elysia";
import Stripe from "stripe";
import { mccToCategory } from "./lib/categorize";

const stripeControllerFactory = (stripe: Stripe) => {
  const cardsController = new Elysia()
    .get("/cards/:id", ({ params }) => {
      return stripe.issuing.cards.retrieve(params.id);
    })
    .get("/cards/:id/activity", async ({ params, query }) => {
      const transactions: Stripe.Issuing.Transaction[] = [];
      let has_more = true;
      while (has_more) {
        console.log("has_more", has_more);
        const _transactions = await stripe.issuing.transactions.list({
          card: params.id,
          limit: 100,
          starting_after: transactions.at(-1)?.id,
        });
        transactions.push(..._transactions.data);
        has_more = _transactions.has_more;
      }

      console.log("length", transactions.length);

      // Aggregate the transacations by category

      const activity: { [key: string]: { amount: number; count: number } } = {};

      for (const transaction of transactions) {
        const category = mccToCategory[transaction.merchant_data.category_code];
        if (!activity[category]) {
          activity[category] = { amount: 0, count: 0 };
        }
        activity[category].amount += transaction.amount;
        activity[category].count++;
      }

      return {
        totalTransactions: transactions.length,
        totalAmount: transactions.reduce(
          (acc, transaction) => acc + transaction.amount,
          0
        ),
        activity,
      };
    })
    .get("/cards/:id/transactions", async ({ params, query }) => {
      const limit = query.limit ? parseInt(query.limit as string) : 10;
      const after = query.after ? (query.after as string) : undefined;
      const before = query.before ? (query.before as string) : undefined;
      const status = query.status
        ? (query.status as "all" | "approved")
        : "all";
      if (after && before) {
        throw new Error("after and before cannot be used together");
      }
      switch (status) {
        case "approved":
          const transactions = await stripe.issuing.transactions.list({
            card: params.id,
            starting_after: after,
            ending_before: before,
            limit,
          });
          return {
            has_more: transactions.has_more,
            data: transactions.data.map((transaction) => ({
              amount: transaction.amount,
              created: transaction.created,
              id: transaction.id,
              description: transaction.merchant_data.name,
              category: transaction.merchant_data.category,
              status: "approved",
            })),
          };
        default:
          const authorizations = await stripe.issuing.authorizations.list({
            card: params.id,
            starting_after: after,
            ending_before: before,
            limit,
          });
          return {
            has_more: authorizations.has_more,
            data: authorizations.data.map((authorization) => ({
              amount: authorization.amount,
              created: authorization.created,
              id: authorization.id,
              description: authorization.merchant_data.name,
              category: authorization.merchant_data.category,
              status: authorization.approved
                ? "approved"
                : authorization.status == "closed"
                ? "declined"
                : "pending",
            })),
          };
      }
    });
  return cardsController;
};

export { stripeControllerFactory };
