import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.footer`
  border-top: 1px solid rgba(0,0,0,0.06);
  padding: 1.25rem 2rem;
  background: #fff;
`;

const Container = styled.div`
  max-width: 1200px;
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
    <Wrapper>
      <Container>
        <Small>© {new Date().getFullYear()} Mehul Joshi</Small>
        <Small>Built with React</Small>
      </Container>
    </Wrapper>
  );
};

export default Footer;
