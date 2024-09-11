import MaxWidthWrapper from "@/components/MaxWidthWrapper";

export default function Home() {
  return (
    <MaxWidthWrapper className="max-w-screen-lg">
      <div className="flex justify-center h-screen">
        <div className="flex flex-col gap-10 mt-44">
          <h1 className="text-5xl font-bold">About Me</h1>
          <div className="flex flex-col gap-5">
            <p>
              Hi, I’m Yuvrajsinh Gohil, a passionate and innovative software developer currently pursuing my B.Tech in Computer Science at Nirma University with a minor in Cyber Physical Systems. I specialize in full-stack web development and have a strong foundation in data structures, algorithms, and database management. My work focuses on creating efficient, scalable, and user-friendly applications using modern technologies.
            </p>

            <p>
              I thrive in challenging environments where I can solve real-world problems through code, whether it’s building AI-powered educational platforms, crafting intuitive user interfaces, or creating multiplayer gaming experiences. With a deep interest in AI/ML, I enjoy working on projects that push the boundaries of technology.
            </p>

            <p>
              In my spare time, I enjoy participating in hackathons, continuously improving my coding skills, and staying updated with the latest industry trends. I believe in lifelong learning and am always eager to take on new challenges.
            </p>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  )
}