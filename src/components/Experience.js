import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaCalendarAlt, FaMapMarkerAlt, FaLockOpen } from 'react-icons/fa';

const ExperienceSection = styled.section`
  padding: 6rem 2rem;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
`;

const TimelineIconImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.25s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 3rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 4rem;
  background: linear-gradient(135deg, #ffd700, #ffed4e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 3rem;
  }
`;

// Vertical flow layout
const VerticalTimeline = styled.div`
  position: relative;
  padding-left: 110px;
`;

const VerticalLine = styled.div`
  position: absolute;
  left: 55px;
  top: 0;
  bottom: 0;
  width: 3px;
  background: linear-gradient(180deg, #ffd700, #ffed4e);
`;

const FlowItem = styled(motion.div)`
  position: relative;
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
`;

const NodeCol = styled.div`
  width: 110px;
  position: relative;
`;

const NodeBadge = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, #ffd700, #ffb703);
  box-shadow: 0 12px 26px rgba(255, 215, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #222;
  font-size: 1.4rem;
  margin-left: 20px; /* centers over vertical line */
  transition: transform 0.25s ease, box-shadow 0.25s ease, filter 0.25s ease;

  &:hover {
    transform: scale(1.06);
    box-shadow: 0 18px 36px rgba(255, 215, 0, 0.4);
    filter: saturate(1.08);
  }
`;

const ConnectorV = styled.div`
  position: absolute;
  left: 55px;
  top: 70px;
  bottom: -20px;
  width: 3px;
  background: linear-gradient(180deg, rgba(255,215,0,0.8), rgba(255,215,0,0));
`;

const NodeCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 16px;
  padding: 1rem 1.25rem;
  min-width: 220px;
  backdrop-filter: blur(10px);
  transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease, border-color 0.25s ease;

  &:hover {
    transform: scale(1.03);
    background: rgba(255, 255, 255, 0.12);
    border-color: rgba(255, 255, 255, 0.28);
    box-shadow: 0 20px 40px rgba(0,0,0,0.25);
  }
`;

const TimelineContent = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  width: 45%;
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  transition: box-shadow 0.25s ease, transform 0.25s ease, background 0.25s ease, border-color 0.25s ease;
  transform-origin: center center;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    width: 0;
    height: 0;
    border: 15px solid transparent;
    transform: translateY(-50%);
  }

  ${props => props.$isEven ? `
    &::before {
      left: -30px;
      border-right-color: rgba(255, 255, 255, 0.1);
    }
  ` : `
    &::before {
      right: -30px;
      border-left-color: rgba(255, 255, 255, 0.1);
    }
  `}

  @media (max-width: 768px) {
    width: 100%;
    
    &::before {
      left: -30px;
      border-right-color: rgba(255, 255, 255, 0.1);
      border-left-color: transparent;
    }
  }

  &:hover {
    transform: scale(1.02);
    background: rgba(255, 255, 255, 0.12);
    border-color: rgba(255, 255, 255, 0.3);
    box-shadow: 0 24px 48px rgba(0, 0, 0, 0.25);
  }
`;

const TimelineIcon = styled(motion.div)`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 60px;
  border-radius: 50%;
  z-index: 2;
  overflow: hidden;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.25);

  @media (max-width: 768px) {
    left: 30px;
    transform: translateX(-50%);
  }
`;

const JobTitle = styled.h3`
  color: #ffd700;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const Company = styled.h4`
  color: white;
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 1rem;
`;

const JobMeta = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
`;

const JobDescription = styled.ul`
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  list-style: none;
  padding: 0;

  li {
    margin-bottom: 0.5rem;
    position: relative;
    padding-left: 1.5rem;

    &::before {
      content: '▶';
      position: absolute;
      left: 0;
      color: #ffd700;
      font-size: 0.8rem;
    }
  }
`;

const experiences = [
  {
    title: "Pipeline TD",
    company: "DNEG",
    period: "Jan 2024 - Jul 2024",
    location: "Mumbai, India",
    description: [
      "Developed and maintained pipeline tools for VFX production workflows",
      "Collaborated with artists and supervisors to streamline production processes",
      "Implemented automated solutions to reduce manual tasks and improve efficiency",
      "Worked with Python, Maya API, and proprietary pipeline tools"
    ]
  },
  {
    title: "FX TD",
    company: "DNEG, REDEFINE",
    period: "Jul 2019 - Jul 2023",
    location: "Mumbai, India",
    description: [
      "Created complex visual effects for feature films and commercials",
      "Specialized in particle systems, fluid simulations, and procedural animations",
      "Collaborated with VFX supervisors to achieve creative vision",
      "Optimized render times and improved workflow efficiency"
    ]
  },
  {
    title: "FX Artist",
    company: "ASSISTANT ENTERTAINMENT",
    period: "Jul 2017 - Jul 2019",
    location: "Mumbai, India",
    description: [
      "Developed visual effects for various entertainment projects",
      "Created dynamic simulations and particle effects",
      "Worked closely with the creative team to deliver high-quality results",
      "Gained expertise in industry-standard VFX software and techniques"
    ]
  },
  {
    title: "Freelance Creative",
    company: "FREELANCE CREATIVE",
    period: "Jul 2016 - Jul 2017",
    location: "Remote",
    description: [
      "Provided creative services for various clients and projects",
      "Developed skills in project management and client communication",
      "Worked on diverse creative challenges and expanded technical expertise",
      "Built a strong foundation for career in visual effects industry"
    ]
  }
];

const Experience = () => {
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

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const evenItemVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <ExperienceSection id="experience" ref={ref}>
      <Container>
        <SectionTitle
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          Work Experience
        </SectionTitle>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <VerticalTimeline>
            <VerticalLine />
            {experiences.map((exp, index) => (
              <FlowItem key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <NodeCol>
                  <NodeBadge title="Unlocked"><FaLockOpen /></NodeBadge>
                  {index < experiences.length - 1 && (<ConnectorV aria-hidden="true" />)}
                </NodeCol>

                <NodeCard>
                  <JobTitle>{exp.title}</JobTitle>
                  <Company>{exp.company}</Company>
                  <JobMeta>
                    <MetaItem><FaCalendarAlt /> {exp.period}</MetaItem>
                    <MetaItem><FaMapMarkerAlt /> {exp.location}</MetaItem>
                  </JobMeta>
                  <JobDescription>
                    {exp.description.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </JobDescription>
                </NodeCard>
              </FlowItem>
            ))}
          </VerticalTimeline>
        </motion.div>
      </Container>
    </ExperienceSection>
  );
};

export default Experience;
