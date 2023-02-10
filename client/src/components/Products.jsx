import { useEffect, useState } from "react";
import styled from "styled-components";
import { popularProducts } from "../data";
import Product from "./Product";
import axios from 'axios'
import { apiUrl } from '../constant'

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Products = ({ category, filters, sort }) => {
  const [products, setProducts] = useState([])
  const [filteredproducts, setFilteredProducts] = useState([])

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get(category ? `${apiUrl}/products?category=${category}` : `${apiUrl}/products`)
        setProducts(response.data)
      } catch (e) { }
    }
    getProducts()
  }, [category])

  useEffect(() => {
    category &&
      setFilteredProducts(products.filter(item =>
        Object.entries(filters).every(([key, value]) =>
          item[key].includes(value)
        )
      ))
  }, [category, products, filters])

  useEffect(() => {
    if (sort === 'newest') {
      setFilteredProducts(prev => [...prev].sort((a, b) => a.createdAt - b.createdAt))
    } else if (sort === 'asc') {
      setFilteredProducts(prev => [...prev].sort((a, b) => a.price - b.price))
    } else {
      setFilteredProducts(prev => [...prev].sort((a, b) => b.price - a.price))
    }
  }, [sort])

  return (
    <Container>
      {(category ? filteredproducts : products).map((item) => (
        <Product item={item} key={item.id} />
      ))}
    </Container>
  );
};

export default Products;
