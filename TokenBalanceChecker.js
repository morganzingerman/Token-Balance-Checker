import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const TokenBalanceChecker = ({ signer }) => {
    const [balance, setBalance] = useState(0);
    const [tokenAddress, setTokenAddress] = useState("YOUR_TOKEN_CONTRACT_ADDRESS"); // Replace with the ERC20 token address
    const [error, setError] = useState(null);

    const getTokenBalance = async () => {
        const contractABI = [
            "function balanceOf(address owner) view returns (uint256)"
        ];

        try {
            const contract = new ethers.Contract(tokenAddress, contractABI, signer);
            const address = await signer.getAddress();
            const balance = await contract.balanceOf(address);
            setBalance(ethers.utils.formatEther(balance));
            setError(null);
        } catch (err) {
            setError("Failed to fetch balance");
            console.error(err);
        }
    };

    useEffect(() => {
        if (signer) {
            getTokenBalance();
        }
    }, [signer]);

    return (
        <div>
            <h2>Your Token Balance</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <p>{balance} Tokens</p>
            <button onClick={getTokenBalance}>Refresh Balance</button>
        </div>
    );
};

export default TokenBalanceChecker;
