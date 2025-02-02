import "./index.css";
import Canvas from "./Canvas";
import data from "./data";
import LocomotiveScroll from "locomotive-scroll";
import { useEffect, useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function App() {
  const [showCanvas, setShowCanvas] = useState(false);
  const headingref = useRef(null);
  const growingSpan = useRef(null);
  const audioRef = useRef(null) ;

  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll();
  }, []);

  
  useEffect(() => {
    audioRef.current = new Audio("https://thirtysixstudio.com/audio/world2.mp3") ;
    audioRef.current.loop = true ;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [])


  useEffect(() => {
    if (showCanvas) {
      audioRef.current.play().catch((err) => console.error("Audio play error:", err));
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0; // Reset audio when stopping
    }
  }, [showCanvas]);
  

  useEffect(() => {
    const handleClick = (e) => {
      setShowCanvas((prevShowCanvas) => {
        if (!prevShowCanvas) {
          gsap.set(growingSpan.current, {
            top: e.clientY,
            left: e.clientX,
          });

          gsap.to("body", {
            color: "#000",
            backgroundColor: "#fd2c2a",
            duration: 1.2,
            ease: "power2.inOut",
          });

          gsap.to(growingSpan.current, {
            scale: 1000,
            duration: 2,
            ease: "power2.inOut",
            onComplete: () => {
              gsap.set(growingSpan.current, {
                scale: 0,
                clearProps: "all",
              });
            },
          });
        } else {
          gsap.to("body", {
            color: "#fff",
            backgroundColor: "#000",
            duration: 1.2,
            ease: "power2.inOut",
          });
        }

        return !prevShowCanvas;
      });
    };

    const headingElement = headingref.current;
    headingElement.addEventListener("click", handleClick);

    // Clean up event listener on unmount
    return () => headingElement.removeEventListener("click", handleClick);
  }, []);

  return (
    <>
    <div className="md:hidden h-screen w-screen bg-black grid place-items-center">
      <h1 className="text-4xl tracking-tight">please access it on Desktop</h1>
    </div>
    <div className="hidden md:block">
      <span
        ref={growingSpan}
        className="growing rounded-full block fixed top-[-20px] left-[-20px] w-5 h-5"
      ></span>
      <div className="w-full relative min-h-screen">
        {showCanvas &&
          data[0].map((canvasdets, index) => <Canvas details={canvasdets} />)}
        <div className="w-full relative z-[1] h-screen ">
          <nav className="w-full p-8 flex justify-between z-50">
            <div className="brand text-2xl font-md">GreatShootStudios</div>
            <div className="links flex gap-10">
              {[
                "What we do",
                "Who we are",
                "How we give back",
                "Talk to us",
              ].map((link, index) => (
                <a
                  key={index}
                  href={`#${link.toLowerCase()}`}
                  className="text-md hover:text-gray-300"
                  
                >
                  {link}
                </a>
              ))}
            </div>
          </nav>
          <div className="textcontainer  w-full px-[20%]">
            <div className="text w-[50%]">
              <h3 className="text-3xl leading-[1.2]">
                At GreatShootStudios, we build immersive digital experiences for
                brands with a purpose.
              </h3>
              <p className="text-lg w-[80%] mt-10 font-normal">
                We are a team of designers, developers, and strategists who are
                passionate about creating digital experiences that are both
                beautiful and functional.
              </p>
              <p className="text-md mt-10 mb-44">scroll</p>
            </div>
          </div>
          <div className="w-full mt-60">
            <h1
              ref={headingref}
              className="text-[10rem] font-light tracking-tight leading-none pl-5"
            >
              GreatShootStudios
            </h1>
          </div>
        </div>
      </div>

      <div className="page2 w-full relative h-screen mt-32 px-10">
        {showCanvas &&
          data[1].map((canvasdets, index) => <Canvas details={canvasdets} />)}

        <div className="line w-full h-1  mt-[12rem]">
          <div className="w-full h-[0.8px] bg-gray-400 opacity-45">

          </div>
        </div>

        <div className="w-full  flex justify-center">
          <div className="w-[60%] h-screen   flex ">
            <div className="whatwedo w-1/2 h-1/2 flex justify-center">
              <h1 className="mt-10 font-medium">01 - WHAT WE DO</h1>
            </div>
            <div className=" h-full w-1/2  flex flex-col gap-y-64">
              <h2 className=" mt-10 font-medium text-3xl tracking-tight leading-8">We aim to revolutionize digital production in the advertising space, bringing your ideas to life.</h2>

              <div className="gap-y-12 flex flex-col">
                <h3 className="tracking-tighter font-normal text-md leading-5">As a contemporary studio, we use cutting-edge design practices and the latest technologies to deliver seamless digital work.</h3>
                <h3 className="tracking-tighter font-normal text-md leading-5">
                Our commitment to creativity, innovation, and simplicity, paired with our agile approach, ensures your journey with us is smooth and enjoyable from start to finish.
                </h3>

                <h3 className="text-green-500">ONLY FOR EDUCATIONAL PURPOSES , NOT MY DESIGN</h3>
              </div>
            </div>


          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default App;
