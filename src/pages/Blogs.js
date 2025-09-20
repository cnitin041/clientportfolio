import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { blogs } from '../data/blogs';

const Page = styled.main`
  padding: 0 2rem 4rem; /* header offset handled by Header */
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Hero = styled.section`
  padding: 7rem 0 3rem;
`;

const HeroTitle = styled.h1`
  font-size: 2.5rem;
  margin: 0 0 0.5rem 0;
`;

const HeroSubtitle = styled.p`
  color: #555;
  font-size: 1.1rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;

  @media (max-width: 1000px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled(motion(Link))`
  display: block;
  background: #fff;
  border: 1px solid rgba(0,0,0,0.06);
  border-radius: 16px;
  overflow: hidden;
  color: inherit;
  text-decoration: none;
  box-shadow: 0 10px 22px rgba(0,0,0,0.06);
  transition: transform .2s ease, box-shadow .2s ease, border-color .2s ease;

  &:hover {
    transform: translateY(-4px);
    border-color: rgba(0,0,0,0.12);
    box-shadow: 0 16px 30px rgba(0,0,0,0.10);
  }
`;

const Thumb = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  background: #f1f1f1;
  overflow: hidden;
`;

const ThumbImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const CardBody = styled.div`
  padding: 1rem 1rem 1.25rem;
`;

const CardTitle = styled.h3`
  margin: 0 0 0.5rem 0;
  font-size: 1.15rem;
`;

const Meta = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: #777;
  font-size: 0.9rem;
  margin-bottom: 0.4rem;
`;

const Excerpt = styled.p`
  color: #555;
  margin: 0;
`;

// blogs imported from data

const Blogs = () => {
  return (
    <Page>
      <Container>
        <Hero>
          <HeroTitle>Blog</HeroTitle>
          <HeroSubtitle>Thoughts on Houdini tools, product design, and modern web development.</HeroSubtitle>
        </Hero>

        <Grid>
          {blogs.map((b, i) => (
            <Card
              key={b.slug}
              to={`/blogs/${b.slug}`}
              whileHover={{ scale: 1.01 }}
            >
              <Thumb>
                <ThumbImg src={b.image} alt={b.title} loading="lazy" />
              </Thumb>
              <CardBody>
                <Meta>
                  <span>{b.date}</span>
                  <span>•</span>
                  <span>{b.read}</span>
                </Meta>
                <CardTitle>{b.title}</CardTitle>
                <Excerpt>{b.excerpt}</Excerpt>
              </CardBody>
            </Card>
          ))}
        </Grid>
      </Container>
    </Page>
  );
};

export default Blogs;
