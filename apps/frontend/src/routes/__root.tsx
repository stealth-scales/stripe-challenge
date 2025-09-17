import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import "../App.css";
import Dog from "../components/icons/dog";

const RootLayout = () => (
  <div className="bg-white h-screen w-screen lg:max-w-5xl mx-auto">
    <div className="p-2 flex gap-2 items-center w-full my-4">
      <Dog className="w-[32px] h-[32px]" />
      <div className="text-lg text-indigo-950 font-bold tracking-wider">
        DOGGONE BANK
      </div>
    </div>
    <main className="p-2">
      <Outlet />
    </main>
    <TanStackRouterDevtools />
  </div>
);

export const Route = createRootRoute({ component: RootLayout });
