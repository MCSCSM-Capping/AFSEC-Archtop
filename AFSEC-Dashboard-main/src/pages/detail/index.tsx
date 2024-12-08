import Grid from '@mui/material/Grid';
import TopCards from 'components/sections/dashboard/top-cards';
import CVEsTable from 'components/sections/dashboard/cve-table';

const Detail = () => {
  return (
    <Grid container spacing={{ xs: 2.5, sm: 3, lg: 3.75 }}>
      <Grid item xs={12}>
        <TopCards />
      </Grid>

      <Grid item xs={12}>
        <CVEsTable />
      </Grid>
    </Grid>
  );
};

export default Detail;
