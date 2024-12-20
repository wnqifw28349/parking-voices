import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLocationDot,
  faPhone,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons';
import {
  faFacebook,
  faTwitter,
  faGooglePlus,
  faTelegram,
} from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
  return (
    <div className="flex flex-col bg-white">
      <div className="flex shadow-lg justify-between mt-6 px-3">
        <div className="flex">
          <FontAwesomeIcon icon={faLocationDot} className="w-10 h-8" />
          <div>
            <h4>Find us</h4>
            <span>203 Avenue, swt 103, London</span>
          </div>
        </div>

        <div className="flex flex-shrink-0 mt-6 px-3">
          <FontAwesomeIcon icon={faPhone} className="w-10 h-8" />
          <div>
            <h4>Call us</h4>
            <span>9876543210 0</span>
          </div>
        </div>

        <div className="flex flex-shrink-0 mt-6 px-3">
          <FontAwesomeIcon icon={faEnvelope} className="w-10 h-8" />
          <div>
            <h4>Mail us</h4>
            <span>mail@info.com</span>
          </div>
        </div>
      </div>
      <hr />

      <div className="flex justify-between w-full ">
        <div>
          <div className="flex flex-row">
            <img src="" alt="Logo" />
          </div>

          <div className="flex flex-col justify-end">
            <h2>Follow us</h2>
            <div className="flex">
              <a href="#">
                <FontAwesomeIcon icon={faFacebook} className="w-10 h-8" />
              </a>
              <a href="#">
                <FontAwesomeIcon icon={faTwitter} className="w-10 h-8" />
              </a>
              <a href="#">
                <FontAwesomeIcon icon={faGooglePlus} className="w-10 h-8" />
              </a>
            </div>
          </div>
        </div>

        <div>
          <h3>Useful Links</h3>
          <ul>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>

            <li>
              <a href="#">Latest News</a>
            </li>
          </ul>
        </div>

        <div>
          <h3>Subscribe</h3>
          <p>Don&apos;t miss to subscribe to our new feeds.</p>
          <form action="#" className="flex">
            <input type="text" placeholder="Email Address" />
            <button className="w-11 h-11 bg-white rounded-r-md border">
              <FontAwesomeIcon icon={faTelegram} className="w-9 h-9 pl-2" />
            </button>
          </form>
        </div>
      </div>

      <div className="flex bg-purple-100 shadow-xl justify-around py-5">
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
