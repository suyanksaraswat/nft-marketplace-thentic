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

const CreateNft: NextPage = () => {
  const { data } = useAccount();

  const [isLoading, setIsLoading] = useState(false);
  const [nftId, setNftId] = useState();
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

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
        setNftId(
          result?.nfts?.filter(
            ({ contract = "", status = "" }) =>
              contract === window.location.pathname.split("/")[3] &&
              status === "success"
          )?.length + 1
        );
      } catch (err) {
        console.log(`Error fetching assets from Opensea: ${err}`);
        return new Error(`Error fetching assets from Opensea: ${err}`);
      }
      setIsLoading(false);
    };

    if (window.location.pathname.split("/")[2]) {
      fetchData();
    }
  }, []);

  const mintNft = async () => {
    const requestHeaders: HeadersInit = {
      "Content-Type": "application/json",
    };

    const requestData = {
      key: THENTIC_KEY,
      chain_id: CHAIN_ID,
      contract: window.location.pathname.split("/")[3],
      nft_id: nftId,
      nft_data: JSON.stringify({
        name,
        image,
        description,
      }),
      to: data?.address,
    };

    const requestOptions: RequestInit = {
      method: "POST",
      headers: requestHeaders,
      body: JSON.stringify(requestData),
    };

    if (!nftId) {
      return alert("Nft Id is not calculated. Please refresh the page!");
    }

    if (name === "" || description === "" || image === "") {
      return alert("Name, description and image url are compulasory field");
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${THENTIC_URL}/nfts/mint`, requestOptions);
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
            Create NFT in collection: {window.location.pathname.split("/")[3]}
          </h1>

          <div className={styles.formContainer}>
            <Input
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="Image URL"
            />
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
            />
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
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
                Create NFT
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

export default CreateNft;
