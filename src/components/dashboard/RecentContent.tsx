import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "../ui/table";
import { Button } from "../ui/button";
import {
  Eye,
  Edit,
  Trash2,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

interface ContentItem {
  id: string;
  title: string;
  status: "draft" | "review" | "published" | "scheduled";
  lastModified: string;
  author: string;
}

interface RecentContentProps {
  items?: ContentItem[];
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "published":
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case "draft":
      return <Clock className="h-4 w-4 text-amber-500" />;
    case "review":
      return <AlertCircle className="h-4 w-4 text-blue-500" />;
    case "scheduled":
      return <Clock className="h-4 w-4 text-purple-500" />;
    default:
      return null;
  }
};

const getStatusClass = (status: string) => {
  switch (status) {
    case "published":
      return "bg-green-100 text-green-800";
    case "draft":
      return "bg-amber-100 text-amber-800";
    case "review":
      return "bg-blue-100 text-blue-800";
    case "scheduled":
      return "bg-purple-100 text-purple-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const RecentContent = ({
  items = [
    {
      id: "1",
      title: "AI-Powered Marketing Strategies for 2024",
      status: "published",
      lastModified: "2023-11-15",
      author: "Jane Smith",
    },
    {
      id: "2",
      title: "The Future of Content Creation with AI",
      status: "draft",
      lastModified: "2023-11-14",
      author: "John Doe",
    },
    {
      id: "3",
      title: "How to Optimize Your Content for SEO",
      status: "review",
      lastModified: "2023-11-13",
      author: "Alex Johnson",
    },
    {
      id: "4",
      title: "Content Marketing Trends to Watch",
      status: "scheduled",
      lastModified: "2023-11-12",
      author: "Sarah Williams",
    },
    {
      id: "5",
      title: "Building an Effective Content Strategy",
      status: "draft",
      lastModified: "2023-11-11",
      author: "Michael Brown",
    },
  ],
}: RecentContentProps) => {
  return (
    <Card className="w-full h-full bg-white">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-bold">Recent Content</CardTitle>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Modified</TableHead>
                <TableHead>Author</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(item.status)}
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(item.status)}`}
                      >
                        {item.status.charAt(0).toUpperCase() +
                          item.status.slice(1)}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{item.lastModified}</TableCell>
                  <TableCell>{item.author}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" title="View">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Edit">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Delete">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentContent;
