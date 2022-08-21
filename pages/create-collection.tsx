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

const CreateCollection: NextPage = () => {
  const { data } = useAccount();

  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [coverImg, setCoverImg] = useState("");

  const mintNft = async () => {
    const requestHeaders: HeadersInit = {
      "Content-Type": "application/json",
    };

    const requestData = {
      key: THENTIC_KEY,
      chain_id: CHAIN_ID,
      name,
      short_name: coverImg,
    };

    const requestOptions: RequestInit = {
      method: "POST",
      headers: requestHeaders,
      body: JSON.stringify(requestData),
    };

    if (name === "" || coverImg === "") {
      return alert("Name and cover image are compulasory field");
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `${THENTIC_URL}/nfts/contract`,
        requestOptions
      );
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
          <h1 className={styles.title2}>Create Collection</h1>

          <div className={styles.formContainer}>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
            />
            <Input
              value={coverImg}
              onChange={(e) => setCoverImg(e.target.value)}
              placeholder="Cover image url"
            />

            <div>
              <Button
                style={{
                  fontFamily: "'Press Start 2P', cursive",
                  color: "#4b4f56",
                  borderRadius: "0",
                }}
                disabled={isLoading || !abridgeAddress(data?.address)}
                onClick={() => mintNft()}
              >
                Create Collection
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

export default CreateCollection;
