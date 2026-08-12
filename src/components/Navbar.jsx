import { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Logo from "../assets/mento-care-logo.png";
import BurgerMenu from "../assets/burgerMenu.svg";
import FacebookLogo from "../assets/facebook_logo.svg";
import InstagramLogo from "../assets/instagram_logo.svg";
import TikTokLogo from "../assets/tiktok_logo.svg";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const menus = [
    { name: "o nas", id: "about" },
    { name: "usługi", id: "services" },
    { name: "o mnie", id: "about-me" },
    { name: "metamorfozy", id: "metamorphoses" },
    { name: "cennik", id: "pricing" },
    { name: "voucher", id: "voucher" },
  ];

  useEffect(() => {
    if (location.pathname !== "/") {
      setActiveSection(null);
      return;
    }

    const options = {
      root: null,
      rootMargin: "-10% 0px -10% 0px", // Adds margin to trigger earlier
      threshold: [0, 0.1, 0.5, 0.9], // Multiple thresholds for better detection
    };

    const observer = new IntersectionObserver((entries) => {
      // Find the entry with highest intersection ratio
      let mostVisible = null;
      let highestRatio = 0;

      entries.forEach((entry) => {
        if (entry.intersectionRatio > highestRatio) {
          highestRatio = entry.intersectionRatio;
          mostVisible = entry;
        }
      });

      // Only update if we have a significantly visible section
      if (mostVisible && mostVisible.intersectionRatio > 0.1) {
        setActiveSection(mostVisible.target.id);
      }
    }, options);

    // Observe main sections
    const sectionsToObserve = [
      "about",
      "services",
      "about-me",
      "pricing",
      "metamorphoses",
      "voucher",
    ];

    sectionsToObserve.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    // Cleanup observer on unmount
    return () => observer.disconnect();
  }, [menus]);

  return (
    <nav className="fixed top-5 md:top-10 left-0 w-full z-50 px-4 md:px-[98px]">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="md:absolute md:left-1/2 md:transform md:-translate-x-1/2 z-20">
          <a href="#about">
            <img
              src={Logo}
              alt="Logo"
              className="logo cursor-pointer h-[60px] md:h-[100px] md:mt-[40px]"
            />
          </a>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-[24px] uppercase text-[16px] font-light">
          {menus.map((menu, i) => (
            <a
              key={i}
              href={`#${menu.id}`}
              onClick={() => `/#${menu.id}`}
              className={`cursor-pointer flex items-center ${
                [menu.id].some((id) => activeSection === id)
                  ? "text-prime"
                  : "text-textPrimary"
              }`}
            >
              {[menu.id].some((id) => activeSection === id) && (
                <span className="w-2 h-2 bg-prime rounded-full mr-2"></span>
              )}
              {menu.name}
            </a>
          ))}
        </div>

       {/* Desktop Right Side */}
        <div className="hidden md:flex space-x-[32px] uppercase text-lg font-light">
          {/* <span className="cursor-pointer text-textPrimary">BLOG</span> */}

          <p className="text-prime cursor-pointer flex items-center gap-2 text-[16px]">
            <span>{`>`}</span>
            <span>
              <a
                href="https://booksy.com/pl-pl/221086_kosmetologia-estetyczna-faustyna-hojnor_salon-kosmetyczny_10189_bochnia"
                target="_blank"
                rel="noopener noreferrer"
              >
                zarezerwuj
              </a>
            </span>
            <span>{`<`}</span>
          </p>
        </div>

        {/* Mobile Social Links (Nowy element) */}
        <div className="flex md:hidden items-center space-x-4 z-20">
          <a href="https://www.facebook.com/p/Mento-Care-61557586307146/" target="_blank" rel="noopener noreferrer">
            <img src={FacebookLogo} alt="facebook" style={{ height: "24px" }} />
          </a>
          <a href="https://www.instagram.com/mento.care/" target="_blank" rel="noopener noreferrer">
            <img src={InstagramLogo} alt="instagram" style={{ height: "20px" }} />
          </a>
          <a href="https://www.tiktok.com/@mento.care" target="_blank" rel="noopener noreferrer">
            <img src={TikTokLogo} alt="tiktok" style={{ height: "20px" }} />
          </a>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden z-20">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-3xl text-prime focus:outline-none"
          >
            {isMobileMenuOpen ? (
              <AiOutlineClose style={{ color: "#FFFFFF" }} />
            ) : (
              <img src={BurgerMenu} style={{ height: "20px" }} alt="Menu" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-md flex flex-col justify-center items-center text-lg font-light uppercase z-10">
          <ul className="flex flex-col gap-8 text-center text-white text-[18px]">
            {menus.map((item, index) => (
              <a
                key={index}
                href={`#${item.id}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="cursor-pointer"
              >
                {item.name}
              </a>
            ))}
            {/* <li>BLOG</li> */}
            <li>
              <p className="text-prime font-bold flex justify-center items-center gap-2">
                <span>{`>`}</span>
                <span>
                  <a
                    href="https://booksy.com/pl-pl/221086_kosmetologia-estetyczna-faustyna-hojnor_salon-kosmetyczny_10189_bochnia"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    zarezerwuj
                  </a>
                </span>
                <span>{`<`}</span>
              </p>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
