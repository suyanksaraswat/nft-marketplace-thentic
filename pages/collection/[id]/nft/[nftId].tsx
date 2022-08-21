import { NextPage } from "next";
import styles from "@styles/Viewer.module.css";
import {
  SimpleGrid,
  Image,
  Spinner,
  VStack,
  Input,
  Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { THENTIC_KEY, THENTIC_URL } from "config";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import { abridgeAddress } from "@utils/abridgeAddress";

const CHAIN_ID = Number(process.env.NEXT_PUBLIC_CHAIN_ID);

const TransferNft: NextPage = () => {
  const { data } = useAccount();

  const [isLoading, setIsLoading] = useState(false);
  const [to, setTo] = useState("");

  const transferNft = async () => {
    const requestHeaders: HeadersInit = {
      "Content-Type": "application/json",
    };

    const requestData = {
      key: THENTIC_KEY,
      chain_id: CHAIN_ID,
      contract: window.location.pathname.split("/")[2],
      nft_id: window.location.pathname.split("/")[4],
      from: data?.address,
      to,
    };

    const requestOptions: RequestInit = {
      method: "POST",
      headers: requestHeaders,
      body: JSON.stringify(requestData),
    };

    if (to === "") {
      return alert("To is compulasory field");
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${THENTIC_URL}/nfts/transfer`, requestOptions);
      const result = await response.json();
      console.log("result: ", result);

      if (result?.transaction_url) {
        window.open(result?.transaction_url);
      }
    } catch (err) {
      console.log(`Error fetching assets from Opensea: ${err}`);
      return new Error(`Error fetching assets from Opensea: ${err}`);
    }
    setIsLoading(false);
  };

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title2}>
            Transfer NFT: {window.location.pathname.split("/")[4]}
          </h1>

          <div className={styles.formContainer}>
            <Input
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="Send to"
            />

            <div>
              <Button
                style={{
                  fontFamily: "'Press Start 2P', cursive",
                  color: "#4b4f56",
                  borderRadius: "0",
                }}
                disabled={isLoading || !abridgeAddress(data?.address)}
                onClick={() => transferNft()}
              >
                Transfer NFT
              </Button>
            </div>
          </div>
          {isLoading && (
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default TransferNft;
