import React from "react";
import epImage1 from "./assets/cartoon-podcast-episode-1.jpg";
import epImage2 from "./assets/cartoon-podcast-episode-2.jpg";
import epImage3 from "./assets/cartoon-podcast-episode-3.jpg";

const episodeImages = [
  {
    img: epImage1,
    title: "Unlocking the Magic. Secrets Behind Every Frame",
  },
  {
    img: epImage2,
    title: "Legends That Shape Our Worlds",
  },
  {
    img: epImage3,
    title: "When Imagination Takes Flight",
  },
];

const Episodes = () => {
  return (
    <section className="h-screen p-10 flex flex-col justify-center items-center">
      <div className="text-[5rem] self-start">
        <p>Latest Episodes</p>
      </div>
      <div className="flex gap-1" >
        {episodeImages.map(({ img, title }, index) => (
          <div className="w-1/3" key={index}>
            <div className="w-full h-full ">
              <img 
              height={"350px"}
              width={"350px"}
              loading="lazy"
              className="h-full w-full object-cover rounded-2xl" src={img} alt="" />
            </div>
            <p className="text-[1rem]">Episode: {title}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Episodes;
