import { MediaRenderer, Web3Button, lightTheme, useContract, useNFT, useSDK } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import {
    clientIdConst,
    contractConst,
} from "../../consts/parameters";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import "../../styles/globals.css?inline"

// Define types for NFT metadata and attributes
type Attribute = {
    trait_type: string;
    value: string;
};

type Metadata = {
    name: string;
    id: string;
    attributes: Attribute[];
};

type NFT = {
    metadata: Metadata;
};

export default function Upgrade() {
    const urlParams = new URL(window.location.toString()).searchParams;
    const contractAddress = urlParams.get("contract") || contractConst || "";
    const { tokenId } = useParams<{ tokenId: string }>();
    const navigate = useNavigate();
    const sdk = useSDK();
    const [status, setStatus] = useState("");

    const { contract } = useContract(contractAddress);

    const [ipfslevel, setIpfslevel] = useState("");
    const {
        data: nft,
        isLoading: isNFTLoading,
    } = useNFT(contract, tokenId?.toString());

    useEffect(() => {
        if (nft && nft.metadata && Array.isArray(nft.metadata.attributes)) {
            const impactAttribute = nft.metadata.attributes.find(attribute => attribute.trait_type === "Impact Value") as Attribute | undefined;
            let impactValue = impactAttribute ? parseInt(impactAttribute.value, 10) : 0;

            let newLevel = "";
            if (impactValue === 1) {
                newLevel = "ipfs://QmaJYM93cNKuPshuoMwEGVQ7SC5tqijRkEsqiBvCzxcnZn";
            } else if (impactValue === 2) {
                newLevel = "ipfs://Qmap3xepevmtiRtRoB4aUNjAeqwNUV3212Bgz3WxfxYhVP";
            } else if (impactValue === 3) {
                newLevel = "ipfs://bafybeidl46a7oq3wvtbzyowckprtptpc46rjms2p47wovfck4spxwztm6y";
            } else if (impactValue === 4) {
                newLevel = "ipfs://bafybeiaxvwyfaplw36ykcs4r5bovw2kvxta5ts5sabm4mxgorgb4xplyoq";
            } else if (impactValue === 5) {
                newLevel = "ipfs://bafybeignaczb4rkevcyjntpjzzb54yfjgs5ono3bjw3i7thzzn5tcdebj4";
            } else if (impactValue === 6) {
                newLevel = "ipfs://bafybeiavchfibgmmir5r5lq6rr75zlo4wm56v6ioxtr4h744f5wnfmh6rm";
            } else if (impactValue === 7) {
                newLevel = "ipfs://bafybeifqh2tufoepynwyq4kubb647gsmrzksj44pw67bccsgf7mwefhqfq";
            } else if (impactValue === 8) {
                newLevel = "ipfs://bafybeieainy55wrngkmhtzqaewjfh776ci5m46bxlg24p4foexbnsbjkca";
            } else if (impactValue === 9) {
                newLevel = "ipfs://QmZtYdrC1WWXzD5HKmBDTB5fzrt4fLUNwM9HXWo4SUHFLd";
            }
            setIpfslevel(newLevel);
        }
    }, [nft]);


    const newUri = `${ipfslevel}/${tokenId}.json`;


    if (isNFTLoading) {
        return (
            <div className="page-wrap">
                <div className="navbar border">
                    <a href="/" className="logotype w-inline-block">
                        <p className="logo">DECLEANUP NETWORK</p>
                    </a>
                    <div>
                        {/* <a href="#" className="icon w-inline-block">
      <img src="images/Group-118.svg" loading="lazy" alt="" />
    </a> */}
                        <a href="https://t.me/DecentralizedCleanup" className="icon w-inline-block">
                            <img src="https://cdn.prod.website-files.com/669132d0a567fe2c543eb7cf/6691417859fc8bc2dd146976_Group%20117.svg" loading="lazy" alt="" />
                        </a>
                        <a href="https://x.com/decentracleanup" className="icon is-last w-inline-block">
                            <img src="https://cdn.prod.website-files.com/669132d0a567fe2c543eb7cf/6691417892f6d310297f569b_icon%20x.svg" loading="lazy" alt="" />
                        </a>
                    </div>
                </div>

                <div className="heading-wrap">
                    <h1 className="text-h1 is-hide-mobile">DeCleanup&nbsp;Rewards</h1>
                    <h1 className="is-mob is-hide-mob">De Cleanup Rewards</h1>
                </div>

                <div className="nft-wrap">

                    <div className="text-wrap">
                        <p className="paragraph-s"> </p>
                    </div>

                    <div className="nft-card">
                        <img
                            src=""
                            loading="lazy"
                            alt=""
                            className="nft-img"
                        />
                    </div>

                    <div className="lvls-wrap is-hide-mob is-in-review hide-mo">
                        <div
                            id="w-node-_3c7c7431-5b3f-3ca3-f859-7a5558a3da1b-51c2bcea"
                            className="lvl"
                        >
                            <p
                                id="w-node-_6e9087bb-ca87-3a26-c99f-2796d17c4d61-51c2bcea"
                                className="text-size-l"
                            >
                                Rarity
                            </p>
                            <p
                                id="w-node-_3be52719-ff4c-2d23-0f67-8d9151dac7ce-51c2bcea"
                                className="text-size-l  yellow-text"
                            >
                                0
                            </p>

                        </div>

                        <div
                            id="w-node-_3c7c7431-5b3f-3ca3-f859-7a5558a3da1b-51c2bcea"
                            className="lvl"
                        >
                            <p
                                id="w-node-_6e9087bb-ca87-3a26-c99f-2796d17c4d61-51c2bcea"
                                className="text-size-l"
                            >
                                Impact Value
                            </p>
                            <p
                                id="w-node-_3be52719-ff4c-2d23-0f67-8d9151dac7ce-51c2bcea"
                                className="text-size-l  yellow-text"
                            >
                                0
                            </p>

                        </div>

                        <div
                            id="w-node-_3c7c7431-5b3f-3ca3-f859-7a5558a3da1b-51c2bcea"
                            className="lvl"
                        >
                            <p
                                id="w-node-_6e9087bb-ca87-3a26-c99f-2796d17c4d61-51c2bcea"
                                className="text-size-l"
                            >
                                $DCU
                            </p>
                            <p
                                id="w-node-_3be52719-ff4c-2d23-0f67-8d9151dac7ce-51c2bcea"
                                className="text-size-l  yellow-text"
                            >
                                0
                            </p>

                        </div>

                        <div
                            id="w-node-_3c7c7431-5b3f-3ca3-f859-7a5558a3da1b-51c2bcea"
                            className="lvl"
                        >
                            <p
                                id="w-node-_6e9087bb-ca87-3a26-c99f-2796d17c4d61-51c2bcea"
                                className="text-size-l"
                            >
                                Level
                            </p>
                            <p
                                id="w-node-_3be52719-ff4c-2d23-0f67-8d9151dac7ce-51c2bcea"
                                className="text-size-l  yellow-text"
                            >
                                0
                            </p>

                        </div>

                    </div>
                </div>


                <div className="button-wrap border">
                    <a className="loadbutton"
                    >
                        LOADING...
                    </a>
                </div>

                <div className="footer">
                    <img src="https://cdn.prod.website-files.com/669132d0a567fe2c543eb7cf/66914178dbf243a16af65b8a_2024%C2%A9.svg" loading="lazy" alt="" />
                    <p className="logo-a">ARBITRUM</p>
                </div>
            </div>

        );
    }

    return (

        <div className="page-wrap">
            <div className="navbar border">
                <a href="/" className="logotype w-inline-block">
                    <p className="logo">DECLEANUP NETWORK</p>
                </a>
                <div>
                    {/* <a href="#" className="icon w-inline-block">
      <img src="images/Group-118.svg" loading="lazy" alt="" />
    </a> */}
                    <a href="https://t.me/DecentralizedCleanup" className="icon w-inline-block">
                        <img src="https://cdn.prod.website-files.com/669132d0a567fe2c543eb7cf/6691417859fc8bc2dd146976_Group%20117.svg" loading="lazy" alt="" />
                    </a>
                    <a href="https://x.com/decentracleanup" className="icon is-last w-inline-block">
                        <img src="https://cdn.prod.website-files.com/669132d0a567fe2c543eb7cf/6691417892f6d310297f569b_icon%20x.svg" loading="lazy" alt="" />
                    </a>
                </div>
            </div>

            <div className="heading-wrap">
                <h1 className="text-h1 is-hide-mobile">DeCleanup&nbsp;Rewards</h1>
                <h1 className="is-mob is-hide-mob">De Cleanup Rewards</h1>
            </div>

            <div className="nft-wrap">

                <div className="text-wrap">
                    <p className="paragraph-s"> </p>
                </div>

                <div className="nft-card">
                    <img
                        src={`${nft?.metadata.image}`}
                        loading="lazy"
                        alt=""
                        className="nft-img"
                    />
                </div>

                <div className="lvls-wrap is-hide-mob hide-mo">
                    {nft?.metadata.attributes && (
                        // @ts-ignore
                        nft?.metadata.attributes.slice(3, 7).map((attribute, index) => (
                            <div key={index}
                                id="w-node-_3c7c7431-5b3f-3ca3-f859-7a5558a3da1b-51c2bcea"
                                className="lvl"
                            >
                                <p
                                    id="w-node-_6e9087bb-ca87-3a26-c99f-2796d17c4d61-51c2bcea"
                                    className="text-size-l"
                                >
                                    {attribute.trait_type}
                                </p>
                                <p
                                    id="w-node-_3be52719-ff4c-2d23-0f67-8d9151dac7ce-51c2bcea"
                                    className="text-size-l"
                                >
                                    {attribute.value}
                                </p>
                            </div>
                        ))
                    )}
                </div>
            </div>


            <div className="button-wrap border">
                <Web3Button className="button"
                    contractAddress="0x0f8ADB88D0C9d1a4122A7B8C91831ce7E7b809A3"
                    action={(contract) => contract.call("setTokenURI", [tokenId!.toString(), newUri])}
                    onError={(err) => {
                        console.error(err);
                        console.log({ err });
                    toast("Sorry, something went wrong please try again.", {type: 'error', position: toast.POSITION.TOP_CENTER});
                    }}
                    onSuccess={() => {
                      toast("Congrats! Your mint was successful!", {type: 'success', position: toast.POSITION.TOP_CENTER});
                    }}
                    theme={"light"}
                    type={"button"}
                >
                    Upgrade
                </Web3Button>
            </div>

            <div className="footer">
                <img src="https://cdn.prod.website-files.com/669132d0a567fe2c543eb7cf/66914178dbf243a16af65b8a_2024%C2%A9.svg" loading="lazy" alt="" />
                <p className="logo-a">ARBITRUM</p>
            </div>
        </div>
    );
};