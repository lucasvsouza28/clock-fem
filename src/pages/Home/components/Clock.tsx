import { useEffect, useState } from 'react';
import { styled } from '../../../../stitches.config';

type ClockProps = {
  date: Date,
}

export const Clock = ({
  date,
}: ClockProps) => {
  const StyledClock = styled('h1', {
    display: 'flex',
    marginBottom: '16px',
  });

  const [timeToggle, setTimeToggle] = useState(false);

  useEffect(() => {
    let timeoutId: number;
    const interval = setInterval(() => {

      setTimeToggle(true);

      timeoutId = setTimeout(() => {
        setTimeToggle(false);
      }, 100);

    }, 1000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <StyledClock>
      {date.getHours().toString().padStart(2, '0')}
        <span
          style={{
            minWidth: '30px',
          }}
        >
          {timeToggle ? ':' : ' '}
        </span>
      {date.getMinutes().toString().padStart(2, '0')}
    </StyledClock>
  );
};
