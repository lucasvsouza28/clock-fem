import { useEffect, useState } from 'react';
import { styled } from '../../../../stitches.config';

type ClockProps = {
}

export const Clock = ({
}: ClockProps) => {
  const [timeToggle, setTimeToggle] = useState(false);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    let timeoutId: number;
    const interval = setInterval(() => {

      setTimeToggle(true);
      setDate(new Date());

      timeoutId = setTimeout(() => {
        setTimeToggle(false);
      }, 100);

    }, 1000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeoutId);
    };
  }, []);

  const StyledClock = styled('h1', {
    gridArea: 'clock',
    display: 'flex',
    marginBottom: '16px',
  });

  const SecondsIndicator = styled('span', {
    minWidth: '30px',

    '@sm': {
      minWidth: '60px',
    },
  });

  return (
    <StyledClock>
      {date.getHours().toString().padStart(2, '0')}
      <SecondsIndicator>
        {timeToggle ? ':' : ' '}
      </SecondsIndicator>
      {date.getMinutes().toString().padStart(2, '0')}
    </StyledClock>
  );
};
