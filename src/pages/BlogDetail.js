import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useParams, Link } from 'react-router-dom';
import { getBlogBySlug, loadAllBlogs } from '../utils/blogLoader';
import PageHero from '../components/PageHero';

const Page = styled.main`
  padding: 90px 2rem 4rem; /* account for fixed header */
`;

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const Breadcrumb = styled.nav`
  max-width: 900px;
  margin: 0 auto 0.5rem auto;
  color: #777;
  font-size: 0.95rem;

  a { color: #111; text-decoration: none; }
`;

const Content = styled.article`
  background: #fff;
  border: 1px solid rgba(0,0,0,0.06);
  border-radius: 16px;
  box-shadow: 0 10px 22px rgba(0,0,0,0.06);
  padding: 1.25rem 1.25rem 1.5rem;
`;

const MetaBar = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: #666;
  font-size: 0.95rem;
  margin-bottom: 0.6rem;
`;

const Avatar = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #eee;
  display: grid;
  place-items: center;
  font-size: 0.8rem;
  color: #666;
`;

const PostTitle = styled.h1`
  font-size: 2rem;
  line-height: 1.25;
  margin: 0.25rem 0 0.75rem 0;
`;

const Para = styled.p`
  color: #444;
`;

const CodeBlock = styled.pre`
  background: #0f172a;
  color: #e2e8f0;
  padding: 1rem;
  border-radius: 10px;
  overflow: auto;
`;

const BackLink = styled(Link)`
  display: inline-block;
  margin: 1rem 0 0.5rem;
  color: #111;
`;

const LeadImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 12px;
  object-fit: cover;
  margin-bottom: 1rem;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 1rem;
`;

const Tag = styled.span`
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: 999px;
  padding: 4px 10px;
  font-size: 0.9rem;
  color: #444;
  background: #fff;
`;

const ShareRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 1rem;
  color: #666;
  font-size: 0.95rem;
`;

const ShareButton = styled.a`
  text-decoration: none;
  color: #111;
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: 10px;
  padding: 6px 10px;
  background: #fff;
`;

const SectionTitle = styled.h3`
  margin: 1.5rem 0 0.75rem 0;
`;

const RecentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`;

const RecentCard = styled(Link)`
  display: block;
  border: 1px solid rgba(0,0,0,0.06);
  border-radius: 12px;
  padding: 10px;
  background: #fff;
  color: inherit;
  text-decoration: none;
  box-shadow: 0 6px 14px rgba(0,0,0,0.05);
`;

const RecentThumb = styled.img`
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 8px;
`;

const CommentsBox = styled.div`
  margin-top: 1.25rem;
  border: 1px dashed rgba(0,0,0,0.15);
  border-radius: 12px;
  padding: 1rem;
  color: #666;
  background: #fafafa;
`;

const CommentsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
`;

const CommentList = styled.div`
  display: grid;
  gap: 12px;
  margin-top: 0.75rem;
`;

const CommentItem = styled.div`
  background: #fff;
  border: 1px solid rgba(0,0,0,0.08);
  border-radius: 10px;
  padding: 10px 12px;
`;

const CommentActions = styled.div`
  margin-left: auto;
  display: flex;
  gap: 8px;
`;

const SmallBtn = styled.button`
  appearance: none;
  background: #fff;
  color: #111;
  border: 1px solid rgba(0,0,0,0.12);
  border-radius: 8px;
  padding: 4px 8px;
  cursor: pointer;
`;

const CommentMeta = styled.div`
  display: flex;
  gap: 8px;
  color: #777;
  font-size: 0.9rem;
  margin-bottom: 4px;
`;

const CommentForm = styled.form`
  display: grid;
  gap: 8px;
  margin-top: 0.75rem;
`;

const Input = styled.input`
  border: 1px solid rgba(0,0,0,0.15);
  border-radius: 8px;
  padding: 8px 10px;
`;

const Textarea = styled.textarea`
  border: 1px solid rgba(0,0,0,0.15);
  border-radius: 8px;
  padding: 8px 10px;
  min-height: 90px;
`;

const SubmitBtn = styled.button`
  appearance: none;
  background: #111;
  color: #fff;
  border: 1px solid rgba(0,0,0,0.12);
  border-radius: 10px;
  padding: 8px 12px;
  width: fit-content;
`;

