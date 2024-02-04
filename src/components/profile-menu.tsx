import ChevronDownIcon from "@heroicons/react/24/outline/ChevronDownIcon";
import React, { useEffect, useRef, useState } from "react";
import profileImage from "/netflix-profile.png";

function ProfileMenu() {
  const [showMenu, setShowMenu] = useState(false);
  const profileMenuContainer = useRef<HTMLElement>(null);
  const timerId = useRef(0);
  function onMouseEnter() {
    if (timerId.current) {
      clearTimeout(timerId.current);
    }
    setShowMenu(true);
  }
  function onMouseExit() {
    timerId.current = setTimeout(() => {
      setShowMenu(false);
    }, 300);
  }
  useEffect(() => {
    profileMenuContainer.current?.addEventListener("mouseenter", onMouseEnter);
    profileMenuContainer.current?.addEventListener("mouseleave", onMouseExit);

    return () => {
      profileMenuContainer.current?.removeEventListener(
        "mouseenter",
        onMouseEnter,
      );
      profileMenuContainer.current?.removeEventListener(
        "mouseleave",
        onMouseExit,
      );
    };
  }, []);

  return (
    <>
      <section ref={profileMenuContainer} className="relative">
        <section className="flex items-center gap-2">
          <img
            src={profileImage}
            alt="User profile image"
            className="h-10 w-10 rounded-md"
          />
          <ChevronDownIcon
            style={{ strokeWidth: ".2rem" }}
            className={`h-6 w-6 transition-transform duration-200 ${showMenu ? "rotate-180" : ""}`}
          ></ChevronDownIcon>
        </section>
        {showMenu ? (
          <ul className="absolute -left-24 top-[60px] flex w-[200px] flex-col justify-center gap-4 bg-dark px-4 py-2">
            <li>Username</li>
            <li>Manage Pofiles</li>
            <li>Transfer Profiles</li>
            <li>Account</li>
            <li>Help Center</li>
            <li className="-mx-4 border-t border-t-gray-500 px-4 pt-2">
              Sign out of Netflix
            </li>
          </ul>
        ) : null}
      </section>
    </>
  );
}

export default ProfileMenu;
