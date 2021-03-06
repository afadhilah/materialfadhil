import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { AnimatePresence, AnimatePresenceProps, motion } from "framer-motion";
import {
  Navbar as MTNavbar,
  IconButton,
  Tooltip,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem
} from "../../packages/material-tailwind-react/src";

interface NewAnimatePresenceProps
  extends Omit<AnimatePresenceProps, "children"> {
  children: React.ReactNode;
}

interface NavbarProps {
  container?: string;
  className?: string;
  shadow?: boolean;
  sidenavMenu?: any;
  list?: string;
  [key: string]: any;
}

export default function Navbar({
  container,
  className,
  shadow,
  sidenavMenu,
  list = "text-[#1A237E]",
  ...rest
}: NavbarProps) {
  const [open, setOpen] = useState(false);
  const mobileListRef = useRef(null);
  const navbarItemClasses =
    "flex items-center px-1 py-2 font-normal transition-all duration-250 text-size-sm text-current font-light lg:px-2 cursor-pointer";

  useEffect(() => {
    window.addEventListener("resize", () => {
      window.innerWidth >= 960 && setOpen(false);
    });
  }, []);

  const heightAnimation = {
    unmount: {
      height: "0px",
      opacity: 0,
      transition: { duration: 0.3, times: "[0.4, 0, 0.2, 1]" }
    },
    mount: {
      height: `${mobileListRef.current?.scrollHeight}px`,
      opacity: 1,
      transition: { duration: 0.3, times: "[0.4, 0, 0.2, 1]" }
    }
  };

  const menuOpenIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  );

  const menuCloseIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      className="h-6 w-6"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );

  const navbarMenu = (
    <ul className="flex flex-col pl-0 mb-0 list-none text-inherit lg:flex-row gap-2 lg:gap-4 lg:ml-auto">
      <Menu placement="bottom" offset={-2.5}>
        <MenuHandler>
          <li>
            <span className={navbarItemClasses}>
              <i className="material-icons opacity-60 mr-2 !text-base">
                article
              </i>
              <span>Docs</span>
            </span>
          </li>
        </MenuHandler>
        <MenuList>
          <MenuItem>
            <Link href="/docs/html/quick-start">
              <a className={`${navbarItemClasses} lg:px-0 px-0 py-0`}>HTML</a>
            </Link>
          </MenuItem>
          <MenuItem>
            <Link href="/docs/react/quick-start">
              <a className={`${navbarItemClasses} lg:px-0 px-0 py-0`}>
                ReactJS
              </a>
            </Link>
          </MenuItem>
        </MenuList>
      </Menu>
      <Menu placement="bottom" offset={-2.5}>
        <MenuHandler>
          <li>
            <span className={navbarItemClasses}>
              <i className="material-icons opacity-60 mr-2 !text-base">apps</i>
              <span>Components</span>
            </span>
          </li>
        </MenuHandler>
        <MenuList>
          <MenuItem>
            <Link href="/docs/html/alert">
              <a className={`${navbarItemClasses} lg:px-0 px-0 py-0`}>HTML</a>
            </Link>
          </MenuItem>
          <MenuItem>
            <Link href="/docs/react/alert">
              <a className={`${navbarItemClasses} lg:px-0 px-0 py-0`}>
                ReactJS
              </a>
            </Link>
          </MenuItem>
        </MenuList>
      </Menu>
      <Tooltip content="Coming Soon" placement="bottom" offset={-2.5}>
        <li className="flex">
          <span className={navbarItemClasses}>
            <i className="material-icons opacity-60 mr-2 !text-base">
              view_carousel
            </i>
            <span>Templates</span>
          </span>
        </li>
      </Tooltip>
      <Tooltip content="Help with a star" placement="bottom" offset={-2.5}>
        <li>
          <a
            className={navbarItemClasses}
            href="https://github.com/creativetimofficial/material-tailwind?ref=material-tailwind"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fab fa-github opacity-60 mr-2 text-base"></i>
            <span>Github</span>
          </a>
        </li>
      </Tooltip>
      <li>
        <a
          className={navbarItemClasses}
          href="https://github.com/creativetimofficial/material-tailwind/issues?ref=material-tailwind"
          target="_blank"
          rel="noreferrer"
        >
          <i className="fab fa-discord opacity-60 mr-2 text-base"></i>
          <span>Issues</span>
        </a>
      </li>
    </ul>
  );

  const NewAnimatePresence: React.FC<NewAnimatePresenceProps> = AnimatePresence;

  return (
    <div
      className={`w-full max-w-screen-2xl absolute lg:fixed left-2/4 -translate-x-2/4 z-[999] flex flex-wrap items-center my-4 px-4 ${container}`}
    >
      <MTNavbar
        {...rest}
        className={`!block py-2 pl-6 pr-5 ${
          shadow ? "shadow-2xl shadow-blue-grey-500/10" : ""
        }`}
        shadow={shadow}
      >
        <div
          className={`w-full flex !justify-between items-center text-[#1A237E] ${className}`}
        >
          <Link href="/">
            <a className="py-2.375 text-size-sm mr-4 whitespace-nowrap font-bold text-inherit lg:ml-0">
              Material Tailwind
            </a>
          </Link>
          <IconButton
            variant="text"
            className="lg:hidden w-6 h-6 ml-auto text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent"
            ripple={false}
            onClick={() => setOpen(!open)}
          >
            {open ? menuCloseIcon : menuOpenIcon}
          </IconButton>
          <div className="hidden lg:flex lg:base-auto items-center flex-grow lg-max:max-h-0 overflow-hidden basis-full">
            {navbarMenu}
          </div>
        </div>
        <NewAnimatePresence>
          <motion.div
            ref={mobileListRef}
            className={`block overflow-hidden basis-full ${list}`}
            initial="unmount"
            exit="unmount"
            animate={open ? "mount" : "unmount"}
            variants={heightAnimation}
          >
            {navbarMenu}
          </motion.div>
        </NewAnimatePresence>
        {sidenavMenu}
      </MTNavbar>
    </div>
  );
}
