import { IconButton, Tooltip } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { styled, keyframes } from '@mui/system';

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
`;

const wiggle = keyframes`
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(-5deg); }
  75% { transform: rotate(5deg); }
`;

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const FloatingIcon = styled(IconButton)(({ theme }) => ({
  position: 'fixed',
  bottom: 20,
  left: 20,
  zIndex: 1300,
  width: 60,
  height: 60,
  borderRadius: '50%',
  color: '#fff',
  background: 'linear-gradient(#b36a6e, #a6312f, #ff9a9e, #ffa3a3)',
  backgroundSize: '200% 200%',
  animation: `${gradientShift} 5s ease infinite, ${bounce} 1.5s infinite, ${wiggle} 4s infinite`,
  boxShadow: '0px 4px 15px rgba(0,0,0,0.3)',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    background: '#a6312f',
    transform: 'scale(1.1)',
  },
}));

export default function LoveUsFancyButton({ onClick }) {
  return (
    <Tooltip title=":) אהבתם? ספרו לנו" placement="top">
      <FloatingIcon onClick={onClick}>
        <FavoriteIcon fontSize="medium" />
      </FloatingIcon>
    </Tooltip>
  );
}
