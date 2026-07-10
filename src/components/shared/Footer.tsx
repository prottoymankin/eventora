import Link from "next/link";
import {
  FaFacebook,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";
import {
  MdEmail,
  MdLocationOn,
  MdPhone,
} from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">

          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-white">
              Eventora
            </h2>

            <p className="mt-4 text-sm leading-6 text-slate-400">
              Discover, create, and manage amazing events easily.
              Eventora connects attendees and organizers in one
              simple platform.
            </p>

            <div className="mt-5 flex gap-4">
              <a
                href="#"
                className="text-slate-400 transition hover:text-indigo-500"
              >
                <FaFacebook size={20} />
              </a>

              <a
                href="#"
                className="text-slate-400 transition hover:text-indigo-500"
              >
                <FaGithub size={20} />
              </a>

              <a
                href="#"
                className="text-slate-400 transition hover:text-indigo-500"
              >
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>


          {/* Navigation */}
          <div>
            <h3 className="text-lg font-semibold text-white">
              Navigation
            </h3>

            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link
                  href="/"
                  className="transition hover:text-indigo-500"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/events"
                  className="transition hover:text-indigo-500"
                >
                  Events
                </Link>
              </li>

              <li>
                <Link
                  href="/dashboard"
                  className="transition hover:text-indigo-500"
                >
                  Dashboard
                </Link>
              </li>

              <li>
                <Link
                  href="/login"
                  className="transition hover:text-indigo-500"
                >
                  Login
                </Link>
              </li>
            </ul>
          </div>


          {/* Features */}
          <div>
            <h3 className="text-lg font-semibold text-white">
              Features
            </h3>

            <ul className="mt-4 space-y-3 text-sm">
              <li className="transition hover:text-indigo-500">
                Event Discovery
              </li>

              <li className="transition hover:text-indigo-500">
                Event Management
              </li>

              <li className="transition hover:text-indigo-500">
                Organizer Dashboard
              </li>

              <li className="transition hover:text-indigo-500">
                Attendee Experience
              </li>
            </ul>
          </div>


          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white">
              Contact
            </h3>

            <ul className="mt-4 space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <MdEmail
                  size={20}
                  className="text-indigo-500"
                />
                support@eventora.com
              </li>

              <li className="flex items-center gap-3">
                <MdPhone
                  size={20}
                  className="text-indigo-500"
                />
                +880 1234-567890
              </li>

              <li className="flex items-center gap-3">
                <MdLocationOn
                  size={20}
                  className="text-indigo-500"
                />
                Bangladesh
              </li>
            </ul>
          </div>

        </div>
      </div>


      {/* Bottom Section */}
      <div className="border-t border-slate-800">
        <div className="mx-auto max-w-7xl px-6 py-5 text-center text-sm text-slate-400 lg:px-8">
          © {new Date().getFullYear()} Eventora. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;