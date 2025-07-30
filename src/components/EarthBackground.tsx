'use client';

// import SimpleNavbar from "./Layout/BlogNavbar";

const EarthTSLLookalike = () => {
  return (<>
  {/* <SimpleNavbar/> */}
    <div className="fixed inset-0 w-full h-full z-0 bg-gradient-to-br from-black via-[#1a1a1a] to-[#3a2a1e]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_#FFD70020,_transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_#DAA52015,_transparent_70%)]" />
    </div>
  </>
  );
};

export default EarthTSLLookalike;
