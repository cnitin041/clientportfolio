import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const HeaderContainer = styled(motion.header)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1rem 2rem;
  background: ${props => props.$scrolled ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.7)'};
  backdrop-filter: saturate(120%) blur(10px);
  transition: all 0.3s ease;
  border-bottom: 1px solid ${props => props.$scrolled ? 'rgba(0,0,0,0.08)' : 'rgba(0,0,0,0.05)'};
  box-shadow: ${props => props.$scrolled ? '0 8px 24px rgba(0,0,0,0.08)' : '0 2px 8px rgba(0,0,0,0.03)'};

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Nav = styled.nav`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
`;

const Logo = styled(motion.div)`
  font-size: 1.5rem;
  font-weight: 700;
  color: #222;
  cursor: pointer;
  letter-spacing: 0.5px;
  z-index: 1;

  @media (max-width: 768px) {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    width: max-content;
    pointer-events: auto;
  }

  @media (max-width: 400px) {
    font-size: 1.2rem;
    letter-spacing: 0.3px;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;

  @media (max-width: 768px) {
    display: ${props => props.$isOpen ? 'flex' : 'none'};
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: #ffffff;
    backdrop-filter: blur(6px);
    flex-direction: column;
    padding: 1rem 1.25rem 1.25rem;
    gap: 0.25rem;
    border-bottom: 1px solid rgba(0,0,0,0.06);
    box-shadow: 0 10px 24px rgba(0,0,0,0.10);
    z-index: 1001; /* above overlay */
    max-height: calc(100vh - 64px);
    overflow-y: auto;
  }
`;

const NavLink = styled(motion(Link))`
  position: relative;
  color: #333;
  text-decoration: none;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.2s ease;

  &:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -6px;
    height: 2px;
    width: 0;
    background: #111;
    transition: width 0.2s ease;
  }

  &:hover {
    color: #000;
  }

  &:hover:after {
    width: 100%;
  }

  @media (max-width: 768px) {
    color: #333;
    padding: 0.75rem 0.25rem; /* bigger tap target */
    &:hover {
      color: #000;
    }
  }
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: #333;
  font-size: 1.5rem;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2; /* above centered logo */
  }
`;

const RightActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Socials = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  a { color: #111; display: inline-flex; }

  svg { width: 20px; height: 20px; }

  @media (max-width: 768px) {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2; /* above centered logo */
  }

  /* On very narrow screens, keep only first two icons to avoid overlap */
  @media (max-width: 400px) {
    a:nth-child(n+3) { display: none; }
    gap: 8px;
  }
`;

const SubNavBar = styled.div`
  position: relative;
  margin-top: 4px;
  background: transparent;
`;

const SubNav = styled.nav`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 8px 2rem 10px;

  a {
    text-decoration: none;
    color: #333;
    padding: 6px 12px;
    border-radius: 999px;
    border: 1px solid rgba(0,0,0,0.08);
    background: #fff;
    box-shadow: 0 4px 10px rgba(0,0,0,0.06);
    transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease, background 0.2s ease, color 0.2s ease;
  }

  a:hover {
    transform: translateY(-1px);
    border-color: rgba(0,0,0,0.14);
    box-shadow: 0 10px 18px rgba(0,0,0,0.10);
  }

  a[aria-current="page"] {
    background: #111;
    color: #fff;
    border-color: rgba(0,0,0,0.16);
    box-shadow: 0 12px 22px rgba(0,0,0,0.14);
  }

  @media (max-width: 768px) {
    padding: 6px 1rem 8px;
    gap: 8px;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none; /* Firefox */
    &::-webkit-scrollbar { display: none; }
    justify-content: flex-start; /* allow scrollable chips */
    a { display: inline-flex; white-space: nowrap; }
  }
`;

// Dim background overlay for mobile menu
const MobileOverlay = styled.div`
  @media (min-width: 769px) { display: none; }
  display: ${props => (props.$show ? 'block' : 'none')};
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.25);
  z-index: 1000; /* below the mobile panel */
`;

const CalloutButton = styled(Link)`
  display: none;
  @media (min-width: 769px) {
    display: inline-flex;
  }
  align-items: center;
  justify-content: center;
  background: #111;
  color: #fff;
  text-decoration: none;
  padding: 0.55rem 0.9rem;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.95rem;
  border: 1px solid rgba(0,0,0,0.12);
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 8px 18px rgba(0,0,0,0.1);
    background: #000;
  }
