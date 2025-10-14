"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  NavigationMenu, 
  NavigationMenuContent, 
  NavigationMenuItem, 
  NavigationMenuLink, 
  NavigationMenuList, 
  NavigationMenuTrigger 
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { 
  Menu, 
  X, 
  ChevronDown, 
  Search, 
  Phone, 
  Mail,
  GraduationCap,
  BookOpen,
  Users,
  Award
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useScrollProgress } from "@/hooks/useScroll";
import { SearchOverlay } from "@/components/ui/search-overlay";
import ThemeToggle from "@/components/layout/ThemeToggle/theme-toggle";
import { useTheme } from "next-themes";

interface ModernHeaderProps {
  children?: React.ReactNode;
}

interface NavItem {
  title: string;
  href: string;
  description?: string;
  badge?: string;
  icon?: React.ReactNode;
  children?: NavItem[];
}

const navigationItems: NavItem[] = [
  {
    title: "Home",
    href: "/",
    icon: <GraduationCap className="w-4 h-4" />
  },
  {
    title: "About",
    href: "/about",
    description: "Learn about our school's mission and values",
    icon: <Users className="w-4 h-4" />,
    children: [
      { title: "Our Story", href: "/about/story" },
      { title: "Mission & Vision", href: "/about/mission" },
      { title: "Leadership Team", href: "/about/team" },
      { title: "Facilities", href: "/about/facilities" }
    ]
  },
  {
    title: "Academics",
    href: "/academics",
    description: "Explore our curriculum and programs",
    icon: <BookOpen className="w-4 h-4" />,
    children: [
      { title: "Curriculum", href: "/academics/curriculum" },
      { title: "Programs", href: "/academics/programs" },
      { title: "Assessment", href: "/academics/assessment" },
      { title: "Calendar", href: "/academics/calendar" }
    ]
  },
  {
    title: "Admissions",
    href: "/admissions",
    description: "Join our learning community",
    badge: "Apply Now",
    icon: <Award className="w-4 h-4" />,
    children: [
      { title: "Application Process", href: "/admissions/process" },
      { title: "Requirements", href: "/admissions/requirements" },
      { title: "Fees", href: "/admissions/fees" },
      { title: "Forms", href: "/admissions/forms" }
    ]
  },
  {
    title: "ICT",
    href: "/ict",
    description: "Technology integration in learning",
    icon: <GraduationCap className="w-4 h-4" />
  },
  {
    title: "Contact",
    href: "/contact",
    icon: <Phone className="w-4 h-4" />
  }
];

