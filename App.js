import React, { useEffect, useState } from 'react';
import { connectWallet } from './Web3Provider';
import TokenBalanceChecker from './TokenBalanceChecker';

const App = () => {
    const [signer, setSigner] = useState(null);

    useEffect(() => {
        const initiateConnection = async () => {
            const connection = await connectWallet();
            if (connection) {
                setSigner(connection.signer);
            }
        };
        initiateConnection();
    }, []);

    return (
        <div>
            <h1>Token Balance Checker</h1>
            {signer ? (
                <TokenBalanceChecker signer={signer} />
            ) : (
                <p>Please connect your wallet.</p>
            )}
        </div>
    );
};

export default App;
