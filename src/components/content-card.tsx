import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Clock, User, Calendar } from "lucide-react";
import Image, { StaticImageData } from "next/image";

interface ContentCardProps {
  title: string;
  description: string;
  image: StaticImageData | string;
  featured?: boolean;
  author?: string;
  date?: string;
  readTime?: string;
  category?: string;
  type: "blog" | "course";
}

export function ContentCard({
  title,
  description,
  image,
  featured = false,
  author,
  date,
  readTime,
  category,
  type,
}: ContentCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
      <CardHeader className="p-0 relative">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {featured && (
            <Badge className="absolute top-4 right-4 bg-pink-500 hover:bg-pink-600">
              FEATURED
            </Badge>
          )}
          {category && (
            <Badge variant="secondary" className="absolute top-4 left-4">
              {category}
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-3 mb-4">{description}</p>

        <div className="flex items-center text-xs text-gray-500 space-x-4">
          {author && (
            <div className="flex items-center space-x-1">
              <User className="h-3 w-3" />
              <span>{author}</span>
            </div>
          )}
          {date && (
            <div className="flex items-center space-x-1">
              <Calendar className="h-3 w-3" />
              <span>{date}</span>
            </div>
          )}
          {readTime && (
            <div className="flex items-center space-x-1">
              <Clock className="h-3 w-3" />
              <span>{readTime}</span>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="px-6 pb-6">
        <Button className="w-full" variant={featured ? "default" : "outline"}>
          {type === "blog" ? "Read Article" : "Start Course"}
        </Button>
      </CardFooter>
    </Card>
  );
}
