import React, { useEffect, useState } from 'react';
import { MediaRenderer, useContract, useNFT } from "@thirdweb-dev/react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { storage, db } from '../../lib/firebase'; // Make sure the path is correct
import { useParams, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import {
    clientIdConst,
    contractConst,
} from "../../consts/parameters";

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

export default function Proof() {
    const urlParams = new URL(window.location.toString()).searchParams;
    const contractAddress = urlParams.get("contract") || contractConst || "";
    const { tokenId } = useParams<{ tokenId: string }>();
    const navigate = useNavigate();
    const { contract } = useContract(contractAddress);
    const { data: nft, isLoading: isNFTLoading } = useNFT(contract, tokenId?.toString());
    const [proofImage, setProofImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [status, setStatus] = useState('');
    const [buttonText, setButtonText] = useState('Send proof');
    const [isAgreed, setIsAgreed] = useState(false);
    const [uploadComplete, setUploadComplete] = useState(false);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            setProofImage(file);
        }
    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsAgreed(event.target.checked);
    };

    useEffect(() => {
        if (proofImage) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(proofImage);
        } else {
            setImagePreview(null);
        }
    }, [proofImage]);

    const handleSubmit = async () => {
        if (!proofImage) {
            setStatus('No image selected');
            toast("No image selected", {type: 'error', position: toast.POSITION.TOP_CENTER});
            return;
        }
        setButtonText('Uploading...');

        const storageRef = ref(storage, `proofs/${proofImage.name}`);
        const uploadTask = uploadBytesResumable(storageRef, proofImage);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                switch (snapshot.state) {
                    case 'paused':
                        break;
                    case 'running':
                        break;
                }
            },
            (error) => {
                // Handle upload error
                setStatus('Upload failed');
                toast("Upload failed", {type: 'error', position: toast.POSITION.TOP_CENTER});
                setButtonText('Send proof');
            },
            () => {
                // Handle successful uploads
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    console.log('File available at', downloadURL);
                    // Store the download URL in Firestore
                    try {
                        console.log('Attempting to save URL to Firestore...');
                        await addDoc(collection(db, 'proofs'), {
                            tokenId: tokenId,
                            agreed: isAgreed ? 'yes' : 'no',
                            imageUrl: downloadURL
                        });
                        setStatus('Cleanup proof was uploaded and will be reviewed soon.');
                        setButtonText('Uploaded');
                        toast("Cleanup proof was uploaded and will be reviewed soon.", {type: 'success', position: toast.POSITION.TOP_CENTER});
                        // setTimeout(() => {
                        //     navigate(-1);
                        // }, 3000);
                        setUploadComplete(true);
                    } catch (error) {
                        setStatus('Failed to upload proof try again.');
                    }
                }).catch((error) => {
                    setStatus('Failed to upload proof try again.');
                });
            }
        );
    };

    if (isNFTLoading) {
        return (
            <div className='page-wrap'>

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

                    <div className="confirm-wrap">
                        <label>
                            <input
                                type="checkbox"
                                checked={isAgreed}
                                onChange={handleCheckboxChange}
                                className="checkbox"
                            />
                            <span className="checkmark"></span>
                        </label>

                        <p className="paragraph-s">
                            Agree if you allow us to post your p<br />
                            ictures on social platforms like X, <br />
                            Discord and Telegram
                        </p>
                    </div>
                    <div className="nft-card">
                        <label htmlFor="file-upload" className="upload-icon-container">
                            <img
                                src="https://cdn.prod.website-files.com/669132d0a567fe2c543eb7cf/669141790b6d1ddc88cac542_Group%20116.png"
                                loading="lazy"
                                alt="Upload Icon"
                                className="upload-icon"
                            />
                        </label>
                        <input
                            id="file-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            style={{ display: 'none' }}
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
                                DCU POINTS
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
                    <a className="button is-in-review-button"
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
        <div >
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
                {uploadComplete ? (
                    <>
                        <div className="nft-wrap">
                            <div className="text-wrap">
                                <p className="paragraph-s">
                                    After the team review the proof of&nbsp;cleanup, check back your wallet for
                                    the updated NFT.{" "}
                                    <span className="is-yellow">
                                        Usually the process takes from 2 to 12 hours. Contact Decleanup Telegram
                                        Discord if you have questions or for troubleshooting
                                    </span>
                                </p>
                                <a href="https://t.me/DecentralizedCleanup" className="icon w-inline-block">
                                    <img src="https://cdn.prod.website-files.com/669132d0a567fe2c543eb7cf/6691417859fc8bc2dd146976_Group%20117.svg" loading="lazy" alt="" />
                                </a>
                            </div>

                            <div className="nft-card">
                                {!imagePreview ? (
                                    <label htmlFor="file-upload" className="upload-icon-container">
                                        <img
                                            src="https://cdn.prod.website-files.com/669132d0a567fe2c543eb7cf/669141790b6d1ddc88cac542_Group%20116.png"
                                            loading="lazy"
                                            alt="Upload Icon"
                                            className="upload-icon"
                                        />
                                    </label>
                                ) : (
                                    <img
                                        src={imagePreview}
                                        alt="Selected"
                                        className="Selected"
                                    />
                                )}
                                <input
                                    id="file-upload"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    style={{ display: 'none' }}
                                />
                            </div>

                            <div className="lvls-wrap is-hide-mob is-in-review hide-mo">
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
                                                className="text-size-l  yellow-text"
                                            >
                                                {attribute.value}
                                            </p>
                                        </div>
                                    ))
                                )}
                            </div>

                        </div>
                        <div className="button-wrap border">
                            <a className="button is-in-review-button">
                                IN REVIEW
                            </a>
                        </div>
                    </>
                ) : (
                    <>

                        <div className="nft-wrap">

                            <div className="confirm-wrap">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={isAgreed}
                                        onChange={handleCheckboxChange}
                                        className="checkbox"
                                    />
                                    <span className="checkmark"></span>
                                </label>

                                <p className="paragraph-s">
                                    Agree if you allow us to post your<br />
                                    pictures on social platforms like X, <br />
                                    Discord and Telegram
                                </p>
                            </div>
                            <div className="nft-card">
                                {!imagePreview ? (
                                    <label htmlFor="file-upload" className="upload-icon-container">
                                        <img
                                            src="https://cdn.prod.website-files.com/669132d0a567fe2c543eb7cf/669141790b6d1ddc88cac542_Group%20116.png"
                                            loading="lazy"
                                            alt="Upload Icon"
                                            className="upload-icon"
                                        />
                                    </label>
                                ) : (
                                    <img
                                        src={imagePreview}
                                        alt="Selected"
                                        className="Selected"
                                    />
                                )}
                                <input
                                    id="file-upload"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    style={{ display: 'none' }}
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
                            <a className="button"
                                type='button'
                                onClick={handleSubmit}
                            >
                                {buttonText}
                            </a>
                        </div>
                    </>
                )}


                <div className="footer">
                    <img src="https://cdn.prod.website-files.com/669132d0a567fe2c543eb7cf/66914178dbf243a16af65b8a_2024%C2%A9.svg" loading="lazy" alt="" />
                    <p className="logo-a">ARBITRUM</p>
                </div>
            </div>

        </div>
    );
}
