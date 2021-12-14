import clsx from "clsx";
import React from "react";

// import react slick
import Container from "../UI/Container";

import styles from "./About.module.css";

type Props = {};

const HomeAbout: React.FC<Props> = () => {
  return (
    <div className={clsx(styles.background, "pt-24")}>
      <Container className="px-4 lg:px-6 xl:px-8">
        <div>
          <div className="text-center">
            <h2 className="text-xl font-semibold text-white md:text-2xl lg:text-3xl">
              THE SOCIALVERSE CITY
            </h2>
          </div>
          <div className="py-6 lg:py-8 xl:py-10 2xl:py-12">
            <div
              className={clsx(
                styles.video,
                "flex items-center justify-center w-full h-80 md:h-96 lg:h-148"
              )}
            >
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/3hbcCHgxn6E?showinfo=0&controls=0&rel=0&autoplay=0&mute=0"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default HomeAbout;
