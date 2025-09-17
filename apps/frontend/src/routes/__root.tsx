import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import "../App.css";
import Dog from "../components/icons/dog";

const RootLayout = () => (
  <div className="bg-white h-screen max-w-screen lg:max-w-5xl mx-auto border-r border-l border-gray-200 lg:px-4">
    <div className="absolute h-96 border-b border-gray-200 w-full left-0"></div>
    <div className="p-2 relative z-10 flex gap-2 items-center w-full">
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
