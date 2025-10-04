import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useForm, ValidationError } from '@formspree/react';
import { 
  FaLinkedin, 
  FaGithub, 
  FaTwitter,
  FaInstagram,
  FaPaperPlane,
  FaCheckCircle,
  FaExclamationCircle
} from 'react-icons/fa';

const ContactSection = styled.section`
  padding: 6rem 2rem 4rem;
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
  color: #111;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const SectionSubtitle = styled(motion.p)`
  text-align: center;
  color: #555;
  font-size: 1.05rem;
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 3rem;
  }
`;

const ContactGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  margin-bottom: 4rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const ContactInfo = styled(motion.div)`
  background: #ffffff;
  border-radius: 12px;
  padding: 2rem;
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 10px 24px rgba(0,0,0,0.06);
`;

const ContactForm = styled(motion.form)`
  background: #ffffff;
  border-radius: 12px;
  padding: 2rem;
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 10px 24px rgba(0,0,0,0.06);
`;

const InfoTitle = styled.h3`
  color: #111;
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 2rem;
`;

const InfoItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1rem;
  border-radius: 15px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.03);
    transform: translateX(6px);
  }
`;

const ImageIcon = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 12px;
  object-fit: cover;
  flex-shrink: 0;
  box-shadow: 0 8px 20px rgba(0,0,0,0.15);
`;

const InfoContent = styled.div`
  color: #333;

  h4 {
    font-weight: 600;
    margin-bottom: 0.3rem;
  }

  p {
    color: #555;
    font-size: 0.95rem;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 2rem;
`;

const Label = styled.label`
  display: block;
  color: #333;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.9rem 1rem;
  background: #fff;
  border: 1px solid rgba(0,0,0,0.12);
  border-radius: 10px;
  color: #222;
  font-size: 1rem;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #222;
    box-shadow: 0 0 0 3px rgba(0,0,0,0.06);
  }

  &::placeholder {
    color: #999;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.9rem 1rem;
  background: #fff;
  border: 1px solid rgba(0,0,0,0.12);
  border-radius: 10px;
  color: #222;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  font-family: inherit;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #222;
    box-shadow: 0 0 0 3px rgba(0,0,0,0.06);
  }

`;

const SubmitButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  background: #111;
  color: #fff;
  border: none;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  margin-top: 1rem;
  position: relative;
  overflow: hidden;

  &:hover {
    background: #000;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }

  &:disabled {
    background: #2ecc71;
    cursor: not-allowed;
    transform: none !important;
  }

  .spinner {
    width: 20px;
    height: 20px;
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top-color: #fff;
    animation: spin 1s ease-in-out infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .formspree-success {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #2ecc71;
    color: #fff;
    font-size: 1.2rem;
    font-weight: 600;
    border-radius: 50px;
    padding: 1rem;
    animation: fade-in 0.3s ease-in-out;
  }

  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const ErrorText = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #e74c3c;
  margin-top: 1rem;
  font-size: 0.9rem;
  background: rgba(231, 76, 60, 0.1);
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border-left: 3px solid #e74c3c;
`;

const SocialLinks = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 3rem;

  @media (max-width: 768px) {
    gap: 1.5rem;
  }
`;

const SocialLink = styled(motion.a)`
  width: 48px;
  height: 48px;
  background: #fff;
  border: 1px solid rgba(0,0,0,0.08);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333;
  font-size: 1.2rem;
  text-decoration: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease, color 0.2s ease, background 0.2s ease, border-color 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    color: #000;
    border-color: rgba(0,0,0,0.15);
    box-shadow:
      0 0 0 6px rgba(0,0,0,0.05), /* soft outer glow ring */
      0 12px 24px rgba(0,0,0,0.15); /* drop shadow */
  }

  &:focus-visible {
    outline: none;
    transform: translateY(-2px);
    border-color: rgba(0,0,0,0.2);
    box-shadow:
      0 0 0 8px rgba(0,0,0,0.06),
      0 10px 22px rgba(0,0,0,0.14);
  }
