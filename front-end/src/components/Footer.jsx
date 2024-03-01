import React from "react";

export default function Footer() {
  return (
    <footer className="fixed bottom-0 w-full bg-white mt-4 border-t">
      <div className="mx-auto max-w-screen-2xl p-4 flex items-center justify-between">
        <span className="text-sm sm:text-center">
          © 2024{" "}
          <a
            href="https://portfolio.birnie.co.za/"
            target="_blank"
            className="hover:underline"
          >
            Dean Birnie
          </a>
          . All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium sm:mt-0">
          <li>
            <a
              href="https://github.com/deanbirnie/saverr/"
              target="_blank"
              className="hover:underline"
            >
              GitHub Repository
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
