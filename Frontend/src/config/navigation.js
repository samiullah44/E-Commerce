import { Home, User, GalleryVertical, Phone, Crown } from "lucide-react";

export const navigationConfig = {
  links: [
    { name: "Home", href: "/", icon: Home },
    { name: "Profile", href: "/profile", icon: User },
    { name: "Collections", href: "/collections", icon: GalleryVertical },
    { name: "Contact", href: "/contact", icon: Phone },
  ],
  authButton: {
    text: "Enter Luxury",
    icon: Crown,
    href: "/auth"
  },
  brand: {
    name: "Élégance",
    tagline: "Timeless Luxury"
  }
};

export const animationConfig = {
  nav: {
    initial: { y: -80, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { type: "spring", stiffness: 100, damping: 20 }
  },
  item: {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 200, damping: 15 }
    }
  },
  logo: {
    initial: { scale: 0, rotate: -180 },
    animate: {
      scale: 1,
      rotate: 0,
      transition: { type: "spring", stiffness: 200, damping: 15, delay: 0.2 }
    },
    hover: { scale: 1.1, rotate: 5, transition: { duration: 0.3 } }
  }
};