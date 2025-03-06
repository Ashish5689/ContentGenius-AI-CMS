import React from "react";
import StatCards from "./StatCards";
import RecentContent from "./RecentContent";
import ContentInsights from "./ContentInsights";
import WorkflowStatus from "./WorkflowStatus";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, Sparkles } from "lucide-react";

interface OverviewProps {
  className?: string;
}

const Overview = ({ className = "" }: OverviewProps) => {
  return (
    <div className={`flex flex-col gap-6 p-6 bg-gray-50 ${className}`}>
      {/* Quick Actions */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Sparkles className="h-4 w-4" />
            Generate Content
          </Button>
          <Button className="gap-2">
            <PlusCircle className="h-4 w-4" />
            New Content
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <StatCards />

      {/* Main Content Area */}
      <Tabs defaultValue="recent" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="recent">Recent Activity</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
          <TabsTrigger value="workflow">Workflow</TabsTrigger>
        </TabsList>

        <TabsContent value="recent" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RecentContent />
            <Card className="bg-white">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Quick Tips</h2>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-blue-100 p-1 mt-0.5">
                      <Sparkles className="h-3 w-3 text-blue-600" />
                    </div>
                    <span className="text-sm">
                      Use AI to generate content ideas based on trending topics
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-blue-100 p-1 mt-0.5">
                      <Sparkles className="h-3 w-3 text-blue-600" />
                    </div>
                    <span className="text-sm">
                      Schedule content publication for optimal engagement times
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-blue-100 p-1 mt-0.5">
                      <Sparkles className="h-3 w-3 text-blue-600" />
                    </div>
                    <span className="text-sm">
                      Analyze your best performing content to identify patterns
                    </span>
                  </li>
                </ul>
                <Button variant="link" className="mt-4 p-0">
                  View all tips
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <ContentInsights />
        </TabsContent>

        <TabsContent value="workflow" className="space-y-6">
          <WorkflowStatus />
        </TabsContent>
      </Tabs>

      {/* Performance Summary */}
      <Card className="bg-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">
              Content Performance Summary
            </h2>
            <Button variant="outline" size="sm">
              View Detailed Analytics
            </Button>
          </div>
          <div className="h-64 flex items-center justify-center border rounded-md bg-gray-50">
            <p className="text-muted-foreground">
              Performance charts and metrics will appear here
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Overview;
