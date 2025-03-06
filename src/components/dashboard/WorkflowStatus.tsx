import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  ArrowRight,
  Edit,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface WorkflowItem {
  id: string;
  title: string;
  status: "draft" | "review" | "ready" | "published" | "rejected";
  dueDate?: string;
  assignee?: string;
}

interface WorkflowStatusProps {
  items?: WorkflowItem[];
  title?: string;
}

const statusConfig = {
  draft: {
    label: "Draft",
    color: "bg-slate-100 text-slate-800",
    icon: Clock,
  },
  review: {
    label: "In Review",
    color: "bg-blue-100 text-blue-800",
    icon: AlertCircle,
  },
  ready: {
    label: "Ready",
    color: "bg-amber-100 text-amber-800",
    icon: CheckCircle,
  },
  published: {
    label: "Published",
    color: "bg-green-100 text-green-800",
    icon: CheckCircle,
  },
  rejected: {
    label: "Rejected",
    color: "bg-red-100 text-red-800",
    icon: XCircle,
  },
};

const defaultItems: WorkflowItem[] = [
  {
    id: "1",
    title: "10 Tips for Effective Content Marketing",
    status: "draft",
    dueDate: "2023-06-15",
    assignee: "Alex Johnson",
  },
  {
    id: "2",
    title: "The Ultimate Guide to SEO in 2023",
    status: "review",
    dueDate: "2023-06-10",
    assignee: "Maria Garcia",
  },
  {
    id: "3",
    title: "How AI is Transforming Content Creation",
    status: "ready",
    dueDate: "2023-06-08",
    assignee: "Sam Wilson",
  },
  {
    id: "4",
    title: "Social Media Strategies for Small Businesses",
    status: "published",
    dueDate: "2023-06-05",
    assignee: "Taylor Smith",
  },
  {
    id: "5",
    title: "Email Marketing Best Practices",
    status: "rejected",
    dueDate: "2023-06-12",
    assignee: "Jordan Lee",
  },
];

const WorkflowStatus = ({
  items = defaultItems,
  title = "Content Workflow Status",
}: WorkflowStatusProps) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return "No date";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Card className="w-full bg-white">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
        <Button variant="ghost" size="sm" className="text-sm">
          View All <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.map((item) => {
            const status = statusConfig[item.status];
            const StatusIcon = status.icon;

            return (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-lg border p-4 hover:bg-slate-50"
              >
                <div className="flex items-start space-x-4">
                  <div
                    className={cn(
                      "rounded-full p-2",
                      status.color.split(" ")[0],
                    )}
                  >
                    <StatusIcon
                      className={cn("h-5 w-5", status.color.split(" ")[1])}
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">{item.title}</h3>
                    <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                      <span>Due: {formatDate(item.dueDate)}</span>
                      {item.assignee && (
                        <>
                          <span>•</span>
                          <span>Assigned to: {item.assignee}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={status.color}>{status.label}</Badge>
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkflowStatus;
