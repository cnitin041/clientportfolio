import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useParams, Link } from 'react-router-dom';
import { getBlogBySlug, loadAllBlogs } from 'features/blogs/lib/blogLoader';
import PageHero from 'components/layout/PageHero';

const Page = styled.main`
  padding: 90px 2rem 4rem; /* account for fixed header */
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const Breadcrumb = styled.nav`
  max-width: 1400px;
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

const Figure = styled.figure`
  margin: 1rem 0;
`;

const InlineImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 12px;
  object-fit: cover;
`;

const Figcaption = styled.figcaption`
  color: #666;
  font-size: 0.9rem;
  margin-top: 6px;
  text-align: center;
`;

const InlineVideo = styled.video`
  width: 100%;
  height: auto;
  border-radius: 12px;
  display: block;
`;

const EmbedWrap = styled.div`
  position: relative;
  width: 100%;
  padding-top: 56.25%; /* 16:9 */
  border-radius: 12px;
  overflow: hidden;
  background: #000;
  margin: 1rem 0;
`;

const ResponsiveIframe = styled.iframe`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
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

const IconBtn = styled.button`
  appearance: none;
  border: 1px solid rgba(0,0,0,0.1);
  background: #fff;
  border-radius: 10px;
  padding: 6px 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  svg { width: 18px; height: 18px; }
`;

