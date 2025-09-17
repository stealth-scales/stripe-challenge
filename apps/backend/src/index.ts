import { Elysia } from "elysia";
import { openapi } from "@elysiajs/openapi";
import { node } from "@elysiajs/node";
import { stripeControllerFactory } from "./stripe";
import "dotenv/config"; // Loads .env variables
import Stripe from "stripe";
import cors from "@elysiajs/cors";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const app = new Elysia({ adapter: node() })
  .use(openapi())
  .use(cors())
  .get("/", () => "Hello Elysia")
  .use(stripeControllerFactory(stripe))
  .listen(3333, ({ hostname, port }) => {
    console.log(`🦊 Elysia is running at ${hostname}:${port}`);
  });

export type App = typeof app;
