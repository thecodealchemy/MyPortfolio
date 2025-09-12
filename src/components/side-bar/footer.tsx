import React from "react"
import Link from "next/link"

function Footer() {
  return (
    <footer className="py-4 px-8 text-center text-sm text-light-gray">
      <div className="mb-2">
        &copy; 2025 - 2026{" "}
        <Link
          className="inline text-orange-yellow-crayola underline hover:text-opacity-70"
          href="https://code-alchemy.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          thecodealchemy
        </Link>
      </div>
    </footer>
  )
}

export default Footer
