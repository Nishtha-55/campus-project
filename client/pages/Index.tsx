import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Shield, Zap, Users, CheckCircle2, MapPin } from "lucide-react";
import PrimaryButton from "@/components/PrimaryButton";

export default function Index() {
  const features = [
    {
      icon: <BookOpen size={24} />,
      title: "Report & Track",
      description: "Easily report lost or found items with detailed information",
    },
    {
      icon: <Zap size={24} />,
      title: "Smart Matching",
      description: "AI-powered system matches lost items with found items",
    },
    {
      icon: <Shield size={24} />,
      title: "Secure & Private",
      description: "Your data is protected with enterprise-grade security",
    },
    {
      icon: <Users size={24} />,
      title: "Campus Community",
      description: "Connect with other students to recover lost belongings",
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-white to-secondary">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto">
        <Link to="/" className="flex items-center gap-2">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="w-10 h-10 bg-gradient-to-br from-primary to-blue-600 rounded-lg flex items-center justify-center text-white font-bold"
          >
            LF
          </motion.div>
          <span className="font-bold text-lg text-foreground hidden sm:inline">
            Campus Lost & Found
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <PrimaryButton variant="outline" to="/login">Sign In</PrimaryButton>
          <PrimaryButton to="/register">Get Started</PrimaryButton>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto px-4 py-20 text-center"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-bold text-foreground mb-6"
        >
          Find Your Lost Items
          <br />
          <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            On Campus
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
        >
          Campus Lost & Found makes it easy to report lost items, find found items, and connect
          with other students to recover your belongings quickly and securely.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex gap-4 justify-center flex-wrap mb-16"
        >
          <PrimaryButton size="lg" icon={<ArrowRight size={20} />} to="/register">
            Start Now
          </PrimaryButton>
          <PrimaryButton variant="outline" size="lg" to="/login">
            Already have an account?
          </PrimaryButton>
        </motion.div>

        {/* Hero Image/Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="relative"
        >
          <div className="w-full max-w-3xl mx-auto bg-gradient-to-br from-primary/5 to-blue-500/5 rounded-2xl border border-primary/10 p-12 h-80 flex items-center justify-center">
            <div className="text-center">
              <MapPin size={64} className="mx-auto text-primary/40 mb-4" />
              <p className="text-muted-foreground">
                Interactive dashboard showing recent lost & found items
              </p>
            </div>
          </div>
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -top-4 -right-4 w-20 h-20 bg-blue-100 rounded-full opacity-70 blur-2xl"
          />
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute -bottom-8 -left-8 w-32 h-32 bg-primary/10 rounded-full opacity-50 blur-3xl"
          />
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-7xl mx-auto px-4 py-20"
      >
        <motion.h2
          variants={itemVariants}
          className="text-4xl font-bold text-foreground text-center mb-4"
        >
          Why Choose Us?
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto"
        >
          We make it simple and secure to recover lost items on campus
        </motion.p>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="bg-white rounded-lg p-6 border border-border shadow-sm hover:shadow-md transition-all text-center"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-4"
              >
                {feature.icon}
              </motion.div>
              <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* How It Works */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-7xl mx-auto px-4 py-20"
      >
        <motion.h2
          variants={itemVariants}
          className="text-4xl font-bold text-foreground text-center mb-12"
        >
          How It Works
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
        >
          {[
            { step: "1", title: "Report", description: "Post a lost or found item" },
            { step: "2", title: "Match", description: "AI matches items automatically" },
            { step: "3", title: "Recover", description: "Connect and recover your items" },
          ].map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="text-center"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-16 h-16 bg-gradient-to-br from-primary to-blue-600 text-white rounded-full flex items-center justify-center font-bold text-2xl mx-auto mb-4 shadow-lg"
              >
                {item.step}
              </motion.div>
              <h3 className="font-semibold text-foreground mb-2 text-lg">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto px-4 py-20 text-center"
      >
        <div className="bg-gradient-to-r from-primary/10 to-blue-600/10 border border-primary/20 rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Don't Lose Your Items
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of students who have already recovered their lost items through our platform.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <PrimaryButton icon={<CheckCircle2 size={20} />} to="/register">
              Join Now
            </PrimaryButton>
            <PrimaryButton variant="outline" to="/login">
              Sign In
            </PrimaryButton>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="border-t border-border mt-12">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center text-muted-foreground text-sm">
          <p>&copy; 2024 Campus Lost & Found. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
