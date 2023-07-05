import React, { useState, useRef } from 'react';
import { Center, ChakraProvider, extendTheme, useToast } from '@chakra-ui/react';
import { Alchemy, Network } from 'alchemy-sdk';
import { ethers } from 'ethers';
import '@fontsource/space-mono/400.css';
import '@fontsource/space-mono/700.css';
import NavBar from './component/NavBar';
import SearchBar from './component/SearchBar';
import TokenList from "./component/TokenList";
import Footer from "./component/Footer";

const theme = extendTheme({
    fonts: {
        heading: `"Space Mono", monospace`,
        body: `"Space Mono", monospace`,
    }
})

function App() {
    const [userAddress, setUserAddress] = useState('');
    const [searchAddress, setSearchAddress] = useState('');
    const [finalSearchAddress, setFinalSearchAddress] = useState('');
    const [results, setResults] = useState([]);
    const [hasQueried, setHasQueried] = useState(false);
    const [tokenDataObjects, setTokenDataObjects] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchTime, setSearchTime] = useState(null);

    const toast = useToast()
    const toastIdRef = useRef()

    async function connectWallet() {
        try {
            if (window.ethereum) {
                await window.ethereum.enable();
                const ethersProvider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = ethersProvider.getSigner();
                const address = await signer.getAddress();
                setUserAddress(address);
                getTokenBalance(address);
            } else {
                console.error('Please install MetaMask to connect your wallet.');
                toastIdRef.current = toast({
                    title: 'Please install MetaMask to connect your wallet.',
                    status: 'error',
                    position: 'top-right',
                    variant: 'left-accent',
                    duration: 3000,
                    isClosable: true,
                });
            }
        } catch (error) {
            console.error('Error connecting wallet:', error);
            toastIdRef.current = toast({
                title: 'Error connecting wallet.',
                status: 'error',
                position: 'top-right',
                variant: 'left-accent',
                duration: 3000,
                isClosable: true,
            });
        }
    }

    async function getUserToken() {
        setSearchAddress(userAddress);
        getTokenBalance(userAddress);
    }

    const isValidCryptoAddress = (address) => {
        return /^(0x)?[0-9a-fA-F]{40}$/.test(address);
    };

    async function getTokenBalance(addressValue) {
        const startTime = Date.now();
        try {
            setIsLoading(true);

            if (typeof addressValue === "object" || addressValue === undefined) {
                addressValue = searchAddress;
            }

            addressValue = addressValue.trim();

            if (!addressValue) {
                throw "Search field can't be empty";
            }

            if (!isValidCryptoAddress(addressValue)) {
                throw 'Invalid address';
            }

            console.log("Address: ", addressValue);

            const config = {
                apiKey: 'kK45sqjJCT08jdGW0BvA_L4czgD0ILNe', // You can get your own api key from https://alchemy.com/
                network: Network.ETH_MAINNET,
            };

            const alchemy = new Alchemy(config);
            const data = await alchemy.core.getTokenBalances(addressValue);

            setResults(data);

            const tokenDataPromises = [];

            for (let i = 0; i < data.tokenBalances.length; i++) {
                const tokenData = alchemy.core.getTokenMetadata(data.tokenBalances[i].contractAddress);
                tokenDataPromises.push(tokenData);
            }

            const resolvedTokenData = await Promise.all(tokenDataPromises);
            setTokenDataObjects(resolvedTokenData);
            setHasQueried(true);
        } catch (error) {
            setTokenDataObjects([]);
            setHasQueried(false);

            if (error === "Search field can't be empty") {
                setError(error);
                console.error('Error:', error);
            } else if (error === 'Invalid address') {
                setError(error);
                console.error('Error:', error);
            } else {
                console.error('Error retrieving token balances:', error);
                setError('An error occurred while retrieving token balances. Please try again.');
            }
        } finally {
            setFinalSearchAddress(addressValue);
            setIsLoading(false);
        }
        const endTime = Date.now();
        const totalTime = (endTime - startTime) / 1000;
        setSearchTime(totalTime);
    }

    return (
        <>
            <ChakraProvider theme={theme}>
                <Center bgColor="#141d2f" px="24px" flexDir={'column'}>
                    <NavBar userAddress={userAddress} onClickGetUserToken={getUserToken} onClickConnectWallet={connectWallet} />
                    <SearchBar searchAddress={searchAddress} onSearchChange={(e) => setSearchAddress(e.target.value)} onSearchClick={getTokenBalance} isLoading={isLoading} />
                    <TokenList results={results} tokenDataObjects={tokenDataObjects} hasQueried={hasQueried} finalSearchAddress={finalSearchAddress} searchTime={searchTime} error={error} />
                    <Footer />
                </Center>
            </ChakraProvider>
        </>
    );
}

export default App;
