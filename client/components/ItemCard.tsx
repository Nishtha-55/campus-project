import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

interface ItemCardProps {
  id: string;
  title: string;
  category: string;
  location: string;
  date: string;
  image?: string;
  status?: "lost" | "found" | "claimed";
  type: "lost" | "found";
}

export default function ItemCard({
  id,
  title,
  category,
  location,
  date,
  image,
  status = "lost",
  type,
}: ItemCardProps) {
  const categoryColors: Record<string, string> = {
    Electronics: "bg-blue-100 text-blue-700",
    Books: "bg-green-100 text-green-700",
    Wallet: "bg-amber-100 text-amber-700",
    Keys: "bg-purple-100 text-purple-700",
    Others: "bg-gray-100 text-gray-700",
  };

  const statusColors: Record<string, string> = {
    lost: "bg-red-100 text-red-700",
    found: "bg-green-100 text-green-700",
    claimed: "bg-amber-100 text-amber-700",
  };

  return (
    <Link to={`/item/${type}/${id}`}>
      <motion.div
        whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
        className="bg-white rounded-lg overflow-hidden border border-border transition-all duration-300 cursor-pointer h-full"
      >
        {/* Image Container */}
        <div className="relative h-40 bg-secondary overflow-hidden">
          {image ? (
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary">
              <span className="text-muted-foreground text-sm">No image</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-foreground line-clamp-2 flex-1">
              {title}
            </h3>
            <Badge className={`ml-2 flex-shrink-0 ${statusColors[status]}`}>
              {status}
            </Badge>
          </div>

          {/* Category */}
          <div className="mb-3">
            <Badge className={categoryColors[category] || categoryColors.Others}>
              {category}
            </Badge>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
            <MapPin size={14} />
            <span className="line-clamp-1">{location}</span>
          </div>

          {/* Date */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar size={14} />
            <span>{date}</span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