`;

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    const original = document.body.style.overflow;
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = original || '';
    return () => { document.body.style.overflow = original || ''; };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <HeaderContainer
      $scrolled={scrolled}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Overlay for mobile menu */}
      <MobileOverlay $show={isOpen} onClick={() => setIsOpen(false)} />
      <Nav>
        <Logo
          whileHover={{ scale: 1.05 }}
          as={Link}
          to="/"
          onClick={closeMenu}
        >
          MEHUL JOSHI
        </Logo>
        
        <NavLinks $isOpen={isOpen}>
          <NavLink whileHover={{ scale: 1.05 }} to="/" onClick={closeMenu}>
            Home
          </NavLink>
          <NavLink whileHover={{ scale: 1.05 }} to="/resume" onClick={closeMenu}>
            Resume
          </NavLink>
          <NavLink whileHover={{ scale: 1.05 }} to="/showcase" onClick={closeMenu}>
            Showcase
          </NavLink>
          <NavLink whileHover={{ scale: 1.05 }} to="/tools" onClick={closeMenu}>
            Tools
          </NavLink>
          <NavLink whileHover={{ scale: 1.05 }} to="/filmography" onClick={closeMenu}>
            Filmography
          </NavLink>
          <NavLink whileHover={{ scale: 1.05 }} to="/blogs" onClick={closeMenu}>
            Blogs
          </NavLink>
          <NavLink whileHover={{ scale: 1.05 }} to="/contact" onClick={closeMenu}>
            Contact
          </NavLink>
        </NavLinks>

        <RightActions>
          <Socials aria-label="social-links">
            <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM0 8h5v16H0zM8 8h4.8v2.2h.07c.67-1.2 2.3-2.46 4.74-2.46C21.5 7.74 24 10 24 14.3V24h-5v-8.5c0-2.03-.04-4.64-2.83-4.64-2.83 0-3.26 2.21-3.26 4.49V24H8z"/></svg>
            </a>
            <a href="https://github.com/" target="_blank" rel="noreferrer" aria-label="GitHub">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.73.5.99 5.24.99 11.5c0 4.85 3.15 8.96 7.51 10.41.55.1.75-.24.75-.53 0-.26-.01-.96-.02-1.88-3.05.66-3.69-1.47-3.69-1.47-.5-1.26-1.22-1.6-1.22-1.6-.99-.68.08-.67.08-.67 1.1.08 1.68 1.13 1.68 1.13.98 1.67 2.57 1.19 3.2.91.1-.71.38-1.19.69-1.46-2.43-.28-4.99-1.21-4.99-5.4 0-1.19.43-2.16 1.13-2.92-.11-.28-.49-1.4.11-2.92 0 0 .92-.29 3.01 1.12.87-.24 1.81-.36 2.74-.37.93.01 1.87.13 2.74.37 2.09-1.41 3.01-1.12 3.01-1.12.6 1.52.22 2.64.11 2.92.7.76 1.13 1.73 1.13 2.92 0 4.2-2.57 5.12-5.01 5.39.39.34.73 1.02.73 2.06 0 1.49-.01 2.68-.01 3.05 0 .29.2.63.76.52A10.99 10.99 0 0 0 23 11.5C23 5.24 18.27.5 12 .5z"/></svg>
            </a>
            <a href="https://instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2c1.66 0 3 1.34 3 3v10c0 1.66-1.34 3-3 3H7c-1.66 0-3-1.34-3-3V7c0-1.66 1.34-3 3-3h10zm-5 3a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm6.5-.75a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0z"/></svg>
            </a>
            <a href="https://www.imdb.com/" target="_blank" rel="noreferrer" aria-label="IMDb">
              <svg viewBox="0 0 64 32" width="24" height="24" aria-hidden="true">
                <rect width="64" height="32" rx="6" fill="#F5C518"/>
                <g fill="#111">
                  <path d="M8 9h4v14H8zM14 9h3l1 4 1-4h3v14h-3v-9l-1.2 5h-1.6L17 14v9h-3V9zM27 9h5c2.8 0 4 1.5 4 4v6c0 2.6-1.4 4-4 4h-5V9zm4 3v8h1c.9 0 1-.5 1-1.5v-5c0-1-.2-1.5-1-1.5h-1zM40 9h4c2.8 0 4 1.5 4 4v6c0 2.6-1.4 4-4 4h-4V9zm4 3v8h1c.9 0 1-.5 1-1.5v-5c0-1-.2-1.5-1-1.5h-1z"/>
                </g>
              </svg>
            </a>
          </Socials>
          <CalloutButton to="/contact" onClick={closeMenu}>Get In Touch</CalloutButton>
          <MenuButton
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            onClick={() => setIsOpen(!isOpen)}
          >
            ☰
          </MenuButton>
        </RightActions>
      </Nav>
      {location.pathname.startsWith('/tools') && (
        <SubNavBar>
          <SubNav>
            <Link to="/tools" aria-current={location.pathname === '/tools' ? 'page' : undefined}>Overview</Link>
            <Link to="/tools/standalone" aria-current={location.pathname.startsWith('/tools/standalone') ? 'page' : undefined}>Standalone</Link>
            <Link to="/tools/houdini" aria-current={location.pathname.startsWith('/tools/houdini') ? 'page' : undefined}>Houdini</Link>
          </SubNav>
        </SubNavBar>
      )}
    </HeaderContainer>
  );
};

export default Header;
