import React from 'react';
import styled from 'styled-components';
import PageHero from 'components/layout/PageHero';
import Contact from '../components/Contact';

const Page = styled.main`
  padding-top: 80px; /* fixed header offset */
`;

const ContactPage = () => {
  return (
    <Page>
      <PageHero title="Get In Touch" subtitle="Have a project in mind or want to collaborate?" />
      <Contact />
    </Page>
  );
};

export default ContactPage;
