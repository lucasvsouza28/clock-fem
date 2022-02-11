import { useEffect, useState } from 'react';
import { getDayOfYear, getWeek } from 'date-fns'
import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs'
import { LoremIpsum } from 'lorem-ipsum'
import { styled, theme, lightTheme, keyframes } from '../../../stitches.config';
import { BackgroundImage } from '../../components/BackgroundImage';
import { Clock } from "./components/Clock";
import { Button } from "./components/Button";

type HomePageProps = {
}

export const HomePage = ({
}: HomePageProps) => {
  const [date, setDate] = useState(new Date());
  const [datePart, setDatePart] = useState<'day' | 'night'>('day');
  const [showDetais, setShowDetais] = useState<boolean>(false);
  const [testimonial, setTestimonial] = useState('');

  useEffect(() => {
    const loremIpsum = new LoremIpsum();
    setTestimonial(loremIpsum.generateSentences());
  }, [setTestimonial]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDate(new Date());
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [setDate]);

  useEffect(() => {
    setDatePart(date.getHours() < 18 ? 'day' : 'night');
  }, [date, setDatePart]);

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

    gridTemplate:
      `'timezone-label timezone-value'
      'day-of-year-label day-of-year-value'
      'day-of-week-label day-of-week-value'
      'weeknr-label weeknr-value'
      `,

    '@sm': {
      height: '40%',
      paddingTop: '119px',
      px: ' 64px',
      gridTemplate:
        `'timezone-label day-of-year-label'
        'timezone-value day-of-year-value'
        'day-of-week-label weeknr-label'
        'day-of-week-value weeknr-value'
        `,
    },

    '@lg': {
      height: '50%',
    }
  });

  const DetailsLabel = styled('span', {
    textTransform: 'uppercase',

    fontSize: '10px',
    lineHeight: '28px',
    letterSpacing: '2px',

    '@sm': {
      fontSize: '13px',
      lineHeight: '28px',
    }
  });

  const DetailsValue = styled('span', {
    fontSize: '20px',
    fontWeight: 'bold',
    lineHeight: '24px',
    textAlign: 'right',

    ['@sm']: {
      textAlign: 'left',
      fontSize: '40px',
      lineHeight: '48px',
    }
  });

  const Box = styled('div', {
    display: 'flex',
    height: '100vh',
  });

  return (
    <Box
      className={ datePart === 'day' ? lightTheme : theme }
    >
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
        <DetailsLabel css={{
          gridArea: 'timezone-label'
        }}>
          CURRENT TIMEZONE
        </DetailsLabel>
        <DetailsValue
          css={{
            gridArea: 'timezone-value'
          }}
        >
          {Intl.DateTimeFormat().resolvedOptions().timeZone}
        </DetailsValue>

        <DetailsLabel
          css={{
            gridArea: 'day-of-year-label'
          }}
        >
          Day of the year
        </DetailsLabel>
        <DetailsValue
          css={{
            gridArea: 'day-of-year-value'
          }}
        >
          {getDayOfYear(date)}
        </DetailsValue>

        <DetailsLabel
          css={{
            gridArea: 'day-of-week-label'
          }}
        >
          Day of the week
        </DetailsLabel>
        <DetailsValue
          css={{
            gridArea: 'day-of-week-value'
          }}
        >
          {date.getDay()}
        </DetailsValue>

        <DetailsLabel
          css={{
            gridArea: 'weeknr-label'
          }}
        >
          Week number
        </DetailsLabel>
        <DetailsValue
          css={{
            gridArea: 'weeknr-value'
          }}
        >
          {getWeek(date)}
        </DetailsValue>
      </Details>
    </Box>
  );
};
