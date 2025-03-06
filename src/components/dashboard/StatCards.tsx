import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  ArrowDown,
  ArrowUp,
  FileText,
  FileCheck,
  FilePen,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

const StatCard = ({ title, value, icon, trend, className }: StatCardProps) => {
  return (
    <Card className={cn("bg-card", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="h-8 w-8 rounded-md bg-primary/10 p-1.5 text-primary">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {trend && (
          <div className="mt-2 flex items-center text-xs">
            <span
              className={cn(
                "flex items-center gap-1",
                trend.isPositive ? "text-green-500" : "text-red-500",
              )}
            >
              {trend.isPositive ? (
                <ArrowUp className="h-3 w-3" />
              ) : (
                <ArrowDown className="h-3 w-3" />
              )}
              {trend.value}%
            </span>
            <span className="ml-1 text-muted-foreground">from last month</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

interface StatCardsProps {
  className?: string;
  stats?: {
    totalContent: number;
    publishedContent: number;
    drafts: number;
    performance: number;
  };
}

const StatCards = ({
  className,
  stats = {
    totalContent: 124,
    publishedContent: 87,
    drafts: 37,
    performance: 12.5,
  },
}: StatCardsProps) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4",
        className,
      )}
    >
      <StatCard
        title="Total Content"
        value={stats.totalContent}
        icon={<FileText />}
        trend={{ value: 8.2, isPositive: true }}
      />
      <StatCard
        title="Published Content"
        value={stats.publishedContent}
        icon={<FileCheck />}
        trend={{ value: 5.1, isPositive: true }}
      />
      <StatCard
        title="Drafts"
        value={stats.drafts}
        icon={<FilePen />}
        trend={{ value: 2.3, isPositive: false }}
      />
      <StatCard
        title="Content Performance"
        value={`${stats.performance}%`}
        icon={<TrendingUp />}
        trend={{ value: 4.7, isPositive: true }}
      />
    </div>
  );
};

export default StatCards;
