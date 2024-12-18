import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import {
  faFacebook,
  faTwitter,
  faGooglePlus,
  faTelegram,
} from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
  return (
    <div className="flex flex-col bg-white ">
      <div className="social-media">
        <div className="flex justify-between w-80">
          <div>
            <FontAwesomeIcon
              icon={faLocationDot}
              className="w-10 h-8"
              style={{ color: 'rgb(88 28 135)' }}
            />
            <div>
              <h4>Find us</h4>
              <span>203 Avenue, swt 103, London</span>
            </div>
          </div>

          <div className="flex flex-shrink-0 mt-6 px-3">
            <FontAwesomeIcon
              icon={faEnvelope}
              className="w-10 h-8"
              style={{ color: 'rgb(88 28 135)' }}
            />
            <div>
              <h4>Mail us</h4>
              <span>mail@info.com</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col ">
          <div className="flex justify-between">
            <div className="flex flex-col justify-center">
              <h2>Follow us</h2>
              <div className="flex ">
                <a href="#">
                  <FontAwesomeIcon
                    icon={faFacebook}
                    className="w-10 h-8"
                    style={{ color: 'rgb(88 28 135)' }}
                  />
                </a>
                <a href="#">
                  <FontAwesomeIcon
                    icon={faTwitter}
                    className="w-10 h-8"
                    style={{ color: 'rgb(88 28 135)' }}
                  />
                </a>
                <a href="#">
                  <FontAwesomeIcon
                    icon={faGooglePlus}
                    className="w-10 h-8"
                    style={{ color: 'rgb(88 28 135)' }}
                  />
                </a>
              </div>
            </div>

            <div>
              <h3>Subscribe</h3>
              {/* <p>Don&apos;t miss to subscribe to our new feeds.</p> */}
              <form action="#" className="flex">
                <input
                  type="text"
                  placeholder="Email Address"
                  className="border border-fuchsia-950 rounded-l-sm"
                />
                <button className="w-11 h-11 bg-white rounded-r-md border border-fuchsia-950">
                  <FontAwesomeIcon
                    icon={faTelegram}
                    className="w-9 h-9 pl-2"
                    style={{ color: 'rgb(88 28 135)' }}
                  />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="flex bg-purple-100 shadow-xl justify-between p-5">
        <p>&copy; 2024, All Rights Reserved</p>
        <ul className="flex gap-3">
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">Terms</a>
          </li>
          <li>
            <a href="#">Privacy</a>
          </li>
          <li>
            <a href="#">Policy</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
