import { ethers } from 'ethers';

export const connectWallet = async () => {
    if (window.ethereum) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        return { provider, signer };
    } else {
        alert("Please install MetaMask!");
        return null;
    }
};
