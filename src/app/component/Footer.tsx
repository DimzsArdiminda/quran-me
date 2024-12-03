import Link from 'next/link'
import React from 'react'

function Footer() {
  return (
    <div>
        <footer className="bg-white dark:bg-gray-800 p-6">
        <div className="text-start">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Developer</h3>
          <ul className="text-gray-500 dark:text-gray-400 mb-6">
            <li>
              <Link href="https://github.com/DimzsArdiminda/quran-me" className="hover:underline">Source Code</Link>
            </li>
            <li>
              <Link href="https://equran.id/apidev/v2" className="hover:underline">API</Link>
            </li>
          </ul>
          <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} All rights reserved.
          </div>
          <div className="flex justify-center mt-5 space-x-5">
            {/* <p>If you get a bug contact us in:</p>
            <Link href="https://www.instagram.com/penggalan.reformasi_/" className="text-gray-500 hover:text-gray-900 dark:hover:text-white dark:text-gray-400" target="blank">
              @penggalan.reformasi_
            </Link>
            <Link href="https://www.instagram.com/ahmadammrm/" className="text-gray-500 hover:text-gray-900 dark:hover:text-white dark:text-gray-400" target="blank">
              @ahmadammrm
            </Link> */}
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer