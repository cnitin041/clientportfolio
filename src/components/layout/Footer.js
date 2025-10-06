import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.footer`
  position: relative;
  z-index: 2; /* ensure above fixed page background */
  border-top: 1px solid rgba(0,0,0,0.06);
  padding: 0.85rem 1.5rem; /* sleeker */
  background: #fff;
  backdrop-filter: saturate(120%) blur(2px);
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  color: #6b7280; /* slate-500 */
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 640px) {
    flex-direction: column;
    gap: 6px;
  }
`;

const Small = styled.small`
  color: inherit;
`;

const Footer = () => {
  return (
    <Wrapper role="contentinfo">
      <Container>
        <Small>© {new Date().getFullYear()} Mehul Joshi</Small>
        <Small>Built with React</Small>
      </Container>
    </Wrapper>
  );
};

export default Footer;
