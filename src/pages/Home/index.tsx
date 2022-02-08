import { useEffect, useState } from 'react';
import { getDayOfYear, getWeek } from 'date-fns'
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
  const [datePart, setDatePart] = useState<'day' | 'night'>('day');
  const [showDetais, setShowDetais] = useState<boolean>(false);
  const [testimonial, setTestimonial] = useState('');

  useEffect(() => {
    const loremIpsum = new LoremIpsum();
    setTestimonial(loremIpsum.generateSentences());
  }, []);

  useEffect(() => {

    const timeoutId = setTimeout(() => {
      setDate(new Date());
    }, 1000);


    return () => clearTimeout(timeoutId);

  }, []);

  useEffect(() => {
    setDatePart(date.getHours() < 18 ? 'day' : 'night');
  }, [date]);

  useEffect(() => {
    onThemeChanged(datePart === 'day' ? lightTheme : theme);
  }, [datePart, onThemeChanged]);

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
    position: 'fixed',
    bottom: showDetais ? '0' : '-50%',

    display: 'grid',
    opacity: showDetais ? '1' : '0',

    gridTemplateColumns: '1fr 1fr',

    padding: '48px 26px',

    backdropFilter: 'blur(10px)',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: '$primary',

    animation: `${showDetais ? fadeIn : fadeOut} .3s ease`,

    width: '100%',
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
        <DetailsValue>{Intl.DateTimeFormat().resolvedOptions().timeZone}</DetailsValue>

        <DetailsLabel>Day of the year</DetailsLabel>
        <DetailsValue>{getDayOfYear(date)}</DetailsValue>

        <DetailsLabel>Day of the week</DetailsLabel>
        <DetailsValue>{date.getDay()}</DetailsValue>

        <DetailsLabel>Week number</DetailsLabel>
        <DetailsValue>{getWeek(date)}</DetailsValue>
      </Details>
    </>
  );
};
