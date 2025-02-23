import { useState } from "react";
import {
  createNewRecurringTransaction,
  editRecurringTransaction,
  infiniteFindAll,
} from "@/services/RecurringTransactionService";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  formSchemaCreateRecurringTransaction,
  FormValues,
} from "@/schemas/formSchemaCreateRecurringTransaction";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const useRecurringTransactions = () => {
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);

  const queryClient = useQueryClient();

  const {
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
    register,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchemaCreateRecurringTransaction),
    defaultValues: {
      title: "",
      value: "",
      paymentType: undefined,
      category: "",
      startingDate: "",
      endingDate: "",
    },
  });

  const openModalDelete = () => setIsModalDeleteOpen(true);
  const closeModalDelete = () => setIsModalDeleteOpen(false);

  const openModalAdd = () => {
    reset();
    setIsModalAddOpen(true);
  };
  const closeModalAdd = () => setIsModalAddOpen(false);

  const handleEdition = (data) => {
    setValue("title", data.title);
    setValue("value", data.value.toString().replace(".", ","));
    setValue("category", data.category);
    setValue("paymentType", data.paymentType);
    setValue("startingDate", data.transactionDate.split("T")[0]);
    setIsModalEditOpen(true);
  };

  const closeModalEdit = () => setIsModalEditOpen(false);

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["recurringTransactions"],
    queryFn: infiniteFindAll,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  const createMutation = useMutation({
    mutationFn: createNewRecurringTransaction,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["recurringTransactions"] }),
  });

  const editMutation = useMutation({
    mutationFn: editRecurringTransaction,
    // TODO: aqui no delete eh so receber o objeto alterado e atualizar ele aq
    /* onSuccess: (data) => {
          queryClient.setQueryData(["recurringTransactions"], (cache: RecurringTransaction[] | undefined) => {
            
            let c = cache ? [...cache, data] : [data];
            console.log(c)
            return c;
          })
        } */
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["recurringTransactions"] }),
  });

  return {
    isModalDeleteOpen,
    isModalAddOpen,
    isModalEditOpen,
    openModalDelete,
    closeModalDelete,
    openModalAdd,
    closeModalAdd,
    handleEdition,
    closeModalEdit,
    data,
    fetchNextPage,
    hasNextPage,
    createMutation,
    editMutation,
    handleSubmit,
    setValue,
    reset,
    errors,
    register,
  };
};
