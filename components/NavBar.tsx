import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  IconButton,
  Spacer,
  Stack,
  useDisclosure,
  Image,
  Box,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { FaDiscord, FaTwitter } from "react-icons/fa";
import styles from "../styles/Navbar.module.css";
import ConnectWallet from "./web3/ConnectWallet";

const FaOpensea = () => (
  <Box
    width="48px"
    height="48px"
    display="flex"
    justifyContent="center"
    alignItems="center"
  >
    <Image width="18px" height="18px" src="assets/opensea.png" />
  </Box>
);

const NavBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className={styles.background}>
      <div className={styles.navbar}>
        <div className={styles.leftPartition}>
          <Link href="/" passHref>
            <button className={styles.button}>Home</button>
          </Link>
          <Link href="/#about" passHref>
            <button className={styles.button}>About</button>
          </Link>
          <Link href="/#roadmap" passHref>
            <button className={styles.button}>Roadmap</button>
          </Link>
          <Link href="/#team" passHref>
            <button className={styles.button}>Team</button>
          </Link>
          <Link href="/#faq" passHref>
            <button className={styles.button}>FAQ</button>
          </Link>
          <Link href="/collections" passHref>
            <button className={styles.button}>Collection</button>
          </Link>
          <Link href="/nfts" passHref>
            <button className={styles.button}>NFTs</button>
          </Link>
        </div>
        <div className={styles.rightPartition}>
          <ConnectWallet size="md" />
        </div>
        <div className={styles.mobilePartition}>
          <IconButton
            aria-label="hamburger menu icon"
            icon={<HamburgerIcon />}
            colorScheme="white"
            onClick={onOpen}
          />
        </div>
        <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent background="black">
            <DrawerCloseButton />
            <DrawerBody>
              <Stack marginTop="20" spacing="24px">
                <Link href="/" passHref>
                  <button className={styles.button} onClick={onClose}>
                    Home
                  </button>
                </Link>
                <Link href="/#about" passHref>
                  <button className={styles.button} onClick={onClose}>
                    About
                  </button>
                </Link>
                <Link href="/#team" passHref>
                  <button className={styles.button} onClick={onClose}>
                    Team
                  </button>
                </Link>
                <Link href="/#roadmap" passHref>
                  <button className={styles.button} onClick={onClose}>
                    Roadmap
                  </button>
                </Link>
                <Link href="/#faq" passHref>
                  <button className={styles.button} onClick={onClose}>
                    FAQ
                  </button>
                </Link>
                <Link href="/collections" passHref>
                  <button className={styles.button} onClick={onClose}>
                    Explorer
                  </button>
                </Link>
                <Link href="/nfts" passHref>
                  <button className={styles.button} onClick={onClose}>
                    NFTs
                  </button>
                </Link>
                <ConnectWallet isMobile size="xs" />
              </Stack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
};

export default NavBar;
