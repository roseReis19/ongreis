import styles from "./page.module.css";
import Image from "next/image";

export const metadata = {
  title: "Autenticação Instituto Rose Reis",
};

export default function AuthLayout({ children }) {
  return (
    <div className={styles.main}>
      <div
        style={{
          zIndex: -1,
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
        }}
      >
        <Image
          src="/landscape.png"
          layout="fill"
          objectFit="cover"
          alt="Picture of the author"
        />
      </div>

      {children}
    </div>
  );
}
