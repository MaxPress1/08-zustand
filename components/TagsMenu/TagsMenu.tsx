"use client";

import { useState } from "react";
import css from "./TagsMenu.module.css";
import Link from "next/link";

export default function TagsMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const tags = ["All", "Todo", "Work", "Personal", "Meeting", "Shopping"];
  return (
    <div className={css.menuContainer}>
      <button
        className={css.menuButton}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        Notes ▾
      </button>
      {isOpen && (
        <ul className={css.menuList}>
          {tags.map((tag) => (
            <li className={css.menuItem} key={tag}>
              <Link
                href={`/notes/filter/${tag}`}
                className={css.menuLink}
                onClick={() => setIsOpen(false)}
              >
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
