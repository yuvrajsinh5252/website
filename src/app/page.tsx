export default function Home() {
  return (
    <div className="flex justify-center flex-col h-screen">
      <div className="flex z-10 justify-around">
        <div className="flex items-start flex-col gap-8">
          <div className="flex items-start flex-col">

            <span className="mt-2 font-semibold tracking-tight text-4xl md:text-5xl leading-tight md:leading-tight">
              Hey I'm
            </span>
            <h1 className="text-5xl font-bold highlight bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
              Yuvrajsinh Gohil
            </h1>
          </div>

          <div>
            <p className="text-xl md:text-[17px] font-semibold text-gray-400 tracking-tight leading-relaxed">
              Passionate about efficiency, tech, and open source
            </p>
          </div>

          <div className="flex gap-5">
            <a href="/Resume" className="m-auto bg-gradient-to-r from-green-400 to-blue-500 text-sm  rounded-full font-medium p-4">
              Download Resume
            </a>

            <a href="/contact" className="p-4 m-auto bg-gray-800/20 px-3.5 text-sm rounded-full font-medium ring-1 ring-inset ring-gray-700/30 backdrop-blur-md">
              Let's Connect
            </a>
          </div>
        </div>
        <div className="h-60 w-60 bg-red-500 rounded-full"></div>
      </div>
    </div>
  );
}
