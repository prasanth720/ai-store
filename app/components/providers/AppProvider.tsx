"use client";

import { useEffect } from "react";
import { useUserStore } from "@/app/store/userStore";

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const loadUser = useUserStore((s) => s.loadUser);

  useEffect(() => {
    loadUser();
  }, []);

  return <>{children}</>;
}