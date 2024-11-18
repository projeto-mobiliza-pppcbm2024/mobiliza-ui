import React from "react";
import CarListingPage from "../CarListing/CarListingPage";
import "./HomePage.css";
import FAQ from "../../components/FAQ/FAQ";

import instagramIcon from "../../assets/icon/instagram.svg";
import facebookIcon from "../../assets/icon/facebook.svg";
import youtubeIcon from "../../assets/icon/youtube.svg";
import decoIcon from "../../assets/icon/deco.svg";

const HomePage: React.FC = () => {
  return (
    <>
      <section className="grid catchphrase text-c07 uppercase bold mt-[7.5rem] container">
        <h2 className="text-c04 catchphrase-title text-center lg:text-left lg:text-4xl">
          <span className="text-c07">Explore</span>
          <br />
          todas as
          <br />
          <span className="text-c07">possi</span>
          <br />
          bilidades
        </h2>
        <div className="catchphrase-statistics text-center lg:text-right flex lg:flex-col justify-around">
          <div>
            <span className="text-p03 catchphrase-number">+</span>15
            <span className="block catchphrase-text">garagens</span>
          </div>
          <div>
            <span className="text-p03 catchphrase-number">+</span>60
            <span className="block catchphrase-text">modelos</span>
          </div>
        </div>
      </section>

      <section className="cta-bg bg-c11 mt-[7.5rem]">
        <img className="cta-deco" src={decoIcon} alt="" />

        <div className="container cta py-[7.5rem]">
          <h2 className="section-title text-c08">
            Resta alguma dúvida
            <span className="text-p03">?</span>
          </h2>
          <p className="cta-text text-c04 font-display py-[2.5rem] md:max-w-[50%]">
            Confira o que estão falando de nós nas principais redes com a{" "}
            <span className="text-p03 cta-hashtag">#mobiliza</span>
          </p>
          <div className="social-icons flex gap-[2.5rem]">
            <a href="https://www.instagram.com/explore/search/keyword/?q=%23mobiliza">
              <img src={instagramIcon} alt="instagram" />
            </a>
            <a href="https://www.facebook.com/hashtag/mobiliza/">
              <img src={facebookIcon} alt="facebook" />
            </a>
            <a href="https://www.youtube.com/@Mobiliza">
              <img src={youtubeIcon} alt="youtube" />
            </a>
          </div>
        </div>
      </section>

      <FAQ />
    </>
  );
};

export default HomePage;
