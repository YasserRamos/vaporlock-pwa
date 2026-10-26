
import { useState } from "react";

type VaporlockLogoProps = {
  className?: string;
  alt?: string;
};

export default function VaporlockLogo({
  className = "",
  alt = "Vaporlock",
}: VaporlockLogoProps) {
  const [imageFailed, setImageFailed] = useState(false);

  const logoSrc = "/images/vaporlock-logo.png";

  return (
    <div className={`vaporlock-logo ${className}`}>
      {!imageFailed && (
        <img
          src={logoSrc || "/images/vaporlock-logo.png"}
          alt={alt}
          onError={() => setImageFailed(true)}
        />
      )}

      {imageFailed && (
        <span className="block -rotate-2 text-xl font-black italic tracking-tight text-[#f4e8cf] sm:text-2xl">
            VAPOR<span className="text-[#e38a42]">LOCK</span>
          </span>
      )}
    </div>
  );
}
