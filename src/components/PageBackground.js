import React from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion';

// Fixed full-screen layered background with parallax motion
const Bg = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -2; /* keep below ALL page content */
  background-color: #f5f5f5;
  /* Multiple backgrounds: white wash + cinematic photo + two soft radial blobs + diagonal tint + subtle dot pattern */
  background-image:
    linear-gradient(to bottom, rgba(255,255,255,0.90), rgba(255,255,255,0.75)),
    url('https://images.unsplash.com/photo-1517602302552-471fe67acf66?auto=format&fit=crop&w=1600&q=80'),
    radial-gradient(640px 640px at 78% 12%, rgba(0,0,0,0.16) 0%, rgba(0,0,0,0.11) 42%, rgba(0,0,0,0) 66%),
    radial-gradient(820px 820px at 88% 88%, rgba(0,0,0,0.16) 0%, rgba(0,0,0,0.11) 42%, rgba(0,0,0,0) 66%),
    linear-gradient(135deg, rgba(0,0,0,0.03), rgba(0,0,0,0.00)),
    url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28"><circle cx="2" cy="2" r="1.2" fill="%23777777" fill-opacity="0.16"/></svg>');
  background-repeat: no-repeat, no-repeat, no-repeat, no-repeat, no-repeat, repeat;
  background-size: 100% 100%, cover, auto, auto, 100% 100%, 28px 28px;
  background-position: 0 0, center 0px, center 320px, 0 0, 0px 0px, 0px 0px;
  filter: grayscale(90%) contrast(1.02) brightness(1.06);
`;

const FooterFade = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 220px;
  z-index: -1; /* above Bg, still below ALL page content */
  pointer-events: none;
  background: linear-gradient(to bottom, rgba(245,245,245,0.10), #ffffff 80%);
`;

const PageBackground = () => {
  const { scrollY } = useScroll();
  // Parallax offsets for the different background layers
  const pageBgY = useTransform(scrollY, [0, 1400], [0, -80]);
  const photoY = useTransform(scrollY, [0, 1400], [0, 180]);
  const blob1Y = useTransform(scrollY, [0, 1400], [0, 140]);
  const blob2Y = useTransform(scrollY, [0, 1400], [0, 220]);
  const patternY = useTransform(scrollY, [0, 1400], [0, 320]);
  const bgPositions = useMotionTemplate`0px 0px, center ${photoY}px, center ${blob1Y}px, center ${blob2Y}px, 0px 0px, 0px ${patternY}px`;

  return (
    <>
      <Bg aria-hidden style={{ y: pageBgY, backgroundPosition: bgPositions }} />
      <FooterFade aria-hidden />
    </>
  );
};

export default PageBackground;