const LikeCount = styled.span`
  font-size: 0.95rem;
  color: #555;
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

// Inline buttons block
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
  const likeKey = `likes:${slug}`;
  const [likes, setLikes] = useState(() => {
    try { return Number(localStorage.getItem(likeKey) || 0); } catch { return 0; }
  });
  const [liked, setLiked] = useState(() => {
    try { return localStorage.getItem(`${likeKey}:me`) === '1'; } catch { return false; }
  });

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

  const toggleLike = () => {
    try {
      if (liked) {
        const next = Math.max(0, likes - 1);
        setLikes(next);
        localStorage.setItem(likeKey, String(next));
        localStorage.setItem(`${likeKey}:me`, '0');
        setLiked(false);
      } else {
        const next = likes + 1;
        setLikes(next);
        localStorage.setItem(likeKey, String(next));
        localStorage.setItem(`${likeKey}:me`, '1');
        setLiked(true);
      }
    } catch {}
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
          if (window.Prism && window.Prism.languages && window.Prism.highlightAll) {
            return resolve();
          }
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
                // Load dependencies: clike (required by JavaScript) -> python -> javascript
                const loadScript = (id, src) => new Promise((res) => {
                  if (document.getElementById(id)) return res();
                  const el = document.createElement('script');
                  el.id = id;
                  el.src = src;
                  el.crossOrigin = 'anonymous';
                  el.onload = () => res();
                  el.onerror = () => res();
                  document.body.appendChild(el);
                });

                loadScript('prism-clike-js', 'https://cdn.jsdelivr.net/npm/prismjs@1/components/prism-clike.min.js')
                  .then(() => loadScript('prism-python-js', 'https://cdn.jsdelivr.net/npm/prismjs@1/components/prism-python.min.js'))
                  .then(() => loadScript('prism-javascript-js', 'https://cdn.jsdelivr.net/npm/prismjs@1/components/prism-javascript.min.js'))
                  .then(resolve)
                  .catch(() => resolve());
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
            if (block.type === 'img') {
              return (
                <Figure key={idx}>
                  <InlineImage src={block.src} alt={block.alt || ''} loading="lazy" />
                  {block.caption && <Figcaption>{block.caption}</Figcaption>}
                </Figure>
              );
            }
            if (block.type === 'video') {
              // Expect block.src to be an absolute path under /public/videos or full URL
              return (
                <Figure key={idx}>
                  <InlineVideo
                    controls
                    poster={block.poster}
                    preload={block.preload || 'metadata'}
                  >
                    {block.src && <source src={block.src} type={block.typeHint || 'video/mp4'} />}
                    Your browser does not support the video tag.
                  </InlineVideo>
                  {block.caption && <Figcaption>{block.caption}</Figcaption>}
                </Figure>
              );
            }
            if (block.type === 'embed') {
              // YouTube support via block.url (watch or youtu.be) or block.id
              let url = block.url || '';
              if (!url && block.id) url = `https://www.youtube.com/embed/${block.id}`;
              if (url.includes('watch?v=')) {
                const id = new URL(url, window.location.origin).searchParams.get('v');
                if (id) url = `https://www.youtube.com/embed/${id}`;
              }
              if (url.includes('youtu.be/')) {
                const id = url.split('youtu.be/')[1].split(/[?&#]/)[0];
                if (id) url = `https://www.youtube.com/embed/${id}`;
              }
              return (
                <Figure key={idx}>
                  <EmbedWrap>
                    <ResponsiveIframe
                      src={url}
                      title={block.title || 'YouTube video'}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="strict-origin-when-cross-origin"
                    />
                  </EmbedWrap>
                  {block.caption && <Figcaption>{block.caption}</Figcaption>}
                </Figure>
              );
            }
            if (block.type === 'buttons' && Array.isArray(block.items)) {
              return (
                <ButtonsRow key={idx}>
                  {block.items.map((btn, bi) => (
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
            <IconBtn onClick={toggleLike} aria-label="Like post" title="Like post" style={{ borderColor: liked ? '#e11d48' : 'rgba(0,0,0,0.1)', background: liked ? '#ffe4e6' : '#fff', color: liked ? '#9f1239' : '#111' }}>
              <svg viewBox="0 0 24 24" fill={liked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61c-1.54-1.34-3.97-1.13-5.37.5L12 8.09l-3.47-3c-1.4-1.63-3.83-1.84-5.37-.5-1.73 1.51-1.8 4.16-.2 5.76l8.1 8.05c.23.23.54.36.87.36s.64-.13.87-.36l8.1-8.05c1.6-1.6 1.53-4.25-.2-5.76z"/></svg>
            </IconBtn>
            <LikeCount>{likes}</LikeCount>
            <span style={{marginLeft:8}}>Share:</span>
            {typeof window !== 'undefined' && (
              <>
                <IconBtn as="a" href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noreferrer" aria-label="Share on LinkedIn" title="LinkedIn">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM0 8h5v16H0zM8 8h4.8v2.2h.07c.67-1.2 2.3-2.46 4.74-2.46C21.5 7.74 24 10 24 14.3V24h-5v-8.5c0-2.03-.04-4.64-2.83-4.64-2.83 0-3.26 2.21-3.26 4.49V24H8z"/></svg>
                </IconBtn>
                <IconBtn as="a" href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noreferrer" aria-label="Share on Facebook" title="Facebook">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 10-11.5 9.9v-7h-2v-3h2v-2.3c0-2 1.2-3.2 3-3.2.9 0 1.8.16 1.8.16v2h-1c-1 0-1.3.62-1.3 1.26V12h2.2l-.35 3h-1.85v7A10 10 0 0022 12z"/></svg>
                </IconBtn>
                <IconBtn as="a" href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(blog.title)}&url=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noreferrer" aria-label="Share on X" title="X / Twitter">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2H21l-6.53 7.46L22 22h-6.62l-4.33-5.66L5.82 22H3l6.89-7.87L2 2h6.74l3.9 5.2L18.24 2zm-2.32 18h1.28L8.15 4H6.88l9.04 16z"/></svg>
                </IconBtn>
                <IconBtn as="a" href={`https://www.instagram.com/?url=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noreferrer" aria-label="Share on Instagram" title="Instagram">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2c1.66 0 3 1.34 3 3v10c0 1.66-1.34 3-3 3H7c-1.66 0-3-1.34-3-3V7c0-1.66 1.34-3 3-3h10z"/></svg>
                </IconBtn>
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
