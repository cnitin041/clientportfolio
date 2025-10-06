import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { loadAllBlogs } from 'features/blogs/lib/blogLoader';
import PageHero from 'components/layout/PageHero';

const Page = styled.main`
  padding: 0 2rem 4rem; /* header offset handled by Header */
`;

const Container = styled.div`
  max-width: 1320px;
  margin: 0 auto;
`;

// PageHero will handle the hero section for consistency

const ChipsBar = styled.div`
  max-width: 1320px;
  margin: 0.5rem auto 1.25rem;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

/* Removed hardcoded Tabs/Tab; using dynamic ChipsBar below */

const Chip = styled.button`
  appearance: none;
  border: 1px solid rgba(0,0,0,0.1);
  background: ${p => (p.$active ? '#111' : '#fff')};
  color: ${p => (p.$active ? '#fff' : '#222')};
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease, transform 0.15s ease;

  &:hover { transform: translateY(-1px); }
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
  const allBlogs = loadAllBlogs();
  const [category, setCategory] = useState('All');
  const categories = useMemo(() => {
    const set = new Set(allBlogs.map(b => b.category || 'Uncategorized'));
    return ['All', ...Array.from(set)];
  }, [allBlogs]);
  const blogs = useMemo(() => allBlogs.filter(b => category === 'All' || b.category === category), [allBlogs, category]);
  return (
    <Page>
      <PageHero
        title="Blog"
        subtitle="Thoughts on Houdini tools, product design, and modern web development."
      />
      {/* Primary tabs removed; using ChipsBar based on actual categories */}
      <ChipsBar>
        {categories.map(cat => (
          <Chip key={cat} $active={cat === category} onClick={() => setCategory(cat)}>{cat}</Chip>
        ))}
      </ChipsBar>
      <Container>

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
