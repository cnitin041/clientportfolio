import React from 'react';
import styled from 'styled-components';
import PageHero from 'components/layout/PageHero';

const Page = styled.main`
  padding: 0 clamp(12px, 1.5vw, 24px) 4rem;
`;

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

export default function PrivacyPolicy() {
  return (
    <Page>
      <PageHero title="Privacy Policy" subtitle="" />
      <Container>
        {/* Add your privacy policy content here in the future */}
      </Container>
    </Page>
  );
}
