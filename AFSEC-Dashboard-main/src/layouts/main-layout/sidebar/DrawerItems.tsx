import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import ButtonBase from '@mui/material/ButtonBase';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Image from 'components/base/Image';
import IconifyIcon from 'components/base/IconifyIcon';
import CollapseListItem from './list-items/CollapseListItem';
import ProfileListItem from './list-items/ProfileListItem';
import ListItem from './list-items/ListItem';
import LogoImg from 'assets/images/Logo.png';
import { topListData, bottomListData, profileListData } from 'data/sidebarListData';

const DrawerItems = () => {
  return (
    <>
      <Stack
        pt={5}
        pb={4}
        px={3.5}
        position={'sticky'}
        top={0}
        bgcolor="info.darker"
        alignItems="center"
        justifyContent="flex-start"
        zIndex={1000}
      >
        <ButtonBase component={Link} href="/" disableRipple>
          <Image src={LogoImg} alt="logo" height={60} width={200} sx={{ mr: 1 }} />
        </ButtonBase>
      </Stack>

      <Box px={3.5} pb={3} pt={1}>
        <TextField
          variant="filled"
          placeholder="Search for..."
          sx={{ width: 1 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconifyIcon icon={'mingcute:search-line'} />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <List component="nav" sx={{ px: 2.5 }}>
        {topListData.map((route, index) => {
          return <ListItem key={index} {...route} />;
        })}
      </List>

      <Divider />

      <List component="nav" sx={{ px: 2.5 }}>
        {bottomListData.map((route) => {
          if (route.items) {
            return <CollapseListItem key={route.id} {...route} />;
          }
          return <ListItem key={route.id} {...route} />;
        })}
      </List>

      <List component="nav" sx={{ px: 2.5 }}>
        {profileListData && <ProfileListItem {...profileListData} />}
      </List>
    </>
  );
};

export default DrawerItems;
