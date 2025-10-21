import React from 'react';
import styled from 'styled-components';
import { useParams, Link } from 'react-router-dom';
import PageHero from 'components/layout/PageHero';
import { getStandaloneToolBySlug } from 'features/tools/data/standalone';

const Page = styled.main`
  padding: 0 2rem 4rem; /* PageHero manages header offset */
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const Content = styled.article`
  background: #fff;
  border: 1px solid rgba(0,0,0,0.06);
  border-radius: 16px;
  box-shadow: 0 10px 22px rgba(0,0,0,0.06);
  padding: 1.25rem 1.25rem 1.5rem;
`;

const LeadImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 12px;
  object-fit: cover;
  margin-bottom: 1rem;
`;

const Para = styled.p`
  color: #444;
`;

const ButtonsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 12px 0 4px;
`;

const ButtonLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  padding: 10px 14px;
  border-radius: 10px;
  font-weight: 600;
  border: 1px solid rgba(0,0,0,0.12);
  transition: transform 0.15s ease, box-shadow 0.2s ease, background 0.2s ease, color 0.2s ease;
  background: ${p => (p.$variant === 'primary' ? '#111' : '#fff')};
  color: ${p => (p.$variant === 'primary' ? '#fff' : '#111')};
  pointer-events: ${p => (p.$disabled ? 'none' : 'auto')};
  opacity: ${p => (p.$disabled ? 0.6 : 1)};

  &:hover { transform: translateY(-1px); box-shadow: 0 8px 18px rgba(0,0,0,0.1); }
`;

const BackLink = styled(Link)`
  display: inline-block;
  margin: 1rem 0 0.5rem;
  color: #111;
`;

const StandaloneToolDetail = () => {
  const { slug } = useParams();
  const tool = getStandaloneToolBySlug(slug);

  if (!tool) {
    return (
      <Page>
        <Container>
          <h1>Not found</h1>
          <p>The requested tool could not be found.</p>
          <BackLink to="/tools/standalone">← Back to Standalone Tools</BackLink>
        </Container>
      </Page>
    );
  }

  return (
    <Page>
      <PageHero title={tool.title} subtitle={tool.excerpt || 'Tool details'} topOffset={176} />
      <Container>
        <BackLink to="/tools/standalone">← Back to Standalone Tools</BackLink>
        <Content>
          {tool.image && <LeadImage src={tool.image} alt={tool.title} loading="lazy" />}
          {Array.isArray(tool.content) && tool.content.map((b, i) => {
            if (b.type === 'p') return <Para key={i}>{b.text}</Para>;
            return null;
          })}
          {Array.isArray(tool.buttons) && tool.buttons.length > 0 && (
            <ButtonsRow>
              {tool.buttons.map((btn, bi) => (
                <ButtonLink
                  key={bi}
                  href={btn.href || '#'}
                  target={btn.target || (btn.href && btn.href.startsWith('http') ? '_blank' : undefined)}
                  rel={btn.target === '_blank' ? 'noreferrer' : undefined}
                  $variant={btn.variant || 'primary'}
                  $disabled={btn.disabled}
                  aria-disabled={btn.disabled ? 'true' : undefined}
                >
                  {btn.label || 'Button'}
                </ButtonLink>
              ))}
            </ButtonsRow>
          )}
        </Content>
      </Container>
    </Page>
  );
};

export default StandaloneToolDetail;
