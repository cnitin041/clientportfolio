import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const HeaderContainer = styled(motion.header)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1rem 2rem;
  background: ${props => props.scrolled ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.7)'};
  backdrop-filter: saturate(120%) blur(10px);
  transition: all 0.3s ease;
  border-bottom: 1px solid ${props => props.scrolled ? 'rgba(0,0,0,0.08)' : 'rgba(0,0,0,0.05)'};
  box-shadow: ${props => props.scrolled ? '0 8px 24px rgba(0,0,0,0.08)' : '0 2px 8px rgba(0,0,0,0.03)'};

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const Logo = styled(motion.div)`
  font-size: 1.5rem;
  font-weight: 700;
  color: #222;
  cursor: pointer;
  letter-spacing: 0.5px;
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
    padding: 2rem;
    gap: 1rem;
  }
`;

const NavLink = styled(motion.a)`
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
  }
`;

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <HeaderContainer
      scrolled={scrolled}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Nav>
        <Logo
          whileHover={{ scale: 1.05 }}
          scrolled={scrolled}
          onClick={() => scrollToSection('hero')}
        >
          MEHUL JOSHI
        </Logo>
        
        <NavLinks $isOpen={isOpen}>
          <NavLink
            whileHover={{ scale: 1.05 }}
            scrolled={scrolled}
            onClick={() => scrollToSection('hero')}
          >
            Home
          </NavLink>
          <NavLink
            whileHover={{ scale: 1.05 }}
            scrolled={scrolled}
            onClick={() => scrollToSection('skills')}
          >
            Skills
          </NavLink>
          <NavLink
            whileHover={{ scale: 1.05 }}
            scrolled={scrolled}
            onClick={() => scrollToSection('experience')}
          >
            Experience
          </NavLink>
          <NavLink
            whileHover={{ scale: 1.05 }}
            scrolled={scrolled}
            onClick={() => scrollToSection('education')}
          >
            Education
          </NavLink>
          <NavLink
            whileHover={{ scale: 1.05 }}
            scrolled={scrolled}
            onClick={() => scrollToSection('contact')}
          >
            Contact
          </NavLink>
        </NavLinks>

        <MenuButton onClick={() => setIsOpen(!isOpen)}>
          ☰
        </MenuButton>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