`;

/* Removed page-local Footer; using global Footer component in layout */

const Contact = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const [state, handleSubmit] = useForm('meorzqjw'); // Formspree form ID
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await handleSubmit(e);
    if (state.succeeded) {
      setFormData({ name: '', email: '', subject: '', message: '' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <ContactSection id="contact" ref={ref}>
      <Container>
        {/* <SectionTitle
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          Get In Touch
        </SectionTitle> */}

        {/* <SectionSubtitle
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Have a project in mind or want to collaborate? I'd love to hear from you!
        </SectionSubtitle> */}

        <ContactGrid
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <ContactInfo variants={itemVariants}>
            <InfoTitle>Let's Connect</InfoTitle>
            
            <InfoItem
              whileHover={{ x: 10 }}
              transition={{ duration: 0.3 }}
            >
              <ImageIcon
                src="https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=120&q=60"
                alt="Email"
                loading="lazy"
              />
              <InfoContent>
                <h4>Email</h4>
                <p>mehul.joshi@email.com</p>
              </InfoContent>
            </InfoItem>

            <InfoItem
              whileHover={{ x: 10 }}
              transition={{ duration: 0.3 }}
            >
              <ImageIcon
                src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=120&q=60"
                alt="Phone"
                loading="lazy"
              />
              <InfoContent>
                <h4>Phone</h4>
                <p>+91 98765 43210</p>
              </InfoContent>
            </InfoItem>

            <InfoItem
              whileHover={{ x: 10 }}
              transition={{ duration: 0.3 }}
            >
              <ImageIcon
                src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=120&q=60"
                alt="Location"
                loading="lazy"
              />
              <InfoContent>
                <h4>Location</h4>
                <p>Mumbai, India</p>
              </InfoContent>
            </InfoItem>
          </ContactInfo>

          <ContactForm 
            variants={itemVariants} 
            onSubmit={onSubmit}
            action="https://formspree.io/f/meorzqjw"
            method="POST"
          >
            <FormGroup>
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your Name"
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your.email@example.com"
                required
              />
              <ValidationError 
                prefix="Email" 
                field="email"
                errors={state.errors}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="subject">Subject</Label>
              <Input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="Project Inquiry"
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="message">Message</Label>
              <TextArea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Tell me about your project..."
                required
              />
            </FormGroup>

            <SubmitButton
              type="submit"
              disabled={state.submitting || state.succeeded}
              whileHover={{ scale: state.submitting || state.succeeded ? 1 : 1.05 }}
              whileTap={{ scale: state.submitting || state.succeeded ? 1 : 0.95 }}
              style={{
                opacity: state.submitting || state.succeeded ? 0.8 : 1,
                cursor: state.submitting || state.succeeded ? 'not-allowed' : 'pointer'
              }}
            >
              {state.submitting ? (
                <>
                  <span className="spinner" />
                  Sending...
                </>
              ) : state.succeeded ? (
                <>
                  <FaCheckCircle />
                  Message Sent!
                </>
              ) : (
                <>
                  <FaPaperPlane />
                  Send Message
                </>
              )}
            </SubmitButton>
            {state.errors && state.errors.length > 0 && (
              <ErrorText>
                <FaExclamationCircle />
                Oops! There was an error sending your message. Please try again.
              </ErrorText>
            )}
          </ContactForm>
        </ContactGrid>

        <SocialLinks
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <SocialLink
            href="https://linkedin.com/in/mehul-joshi"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.3 }}
          >
            <FaLinkedin />
          </SocialLink>
          
          <SocialLink
            href="https://github.com/mehul-joshi"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.3 }}
          >
            <FaGithub />
          </SocialLink>
          
          <SocialLink
            href="https://twitter.com/mehul_joshi"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.3 }}
          >
            <FaTwitter />
          </SocialLink>
          
          <SocialLink
            href="https://instagram.com/mehul_joshi"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.3 }}
          >
            <FaInstagram />
          </SocialLink>
        </SocialLinks>

        {/* Global Footer is rendered from App layout */}
      </Container>
    </ContactSection>
  );
};

export default Contact;
