import clsx from "clsx";
import Container from "../UI/Container";
import styles from "./StayUpToDate.module.css";

const StayUpToDate = () => {
  return (
    <Container className="py-20">
      <div className={styles.bg}>
        <div className="flex flex-wrap items-center justify-between px-20 py-12 gap-y-8">
          <div className="space-y-4">
            <h3 className="text-[20px] font-semibold text-white">
              Don&apos;t miss out, stay up date
            </h3>
            <p className="text-[16px] text-[#A0AEC0]">Submit your email to get the latest news</p>
          </div>
          <div className="relative">
            <input
              type="email"
              placeholder="Enter your Email address"
              className="px-4 cursor-text py-2.5 text-[16px] text-[#4A5568] bg-white rounded-xl min-w-full md:min-w-[32rem] focus:outline-none focus:shadow-outline"
            />
            <div className="absolute right-0.5 top-0.5 z-30 select-none">
              <button
                className={clsx(
                  "px-9 py-2 rounded-xl text-white cursor-pointer select-all",
                  styles.send
                )}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default StayUpToDate;
