import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaCalendarAlt, FaMapMarkerAlt, FaAward } from 'react-icons/fa';

const EducationSection = styled.section`
  padding: 6rem 2rem;
  position: relative;
  /* fade mask similar to Experience for polished edges */
  &::before, &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    height: 96px;
    pointer-events: none;
    z-index: 1;
  }
  &::before { top: 0; background: linear-gradient(to bottom, rgba(247,247,247,1), rgba(247,247,247,0)); }
  &::after { bottom: 0; background: linear-gradient(to top, rgba(247,247,247,1), rgba(247,247,247,0)); }
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2.5rem;
  color: #111;

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 3rem;
  }
`;

const EducationStack = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const EducationCard = styled(motion.div)`
  background: #ffffff;
  border-radius: 16px;
  padding: 1.5rem 1.25rem;
  border: 1px solid rgba(0, 0, 0, 0.06);
  position: relative;
  box-shadow: 0 8px 18px rgba(0,0,0,0.06);
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 18px 34px rgba(0, 0, 0, 0.12);
    border-color: rgba(0,0,0,0.12);
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const IconContainer = styled(motion.div)`
  width: 54px;
  height: 54px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 10px 22px rgba(0,0,0,0.12);
  border: 1px solid rgba(0,0,0,0.06);
  background: #fff;
`;

const IconImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CardContent = styled.div`
  flex: 1;
`;

const Degree = styled.h3`
  color: #111;
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  line-height: 1.3;
`;

const Institution = styled.h4`
  color: #333;
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 0.75rem;
`;

const EducationMeta = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 0.75rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
  font-size: 0.9rem;
`;

const Description = styled.p`
  color: #555;
  line-height: 1.7;
  margin-bottom: 0.75rem;
`;

const Achievements = styled.div`
  margin-top: 1.5rem;
`;

const AchievementTitle = styled.h5`
  color: #111;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const AchievementList = styled.ul`
  list-style: none;
  padding: 0;

  li {
    color: #555;
    margin-bottom: 0.3rem;
    position: relative;
    padding-left: 1.5rem;
    font-size: 0.9rem;

    &::before {
      content: '•';
      position: absolute;
      left: 0;
      color: #aaa;
      font-size: 0.8rem;
    }
  }
`;

const FloatingShape = styled(motion.div)`
  display: none;
`;

const educationData = [
  {
    degree: "B.Sc IN MEDIA & GRAPHICS",
    institution: "ADVANCE VISUAL EFFECTS",
    period: "Jun 2016 - Jun 2019",
    location: "Mumbai, India",
    logo: "https://images.unsplash.com/photo-1544717305-996b815c338c?auto=format&fit=crop&w=120&q=60",
    description: "Comprehensive program covering visual effects, 3D animation, and digital media production. Gained expertise in industry-standard software and production pipelines.",
    achievements: [
      "Specialized in VFX and 3D Animation",
      "Hands-on experience with industry tools",
      "Portfolio development and client projects"
    ]
  },
  {
    degree: "DIPLOMA IN MEDIA & GRAPHICS",
    institution: "ADVANCE VISUAL EFFECTS", 
    period: "Jun 2014 - Jun 2016",
    location: "Mumbai, India",
    logo: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=120&q=60",
    description: "Foundation program in digital media, graphics design, and visual communication. Built strong fundamentals in creative software and design principles.",
    achievements: [
      "Strong foundation in design principles",
      "Proficiency in creative software suite",
      "Creative problem-solving skills"
    ]
  }
];

const Education = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const cardVariants = {
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
    <EducationSection id="education" ref={ref}>
      <Container>
        <SectionTitle
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          Education
        </SectionTitle>

        <EducationStack
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {educationData.map((edu, index) => (
            <EducationCard
              key={index}
              variants={cardVariants}
              whileHover={{ y: -3 }}
            >
              <FloatingShape
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              
              <CardHeader>
                <IconContainer
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <IconImage
                    src={edu.logo || "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=200&q=60"}
                    alt={`${edu.institution} logo`}
                    loading="lazy"
                  />
                </IconContainer>
                
                <CardContent>
                  <Degree>{edu.degree}</Degree>
                  <Institution>{edu.institution}</Institution>
                </CardContent>
              </CardHeader>

              <EducationMeta>
                <MetaItem>
                  <FaCalendarAlt />
                  {edu.period}
                </MetaItem>
                <MetaItem>
                  <FaMapMarkerAlt />
                  {edu.location}
                </MetaItem>
              </EducationMeta>

              <Description>{edu.description}</Description>

              <Achievements>
                <AchievementTitle>
                  <FaAward />
                  Key Highlights
                </AchievementTitle>
                <AchievementList>
                  {edu.achievements.map((achievement, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ duration: 0.5, delay: 0.1 * i }}
                    >
                      {achievement}
                    </motion.li>
                  ))}
                </AchievementList>
              </Achievements>
            </EducationCard>
          ))}
        </EducationStack>
      </Container>
    </EducationSection>
  );
};

export default Education;
