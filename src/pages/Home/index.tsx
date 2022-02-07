import { useEffect, useState } from "react";
import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs'
import { LoremIpsum } from 'lorem-ipsum'
import { styled, theme, lightTheme, keyframes } from '../../../stitches.config';
import { BackgroundImage } from '../../components/BackgroundImage';
import { Clock } from "./components/Clock";
import { Button } from "./components/Button";

type HomePageProps = {
  onThemeChanged: (theme: string & { className: string; selector: string; }) => void;
}

export const HomePage = ({
  onThemeChanged,
}: HomePageProps) => {
  const [date, setDate] = useState(new Date());
  const [timeToggle, setTimeToggle] = useState(true);
  const [datePart, setDatePart] = useState<'day' | 'night'>('day');
  const [showDetais, setShowDetais] = useState<boolean>(false);
  const [testimonial, setTestimonial] = useState('');

  useEffect(() => {
    const loremIpsum = new LoremIpsum();
    setTestimonial(loremIpsum.generateSentences());
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeToggle(false);

      setTimeout(() => {
        setTimeToggle(true);
      }, 200);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setDate(new Date());
  }, [timeToggle]);

  useEffect(() => {
    setDatePart(date.getHours() < 18 ? 'day' : 'night');
  }, [date]);

  useEffect(() => {
    onThemeChanged(datePart === 'day' ? lightTheme : theme);
  }, [datePart]);

  const fadeIn = keyframes({
    'from': {
      opacity: '0',
      bottom: '-30%',
      display: 'none',
    },
    'to': {
      opacity: '1',
      bottom: '0',
      display: 'grid',
    }
  });

  const fadeOut = keyframes({
    'from': {
      opacity: '1',
      bottom: '0',
      display: 'grid'
    },
    'to': {
      opacity: '0',
      bottom: '-30%',
      display: 'none'
    }
  });

  const Main = styled('main', {
    display: 'flex',
    flex: '1',

    flexDirection: 'column',
    alignItems: 'start',
    justifyContent: 'space-between',

    paddingTop: '99px',
    paddingBottom: '40px',

    px: '26px',

    '@sm': {
      padding: '6rem',
    }
  });

  const Greetings = styled('h4', {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  });

  const Details = styled('section', {
    position: 'relative',
    bottom: showDetais ? '0' : '-30%',

    display: 'grid',
    opacity: showDetais ? '1' : '0',

    gridTemplateColumns: '1fr 1fr',

    padding: '48px 26px',

    backdropFilter: 'blur(10px)',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: '$primary',

    animation: `${showDetais ? fadeIn : fadeOut} .3s ease`,

    height: '30%',

    '@lg': {
      height: '50%',
    }
  });

  const DetailsLabel = styled('span', {
    textTransform: 'uppercase',

    fontSize: '10px',
    lineHeight: '28px',
    letterSpacing: '2px'
  });

  const DetailsValue = styled('span', {
    textAlign: 'right',

    fontSize: '20px',
    fontWeight: 'bold',
    lineHeight: '24px',
  });

  return (
    <>
      <BackgroundImage
        type={datePart}
      />
      <Main>
        { !showDetais && (
          <p>
            {testimonial}
          </p>
        )}

        <div>
          <Greetings>
            { datePart === 'day' ? (
              <>
                <BsFillSunFill size={22} /> good morning, it's currently
              </>
            ) : (
              <>
                <BsFillMoonFill size={22} /> good evening, it's currently
              </>
            )}
          </Greetings>

          <Clock
            date={date}
            timeToggle={timeToggle}
          />

          <h6>
            in london, uk
          </h6>

          <Button
            open={showDetais}
            onClick={() => setShowDetais(!showDetais)}
            css={{
              marginTop: '48px'
            }}
          >
            { showDetais ? 'LESS' : 'MORE' }
          </Button>
        </div>
      </Main>

      <Details>
        <DetailsLabel>CURRENT TIMEZONE</DetailsLabel>
        <DetailsValue>Europe/London</DetailsValue>

        <DetailsLabel>Day of the year</DetailsLabel>
        <DetailsValue>295</DetailsValue>

        <DetailsLabel>Day of the week</DetailsLabel>
        <DetailsValue>5</DetailsValue>

        <DetailsLabel>Week number</DetailsLabel>
        <DetailsValue>42</DetailsValue>
      </Details>
    </>
  );
};
