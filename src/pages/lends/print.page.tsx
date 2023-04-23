import dynamic from "next/dynamic";

const PDF = dynamic(() => import("./PDF"), {
  ssr: false,
});

const Print = () => {
  return <PDF />;
};

export default Print;
