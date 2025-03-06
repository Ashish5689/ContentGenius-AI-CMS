"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Get the session directly from Supabase
        const {
          data: { session },
        } = await supabase.auth.getSession();
        console.log("Session check:", { session, pathname });

        const hasSession = !!session;
        setIsAuthenticated(hasSession);

        // If not authenticated and not on login/signup page, redirect to login
        if (!hasSession && !["/login", "/signup"].includes(pathname)) {
          console.log("No session, redirecting to login");
          window.location.href = "/login";
          return;
        }

        // If authenticated and on login/signup page, redirect to dashboard
        if (hasSession && ["/login", "/signup"].includes(pathname)) {
          console.log("Has session, redirecting to dashboard");
          window.location.href = "/";
          return;
        }
      } catch (error) {
        console.error("Auth check error:", error);
        // On error, redirect to login if not already on login/signup page
        if (!["/login", "/signup"].includes(pathname)) {
          window.location.href = "/login";
        }
      } finally {
        setIsLoading(false);
      }
    };

    // Set up auth state change listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed:", event, !!session);
      setIsAuthenticated(!!session);

      if (event === "SIGNED_IN" && ["/login", "/signup"].includes(pathname)) {
        window.location.href = "/";
      } else if (
        event === "SIGNED_OUT" &&
        !["/login", "/signup"].includes(pathname)
      ) {
        window.location.href = "/login";
      }
    });

    checkAuth();

    // Cleanup subscription
    return () => {
      subscription.unsubscribe();
    };
  }, [pathname]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
      </div>
    );
  }

  // For login/signup pages or authenticated users, render children
  if (isAuthenticated || ["/login", "/signup"].includes(pathname)) {
    return <>{children}</>;
  }

  // This should not be reached due to redirects, but as a fallback
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
    </div>
  );
}
