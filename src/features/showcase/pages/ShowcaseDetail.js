import React from 'react';
import styled from 'styled-components';
import { useParams, Link } from 'react-router-dom';
import PageHero from 'components/layout/PageHero';
import { getShowcaseBySlug } from 'features/showcase/lib/showcaseLoader';

const Page = styled.main`
  padding: 0 2rem 4rem; /* header offset handled in PageHero */
`;

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const Content = styled.article`
  background: #fff;
  border: 1px solid rgba(0,0,0,0.06);
  border-radius: 16px;
  box-shadow: 0 10px 22px rgba(0,0,0,0.06);
  padding: 1.25rem 1.25rem 1.5rem;
`;

const PlayerBox = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  background: #111;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 1rem;
`;

const Controls = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 0.5rem;
`;

const Btn = styled.a`
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #111;
  color: #fff;
  border: 1px solid rgba(0,0,0,0.12);
  padding: 8px 12px;
  border-radius: 10px;
`;

const BackLink = styled(Link)`
  display: inline-block;
  margin: 1rem 0 0.75rem;
  color: #111;
`;

const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 0.25rem 0 0.75rem;
`;

const Chip = styled.span`
  border: 1px solid rgba(0,0,0,0.12);
  background: #fff;
  color: #444;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 0.9rem;
`;

const TwoCol = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 18px;
  @media (max-width: 900px){ grid-template-columns: 1fr; }
`;

const SectionTitle = styled.h3`
  margin: 1rem 0 0.5rem;
`;

const Para = styled.p`
  color: #444;
`;

const CreditsList = styled.ul`
  margin: 0.25rem 0 0;
  padding-left: 1.2rem;
  color: #555;
`;

const Gallery = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-top: 0.5rem;
  @media (max-width: 900px){ grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 540px){ grid-template-columns: 1fr; }
`;

function getEmbed(url) {
  if (!url) return null;
  try {
    const u = new URL(url);
    const host = u.hostname.replace('www.', '');
    if (host.includes('youtube.com') || host === 'youtu.be') {
      // convert to embed
      let id = u.searchParams.get('v');
      if (!id && host === 'youtu.be') id = u.pathname.slice(1);
      if (!id) return null;
      const src = `https://www.youtube.com/embed/${id}`;
      return <iframe title="YouTube Player" src={src} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen style={{border:0, width:'100%', height:'100%'}} />;
    }
    if (host.includes('vimeo.com')) {
      const id = u.pathname.split('/').filter(Boolean).pop();
      if (!id) return null;
      const src = `https://player.vimeo.com/video/${id}`;
      return <iframe title="Vimeo Player" src={src} allow="autoplay; fullscreen; picture-in-picture" allowFullScreen style={{border:0, width:'100%', height:'100%'}} />;
    }
    if (url.endsWith('.mp4') || url.endsWith('.webm') || url.endsWith('.ogg')) {
      return <video src={url} controls style={{width:'100%', height:'100%', objectFit:'cover'}} />;
    }
  } catch {}
  return null;
}

const ShowcaseDetail = () => {
  const { slug } = useParams();
  const item = getShowcaseBySlug(slug);

  if (!item) {
    return (
      <Page>
        <Container>
          <h1>Not found</h1>
          <p>The requested showcase item could not be found.</p>
          <BackLink to="/showcase">← Back to Showcase</BackLink>
        </Container>
      </Page>
    );
  }

  const embed = getEmbed(item.url);

  return (
    <Page>
      <PageHero title={item.title} subtitle={item.subtitle || item.category} />
      <Container>
        <BackLink to="/showcase">← Back to Showcase</BackLink>
        <Content>
          {embed && <PlayerBox>{embed}</PlayerBox>}
          {!embed && item.image && (
            <PlayerBox>
              <img src={item.image} alt={item.title} style={{width:'100%', height:'100%', objectFit:'cover'}} />
            </PlayerBox>
          )}
          {item.url && (
            <Controls>
              <Btn href={item.url} target="_blank" rel="noreferrer">
                Open Video
              </Btn>
            </Controls>
          )}
          {Array.isArray(item.technologies) && item.technologies.length > 0 && (
            <Chips>
              {item.technologies.map((t, i) => <Chip key={i}>{t}</Chip>)}
            </Chips>
          )}

          <TwoCol>
            <div>
              {item.description && <Para>{item.description}</Para>}
              {Array.isArray(item.content) && item.content.map((c, i) => (
                <Para key={i}>{c}</Para>
              ))}
              {Array.isArray(item.gallery) && item.gallery.length > 0 && (
                <>
                  <SectionTitle>Gallery</SectionTitle>
                  <Gallery>
                    {item.gallery.map((src, i) => (
                      <img key={i} src={src} alt={item.title + ' image ' + (i+1)} style={{width:'100%', height:180, objectFit:'cover', borderRadius:8, border:'1px solid rgba(0,0,0,0.06)'}} />
                    ))}
                  </Gallery>
                </>
              )}
            </div>
            <aside>
              {(Array.isArray(item.credits) && item.credits.length > 0) && (
                <div>
                  <SectionTitle>Credits</SectionTitle>
                  <CreditsList>
                    {item.credits.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </CreditsList>
                </div>
              )}
            </aside>
          </TwoCol>
        </Content>
      </Container>
    </Page>
  );
};

export default ShowcaseDetail;
