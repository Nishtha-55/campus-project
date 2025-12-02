import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  Plus,
  TrendingUp,
  Search,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import ItemCard from "@/components/ItemCard";
import PrimaryButton from "@/components/PrimaryButton";

interface StatCard {
  icon: React.ReactNode;
  label: string;
  value: number;
  trend: number;
  color: string;
}

export default function Dashboard() {
  const [authToken] = useState(() => localStorage.getItem("authToken"));

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/";
  };

  const stats: StatCard[] = [
    {
      icon: <AlertCircle size={24} />,
      label: "Total Lost Items",
      value: 127,
      trend: 12,
      color: "from-red-500 to-red-600",
    },
    {
      icon: <CheckCircle size={24} />,
      label: "Total Found Items",
      value: 89,
      trend: 8,
      color: "from-green-500 to-green-600",
    },
    {
      icon: <Clock size={24} />,
      label: "Pending Claims",
      value: 24,
      trend: -3,
      color: "from-amber-500 to-amber-600",
    },
  ];

  const recentItems = [
    {
      id: "1",
      title: "Black MacBook Pro",
      category: "Electronics",
      location: "Library, 3rd Floor",
      date: "2024-01-15",
      status: "lost" as const,
      type: "lost" as const,
    },
    {
      id: "2",
      title: "Physics Textbook",
      category: "Books",
      location: "Science Building",
      date: "2024-01-14",
      status: "found" as const,
      type: "found" as const,
    },
    {
      id: "3",
      title: "Blue Wallet",
      category: "Wallet",
      location: "Cafeteria",
      date: "2024-01-14",
      status: "lost" as const,
      type: "lost" as const,
    },
    {
      id: "4",
      title: "House Keys",
      category: "Keys",
      location: "Parking Lot A",
      date: "2024-01-13",
      status: "found" as const,
      type: "found" as const,
    },
    {
      id: "5",
      title: "Red Backpack",
      category: "Others",
      location: "Student Center",
      date: "2024-01-13",
      status: "claimed" as const,
      type: "lost" as const,
    },
    {
      id: "6",
      title: "Silver Watch",
      category: "Electronics",
      location: "Gym",
      date: "2024-01-12",
      status: "found" as const,
      type: "found" as const,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  if (!authToken) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Link to="/" className="text-primary font-semibold">
          Please log in first
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar isAuthenticated={true} onLogout={handleLogout} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Welcome back, Student
          </h1>
          <p className="text-muted-foreground">
            Here's what's happening with your lost and found items today
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12"
        >
          <PrimaryButton
            variant="primary"
            icon={<Plus size={20} />}
            className="w-full justify-center"
            to="/report-lost"
          >
            Report Lost Item
          </PrimaryButton>
          <PrimaryButton
            variant="secondary"
            icon={<Plus size={20} />}
            className="w-full justify-center"
            to="/report-found"
          >
            Report Found Item
          </PrimaryButton>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8 }}
            >
              <div className="bg-white rounded-lg p-6 border border-border shadow-sm hover:shadow-md transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.color}`}>
                    <div className="text-white">{stat.icon}</div>
                  </div>
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className={`text-sm font-semibold ${
                      stat.trend > 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {stat.trend > 0 ? "+" : ""}{stat.trend}%
                  </motion.div>
                </div>
                <p className="text-muted-foreground text-sm mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-foreground">{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Recent Items Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                Recent Items
              </h2>
              <p className="text-muted-foreground text-sm mt-1">
                Recently reported lost and found items on campus
              </p>
            </div>
            <PrimaryButton
              variant="outline"
              icon={<Search size={18} />}
              to="/search"
            >
              View All
            </PrimaryButton>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {recentItems.map((item) => (
              <motion.div key={item.id} variants={itemVariants}>
                <ItemCard {...item} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Possible Matches Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 bg-gradient-to-br from-primary/5 to-blue-500/5 rounded-lg p-8 border border-primary/10"
        >
          <h3 className="text-xl font-bold text-foreground mb-2">
            🎯 Possible Matches
          </h3>
          <p className="text-muted-foreground mb-6">
            We found items that might match your lost items based on smart matching
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2].map((i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02 }}
                className="bg-white p-4 rounded-md border border-primary/20 cursor-pointer hover:shadow-md transition-all"
              >
                <p className="font-semibold text-foreground mb-1">
                  Match #{i}: Possible MacBook
                </p>
                <p className="text-sm text-muted-foreground">
                  Found at Library - Match confidence: 85%
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
