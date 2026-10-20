import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa6";
import { BUSINESS } from "../data/content";

const LINKS = [
  { href: BUSINESS.facebook, label: "Mento Care na Facebooku", Icon: FaFacebookF },
  { href: BUSINESS.instagram, label: "Mento Care na Instagramie", Icon: FaInstagram },
  { href: BUSINESS.tiktok, label: "Mento Care na TikToku", Icon: FaTiktok },
];

export default function Social({ className = "", size = "md" }) {
  const box = size === "lg" ? "h-12 w-12 text-[20px]" : "h-10 w-10 text-[17px]";
  return (
    <ul className={`flex items-center gap-3 ${className}`}>
      {LINKS.map(({ href, label, Icon }) => (
        <li key={href}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className={`${box} flex items-center justify-center rounded-full border border-cream/30 text-cream transition-colors hover:border-prime hover:text-prime`}
          >
            <Icon aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  );
}
