import Button from "./Button";
import HighlightText from "./HighlightText";
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";

const CodeBlocks = ({
  position,
  heading,
  subheading,
  ctabtn1,
  ctabtn2,
  backgroundGradient,
  codeColor,
  codeString,
}) => {
    const codeLines = codeString.trim().split("\n");
  return (
    <div className={`flex ${position} my-20 justify-between gap-10 flex-col lg:flex-row`}>
      {/* LEFT */}
      <div className={`w-full lg:w-[50%] flex flex-col gap-8`}>
        {heading}
        <div className={`text-richblack-300 font-bold`}>{subheading}</div>

        <div className={`flex gap-7`}>
          <Button active={ctabtn1.active} linkto={ctabtn1.linkto}>
            <div className="flex gap-2 items-center">
              {ctabtn1.btnText}
              <FaArrowRight />
            </div>
          </Button>

          <Button active={ctabtn2.active} linkto={ctabtn2.linkto}>
            {ctabtn2.btnText}
          </Button>
        </div>
      </div>

      {/* RIGHT CODE BLOCK */}
      <div
        className={`h-fit min-h-[300px] flex flex-row w-full lg:w-[600px] py-6 px-4 rounded-md shadow-md ${backgroundGradient}`}
      >
        {/* Line Numbers */}
        <div className="text-center flex flex-col w-[8%] text-richblack-400 font-inter font-bold text-sm">
          {codeLines.map((_, i) => (
            <p className="text-base" key={i}>{i + 1}</p>
          ))}
        </div>

        {/* Code Area */}
        <div
          className={`w-[92%] flex flex-col gap-2 font-mono text-sm font-bold ${codeColor} pr-2`}
        >
          <TypeAnimation
            sequence={[codeString, 3000, ""]}
            repeat={Infinity}
            cursor={true}
            omitDeletionAnimation={true}
            style={{
              whiteSpace: "pre-line",
              display: "block",
              fontSize: "14px", 
              lineHeight: "1.5rem",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CodeBlocks;
