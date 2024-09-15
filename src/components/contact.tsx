import Link from "next/link";
import { SiGmail, SiLinkedin } from "react-icons/si";

const ContactUs = () => {
  return (
    <div className="min-h-screen flex flex-col gap-5 items-center justify-center p-5">
      <h1 className="text-4xl font-bold">
        Let's build something amazing together!
      </h1>
      <div className="flex justify-center items-center flex-col gap-10">
        <div className="text-lg text-centermb-4 flex flex-col justify-center items-center">
          <p>I’m always open to new projects, collaborations, and opportunities.</p>
          <p>Feel free to reach out to me if you have any questions or just want to say hi!</p>
        </div>
        <div className="flex gap-10">
          <Link href="mailto:yuvrajsinh476@gmail.com" className="text-blue-500 hover:underline">
            <SiGmail className="inline-block" size={30} />
          </Link>
          <Link href="https://linkedin.com/in/yuvrajsinh099" target="_blank" className="text-blue-500 hover:underline">
            <SiLinkedin className="inline-block" size={30} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;