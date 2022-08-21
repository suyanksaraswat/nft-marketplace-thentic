import { NextPage } from "next";
import styles from "@styles/Viewer.module.css";
import { SimpleGrid, Image, Spinner, VStack, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { THENTIC_KEY, THENTIC_URL } from "config";
import Link from "next/link";
import { useRouter } from "next/router";
import { abridgeAddress } from "@utils/abridgeAddress";

const CHAIN_ID = Number(process.env.NEXT_PUBLIC_CHAIN_ID);

const CollectionViewer: NextPage = () => {
  const router = useRouter();
  const [contracts, setContracts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function fetchData() {
    const requestOptions: RequestInit = {
      method: "GET",
    };

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${THENTIC_URL}/contracts?key=${THENTIC_KEY}&&chain_id=${CHAIN_ID}`,
          requestOptions
        );
        const result = await response.json();
        console.log("contracts: ", result);
        setContracts(
          result?.contracts?.filter(({ status = "" }) => status === "success")
        );
        console.log("contracts: ", contracts);
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
          <h1 className={styles.title}>Collection Viewer</h1>
          <p style={{ color: "white", marginBottom: "2rem" }}>
            Explore all the collections!
          </p>
          <Button
            style={{
              fontFamily: "'Press Start 2P', cursive",
              color: "#4b4f56",
              borderRadius: "0",
              marginBottom: "50px",
            }}
            onClick={() => router.push(`/create-collection`)}
          >
            Create Collection
          </Button>
          {!isLoading ? (
            <SimpleGrid columns={[1, 3, 5]} spacing={10}>
              {contracts?.length > 0 ? (
                contracts.map(({ name,short_name, contract = "" }) => (
                  <div style={{ cursor: "pointer" }}>
                    <Link href={`/collection/${contract}`} passHref>
                      <VStack spacing={2} key={name}>
                        <Image
                          rounded={"lg"}
                          height={230}
                          width={230}
                          src={short_name}
                          objectFit={"cover"}
                          fallbackSrc="assets/error.png"
                        />
                        <p style={{ color: "white" }}>{name}</p>
                        <p style={{ color: "white" }}>
                          {abridgeAddress(contract)}
                        </p>
                      </VStack>
                    </Link>
                  </div>
                ))
              ) : (
                <p style={{ color: "white", marginBottom: "2rem" }}>
                  No colleciton exist!
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

export default CollectionViewer;
