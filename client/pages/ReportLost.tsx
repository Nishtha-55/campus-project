import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import PrimaryButton from "@/components/PrimaryButton";
import FormInput from "@/components/FormInput";
import FormSelect from "@/components/FormSelect";
import { Upload } from "lucide-react";
import { useState } from "react";

export default function ReportLost() {
  const [file, setFile] = useState<File | null>(null);
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar isAuthenticated={true} onLogout={handleLogout} />

      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Report Lost Item
          </h1>
          <p className="text-muted-foreground">
            Help us find your lost items by providing detailed information
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg p-8 border border-border space-y-6"
        >
          {/* Image Upload */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Item Photo
            </label>
            <div
              onClick={() => document.getElementById("fileInput")?.click()}
              className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-all"
            >
              <Upload size={32} className="mx-auto text-muted-foreground mb-2" />
              <p className="font-medium text-foreground">
                {file ? file.name : "Drag and drop or click to upload"}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                PNG, JPG, GIF up to 10MB
              </p>
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="hidden"
              />
            </div>
          </div>

          <FormInput
            label="Item Title"
            placeholder="e.g., Black MacBook Pro"
            required
          />

          <FormSelect
            label="Category"
            placeholder="Select a category"
            options={[
              { value: "electronics", label: "Electronics" },
              { value: "books", label: "Books" },
              { value: "wallet", label: "Wallet" },
              { value: "keys", label: "Keys" },
              { value: "others", label: "Others" },
            ]}
            required
          />

          <FormInput
            label="Location Lost"
            placeholder="e.g., Library, 3rd Floor"
            required
          />

          <FormInput
            label="Date Lost"
            type="date"
            required
          />

          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Description
            </label>
            <textarea
              placeholder="Describe your lost item in detail..."
              className="w-full px-4 py-3 border border-border rounded-md bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              rows={5}
            />
          </div>

          <PrimaryButton type="submit" className="w-full justify-center">
            Report Lost Item
          </PrimaryButton>
        </motion.form>
      </main>
    </div>
  );
}
