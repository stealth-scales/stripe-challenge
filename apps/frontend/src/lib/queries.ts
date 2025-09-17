import { treaty } from "@elysiajs/eden";
import { App } from "../../../backend/src";

export const api = treaty<App>("http://localhost:3333");

const getCardQuery = async (id: string) => {
  const card = await api.cards({ id }).get();
  return card;
};

const getCardTransactionsQuery = async (
  id: string,
  limit?: number,
  after?: string,
  before?: string
) => {
  const transactuons = await api
    .cards({ id })
    .transactions.get({ query: { limit, after, before, status: "approved" } });
  return transactuons;
};

const getCardActivityQuery = async (id: string) => {
  const activity = await api.cards({ id }).activity.get();
  return activity;
};

const getCardActivityQueryKey = (id: string) => ["card", id, "activity"];
const getCardQueryKey = (id: string) => ["card", id];
const getCardTransactionsQueryKey = (
  id: string,
  limit?: number,
  after?: string,
  before?: string
) => [...getCardQueryKey(id), "transactions", limit, after, before];

export {
  getCardQuery,
  getCardTransactionsQuery,
  getCardQueryKey,
  getCardTransactionsQueryKey,
  getCardActivityQuery,
  getCardActivityQueryKey,
};
