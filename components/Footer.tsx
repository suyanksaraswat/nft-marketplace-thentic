import { IconButton } from "@chakra-ui/react";
import styles from "@styles/Footer.module.css";
import { FaTelegram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className={`${styles.footer}`}>
      Made with ❤️
    </footer>
  );
};

export default Footer;
