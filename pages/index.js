import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import React from "react";
import { useEffect, useState } from "react";
import Question from "../components/FAQ";
import Web3 from "web3";
import Web3Modal from "web3modal";
import {
  contract_address,
  contract_abi,
  buy_price,
  speedy_nodes,
} from "../config";

//images

export default function Home() {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const [walletText, setwalletText] = useState("Connect Wallet");
  const [eth, seteth] = useState("0.05 ETH");
  const [value, setvalue] = useState(1);
  const [congratsOpen, setcongratsOpen] = useState(false);
  const [mintOpen, setmintOpen] = useState(false);
  const [availableOpen, setavailableOpen] = useState(false);
  const [presaleOpen, setpresaleOpen] = useState(false);

  //const[mintingcount, setmintingcount] = useState(1)

  useEffect(() => {
    //connect_wallet()
  }, []);

  async function connect_wallet() {
    if (Web3.givenProvider) {
      const providerOptions = {
        /* See Provider Options Section */
      };

      const web3Modal = new Web3Modal({
        network: "mainnet", // optional
        cacheProvider: true, // optional
        providerOptions, // required
      });

      const provider = await web3Modal.connect();
      const web3 = new Web3(provider);

      web3.eth.net.getId().then((result) => {
        setwalletText("Connected");
        console.log("Network id: " + result);
        if (result !== 1) {
          alert("Wrong Network Selected. Select Ethereum Mainnet");
        }
      });
    } else {
      alert(
        "Error. Open in Metamask/Coinbase App Browser or PC Browser with Metamask/Coinbase Web Extension."
      );
    }
  }
  async function fetch_data() {
    const web3 = new Web3(speedy_nodes);
    const contract = new web3.eth.Contract(contract_abi, contract_address);
    //await Web3.givenProvider.enable()

    contract.methods.get_total_released_supply().call((err, result) => {
      console.log("error: " + err);
      if (result != null) {
        // settotalAvailableSupply(result)
      }
    });
    contract.methods.get_token_count().call((err, result) => {
      if (result != null) {
        settokenCount(result);
      }
    });
  }
  async function show_error_alert(error) {
    let temp_error = error.message.toString();
    console.log(temp_error);
    let error_list = [
      "It's not time yet",
      "Sent Amount Wrong",
      "Max Supply Reached",
      "You have already Claimed Free Nft.",
      "Presale have not started yet.",
      "Presale Ended.",
      "You are not Whitelisted.",
      "Sent Amount Not Enough",
      "Max 20 Allowed.",
      "insufficient funds",
      "Presale have not started yet.",
      "Presale Ended.",
      "Sale is Paused.",
      "Max 10 Allowed.",
      "incorrect ether amount",
      "Not enough tokens left",
      "Sale not Started Yet.",
    ];

    for (let i = 0; i < error_list.length; i++) {
      if (temp_error.includes(error_list[i])) {
        // set ("Transcation Failed")
        alert(error_list[i]);
      }
    }
  }
  async function mint_presale() {
    if (Web3.givenProvider) {
      const web3 = new Web3(Web3.givenProvider);
      await Web3.givenProvider.enable();
      const contract = new web3.eth.Contract(contract_abi, contract_address);

      const addresses = await web3.eth.getAccounts();
      const address = addresses[0];
      console.log("addresses[0]: " + addresses[0]);
      // console.log("addresses[1]: "+addresses[1])
      // console.log("Default address: "+await web3.eth.defaultAccount)

      let price = buy_price * parseInt(value);
      price = Math.round(price * 100) / 100;

      try {
        const estemated_Gas = await contract.methods
          .buy_Presale(value.toString())
          .estimateGas({
            from: address,
            value: web3.utils.toWei(price.toString(), "ether"),
            maxPriorityFeePerGas: null,
            maxFeePerGas: null,
          });
        console.log(estemated_Gas);
        const result = await contract.methods
          .buy_Presale(value.toString())
          .send({
            from: address,
            value: web3.utils.toWei(price.toString(), "ether"),
            gas: estemated_Gas,
            maxPriorityFeePerGas: null,
            maxFeePerGas: null,
          });
      } catch (e) {
        show_error_alert(e);
      }

      // await contract.methods.tokenByIndex(i).call();
    } else {
      alert(
        "Error. Open in Metamask/Coinbase App Browser or PC Browser with Metamask/Coinbase Web Extension."
      );
    }
  }
  async function mint_nft() {
    if (Web3.givenProvider) {
      const web3 = new Web3(Web3.givenProvider);
      await Web3.givenProvider.enable();
      const contract = new web3.eth.Contract(contract_abi, contract_address);

      const addresses = await web3.eth.getAccounts();
      const address = addresses[0];
      console.log("addresses[0]: " + addresses[0]);
      // console.log("addresses[1]: "+addresses[1])
      // console.log("Default address: "+await web3.eth.defaultAccount)

      let price = buy_price * parseInt(value);
      price = Math.round(price * 100) / 100;

      try {
        const estemated_Gas = await contract.methods
          .buy(value.toString())
          .estimateGas({
            from: address,
            value: web3.utils.toWei(price.toString(), "ether"),
            maxPriorityFeePerGas: null,
            maxFeePerGas: null,
          });
        console.log(estemated_Gas);
        const result = await contract.methods.buy(value.toString()).send({
          from: address,
          value: web3.utils.toWei(price.toString(), "ether"),
          gas: estemated_Gas,
          maxPriorityFeePerGas: null,
          maxFeePerGas: null,
        });
      } catch (e) {
        show_error_alert(e);
      }

      // await contract.methods.tokenByIndex(i).call();
    } else {
      alert(
        "Error. Open in Metamask/Coinbase App Browser or PC Browser with Metamask/Coinbase Web Extension."
      );
    }
  }
  useEffect(() => {
    const target = new Date("Friday, November 19, 2021 11:00:00 AM GMT");

    const interval = setInterval(() => {
      const now = new Date();
      const difference = target.getTime() - now.getTime();

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      setDays(d);

      const h = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      // let temp = d * 24;
      // temp = temp + h;
      setHours(h);
      //setHours(0);

      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      setMinutes(m);
      //setMinutes(0);

      const s = Math.floor((difference % (1000 * 60)) / 1000);
      setSeconds(s);
      //setSeconds(0);

      if (d <= 0 && h <= 0 && m <= 0 && s <= 0) {
        // setPartyTime(true);
      }
    }, 1000);

    return () => clearInterval(interval);

    // state = {
    //   value: 1,
    //   eth: "0.04 ETH",
    //   congratsOpen: false,
    //   mintOpen: false,
    //   availableOpen: false,
    //   presaleOpen: false,
    // };
    // handlePrice = handlePrice.bind(this);
    // closeCongrats = closeCongrats.bind(this);
    // mintPopup = mintPopup.bind(this);
    // closeMint = closeMint.bind(this);
    // handleMintSubmit = handleMintSubmit.bind(this);
    // openAvailablePopup = openAvailablePopup.bind(this);
    // closeAvailablePopup = closeAvailablePopup.bind(this);
    // closePresale = closePresale.bind(this);
    // openPresale = openPresale.bind(this);
  });

  const handlePrice = (event) => {
    // setState({ value: event.target.value });
    seteth(event.target.value);
    setvalue(event.target.value);
    switch (event.target.value) {
      case "1":
        seteth("0.05 ETH");
        //setState({ eth: "0.04 ETH" });
        break;
      case "2":
        seteth("0.10 ETH");
        //setState({ eth: "0.08 ETH" });
        break;
      case "3":
        seteth("0.15 ETH");
        //setState({ eth: "0.12 ETH" });
        break;
      case "4":
        seteth("0.20 ETH");
        //setState({ eth: "0.16 ETH" });
        break;
      case "5":
        seteth("0.25 ETH");
        //setState({ eth: "0.20 ETH" });
        break;
      case "6":
        seteth("0.30 ETH");
        //setState({ eth: "0.20 ETH" });
        break;
      case "7":
        seteth("0.35 ETH");
        //setState({ eth: "0.20 ETH" });
        break;
      case "8":
        seteth("0.40 ETH");
        //setState({ eth: "0.20 ETH" });
        break;
      case "9":
        seteth("0.45 ETH");
        //setState({ eth: "0.20 ETH" });
        break;
      case "10":
        seteth("0.50 ETH");
        //setState({ eth: "0.20 ETH" });
        break;
      default:
        seteth("0.04 ETH");
        //setState({ eth: "0.04 ETH" });
        break;
    }
  };

  const openAvailablePopup = () => {
    //setState({ availableOpen: true });
    setavailableOpen(true);
  };

  const closeAvailablePopup = () => {
    setavailableOpen(false);
    // setState({ availableOpen: false });
  };

  const mintPopup = () => {
    setmintOpen(true);
    //setState({ mintOpen: true });
  };

  const closeMint = () => {
    setmintOpen(false);
    // setState({ mintOpen: false });
  };

  const handleMintSubmit = () => {
    setmintOpen(false);
    setcongratsOpen(true);
    setpresaleOpen(false);
    // setState({ mintOpen: false });
    // setState({ congratsOpen: true });
    // setState({ presaleOpen: false });
  };

  const closeCongrats = () => {
    setcongratsOpen(false);
    // setState({ congratsOpen: false });
  };

  const closePresale = () => {
    setpresaleOpen(false);
    //setState({ presaleOpen: false });
  };

  const openPresale = () => {
    setpresaleOpen(true);
    //setState({ presaleOpen: true });
  };

  return (
    <div className="App">
      <div className="sec1-sec2-wrapper">
        <div className="sec2-wrapper">
          <div className="container sec-2">
            <div className="main-box">
              <figure className="left-img">
                <img alt="gif" src="/GIF Compressed.gif" />
              </figure>

              <div className="right-detail">
                <p className="p-1">HI THERE!</p>
                <h3 className="sec2-h3">I’m Tokenpuss</h3>
                <p className="p-2">
                  We are a new generation of Platypus in the Metaverse. There
                  are only 5555 unique individuals of our kind and we live in
                  Ethland. We love to be in the center of attention and always
                  tend to be a bit cheeky, especially when we meet our new
                  owners! We’ve teamed up with our cousins from down under, the
                  Australian platypus. We’re donating 10% of our profits to the
                  Australian wild life conservation to help breed and protect
                  the species.
                </p>
                <div className="btn-links-wrap">
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://discord.gg/kuYZmCYTaF"
                  >
                    <button className="disc-btn">
                      JOIN US ON DISCORD
                      <img alt="dis-btn" src={"/Discord logo-min.png"} />
                    </button>
                  </a>
                  <div className="social-links">
                    <a
                      className="twit-link"
                      target="_blank"
                      href="https://twitter.com/tokenpuss"
                    >
                      Twitter
                      <img alt="twitter-link" src={"/Twitter Logo-min.png"} />
                      <div className="line-vert"></div>
                    </a>
                    <a
                      target="_blank"
                      href="https://www.instagram.com/tokenpuss/"
                    >
                      Instagram
                      <img alt="insta-link" src={"/Insta Logo-min.png"} />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <p className="found-p">
              <span className="span1">10%</span> OF OUR PROFITS GO TOWARDS
              AUSTRALIAN WILD LIFE CONSERVATION
            </p>

            <div className="supported-container">
              <h1>Supported by:</h1>
              <div className="supporters-container">
                <div className="supporter">
                  <a href="https://www.instagram.com/lilpump/">
                    <img src="/lilPump.svg" />
                  </a>
                  <div className="supporter-name">
                    <h4>Lil Pump</h4>
                    <img src="/verified.png" />
                  </div>
                  <div className="supporter-detail">
                    <img src="/insta-logo.png" />
                    <h5>15.6 M</h5>
                  </div>
                </div>
                <div className="supporter">
                  <a href="https://www.instagram.com/michael8easley/">
                    <img src="/micheal.svg" />
                  </a>
                  <div className="supporter-name">
                    <h4>Michael Beasley</h4>
                    <img src="/verified.png" />
                  </div>
                  <div className="supporter-detail">
                    <img src="/insta-logo.png" />
                    <h5>336 K</h5>
                  </div>
                </div>
                <div className="supporter">
                  <a href="https://www.instagram.com/shadmoss/">
                    <img src="/bow.svg" />
                  </a>

                  <div className="supporter-name">
                    <h4>Bow Wow</h4>
                    <img src="/verified.png" />
                  </div>
                  <div className="supporter-detail">
                    <img src="/insta-logo.png" />
                    <h5>4.7 M</h5>
                  </div>
                </div>
                <div className="supporter">
                  <a href="https://www.instagram.com/chanteljeffries/">
                    <img src="/charlie.svg" />
                  </a>
                  <div className="supporter-name">
                    <h4>Chantel Jeffries</h4>
                    <img src="/verified.png" />
                  </div>
                  <div className="supporter-detail">
                    <img src="/insta-logo.png" />
                    <h5>4.7 M</h5>
                  </div>
                </div>
              </div>
            </div>

            <div className="featured-container">
              <h1>Featured: </h1>
              <div className="featured-subcontainer">
                <div className="square">
                  <img src="/Square.svg" />
                  <h2>NYC Times Square</h2>
                </div>
                <div className="news">
                  <a href="https://cointelegraph.com/news/project-builds-nft-ecosystem-and-game-to-raise-awareness-of-platypus-extinction">
                    <img src="/CoinTelegraph.svg" />
                  </a>

                  <a href="https://www.globestats.com/tokenpuss-the-most-anticipated-public-sale-approaches/">
                    <img src="/GS.svg" />
                  </a>
                  <a href="https://www.openthenews.com/tokenpuss-the-next-biggest-nft-launch-to-end-the-year/">
                    <img src="/OpenNews.svg" />
                  </a>
                  <a href="https://www.ustimesnow.com/tokenpuss-the-nft-project-making-a-massive-difference-to-the-real-world/">
                    <img src="/Times Now.svg" />
                  </a>
                  <a href="https://ventsmagazine.com/2021/12/09/tokenpuss-an-nft-collection-with-a-sacred-mission/">
                    <img src="/Vents.svg" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="sec1-wrapper">
          <div className="container sec-1">
            <a href="#mint" className="top-link">
              <img src="/arrow-right.svg" />
              <div className="mint">HOW TO MINT</div>
            </a>
            <figure className="fig-brand">
              <img
                className="brand-logo"
                alt="main-brand"
                src={"/Tokenpuss-min.svg"}
              />
            </figure>
            <div className="header-container">
              <div className="mint-container">
                <h3>GET YOUR TOKENPUSS NOW</h3>
                <h1>MINT Tokenpuss NFT</h1>
                <p>
                  Buy the new super rare piece of digital art and make your own
                  collection more valuable!
                </p>
                <button className="mint-btn" onClick={mint_nft}>
                  <img alt="catmin" src={"/Cart-min.png"} />
                  <span>MINT {value}</span>
                </button>
                <input
                  id="range"
                  type="range"
                  min="1"
                  max="10"
                  value={value}
                  onChange={handlePrice}
                  step="1"
                />
              </div>
              <div className="mint-detail">
                <img alt="catmin" src={"/eth-small.png"} />
                <h1>{eth} </h1>
                <button onClick={connect_wallet}>{walletText}</button>
                <div>
                  <p>Secure payments powered by</p>
                  <img src="/Metamask Logo.png" />
                  <img src="/coinbase.jpeg" />
                </div>
              </div>
            </div>

            {/* <div className="row1">
                <div className="left">
                  <p className="p1">GET YOUR TOKENPUSS NOW</p>
                  <h4 className="main-heading">
                    MINT Tokenpuss
                    <br /> NFT<span className="dot">.</span>
                  </h4>
                  <p className="p2">
                    Buy the new super rare piece of digital art and make your
                    <br /> own collection more valuable!
                  </p>
                </div>
                <div className="right">
                  <img alt="eth" src={ETH} />
                  <p className="eth-value">{eth}</p>
                </div>
              </div>

              <div className="row2">
                <div className="left-box">
                  <button className="mint-btn">
                    <img alt="eth" src={Cart} />
                    <span>MINT {value}</span>
                  </button>
                  <input
                    id="range"
                    type="range"
                    min="1"
                    max="10"
                    value={value}
                    onChange={handleChange}
                    step="1"
                  />
                </div>
                <div className="right-box">
                  <button className="connect-btn">CONNECT WALLET</button>
                  <p>
                    Secure payments powered by{" "}
                    <img alt="metamsk-pic" src={Metamask} />
                  </p>
                </div>
              </div> */}
          </div>
        </div>
      </div>

      <div className="sec3-sec4-wrap">
        <div className="sec4-wrapper">
          <div className="container sec-4">
            <div className="footer-links">
              <a target="_blank" href="https://twitter.com/tokenpuss">
                {" "}
                <img alt="twitter" src={"/Twitter-min.png"} />{" "}
              </a>
              <a target="_blank" href="https://discord.gg/kuYZmCYTaF">
                {" "}
                <img alt="discord" src={"/Discord-min.png"} />{" "}
              </a>
              <a target="_blank" href="https://www.instagram.com/tokenpuss/">
                {" "}
                <img alt="insta" src={"/Instagram-min.png"} />{" "}
              </a>
              <a target="_blank" href="https://opensea.io/collection/tokenpuss">
                {" "}
                <img alt="opensea" src={"/Opensea.png"} />{" "}
              </a>
              {/* <div className="open-wrap">
                <img  target="_blank" href="https://opensea.io/collection/tokenpuss" alt="open-sea" src={"/Opensea.png"} />
                <span>OpenSea</span>
              </div> */}
            </div>

            <span>Thank You!</span>
          </div>
        </div>
        <div className="FAQ-section">
          <h1>FREQUENTLY ASKED QUESTIONS</h1>
          <Question
            question="What is the Smart Contract address"
            answer="0x44a144f115b11aB052563CA17dfd430c914bd989"
          />
          <Question
            question="When is the Tokenpuss project launching"
            answer="12th of December, 6:00 pm UTC"
          />
          <Question
            question="What will be the price per 1 mint"
            answer="0.05 ETH + Gas fees"
          />
          <Question
            question="How many Tokenpuss can I mint in one transaction"
            answer="Maximum of 10 tokens per transaction"
          />
          <Question
            question="How can I contact Tokenpuss team"
            answer="If you have any additional questions you can contact us through Discord, Twitter or Instagram"
          />
          <h1 className="mint-header" id="mint">
            HOW TO MINT TOKENPUSS NFT
          </h1>
          <h3 className="mint-heading">
            To Mint Tokenpuss NFT using a Cell/Mobile:
          </h3>
          <p className="mint-point">
            1 - Open MetaMask/Coinbase App Browser or PC Browser with
            Metamask/Coinbase Web Extension.
          </p>
          <p className="mint-point">
            2 - Download/Open : MetaMask Wallet - https://metamask.io/
          </p>
          <p className="mint-point">
            3 - Download/Open : Coinbase Wallet -
            https://www.coinbase.com/wallet
          </p>
          <p className="mint-point">
            4 - Enter www.tokenpuss.com into MetaMask/Coinbase app browser
            located within
          </p>
          <p className="mint-point">5 - Top Ethereum in your wallet</p>
          <div className="tutorial-section">
            <p className="mint-point">
              <span>Metamask app tutorial</span>{" "}
              <a href="https://youtu.be/isdvpVZYFqs">
                <img src="/Metamask Logo.png" />
              </a>
            </p>
            <p className="mint-point">
              <span>Coinbase wallet app tutorial </span>
              <a href="https://youtu.be/TiOI4hh01iw">
                <img src="/coinbase.jpeg" />
              </a>
            </p>
            <p className="mint-point">
              <span>How to top up wallet with Ethereum tutorial</span>
              <a href="https://youtu.be/FMTYAMPQzSk">
                <img alt="eth-small" src={"/eth-small.png"} />
              </a>
            </p>
          </div>
          <h3 className="mint-heading">To Mint Tokenpuss NFT using PC:</h3>
          <p className="mint-point">
            1 - Open MetaMask/Coinbase PC Browser with Metamask/Coinbase Web
            Extension.
          </p>
          <p className="mint-point">
            Download/Open : MetaMask Wallet - https://metamask.io/
          </p>
          <p className="mint-point">
            Download/Open : Coinbase Wallet - https://www.coinbase.com/wallet
          </p>
          <p className="mint-point">
            2 - Enter www.tokenpuss.com into MetaMask/Coinbase app browser
            located within
          </p>
          <p className="mint-point">3 - Top Ethereum in your wallet</p>
          <div className="tutorial-section">
            <p className="mint-point">Ready to mint</p>
          </div>
          <a href="#top" class="top-link">
            <img src="/arrow-up.svg" />
            <div>BACK TO TOP</div>
          </a>
        </div>
        <div className="sec3-wrapper">
          <div className="container sec-3">
            <div className="row-1">
              <div className="left-box">
                <p className="p_1">ROADMAP</p>
                <h3 className="h_3">STAGE 1: A STAR IS BORN</h3>
                <p className="p_2">
                  1. Every 10th of the first 100 owners is getting an airdrop
                  plus weekly giveaways to followers
                  <br />
                  2. Every 500, 1000, 2000, 3000, 4000, 5000th owner is getting
                  a unique piece of merch
                  <br />
                  3. 25% sold – AMA with a team
                  <br />
                  4. 50% sold – special giveaway!
                  <br />
                  5. 100% sold - we’re opening a merch shop and giving away
                  $10,000 worth of ETH to a lucky minter with a specific Token.
                </p>
                <p className="p_3">
                  Every month we’re donating 10% from profits towards Australian
                  wild life conservation for preserving the Platypus species
                  from extinction.We promise to keep you updated and your
                  investment in our project can go a long way!
                </p>
              </div>
            </div>

            <div className="row-2">
              <div></div>
              <div className="row2-wrap">
                <h3>
                  STAGE 2: INTEGRATING TOKENPUSS INTO THE REAL WORLD. GROWING
                  THE VALUE OF THE PROJECT
                </h3>
                <p>
                  1. Creating a mobile game with Aussie Adrenaline Game Studios
                  based on the Tokenpuss character. Huge perks for token owners.
                  Coming soon!
                  <br />
                  2. We’re proud to create a unique project with a massive
                  integration of charity, wild life and the crypto world
                  altogether. With our project, we want to take the first step
                  in this direction and support the Platypus species.
                </p>
              </div>
            </div>

            <div className="row-3">
              <div className="centr-box">
                {/* <button className="mint-btn" onClick={mintPopup}>
                    <img alt="eth54" src={"/Cart-min.png"} />
                    <span>MINT</span>
                  </button> */}
                <a href="#top">
                  <button className="mint-btn">
                    <img alt="eth54" src={"/Cart-min.png"} />
                    <span>MINT</span>
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {congratsOpen === true && (
        <div className="congrats-popup-wrap">
          <div className="content">
            <img
              alt="cross"
              className="cross-img"
              onClick={closeCongrats}
              src={"/cross.png"}
            />
            <figure className="congra-wrap">
              <img alt="congrats-pic" src={"/Congratulations.png"} />
            </figure>
            <p className="p1">You just sucessfuly minted your Tokenpuss NFT.</p>
            <p className="p2">
              It may take some time to appear in your Matemask wallet
              <br /> and Opensea account.
            </p>
            <p className="p3">
              Don’t forget to share it on Twitter and Dicsord.
            </p>
            <div className="pink-hash">
              <span>#TokenpussToTheMoon</span>
            </div>
          </div>
        </div>
      )}

      {mintOpen === true && (
        <div className="mint-popup-wrap">
          <div className="content">
            <img
              alt="cross"
              className="cross-img"
              onClick={closeMint}
              src={"/cross.png"}
            />

            <h3>MINT YOUR TOKENPUSS</h3>
            <p>
              Collect your rare Tokenpuss from 10000 pieces collection.
              <br /> Once minted, your unique Tokenpuss will be added to linked
              to Opensea. <br />
              Please allow sometime for your NFT Tokenpuss to appear.
            </p>

            <div className="eth-wrap">
              <img alt="eth-small" src={"/eth-small.png"} />
              <span>{eth}</span>
            </div>

            <form className="mint-wrapper" onSubmit={handleMintSubmit}>
              <button className="mint-btn">
                <img alt="eth12" src={"/Cart-min.png"} />
                <span>MINT {value}</span>
              </button>
              <label type="submit">
                <input
                  id="range"
                  type="range"
                  min="1"
                  max="10"
                  value={value}
                  onChange={handlePrice}
                  step="1"
                />
              </label>
            </form>
          </div>
        </div>
      )}

      {presaleOpen === true && (
        <div className="presale-popup-wrap">
          <div className="content">
            <img
              alt="cross"
              className="cross-img"
              onClick={closePresale}
              src={"/cross.png"}
            />

            <h3>WELCOME TO PRE-SALE</h3>
            <p>
              Congratulations on attending our pre-sale and being one of the
              first owners of Tokenpuss.
              <br />
              You can conect your Metamask wallet or Coinbase wallet and mint
              <br />
              your Tokenpuss here.
            </p>

            <div className="eth-wrap">
              <img alt="eth-small1" src={"/eth-small.png"} />
              <span>{eth}</span>
            </div>

            <div className="mint-wrapper">
              <button onClick={mint_presale} className="mint-btn">
                <img alt="car-minn" src={"/Cart-min.png"} />
                <span>MINT {value}</span>
              </button>
              <label type="submit">
                <input
                  id="range"
                  type="range"
                  min="1"
                  max="10"
                  value={value}
                  onChange={handlePrice}
                  step="1"
                />
              </label>
            </div>

            <button className="connect-btn" onClick={connect_wallet}>
              <div className="wallet-text">{walletText}</div>
            </button>
          </div>
        </div>
      )}

      {availableOpen === true && (
        <div className="available-popup-wrap">
          <div className="content">
            <img
              alt="cross"
              className="cross-img"
              onClick={closeAvailablePopup}
              src={"/cross.png"}
            />

            <div className="head-imgs">
              <img
                alt="asd"
                className="brand-logo"
                src={"/Tokenpuss-min.svg"}
              />
              <div className="rockets">
                <img alt="asd" className="rocket" src={"/rocket.png"} />
                <img alt="asd" className="rocket" src={"/rocket.png"} />
                <img alt="asd" className="rocket" src={"/rocket.png"} />
              </div>
            </div>

            <h3>MINTING AVAILABLE SOON</h3>
            <p>
              Thank you for supporting and growing our amazing Tokenpuss
              project. Minting will be unlocked very soon. Stay updated and go
              into the draw to win PRIZES.
            </p>

            <div className="social-links">
              <a
                className="twit-link"
                target="_blank"
                href="https://twitter.com/tokenpuss"
              >
                Twitter
                <img alt="twitter-link" src={"/Twitter Logo-min.png"} />
                <div className="line-vert"></div>
              </a>
              <a
                className="twit-link"
                target="_blank"
                href="https://discord.gg/3JCxP7grsm"
              >
                Discord
                <img alt="twitter-link" src={"/Discord-small.png"} />
                <div className="line-vert"></div>
              </a>
              <a target="_blank" href="https://www.instagram.com/tokenpuss/">
                Instagram
                <img alt="insta-link" src={"/Insta Logo-min.png"} />
              </a>
            </div>

            <div className="pink-hash">
              <span>#TokenpussToTheMoon</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
