import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.footer`
  position: relative;
  z-index: 2; /* ensure above fixed page background */
  border-top: 1px solid rgba(0,0,0,0.06);
  padding: 1.5rem 2rem;
  background: #fff;
  box-shadow: 0 -8px 20px rgba(0,0,0,0.05); /* subtle separation from bg */
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  color: #777;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Small = styled.small`
  color: #777;
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
