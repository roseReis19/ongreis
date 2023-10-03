"use client";

import { SessionProvider } from "next-auth/react";
import "react-notifications/lib/notifications.css";
import { NotificationContainer } from "react-notifications";

export default function Providers({ children }) {
  return (
    <SessionProvider>
      <NotificationContainer />
      {children}
    </SessionProvider>
  );
}
