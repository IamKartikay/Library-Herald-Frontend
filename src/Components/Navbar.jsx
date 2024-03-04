import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose, IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";

import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logonobg.png";
import Button from "./Button";
import "./Navbar.css";
import { Link as ScrollLink } from "react-scroll";

export default function Example() {
  const navigate = useNavigate();

  const handleNavbarAnchoring = (anchorTag, id) => {
    navigate("/");
    anchorTag.href = "#" + id + "Anchor";
  };

  const handleMouseExit = () => {
    setTimeout(() => {
      setNavDrop(false);
    }, 2000);
  };
  const [NavDrop, setNavDrop] = useState(false);
  const [hamburger, setHamburger] = useState(false);
  const [HamNavDrop, setHamNavDrop] = useState(false);
  return (
    <nav>
      {!hamburger && (
        <div className="navbar-container-sm">
          <Link className="heading" to={"/"}>
            LIBRARY HERALD
          </Link>
          <div>
            <button onClick={() => setHamburger(true)}>
              <GiHamburgerMenu color="white" />
            </button>
          </div>
        </div>
      )}
      {hamburger && (
        <div className="hamburger-menu">
          <button
            className="close-hamburger-btn"
            onClick={() => setHamburger(false)}
          >
            <IoMdClose />
          </button>
          <div className="hamburger-items">
            <Link
              to={"/"}
              onClick={() => {
                setHamburger(false);
                setHamNavDrop(false);
              }}
            >
              Home
            </Link>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                paddingLeft: "12px",
                gap: "2px",
              }}
            >
              <button to="/about" onClick={() => setHamNavDrop(!HamNavDrop)}>
                About
              </button>
              {HamNavDrop ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
            </div>

            {HamNavDrop && (
              <div className="ham-navDrop">
                <a
                  id="about"
                  onClick={(event) => {
                    handleNavbarAnchoring(event.target, event.target.id);
                    setHamburger(false);
                    setHamNavDrop(false);
                  }}
                >
                  About the Journal
                </a>
                <a
                  id="editorial"
                  onClick={(event) => {
                    handleNavbarAnchoring(event.target, event.target.id);
                    setHamburger(false);
                    setHamNavDrop(false);
                  }}
                >
                  Editorial Board
                </a>
                <Link
                  to={"/authorGuidelines"}
                  onClick={() => {
                    setHamburger(false);
                    setHamNavDrop(false);
                  }}
                >
                  Author Guidelines
                </Link>
                <Link
                  to={"/copyright-assignment-form"}
                  onClick={() => {
                    setHamburger(false);
                    setHamNavDrop(false);
                  }}
                >
                  Copyright Assignment Form
                </Link>
              </div>
            )}
            <Link
              to={"/archieve"}
              onClick={() => {
                setHamburger(false);
                setHamNavDrop(false);
              }}
            >
              Archive
            </Link>
            <a
              id="contact"
              onClick={(event) => {
                handleNavbarAnchoring(event.target, event.target.id);
                setHamburger(false);
                setHamNavDrop(false);
              }}
            >
              Contact Us
            </a>
          </div>
        </div>
      )}

      <div className="navbar-container-lg">
        <div className="nav-section1">
          <Link to={"/"}>
            <img src={logo} alt="Library Herald" />
          </Link>
        </div>
        <div className="nav-section2">
          <Link to={"/"} className="heading-lg">
            LIBRARY HERALD
          </Link>
        </div>
        <div className="nav-section3">
          <Link to={"/"}>Home</Link>
          <ScrollLink to="/about" onMouseEnter={() => setNavDrop(true)}>
            About
          </ScrollLink>
          {NavDrop && (
            <div className="nav-drop" onMouseLeave={handleMouseExit}>
              <a
                id="about"
                onClick={(event) =>
                  handleNavbarAnchoring(event.target, event.target.id)
                }
              >
                About the Journal
              </a>
              <a
                id="editorial"
                onClick={(event) =>
                  handleNavbarAnchoring(event.target, event.target.id)
                }
              >
                Editorial Board
              </a>
              <Link to={"/authorGuidelines"}>Author Guidelines</Link>
              <Link to={"/copyright-assignment-form"}>
                Copyright Assignment Form
              </Link>
            </div>
          )}
          <Link to={"/archieve"}>Archive</Link>
          <a
            id="contact"
            onClick={(event) =>
              handleNavbarAnchoring(event.target, event.target.id)
            }
          >
            Contact Us
          </a>
          <button className="subscribe-btn">Subscribe</button>
        </div>
      </div>
    </nav>
  );
}