const BlogDetail = () => {
  const { slug } = useParams();
  const blog = getBlogBySlug(slug);
  const allBlogs = useMemo(() => loadAllBlogs(), []);
  const recent = useMemo(() => allBlogs.filter(b => b.slug !== slug).slice(0, 2), [allBlogs, slug]);

  const storageKey = `comments:${slug}`;
  const [comments, setComments] = useState([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [moderation, setModeration] = useState(false);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) setComments(JSON.parse(raw));
    } catch {}
  }, [storageKey]);

  const submit = (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    const entry = { name: name.trim(), message: message.trim(), ts: Date.now() };
    const next = [entry, ...comments];
    setComments(next);
    try { localStorage.setItem(storageKey, JSON.stringify(next)); } catch {}
    setMessage('');
    setShowForm(false);
  };

  const deleteComment = (idx) => {
    if (!moderation || !authorized) return;
    const next = comments.filter((_, i) => i !== idx);
    setComments(next);
    try { localStorage.setItem(storageKey, JSON.stringify(next)); } catch {}
  };

  // Prism.js highlighter: load CSS/JS from CDN once and highlight after mount/update
  useEffect(() => {
    try {
      // Only attempt if there is at least one code block
      const hasCode = Array.isArray(blog?.content) && blog.content.some(b => b.type === 'code');
      if (!hasCode) return;
      if (typeof window === 'undefined' || typeof document === 'undefined') return;

      const ensurePrism = () => new Promise((resolve) => {
        try {
          if (window.Prism) return resolve();
          // CSS
          const cssId = 'prism-tomorrow-css';
          if (!document.getElementById(cssId)) {
            const link = document.createElement('link');
            link.id = cssId;
            link.rel = 'stylesheet';
            link.href = 'https://cdn.jsdelivr.net/npm/prismjs@1/themes/prism-tomorrow.min.css';
            link.crossOrigin = 'anonymous';
            link.onerror = () => resolve();
            document.head.appendChild(link);
          }
          // JS core
          const scriptId = 'prism-core-js';
          if (!document.getElementById(scriptId)) {
            const s = document.createElement('script');
            s.id = scriptId;
            s.src = 'https://cdn.jsdelivr.net/npm/prismjs@1/components/prism-core.min.js';
            s.crossOrigin = 'anonymous';
            s.onload = () => {
              try {
                const sLang = document.createElement('script');
                sLang.src = 'https://cdn.jsdelivr.net/npm/prismjs@1/components/prism-python.min.js';
                sLang.crossOrigin = 'anonymous';
                sLang.onload = () => {
                  try {
                    const sJs = document.createElement('script');
                    sJs.src = 'https://cdn.jsdelivr.net/npm/prismjs@1/components/prism-javascript.min.js';
                    sJs.crossOrigin = 'anonymous';
                    sJs.onload = resolve;
                    sJs.onerror = () => resolve();
                    document.body.appendChild(sJs);
                  } catch { resolve(); }
                };
                sLang.onerror = () => resolve();
                document.body.appendChild(sLang);
              } catch { resolve(); }
            };
            s.onerror = () => resolve();
            document.body.appendChild(s);
          } else {
            resolve();
          }
        } catch { resolve(); }
      });

      ensurePrism().then(() => {
        try { window?.Prism?.highlightAll?.(); } catch {}
      });
    } catch {}
  }, [blog]);

  const ensureAuthorized = () => {
    // Read stored PIN (set once). If not set, ask author to set.
    const key = 'authorPin';
    let stored = localStorage.getItem(key);
    if (!stored) {
      const newPin = prompt('Set an author PIN (4-8 digits):');
      if (!newPin || newPin.length < 4) return false;
      localStorage.setItem(key, newPin);
      stored = newPin;
    }
    const entered = prompt('Enter author PIN to enable moderation:');
    if (entered === stored) {
      setAuthorized(true);
      return true;
    }
    alert('Incorrect PIN');
    return false;
  };

  if (!blog) {
    return (
      <Page>
        <Container>
          <h1>Not found</h1>
          <p>The requested blog could not be found.</p>
          <BackLink to="/blogs">← Back to Blog</BackLink>
        </Container>
      </Page>
    );
  }

  return (
    <Page>
      <Breadcrumb aria-label="breadcrumb">
        <Link to="/">Home</Link> <span>›</span> <Link to="/blogs">Blog</Link> <span>›</span> <span>{blog.title}</span>
      </Breadcrumb>
      <PageHero
        title={blog.title}
        subtitle={`${blog.date} • ${blog.read} • ${blog.category}`}
      />
      <Container>
        <BackLink to="/blogs">← Back to Blog</BackLink>
        <Content>
          <MetaBar>
            <Avatar>{(blog.author || 'MJ').split(' ').map(s=>s[0]).join('').slice(0,2)}</Avatar>
            <span>{blog.author || 'Mehul Joshi'}</span>
            <span>•</span>
            <span>{blog.date}</span>
            <span>•</span>
            <span>{blog.read}</span>
            <span>•</span>
            <span>{blog.category}</span>
          </MetaBar>
          <PostTitle>{blog.title}</PostTitle>
          <LeadImage src={blog.image} alt={blog.title} loading="lazy" />
          {blog.content.map((block, idx) => {
            if (block.type === 'p') {
              return <Para key={idx}>{block.text}</Para>;
            }
            if (block.type === 'code') {
              const lang = block.language || 'javascript';
              return (
                <CodeBlock key={idx} className={`language-${lang}`}>
                  <code className={`language-${lang}`}>{block.text}</code>
                </CodeBlock>
              );
            }
            return null;
          })}
          {Array.isArray(blog.tags) && blog.tags.length > 0 && (
            <Tags>
              {blog.tags.map((t, i) => <Tag key={i}>#{t}</Tag>)}
            </Tags>
          )}
          <ShareRow>
            <span>Share:</span>
            {typeof window !== 'undefined' && (
              <>
                <ShareButton href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(blog.title)}&url=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noreferrer">Twitter</ShareButton>
                <ShareButton href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noreferrer">LinkedIn</ShareButton>
              </>
            )}
          </ShareRow>
          <SectionTitle>Recent Posts</SectionTitle>
          <RecentGrid>
            {recent.map(r => (
              <RecentCard key={r.slug} to={`/blogs/${r.slug}`}>
                <RecentThumb src={r.image} alt={r.title} />
                <strong style={{display:'block', marginBottom:4}}>{r.title}</strong>
                <small style={{color:'#777'}}>{r.date} • {r.read}</small>
              </RecentCard>
            ))}
          </RecentGrid>
          <SectionTitle>Comments</SectionTitle>
          <CommentsBox>
            <CommentsHeader>
              <small>{comments.length} comment{comments.length!==1?'s':''}</small>
              <div style={{display:'flex', gap:8}}>
                <SmallBtn onClick={() => setShowForm((s) => !s)}>{showForm ? 'Close' : 'Add Comment'}</SmallBtn>
                <SmallBtn onClick={() => {
                  if (!moderation) {
                    if (ensureAuthorized()) setModeration(true);
                  } else {
                    setModeration(false); setAuthorized(false);
                  }
                }} style={{ background: moderation ? '#111' : '#fff', color: moderation ? '#fff' : '#111' }}>
                  {moderation ? 'Moderation: On' : 'Moderation: Off'}
                </SmallBtn>
              </div>
            </CommentsHeader>
            <CommentList>
              {comments.length === 0 && <small>No comments yet.</small>}
              {comments.map((c, idx) => (
                <CommentItem key={idx}>
                  <CommentMeta>
                    <strong>{c.name}</strong>
                    <span>•</span>
                    <span>{new Date(c.ts).toLocaleString()}</span>
                    {moderation && (
                      <CommentActions>
                        <SmallBtn onClick={() => deleteComment(idx)}>Delete</SmallBtn>
                      </CommentActions>
                    )}
                  </CommentMeta>
                  <div style={{whiteSpace:'pre-wrap'}}>{c.message}</div>
                </CommentItem>
              ))}
            </CommentList>
            {showForm && (
              <CommentForm onSubmit={submit}>
                <Input placeholder="Your name" value={name} onChange={(e)=>setName(e.target.value)} />
                <Textarea placeholder="Write a comment..." value={message} onChange={(e)=>setMessage(e.target.value)} />
                <SubmitBtn type="submit">Post Comment</SubmitBtn>
              </CommentForm>
            )}
          </CommentsBox>
        </Content>
      </Container>
    </Page>
  );
};

export default BlogDetail;
