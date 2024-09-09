import { fontFamily } from 'theme/typography';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import critical from 'assets/images/critical.png';
import high from 'assets/images/high.png';
import Product from './Product';

const productsData = [
  {
    id: 1,
    name: 'CVE-2020-1938',
    imageUrl: critical,
    inStock: 'Apache Tomcat Privilege Management Vulnerability',
    price: '9.8',
  },
  {
    id: 2,
    name: 'CVE-2024-37085',
    imageUrl: high,
    inStock: 'VMware ESXi Authentication Bypass Vulnerability',
    price: '7.2',
  },
];

const Products = () => {
  return (
    <Stack direction="column" gap={3.75} component={Paper} height={300}>
      <Typography variant="h6" fontWeight={400} fontFamily={fontFamily.workSans}>
        Top CVEs
      </Typography>

      <Stack justifyContent="space-between">
        <Typography variant="caption" fontWeight={400}>
          CVE
        </Typography>
        <Typography variant="caption" fontWeight={400}>
          Severity
        </Typography>
      </Stack>

      {productsData.map((item) => {
        return <Product key={item.id} data={item} />;
      })}
    </Stack>
  );
};

export default Products;
