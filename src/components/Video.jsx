import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  IconCaretRightFilled,
  IconCaretUpFilled,
  IconCaretLeftFilled,
  IconCaretDownFilled,
} from "@tabler/icons-react";

// helper
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Video() {
  return (
    <div className="w-full overflow-hidden bg-black -mt-8">
      <MacbookScroll
        title={
          <span>
            AI driven websites and marketing tools <br /> that grow your
            business & simplify your life.
          </span>
        }
        showGradient={false}
      />
    </div>
  );
}

export const MacbookScroll = ({ title, showGradient }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (window && window.innerWidth < 768) setIsMobile(true);
  }, []);

  const scaleX = useTransform(scrollYProgress, [0, 0.3], [1.2, isMobile ? 1 : 1.6]);
  const scaleY = useTransform(scrollYProgress, [0, 0.3], [0.6, isMobile ? 1 : 1.6]);
  const translate = useTransform(scrollYProgress, [0, 1], [0, 1600]);
  const rotate = useTransform(scrollYProgress, [0.1, 0.12, 0.3], [-28, -28, 0]);
  const textTransform = useTransform(scrollYProgress, [0, 0.3], [0, 120]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div
      ref={ref}
      className="
        flex min-h-[200vh] shrink-0 scale-[0.55] flex-col items-center justify-start py-0 [perspective:1200px]
        sm:scale-75 md:scale-100 md:py-60
        max-[639px]:scale-90
      "
    >
      <motion.h2
        style={{ translateY: textTransform, opacity: textOpacity }}
        className="mb-16 text-center text-4xl font-bold text-neutral-800 dark:text-white max-[639px]:text-2xl max-[639px]:px-4"
      >
        {title}
      </motion.h2>

      <Lid scaleX={scaleX} scaleY={scaleY} rotate={rotate} translate={translate} />

      {/* Base */}
      <div
        className="
          relative -z-10 h-[34rem] w-[56rem] overflow-hidden rounded-2xl bg-gray-200 dark:bg-[#272729]
          max-[639px]:h-[16rem] max-[639px]:w-[22rem]
        "
      >
        <div className="relative h-10 w-full">
          <div className="absolute inset-x-0 mx-auto h-4 w-[80%] bg-[#050505]" />
        </div>
        <div className="relative flex">
          <div className="mx-auto h-full w-[10%] overflow-hidden">
            <SpeakerGrid />
          </div>
          <div className="mx-auto h-full w-[80%] overflow-hidden scale-[1.05]">
            <Keypad />
          </div>
          <div className="mx-auto h-full w-[10%] overflow-hidden">
            <SpeakerGrid />
          </div>
        </div>
        <Trackpad />
        <div className="absolute inset-x-0 bottom-0 mx-auto h-2 w-24 rounded-tl-3xl rounded-tr-3xl bg-gradient-to-t from-[#272729] to-[#050505]" />
        {showGradient && (
          <div className="absolute inset-x-0 bottom-0 z-50 h-40 w-full bg-gradient-to-t from-white via-white to-transparent dark:from-black dark:via-black"></div>
        )}
      </div>
    </div>
  );
};

