import { NextPage } from "next";
import styles from "@styles/Viewer.module.css";
import { SimpleGrid, Image, Spinner, VStack, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { THENTIC_KEY, THENTIC_URL } from "config";
import Link from "next/link";
import { useRouter } from "next/router";

const CHAIN_ID = Number(process.env.NEXT_PUBLIC_CHAIN_ID);

const NFTViewer: NextPage = () => {
  const router = useRouter();
  const query = router.query;

  const [tokens, setTokens] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function fetchData() {
    const requestOptions: RequestInit = {
      method: "GET",
    };

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${THENTIC_URL}/nfts?key=${THENTIC_KEY}&&chain_id=${CHAIN_ID}`,
          requestOptions
        );
        const result = await response.json();
        setTokens(
          result?.nfts?.filter(({ status = "" }) => status === "success")
        );
      } catch (err) {
        console.log(`Error fetching assets from Opensea: ${err}`);
        return new Error(`Error fetching assets from Opensea: ${err}`);
      }
      setIsLoading(false);
    };
    
    fetchData();
  }, []);

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title2}>All NFTs</h1>
          {!isLoading ? (
            <SimpleGrid columns={[1, 3, 5]} spacing={10}>
              {tokens?.length > 0 ? (
                tokens?.map(({ id, name, data = "" }) => {
                  const metadata = JSON.parse(data);
                  console.log("### metadata-", metadata);
                  return (
                    <VStack spacing={2} key={name}>
                      <Image
                        rounded={"lg"}
                        height={230}
                        width={230}
                        src={metadata?.image}
                        objectFit={"cover"}
                        fallbackSrc="assets/error.png"
                      />
                      <p style={{ color: "white" }}>NFT Id: {id}</p>
                      <p style={{ color: "white" }}>Name: {metadata?.name}</p>
                      <p style={{ color: "white" }}>
                        Description: {metadata?.description}
                      </p>
                    </VStack>
                  );
                })
              ) : (
                <p style={{ color: "white", marginBottom: "2rem" }}>
                  No NFT exist!
                </p>
              )}
            </SimpleGrid>
          ) : (
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

export default NFTViewer;
