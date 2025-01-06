import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="border-t ">
      <div className="wrapper flex flex-col items-center justify-center gap-4 py-8">
        <Link href="/">
          <Image
            src="/assets/images/evnto-logo.png"
            alt="logo"
            width={80}
            height={38}
          />
        </Link>
        <p className="text-center text-sm">
          &copy; {new Date().getFullYear()} Evnto. All rights reserved.
          Developed by Luis Iannello{" "}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
