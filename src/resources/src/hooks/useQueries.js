import { useState } from "react";
import { GetQueries, RemoveItem } from "../services/FormQueries";

export const useQueries = () => {
  const [dataQueries, SetDataQueries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const GetDataQueries = async (
    page = currentPage,
    pageSize = itemsPerPage
  ) => {
    setLoading(true);
    const queries = await GetQueries(page, pageSize);
    if (queries.length === 0) return;
    const { items, pagination } = queries.data;
    SetDataQueries(items);
    setTotalPages(pagination.pageCount || 1);
    setLoading(false);
    return;
  };

  return {
    GetDataQueries,
    currentPage,
    setCurrentPage,
    dataQueries,
    itemsPerPage,
    setItemsPerPage,
    totalPages,
    loading,
  };
};

export const useDeleteQuery = () => {
  const DeleteItem = async (uuid) => {
    const response = await RemoveItem({
      uuid,
    });
    return response.data || [];
  };
  return {
    DeleteItem,
  };
};
