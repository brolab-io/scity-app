import clsx from "clsx";
import styles from "../../styles/TrailerVideo.module.css";
import { useRef, useState } from "react";
export default function TrailerVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlay, setPlay] = useState(false);

  const toogleVideo = () => {
    if (videoRef) {
      if (videoRef.current?.paused) {
        videoRef.current.play();
        setPlay(true);
      } else {
        videoRef.current?.pause();
        setPlay(false);
      }
    }
  };

  return (
    <div className={clsx("w-full", styles["video-wrap"])}>
      <div className="relative">
        <div
          className={clsx(
            styles.thumbnail,
            !isPlay && "bg-black/50",
            "absolute top-0 left-0 right-0 bottom-0"
          )}
          onClick={toogleVideo}
        >
          <div className={clsx(styles.button, isPlay && "!hidden")}>
            <svg
              className={clsx(styles["icon-play"])}
              width="52px"
              height="52px"
              viewBox="0 0 512 512"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Play</title>
              <path d="M133,440a35.37,35.37,0,0,1-17.5-4.67c-12-6.8-19.46-20-19.46-34.33V111c0-14.37,7.46-27.53,19.46-34.33a35.13,35.13,0,0,1,35.77.45L399.12,225.48a36,36,0,0,1,0,61L151.23,434.88A35.5,35.5,0,0,1,133,440Z" />
            </svg>
          </div>
        </div>
        <video ref={videoRef} className="w-full">
          <source
            src="https://s3.ap-southeast-1.amazonaws.com/scity.games/trailer.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}
