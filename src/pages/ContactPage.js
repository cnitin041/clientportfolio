import React from 'react';
import styled from 'styled-components';
import Contact from '../components/Contact';

const Page = styled.main`
  padding-top: 80px; /* fixed header offset */
`;

const ContactPage = () => {
  return (
    <Page>
      <Contact />
    </Page>
  );
};

export default ContactPage;
