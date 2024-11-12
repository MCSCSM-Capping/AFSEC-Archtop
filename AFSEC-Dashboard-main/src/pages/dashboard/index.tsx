import Grid from '@mui/material/Grid';
import TotalCVEs from 'components/sections/dashboard/TotalCVEChart';
import RevenueByCustomer from 'components/sections/dashboard/revenue-by-customer';
import Products from 'components/sections/dashboard/products';
import CompletedTask from 'components/sections/dashboard/completed-task';

const Dashboard = () => {
  return (
    <Grid container spacing={{ xs: 2.5, sm: 3, lg: 3.75 }}>

      <Grid item xs={12} xl={4}>
        <TotalCVEs />
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
