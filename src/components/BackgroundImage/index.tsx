import { styled } from '../../../stitches.config';
import bgNight from '../../assets/bg-night.png';
import bgDay from '../../assets/bg-day.jpg';

type BackgroundImageProps = {
  type: 'day' | 'night',
}

export const BackgroundImage = ({
  type,
}: BackgroundImageProps) => {
  const BgImage = styled('img', {
    objectFit: 'cover',
    backgroundPosition: 'center',

    height: '100vh',
    width: '100%',

    position: 'fixed',
    zIndex: '-1',
  });

  return (
    <BgImage
      src={type === 'day' ? bgDay : bgNight}
    />
  );
};
