import React from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import Overview from "@/components/dashboard/Overview";

export default function Home() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar activeItem="dashboard" />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header
          username="John Doe"
          userInitials="JD"
          unreadNotifications={3}
          unreadMessages={2}
        />
        <main className="flex-1 overflow-auto">
          <Overview />
        </main>
      </div>
    </div>
  );
}
