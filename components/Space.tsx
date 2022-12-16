const Space = ({
  children,
  type = "horizontal",
  distance = 10,
}: {
  children: React.ReactNode | React.ReactNode[];
  type?: "horizontal" | "vertical";
  distance?: number;
}) => {
  return (
    <div
      css={{
        display: "flex",
        flexDirection: type === "horizontal" ? "row" : "column",
        gap: type === "horizontal" ? `0 ${distance}px` : `${distance}px 0`,
      }}
    >
      {children}
    </div>
  );
};

export default Space;