export const ModernHeader: React.FC<ModernHeaderProps> = ({ children }) => {
  const { scrollProgress, isScrolled } = useScrollProgress();
  const { theme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [routerPath, setRouterPath] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setRouterPath(window.location.pathname);
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const isActiveLink = (href: string) => {
    return routerPath === href || (href !== "/" && routerPath.startsWith(href));
  };

  const getHeaderBgClass = () => {
    if (isScrolled) {
      return theme === 'dark' 
        ? "bg-gray-900/80 backdrop-blur-xl border-b border-gray-700/50 shadow-sm"
        : "bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm";
    }
    return "bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white";
  };

  const getNavTextColor = () => {
    if (isScrolled) {
      return theme === 'dark' 
        ? "text-gray-300 hover:text-white hover:bg-gray-800"
        : "text-gray-700 hover:text-gray-900 hover:bg-gray-100";
    }
    return "text-white hover:text-white";
  };

  const getActiveNavColor = () => {
    if (isScrolled) {
      return theme === 'dark' 
        ? "text-blue-400 bg-blue-900/20" 
        : "text-blue-600 bg-blue-50";
    }
    return "bg-white/20";
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ 
        y: 0, 
        opacity: 1,
        transition: {
          duration: 0.6,
          ease: [0.25, 0.46, 0.45, 0.94]
        }
      }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        getHeaderBgClass()
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20">
          
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ 
              scale: 1, 
              rotate: 0,
              transition: {
                delay: 0.2,
                duration: 0.6,
                ease: "backOut"
              }
            }}
            className="flex items-center space-x-3"
          >
            <Link href="/" className="flex items-center space-x-3 group">
              <motion.div 
                className="relative"
                whileHover={{ rotate: 5, scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <Image
                  src="/favicon/aburayyan-logo.png"
                  alt="Abu Rayyan Academy"
                  width={48}
                  height={48}
                  className="h-10 w-10 lg:h-12 lg:w-12 transition-all duration-300"
                  priority
                />
              </motion.div>
              <motion.div 
                className="hidden sm:block"
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: 1, 
                  x: 0,
                  transition: { delay: 0.4, duration: 0.5 }
                }}
              >
                {children || (
                  <div>
                    <motion.h1 
                      className={cn(
                        "font-bold text-lg lg:text-xl transition-colors duration-300",
                        isScrolled 
                          ? theme === 'dark' ? "text-white" : "text-gray-900"
                          : "text-white"
                      )}
                    >
                      Abu Rayyan Academy
                    </motion.h1>
                    <motion.p 
                      className={cn(
                        "text-xs lg:text-sm transition-colors duration-300",
                        isScrolled 
                          ? theme === 'dark' ? "text-gray-300" : "text-gray-600"
                          : "text-blue-100"
                      )}
                    >
                      Excellence in Education
                    </motion.p>
                  </div>
                )}
              </motion.div>
            </Link>
          </motion.div>

          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList className="space-x-1">
              {navigationItems.map((item, index) => (
                <NavigationMenuItem key={item.title}>
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: {
                        delay: 0.3 + index * 0.1,
                        duration: 0.4,
                        ease: "easeOut"
                      }
                    }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {item.children ? (
                      <>
                        <NavigationMenuTrigger className={cn(
                          "bg-transparent hover:bg-white/10 transition-all duration-200",
                          getNavTextColor(),
                          isActiveLink(item.href) && getActiveNavColor()
                        )}>
                          <div className="flex items-center space-x-2">
                            {item.icon}
                            <span>{item.title}</span>
                            {item.badge && (
                              <Badge variant="secondary" className="ml-2 text-xs">
                                {item.badge}
                              </Badge>
                            )}
                          </div>
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <div className="grid gap-3 p-6 w-80">
                            <h4 className="text-lg font-medium">{item.title}</h4>
                            {item.description && (
                              <p className="text-sm text-muted-foreground mb-4">
                                {item.description}
                              </p>
                            )}
                            <div className="grid gap-2">
                              {item.children.map((child) => (
                                <NavigationMenuLink key={child.title} asChild>
                                  <Link
                                    href={child.href}
                                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                                  >
                                    <div className="text-sm font-medium">{child.title}</div>
                                  </Link>
                                </NavigationMenuLink>
                              ))}
                            </div>
                          </div>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <NavigationMenuLink asChild>
                        <Link
                          href={item.href}
                          className={cn(
                            "inline-flex items-center justify-center rounded-md text-sm font-medium transition-all duration-200 h-9 px-4 py-2",
                            "bg-transparent hover:bg-white/10",
                            getNavTextColor(),
                            isActiveLink(item.href) && getActiveNavColor()
                          )}
                        >
                          <div className="flex items-center space-x-2">
                            {item.icon}
                            <span>{item.title}</span>
                            {item.badge && (
                              <Badge variant="secondary" className="ml-2 text-xs">
                                {item.badge}
                              </Badge>
                            )}
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    )}
                  </motion.div>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <motion.div 
            className="flex items-center space-x-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ 
              opacity: 1, 
              x: 0,
              transition: { delay: 0.5, duration: 0.5 }
            }}
          >
            <div className="hidden lg:flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSearchOpen(true)}
                className={cn(
                  "transition-all duration-200",
                  getNavTextColor()
                )}
              >
                <Search className="w-4 h-4" />
              </Button>
              
              <div className={cn(!isScrolled && "invert")}>
                <ThemeToggle />
              </div>
              
              <Button
                size="sm"
                className={cn(
                  "transition-all duration-200",
                  isScrolled
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-white text-blue-600 hover:bg-blue-50"
                )}
              >
                Apply Now
              </Button>
            </div>

            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "lg:hidden transition-colors p-2 h-10 w-10",
                    getNavTextColor()
                  )}
                >
                  {isMobileMenuOpen ? (
                    <X className="w-6 h-6" />
                  ) : (
                    <Menu className="w-6 h-6" />
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 px-0">
                <div className="flex flex-col h-full">
                  <div className="p-6 border-b">
                    <div className="flex items-center space-x-3">
                      <Image
                        src="/favicon/aburayyan-logo.png"
                        alt="Abu Rayyan Academy"
                        width={40}
                        height={40}
                        className="h-10 w-10"
                      />
                      <div>
                        <h2 className="font-bold text-lg">Abu Rayyan Academy</h2>
                        <p className="text-sm text-muted-foreground">Excellence in Education</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto py-6">
                    <nav className="space-y-2 px-6">
                      {navigationItems.map((item) => (
                        <div key={item.title} className="space-y-2">
                          <Link
                            href={item.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={cn(
                              "flex items-center space-x-3 rounded-lg px-4 py-4 text-sm font-medium transition-colors",
                              "hover:bg-accent hover:text-accent-foreground min-h-[48px]",
                              isActiveLink(item.href) && "bg-accent text-accent-foreground"
                            )}
                          >
                            {item.icon}
                            <span className="flex-1">{item.title}</span>
                            {item.badge && (
                              <Badge variant="secondary" className="text-xs">
                                {item.badge}
                              </Badge>
                            )}
                            {item.children && <ChevronDown className="w-5 h-5" />}
                          </Link>
                          
                          {item.children && (
                            <div className="ml-6 space-y-1 border-l-2 border-border pl-4">
                              {item.children.map((child) => (
                                <Link
                                  key={child.title}
                                  href={child.href}
                                  onClick={() => setIsMobileMenuOpen(false)}
                                  className={cn(
                                    "block rounded-md px-4 py-3 text-sm transition-colors min-h-[44px]",
                                    "hover:bg-accent hover:text-accent-foreground",
                                    isActiveLink(child.href) && "bg-accent text-accent-foreground font-medium"
                                  )}
                                >
                                  {child.title}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </nav>
                  </div>
                  
                  <div className="p-6 border-t space-y-4">
                    <Button className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600">
                      Apply Now
                    </Button>
                    <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4" />
                        <span>Call Us</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4" />
                        <span>Email</span>
                      </div>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
        initial={{ scaleX: 0 }}
        animate={{ 
          scaleX: scrollProgress / 100,
          transition: {
            duration: 0.1,
            ease: "easeOut"
          }
        }}
        style={{ transformOrigin: "left" }}
      />

      <SearchOverlay 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </motion.header>
  );
};