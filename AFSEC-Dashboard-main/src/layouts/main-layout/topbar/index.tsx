import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Toolbar from '@mui/material/Toolbar';
import ButtonBase from '@mui/material/ButtonBase';
import IconButton from '@mui/material/IconButton';
import IconifyIcon from 'components/base/IconifyIcon';
import Image from 'components/base/Image';
import LogoImg from 'assets/images/Logo.png';
import ProfileMenu from './ProfileMenu';

interface TopbarProps {
  isClosing: boolean;
  mobileOpen: boolean;
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Topbar = ({ isClosing, mobileOpen, setMobileOpen }: TopbarProps) => {
  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  return (
    <Stack alignItems="center" justifyContent="space-between" mb={{ xs: 0, lg: 1 }}>
      <Stack spacing={2} alignItems="center">
        <Toolbar sx={{ display: { xm: 'block', lg: 'none' } }}>
          <IconButton
            size="medium"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
          >
            <IconifyIcon icon="mingcute:menu-line" />
          </IconButton>
        </Toolbar>

        <ButtonBase
          component={Link}
          href="/"
          disableRipple
          sx={{ display: { xm: 'block', lg: 'none' } }}
        >
          <Image src={LogoImg} alt="logo" height={30} width={100} />
        </ButtonBase>

      </Stack>

      <Stack spacing={1} alignItems="center">
        <Tooltip title="Notifications">
          <IconButton size="large" sx={{ color: 'text.secondary' }}>
            <IconifyIcon icon="ion:notifications" />
          </IconButton>
        </Tooltip>

        <ProfileMenu />
      </Stack>
    </Stack>
  );
};

export default Topbar;
