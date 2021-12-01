import React from "react";

export type CountedString = { text: string; count: number };

interface TextAndCountProps extends React.HTMLAttributes<HTMLDivElement> {
  countedStrings: CountedString[];
}

const TextAndCount = ({
  countedStrings,
  className,
  ...other
}: TextAndCountProps) => {
  return (
    <div className={`TextAndCount ${className}`} {...other}>
      <div className="items-wrapper">
        {countedStrings.map(({ text, count }) => (
          <div key={text}>
            <span>{text}</span>
            {count > 1 && <span>({count})</span>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TextAndCount;
