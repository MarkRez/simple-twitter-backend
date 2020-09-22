import { useEffect } from "react";

const HandleScroll = ({ handleFunc }) => {
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 600) {
      handleFunc();
    }
  }

  return true;
}

export default HandleScroll;
