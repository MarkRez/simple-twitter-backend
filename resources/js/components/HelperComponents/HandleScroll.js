import { useEffect } from "react";

export const HandleScroll = ({ onScroll, children }) => {
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 600) {
      onScroll();
    }
  }

  return (children);
}
