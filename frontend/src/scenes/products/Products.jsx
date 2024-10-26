import React, { useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  Rating,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Header from "components/Header";
import { useGetProductsQuery } from "state/api";

const Products = () => {
  const { data, isLoading} = useGetProductsQuery();
//   console.log({ data, isLoading, isError });
  const isNonMobile = useMediaQuery("(min-width: 1000px)");

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const ProductCard = ({ product }) => {
    return (
      <Card>
        <CardContent>
          <Typography variant="h5" component="div">
            {product.category}
          </Typography>
          <Typography variant="h6" component="div">
            {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Price: ${product.price}
          </Typography>
          <Rating value={product.rating} readOnly />
          <Typography variant="body2" color="text.secondary">
            {product.description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Button
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            {expanded ? "Show less" : "Show more"}
          </Button>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Product ID: {product.stat.productId}</Typography>
            <Typography paragraph>Supply: {product.supply}</Typography>
            <Typography paragraph>Yearly Sale: {product.stat.yearlySalesTotal}</Typography>
            <Typography paragraph>Yearly Unit Sold: {product.stat.yearlyTotalSoldUnits}</Typography>
          </CardContent>
        </Collapse>
      </Card>
    );
  };

  return (
    <Box padding="0.5rem 1rem">
      <Header title="Products" subtitle="See you list of products.." />
      {data || !isLoading ? (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          justifyContent="space-between"
          gap="20px"
          sx={{
            "& > div": {
              gridColumn: isNonMobile ? undefined : "span 4",
            },
          }}
        >
          {data.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Box>
      ) : (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <Typography variant="h1" style={{ fontWeight: 'bold', fontSize: '2rem' }}>Loading...</Typography>
        </Box>
      )}
    </Box>
  );
};

export default Products;
