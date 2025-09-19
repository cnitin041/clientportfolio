import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  FaLinkedin, 
  FaGithub, 
  FaTwitter,
  FaInstagram,
  FaPaperPlane
} from 'react-icons/fa';

const ContactSection = styled.section`
  padding: 6rem 2rem 4rem;
`;

const Container = styled.div`
  max-width: 1200px;
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

  &::placeholder {
    color: #999;
  }
`;

const SubmitButton = styled(motion.button)`
  background: #111;
  color: #fff;
  border: none;
  padding: 0.9rem 1.4rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
    background: #000;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
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

const Footer = styled.footer`
  text-align: center;
  padding: 2rem 0;
  border-top: 1px solid rgba(0,0,0,0.06);
  margin-top: 3rem;
`;

const FooterText = styled.p`
  color: #777;
  font-size: 0.9rem;
`;

const Contact = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! I\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
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
        <SectionTitle
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          Get In Touch
        </SectionTitle>

        <SectionSubtitle
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Have a project in mind or want to collaborate? I'd love to hear from you!
        </SectionSubtitle>

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

          <ContactForm variants={itemVariants} onSubmit={handleSubmit}>
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
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaPaperPlane />
              Send Message
            </SubmitButton>
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

        <Footer>
          <FooterText>
            © 2024 Mehul Joshi.
          </FooterText>
        </Footer>
      </Container>
    </ContactSection>
  );
};

export default Contact;
