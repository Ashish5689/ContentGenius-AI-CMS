import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import {
  ArrowUp,
  ArrowDown,
  TrendingUp,
  BarChart2,
  Target,
  Lightbulb,
} from "lucide-react";

interface InsightCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  trend?: "up" | "down" | "neutral";
  percentage?: number;
}

const InsightCard = ({
  title = "Content Insight",
  description = "This is a sample insight about your content performance.",
  icon = <Lightbulb className="h-5 w-5" />,
  trend = "neutral",
  percentage = 0,
}: InsightCardProps) => {
  return (
    <Card className="bg-white dark:bg-gray-800 h-full">
      <CardHeader className="flex flex-row items-start justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {description}
        </p>
        {trend !== "neutral" && percentage !== 0 && (
          <div className="flex items-center mt-4">
            {trend === "up" ? (
              <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
            ) : (
              <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
            )}
            <span
              className={`text-xs font-medium ${trend === "up" ? "text-green-500" : "text-red-500"}`}
            >
              {percentage}% {trend === "up" ? "increase" : "decrease"}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

interface ContentInsightsProps {
  insights?: InsightCardProps[];
  title?: string;
}

const ContentInsights = ({
  insights = [
    {
      title: "SEO Performance",
      description:
        "Your content is ranking well for target keywords. Consider expanding to related topics.",
      icon: <TrendingUp className="h-5 w-5 text-blue-500" />,
      trend: "up",
      percentage: 12,
    },
    {
      title: "Engagement Analysis",
      description:
        "Average read time has increased. Longer-form content is performing better than short posts.",
      icon: <BarChart2 className="h-5 w-5 text-purple-500" />,
      trend: "up",
      percentage: 8,
    },
    {
      title: "Content Gap",
      description:
        "Your competitors are publishing more about AI tools. Consider creating content in this area.",
      icon: <Target className="h-5 w-5 text-orange-500" />,
      trend: "neutral",
      percentage: 0,
    },
    {
      title: "Optimization Tip",
      description:
        "Adding more visuals to your technical articles could improve engagement by approximately 15%.",
      icon: <Lightbulb className="h-5 w-5 text-yellow-500" />,
      trend: "neutral",
      percentage: 0,
    },
  ],
  title = "AI-Generated Content Insights",
}: ContentInsightsProps) => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">{title}</h2>
        <span className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 px-2 py-1 rounded-full">
          Updated just now
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {insights.map((insight, index) => (
          <InsightCard key={index} {...insight} />
        ))}
      </div>

      <div className="mt-6 text-center">
        <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
          Generate more insights
        </button>
      </div>
    </div>
  );
};

export default ContentInsights;