export const Lid = ({ scaleX, scaleY, rotate, translate }) => {
  const videoRef = useRef(null);
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <div className="relative [perspective:1200px]">
      <div
        style={{
          transform: "perspective(1200px) rotateX(-25deg) translateZ(0px)",
          transformOrigin: "bottom",
          transformStyle: "preserve-3d",
        }}
        className="
          relative h-[22rem] w-[56rem] rounded-2xl bg-[#010101] p-2
          max-[639px]:h-[14rem] max-[639px]:w-[22rem]
        "
      >
        <div
          style={{ boxShadow: "0px 2px 0px 2px #171717 inset" }}
          className="absolute inset-0 flex items-center justify-center rounded-lg bg-[#010101]"
        >
          <span className="text-white text-xl md:text-2xl lg:text-3xl max-[639px]:text-base">
            Sandweg <br /> Branding & Marketing
          </span>
        </div>
      </div>

 {/* Lid + Video */}
<motion.div
  style={{
    scaleX,
    scaleY,
    rotateX: rotate,
    translateY: translate,
    transformStyle: "preserve-3d",
    transformOrigin: "top",
  }}
  className="
    absolute inset-0 
    w-[56rem] h-[34rem] 
    rounded-2xl bg-[#010101] p-2
    max-sm:w-[20rem] max-sm:h-[12rem]
  "
>
  <div className="absolute inset-0 rounded-lg bg-[#272729]" />
  <video
    ref={videoRef}
    src="/video.mp4"
    muted
    playsInline
    loop
    className="absolute inset-0 h-full w-full rounded-lg object-cover bg-black"
  />
</motion.div>

    </div>
  );
};

export const Trackpad = () => (
  <div
    className="
      mx-auto my-2 h-32 w-[45%] rounded-xl
      max-[639px]:h-20 max-[639px]:w-[65%]
    "
    style={{ boxShadow: "0px 0px 1px 1px #00000020 inset" }}
  ></div>
);

export const Keypad = () => {
  return (
    <div className="mx-1 h-full w-full rounded-md bg-[#050505] p-2 space-y-[4px]">
      {/* Row 1 */}
      <div className="flex gap-[4px] justify-between">
        <KBtn className="w-14">esc</KBtn>
        {[...Array(12)].map((_, i) => (
          <KBtn key={i} className="w-14">{`F${i + 1}`}</KBtn>
        ))}
      </div>

      {/* Row 2 */}
      <div className="flex gap-[4px] justify-between">
        <KBtn>~</KBtn><KBtn>1</KBtn><KBtn>2</KBtn><KBtn>3</KBtn><KBtn>4</KBtn>
        <KBtn>5</KBtn><KBtn>6</KBtn><KBtn>7</KBtn><KBtn>8</KBtn><KBtn>9</KBtn>
        <KBtn>0</KBtn><KBtn>-</KBtn><KBtn>=</KBtn>
        <KBtn className="w-24">delete</KBtn>
      </div>

      {/* Row 3 */}
      <div className="flex gap-[4px] justify-between">
        <KBtn className="w-24">tab</KBtn>
        <KBtn>Q</KBtn><KBtn>W</KBtn><KBtn>E</KBtn><KBtn>R</KBtn>
        <KBtn>T</KBtn><KBtn>Y</KBtn><KBtn>U</KBtn><KBtn>I</KBtn>
        <KBtn>O</KBtn><KBtn>P</KBtn><KBtn>[</KBtn><KBtn>]</KBtn><KBtn>\</KBtn>
      </div>

      {/* Row 4 */}
      <div className="flex gap-[4px] justify-between">
        <KBtn className="w-28">caps</KBtn>
        <KBtn>A</KBtn><KBtn>S</KBtn><KBtn>D</KBtn><KBtn>F</KBtn><KBtn>G</KBtn>
        <KBtn>H</KBtn><KBtn>J</KBtn><KBtn>K</KBtn><KBtn>L</KBtn>
        <KBtn>;</KBtn><KBtn>'</KBtn>
        <KBtn className="w-32">return</KBtn>
      </div>

      {/* Row 5 */}
      <div className="flex gap-[4px] justify-between">
        <KBtn className="w-36">shift</KBtn>
        <KBtn>Z</KBtn><KBtn>X</KBtn><KBtn>C</KBtn><KBtn>V</KBtn><KBtn>B</KBtn>
        <KBtn>N</KBtn><KBtn>M</KBtn><KBtn>,</KBtn><KBtn>.</KBtn><KBtn>/</KBtn>
        <KBtn className="w-36">shift</KBtn>
      </div>

      {/* Row 6 */}
      <div className="flex gap-[4px] justify-between items-center">
        <KBtn className="w-16">fn</KBtn>
        <KBtn className="w-16">ctrl</KBtn>
        <KBtn className="w-16">opt</KBtn>
        <KBtn className="w-20">cmd</KBtn>
        <KBtn className="w-[20rem] max-[639px]:w-[12rem]">space</KBtn>
        <KBtn className="w-20">cmd</KBtn>
        <KBtn className="w-16">opt</KBtn>
        <div className="flex flex-col ml-2">
          <KBtn className="w-12 h-6"><IconCaretUpFilled /></KBtn>
          <div className="flex">
            <KBtn className="w-12 h-6"><IconCaretLeftFilled /></KBtn>
            <KBtn className="w-12 h-6"><IconCaretDownFilled /></KBtn>
            <KBtn className="w-12 h-6"><IconCaretRightFilled /></KBtn>
          </div>
        </div>
      </div>
    </div>
  );
};

export const KBtn = ({ className, children, backlit = true }) => (
  <div
    className={cn(
      "rounded-[4px] p-[2px] transition-transform hover:scale-105",
      backlit && "bg-white/[0.15] shadow-lg shadow-white"
    )}
  >
    <div
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-[3.5px] bg-[#0A090D] text-white text-[7px]",
        className
      )}
    >
      {children}
    </div>
  </div>
);

export const SpeakerGrid = () => (
  <div
    className="mt-2 flex h-40 gap-[2px] px-[0.5px] max-[639px]:h-20"
    style={{
      backgroundImage: "radial-gradient(circle, #08080A 0.5px, transparent 0.5px)",
      backgroundSize: "3px 3px",
    }}
  ></div>
);




