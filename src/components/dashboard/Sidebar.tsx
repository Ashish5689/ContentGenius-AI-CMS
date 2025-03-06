"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import {
  LayoutDashboard,
  FileEdit,
  Library,
  BarChart2,
  GitBranch,
  Settings,
  LogOut,
  HelpCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/auth";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  isActive?: boolean;
  badge?: string;
}

const NavItem = ({
  icon,
  label,
  href = "#",
  isActive = false,
  badge,
}: NavItemProps) => {
  return (
    <a
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-accent",
        isActive
          ? "bg-accent text-accent-foreground font-medium"
          : "text-muted-foreground",
      )}
    >
      <div className="text-muted-foreground">{icon}</div>
      <span>{label}</span>
      {badge && (
        <Badge
          variant="secondary"
          className="ml-auto h-5 min-w-5 px-1 flex items-center justify-center"
        >
          {badge}
        </Badge>
      )}
    </a>
  );
};

interface SidebarProps {
  className?: string;
  userName?: string;
  userEmail?: string;
  userAvatar?: string;
  activeItem?: string;
}

const Sidebar = ({
  className,
  userName = "John Doe",
  userEmail = "john@example.com",
  userAvatar = "",
  activeItem = "dashboard",
}: SidebarProps) => {
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    window.location.href = "/login";
  };
  return (
    <div
      className={cn(
        "flex h-full w-[280px] flex-col border-r bg-background",
        className,
      )}
    >
      <div className="flex h-14 items-center border-b px-4">
        <h2 className="text-lg font-semibold">Content CMS</h2>
      </div>

      <div className="flex-1 overflow-auto py-2">
        <nav className="grid gap-1 px-2">
          <NavItem
            icon={<LayoutDashboard className="h-5 w-5" />}
            label="Dashboard"
            href="/"
            isActive={activeItem === "dashboard"}
          />
          <NavItem
            icon={<FileEdit className="h-5 w-5" />}
            label="Content Editor"
            href="/editor"
            isActive={activeItem === "editor"}
          />
          <NavItem
            icon={<Library className="h-5 w-5" />}
            label="Content Library"
            href="/library"
            isActive={activeItem === "library"}
            badge="42"
          />
          <NavItem
            icon={<BarChart2 className="h-5 w-5" />}
            label="Analytics"
            href="/analytics"
            isActive={activeItem === "analytics"}
          />
          <NavItem
            icon={<GitBranch className="h-5 w-5" />}
            label="Workflow"
            href="/workflow"
            isActive={activeItem === "workflow"}
            badge="5"
          />
          <NavItem
            icon={<Settings className="h-5 w-5" />}
            label="Settings"
            href="/settings"
            isActive={activeItem === "settings"}
          />
        </nav>
      </div>

      <div className="mt-auto border-t p-4">
        <div className="flex items-center gap-3">
          <Avatar>
            {userAvatar ? (
              <AvatarImage src={userAvatar} alt={userName} />
            ) : (
              <AvatarFallback>
                {userName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            )}
          </Avatar>
          <div className="flex flex-col overflow-hidden">
            <span className="truncate text-sm font-medium">{userName}</span>
            <span className="truncate text-xs text-muted-foreground">
              {userEmail}
            </span>
          </div>
          <div className="ml-auto flex">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <HelpCircle className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Help & Resources</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Log out</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
