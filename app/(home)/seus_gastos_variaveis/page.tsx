"use client";

import { FormValues, formSchemaCreateUniqueTransaction } from "@/schemas/formSchemaCreateUniqueTransaction";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil, Trash } from "lucide-react";
import React, { useState, ReactChildren } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { createNewUniqueTransaction } from "@/server/services/UniqueTransactionService";

interface ModalProps {
  children: ReactChildren;
  onClose: VoidFunction;
  title: string;
}

interface FormProps {
  onSubmit: SubmitHandler<FormValues>;
}

export default function SeusGastosVariaveis() {
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);

  const openModalDelete = () => setIsModalDeleteOpen(true);
  const closeModalDelete = () => setIsModalDeleteOpen(false);

  const openModalAdd = () => setIsModalAddOpen(true);
  const closeModalAdd = () => setIsModalAddOpen(false);

  const openModalEdit = () => setIsModalEditOpen(true);
  const closeModalEdit = () => setIsModalEditOpen(false);

  const movements = [
    {
      date: "22/01/2025",
      value: "R$ 140,00",
      description: "Compra de um vestido",
      format: "pix",
      type: "variável",
      category: "Mercado",
      duration: "Mensal",
    },
    {
      date: "23/01/2025",
      value: "R$ 140,00",
      description: "Compra de um vestido",
      format: "pix",
      type: "fixo",
      category: "Mercado",
      duration: "Mensal",
    },
    {
      date: "24/01/2025",
      value: "R$ 140,00",
      description: "Compra de um vestido",
      format: "pix",
      type: "variável",
      category: "Mercado",
      duration: "Mensal",
    },
  ];

  const [, setIsSubmitSuccessful] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchemaCreateUniqueTransaction),
    defaultValues: {
      description: "",
      value: "",
      paymentType: undefined,
      category: "",
      transactionDate: undefined,
    },
  });


  const Modal = ({ children, onClose, title }: ModalProps) => (
    <div className="fixed inset-0 rounded-lg bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg w-[500px] relative">
        <div className="flex bg-variable_outgoing rounded-b-none rounded-lg lg p-3 justify-between items-center border-b pb-3">
          <h2 className="text-lg text-center w-full text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-900 text-3xl hover:text-gray-700"
          >
            &times;
          </button>
        </div>
        {children}
      </div>
    </div>
  );

  const Form = ({ onSubmit }: FormProps) => (
    <form className="p-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-1"
          htmlFor="value"
        >
          Valor
        </label>
        <input
          id="value"
          {...register("value")}
          className="w-full p-2 border rounded-xl text-black focus:outline-none"
        />
        <label className="text-red-500 mb-3 text-md">
          {errors.value?.message}
        </label>
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-1"
          htmlFor="description"
        >
          Descrição
        </label>
        <input
          id="description"
          {...register("description")}
          className="w-full p-2 border rounded-xl text-black focus:outline-none"
        />
        <label className="text-red-500 mb-3 text-md">
          {errors.description?.message}
        </label>
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-1"
          htmlFor="format"
        >
          Formato
        </label>
        <select
          id="paymentType"
          className="w-full p-2 border rounded-xl bg-white text-gray-800 focus:outline-none "
          {...register("paymentType")}
        >
          <option value="">Selecione um campo</option>
          <option value="directTransfer">Pix</option>
          <option value="cash">Dinheiro</option>
          <option value="creditCard">Crédito</option>
          <option value="debitCard">Débito</option>
        </select>
        <label className="text-red-500 mb-3 text-md">
          {errors.paymentType?.message}
        </label>
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-1"
          htmlFor="category"
        >
          Categoria
        </label>
        <select
          id="category"
          className="w-full p-2 border rounded-xl bg-white text-gray-800 focus:outline-none "
          {...register("category")}
        >
          <option value="">Selecione um campo</option>
          <option value="Academia">Academia</option>
          <option value="Aluguel">Aluguel</option>
          <option value="Roupas">Roupas</option>
          <option value="Farmácia">Farmácia</option>
          <option value="Mercado">Mercado</option>
          <option value="Outros">Outros</option>
        </select>
        <label className="text-red-500 mb-3 text-md">
          {errors.category?.message}
        </label>
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-1"
          htmlFor="data-gasto-fixo"
        >
          Selecione a data:
        </label>
        <input
          className="w-full p-2 border rounded-xl bg-white text-gray-800 focus:outline-none"
          type="date"
          {...register("transactionDate")}
        ></input>
        <label className="text-red-500 mb-3 text-md">
          {errors.transactionDate?.message}
        </label>
      </div>
      <div className="w-full mt-2 flex justify-center">
        <button
          type="submit"
          className="bg-[#73B48C] text-black py-2 px-6 rounded-xl hover:bg-[#6dac85]"
        >
          Criar
        </button>
      </div>
    </form>
  );

  return (
    <div className="min-h-screen bg-[#E5E7E5] md:pt-8 w-full overflow-hidden">
      <div className="mb-4 flex flex-col md:flex-row justify-between items-center">
        <h1 className="text-3xl text-black mb-6">Seus Gastos Variáveis</h1>
        <button
          onClick={openModalAdd}
          className="bg-[#B6C8C6] text-black px-6 py-2 rounded-xl hover:bg-[#a3b6b4]"
        >
          Adicionar
        </button>
      </div>

      {movements && movements.length > 0 ? (
        <div>
          <div className="overflow-x-auto bg-white rounded-xl mt-6">
            <table className="w-full border-collapse">
              <thead className="bg-variable_outgoing">
                <tr>
                  <th className="text-black text-md p-4">Valor</th>
                  <th className="text-black text-md p-4">Descrição</th>
                  <th className="text-black text-md p-4">Formato</th>
                  <th className="text-black text-md p-4">Categoria</th>
                  <th className="text-black text-md p-4">Data</th>
                  <th className="text-black text-md p-4"></th>
                </tr>
              </thead>
              <tbody>
                {movements.map((movement, index) => (
                  <tr
                    key={index}
                    className="bg-white shadow-sm rounded-md hover:bg-[#D9D9D9]/25 border-b last:border-b-0 text-center"
                  >
                    <td className="text-gray-800 font-bold p-4">
                      {movement.value}
                    </td>
                    <td className="text-gray-600 p-4">
                      {movement.description}
                    </td>
                    <td className="p-4">
                      <span className="bg-gray-200 text-gray-800 py-1 px-3 rounded-full text-sm">
                        {movement.format}
                      </span>
                    </td>
                    <td className="text-gray-600 p-4">{movement.category}</td>

                    <td className="text-gray-600 p-4">{movement.date}</td>
                    <td className="text-gray-600 p-4 flex gap-2 items-center justify-center">
                      <div
                        onClick={openModalDelete}
                        className="p-2 bg-[#D9D9D9] rounded-full cursor-pointer"
                      >
                        <Trash size={18} className=" text-black" />
                      </div>
                      <div
                        onClick={openModalEdit}
                        className="p-2 bg-[#D9D9D9] rounded-full cursor-pointer"
                      >
                        <Pencil size={18} className=" text-black" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="flex bg-white rounded-lg items-center justify-center w-full h-screen">
          <h1 className="text-2xl text-black">
            Você ainda não possui nenhum gasto variável!
          </h1>
        </div>
      )}

      {/* Modal adicionar */}
      {isModalAddOpen && (
        <Modal title="Adicionar Novo Gasto" onClose={closeModalAdd}>
          <Form
            onSubmit={(data) => {
              setIsSubmitSuccessful(false);
              createNewUniqueTransaction(data);
              //reset();
              setIsModalAddOpen(false);
            }}
          />
        </Modal>
      )}

      {/* Modal editar */}
      {isModalEditOpen && (
        <Modal title="Editar Gasto" onClose={closeModalEdit}>
          <Form
            onSubmit={(data) => {
              setIsSubmitSuccessful(true);
              //createNewRecurringTransaction(data);
              //reset();
              setIsModalAddOpen(false);
            }}
          />
        </Modal>
      )}

      {/* Modal delete */}
      {isModalDeleteOpen && (
        <Modal title="Excluir Gasto" onClose={closeModalDelete}>
          <p className="mt-2 text-gray-600 p-5">
            Deseja excluir esse gasto? Essa ação é irrevertível!
          </p>
          <div className="w-full mt-2 flex justify-center">
            <button className="bg-[#73B48C]/90 mb-5 text-black py-2 px-6 rounded-xl hover:bg-[#6dac85]/95 transition">
              Excluir
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
