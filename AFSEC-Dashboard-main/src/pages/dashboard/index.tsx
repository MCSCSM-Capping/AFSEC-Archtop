import Grid from '@mui/material/Grid';
import WebsiteVisitors from 'components/sections/dashboard/website-visitors';
import RevenueByCustomer from 'components/sections/dashboard/revenue-by-customer';
import Products from 'components/sections/dashboard/products';
import CompletedTask from 'components/sections/dashboard/completed-task';

const Dashboard = () => {
  return (
    <Grid container spacing={{ xs: 2.5, sm: 3, lg: 3.75 }}>

      <Grid item xs={12} xl={4}>
        <WebsiteVisitors />
      </Grid>

      <Grid item xs={12} xl={8}>
        <RevenueByCustomer />
      </Grid>

      <Grid item xs={12} xl={4}>
        <Products />
      </Grid>

      <Grid item xs={12} xl={8}>
        <CompletedTask />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
