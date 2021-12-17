import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import React from "react";
import { useEffect, useState } from "react";
import Question from "../components/FAQ";
//images

export default function Home1() {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const [eth, seteth] = useState("0.05 ETH");
  const [value, setvalue] = useState(1);
  const [congratsOpen, setcongratsOpen] = useState(false);
  const [mintOpen, setmintOpen] = useState(false);
  const [availableOpen, setavailableOpen] = useState(false);
  const [presaleOpen, setpresaleOpen] = useState(false);

  useEffect(() => {
    const target = new Date("Sunday, December 12, 2021 6:00:00 PM GMT");

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
        seteth("0.05 ETH");
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
                  Australian Platypus! We’re donating 10% of our profits towards Australian wild life conservation to help breed and protect Platypus species.
                </p>
                <div className="btn-links-wrap">
                  <a
                  href="https://discord.gg/PDR3ukCFmP"
                  target="_blank"
                  >
                  <button
                  
                    className="disc-btn"
                  >
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
          </div>
        </div>

        <div className="sec1-wrapper">
          <div className="container sec-1">
            <figure className="fig-brand">
              <img
                className="brand-logo"
                alt="main-brand"
                src={"/Tokenpuss-min.svg"}
              />
            </figure>

            <div className="row3">
              <p className="minting-p">Minting available in</p>
              <div className="countdown-wrap">
                <div className="col1">
                  <div className="digits">
                    <div className="dig">
                      <span>{days}</span>

                      <div className="gray-bg"></div>
                    </div>
                    {/* <div className="dig">
                        <span>6</span>

                        <div className="gray-bg"></div>
                      </div> */}
                  </div>
                  <p>Days</p>
                </div>
                <div className="col2">
                  <span className="dot1"></span>
                  <span className="dot2"></span>
                </div>

                <div className="col1">
                  <div className="digits">
                    <div className="dig">
                      <span>{hours}</span>

                      <div className="gray-bg"></div>
                    </div>
                    {/* <div className="dig">
                        <span>6</span>

                        <div className="gray-bg"></div>
                      </div> */}
                  </div>
                  <p>Hours</p>
                </div>
                <div className="col2">
                  <span className="dot1"></span>
                  <span className="dot2"></span>
                </div>
                <div className="col3">
                  <div className="digits">
                    <div className="dig">
                      <div className="gray-bg"></div>

                      <span>{minutes}</span>
                    </div>
                    {/* <div className="dig">
                        <div className="gray-bg"></div>

                        <span>2</span>
                      </div> */}
                  </div>
                  <p>Minutes</p>
                </div>
                <div className="col4">
                  <span className="dot1"></span>
                  <span className="dot2"></span>
                </div>
                <div className="col5">
                  <div className="digits">
                    <div className="dig">
                      <div className="gray-bg"></div>

                      <span>{seconds}</span>
                    </div>
                    {/* <div className="dig">
                        <div className="gray-bg"></div>

                        <span>8</span>
                      </div> */}
                  </div>
                  <p>Seconds</p>
                </div>
              </div>

              <div className="middle-sec">
                <div className="wrap">
                  <div className="eth-wrap">
                    <span>{eth}</span>
                    <img
                      className="eth-logo"
                      alt="asf"
                      src={"/eth-small.png"}
                    />
                  </div>

                  <div className="right-box">
                    <input
                      id="range"
                      type="range"
                      min="1"
                      max="10"
                      value={value}
                      onChange={handlePrice}
                      step="1"
                    />
                    <button className="mint-btn" onClick={openAvailablePopup}>
                      <img alt="catmin" src={"/Cart-min.png"} />
                      <span>MINT {value}</span>
                    </button>
                  </div>
                </div>
              </div>
              <a
                  href="https://discord.gg/PDR3ukCFmP"
                  target="_blank"
                  >
              <button

                className="btn-discord"
              >
                JOIN US ON DISCORD
                <img alt="dis-btn" src={"/Discord logo-min.png"} />
              </button>
              </a>
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
              <a target="_blank" href="https://discord.gg/PDR3ukCFmP">
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
              {/* <div target="_blank" href="https://opensea.io/collection/tokenpuss" className="open-wrap">
                <img target="_blank" href="https://opensea.io/collection/tokenpuss" alt="open-sea" src={"/Opensea.png"} />
                <span target="_blank" href="https://opensea.io/collection/tokenpuss">OpenSea</span>
              </div> */}
            </div>

            <span>Thank You!</span>
          </div>
        </div>
        <div className="FAQ-section">
          <h1>FREQUENTLY ASKED QUESTIONS</h1>
          <Question question="What is the Smart Contract address" answer="Announced soon"/>
          <Question question="When is the Tokenpuss project launching" answer="12th of December, 6:00pm UTC"/>
          <Question question="What will be the price per 1 mint" answer="0.05 ETH + Gas fees"/>
          <Question question="How many Tokenpuss can I mint in one transaction" answer="Maximum of 10 tokens per transaction"/>
          <Question question="How can I contact Tokenpuss team" answer="If you have any additional questions you can contact us through Discord, Twitter or Instagram"/>
          
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
                  2. Every 500, 1000, 2000, 3000, 4000, 5000th owner is getting a unique piece of merch
                  <br />
                  3. 25% sold – AMA with a team
                  <br />
                  4. 50% sold – special giveaway!
                  <br />
                  5. 100% sold - we’re opening a merch shop and giving away $10,000 worth of ETH to a lucky minter with a specific Token.
                </p>
                <p className="p_3">
                Every month we’re donating 10% from profits towards Australian wild life conservation for preserving the Platypus species from extinction. We promise to keep you updated and your
                  investment in our project can go a long way!
                </p>
              </div>
            </div>

            <div className="row-2">
              <div></div>
              <div className="row2-wrap">
                <h3>
                  STAGE 2: INTEGRATING TOKENPUSS IN THE REAL WORLD. GROWING THE
                  REAL VALUE
                </h3>
                <p>
                  1. Creating a mobile game with AA game studios based on the
                  Tokenpuss character. Huge perks for token owners. Coming soon!
                  <br />
                  2. Support the local Australian wild life. We’re proud to create a unique project with a
                  massive integration of charity, wild life and the crypto world
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
                <button className="mint-btn" onClick={openAvailablePopup}>
                  <img alt="eth54" src={"/Cart-min.png"} />
                  <span>MINT</span>
                </button>
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
              <img alt="congrats-pic" src={CongratsImg} />
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
              Collect your rare Tokenpuss from 10,000 pieces collection.
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
              first owners of
              <br />
              Tokenpuss. You can conect your Metamask wallet and mint
              <br />
              your Tokenpuss here.
            </p>

            <div className="eth-wrap">
              <img alt="eth-small1" src={"/eth-small.png"} />
              <span>{eth}</span>
            </div>

            <form className="mint-wrapper" onSubmit={handleMintSubmit}>
              <button className="mint-btn">
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
            </form>

            <button className="connect-btn">
              CONNECT WALLET
              <img alt="metamsk-pic" src={"/Metamask Logo.png"} />
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
                href="https://discord.gg/PDR3ukCFmP"
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
