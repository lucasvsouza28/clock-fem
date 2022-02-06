import { HTMLAttributes, ReactNode } from "react";
import { styled } from "../../../../stitches.config";
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';

type ButtonProps = {
  children: ReactNode;
  open: boolean;
} & HTMLAttributes<HTMLElement>

export const Button = ({
  children,
  open,
  ...props
}: ButtonProps) => {
  const StyledButton = styled('button', {
    cursor: 'pointer',

    display: "flex",
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '15px',

    height: '40px',

    textTransform: 'uppercase',

    border: 'none',
    outline: 'none',
    borderRadius: '28px',

    paddingLeft: '28px',
    paddingRight: '4px',

    backgroundColor: '#FFF',

    fontWeight: 'bold',
    fontSize: '12px',
    lineHeight: '14px',
    letterSpacing: '3.75px',
    color: '#000',

    '&:hover > i': {
      backgroundColor: '#999999',
    },

    '&:active': {
      transform: 'scale(.97)'
    }
  })

  const SvgContainer = styled('i', {
    display: 'grid',
    placeItems: 'center',

    width: '32px',
    height: '32px',

    borderRadius: '50%',
    backgroundColor: '#303030',
  });

  return (
    <StyledButton
      {...props}
    >
      {children}
      <SvgContainer>
        { open ? <BsChevronDown size={16} color='#FFF' /> : <BsChevronUp size={16} color='#FFF' /> }

      </SvgContainer>
    </StyledButton>
  );
};
