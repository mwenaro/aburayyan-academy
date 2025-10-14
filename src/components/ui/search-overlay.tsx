"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const searchSuggestions = [
  { title: "Admissions", category: "Information", href: "/admissions" },
  { title: "Academic Programs", category: "Academics", href: "/academics/programs" },
  { title: "School Calendar", category: "Academics", href: "/academics/calendar" },
  { title: "Contact Information", category: "Contact", href: "/contact" },
  { title: "ICT Course", category: "Programs", href: "/ict" },
  { title: "Fee Structure", category: "Information", href: "/admissions/fees" },
  { title: "Application Forms", category: "Admissions", href: "/admissions/forms" },
  { title: "About Us", category: "Information", href: "/about" }
];

export const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState(searchSuggestions);

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = searchSuggestions.filter(
        suggestion =>
          suggestion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          suggestion.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions(searchSuggestions);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const overlayVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 }
  };

  const contentVariants = {
    closed: { opacity: 0, y: -50, scale: 0.95 },
    open: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring",
        duration: 0.4,
        bounce: 0.1
      }
    }
  };

  const suggestionVariants = {
    closed: { opacity: 0, x: -20 },
    open: (index: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: index * 0.05,
        duration: 0.3
      }
    })
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={overlayVariants}
          initial="closed"
          animate="open"
          exit="closed"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            variants={contentVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="absolute top-20 left-1/2 transform -translate-x-1/2 w-full max-w-2xl mx-auto p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* Search Input */}
              <div className="p-6 border-b border-gray-100">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search for anything..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 pr-12 h-14 text-lg border-0 focus:ring-2 focus:ring-blue-500 bg-gray-50"
                    autoFocus
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onClose}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-10 w-10 p-0 hover:bg-gray-100"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Search Results */}
              <div className="max-h-96 overflow-y-auto">
                {filteredSuggestions.length > 0 ? (
                  <div className="p-4">
                    <div className="text-sm text-gray-600 mb-4 font-medium">
                      {searchQuery ? "Search Results" : "Quick Links"}
                    </div>
                    <div className="space-y-2">
                      {filteredSuggestions.map((suggestion, index) => (
                        <motion.a
                          key={suggestion.href}
                          href={suggestion.href}
                          variants={suggestionVariants}
                          initial="closed"
                          animate="open"
                          custom={index}
                          className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors group cursor-pointer"
                          onClick={onClose}
                        >
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                              <Search className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                                {suggestion.title}
                              </h3>
                              <Badge variant="secondary" className="text-xs mt-1">
                                {suggestion.category}
                              </Badge>
                            </div>
                          </div>
                          <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                        </motion.a>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
                    <p className="text-gray-600">
                      Try searching for something else or browse our quick links above.
                    </p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Press ESC to close</span>
                  <span>Enter to navigate</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};