import { styled } from '../../../../stitches.config';

type ClockProps = {
  date: Date,
  timeToggle: boolean,
}

export const Clock = ({
  date,
  timeToggle,
}: ClockProps) => {
  const StyledClock = styled('h1', {
    display: 'flex',
    marginBottom: '16px',
  });

  return (
    <StyledClock>
      {date.getHours().toString().padStart(2, '0')}
        <span
          style={{ width: '40px' }}
        >
          {timeToggle ? ':' : ' '}
        </span>
      {date.getMinutes().toString().padStart(2, '0')}
    </StyledClock>
  );
};
