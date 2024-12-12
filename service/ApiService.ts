import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const BASE_URL = "https://dummyjson.com";

const ApiService = {
  fetchProducts: async () => {
    const response = await axios.get(`${BASE_URL}/products`);
    return response.data.products;
  },

  fetchProductById: async (id: number) => {
    const response = await axios.get(`${BASE_URL}/products/${id}`);
    return response.data;
  },

  searchProducts: async (query: string) => {
    const response = await axios.get(`${BASE_URL}/products/search?q=${query}`);
    return response.data.products;
  },

  fetchCategoryList: async () => {
    const response = await axios.get(`${BASE_URL}/products/category-list`);
    return response.data;
  },

  fetchProductsByCategory: async (category: string) => {
    const response = await axios.get(`${BASE_URL}/products/category/${category}`);
    return response.data.products;
  },
};

// React Query hooks
export const useFetchProducts = () => {
  return useQuery({ queryKey: ["fetchProducts"], queryFn: ApiService.fetchProducts });
};

export const useFetchProductById = (id: number) => {
  return useQuery({
    queryKey: ["fetchProductById", id],
    queryFn: () => ApiService.fetchProductById(id),
    enabled: !!id, // Only fetch when id is provided
  });
};

export const useSearchProducts = (query: string) => {
  return useQuery({
    queryKey: ["searchProducts", query],
    queryFn: () => ApiService.searchProducts(query),
    enabled: query.length >= 3
  });
};

export const useFetchCategoryList = () => {
  return useQuery({ queryKey: ["fetchCategoryList"], queryFn: ApiService.fetchCategoryList });
};

export const useFetchProductsByCategory = (category: string) => {
  return useQuery({
    queryKey: ["fetchProductsByCategory", category],
    queryFn: () => ApiService.fetchProductsByCategory(category),
    enabled: !!category, // Only fetch when category is provided
  });
};

export default ApiService;