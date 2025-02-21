import getCookies from "../cookies/getCookies";
import { FormValues } from "@/schemas/formSchemaCreateUniqueTransaction";

interface RequestBody {
  transactionType: "recurring" | "unique";
  title: string;
  value: number;
  paymentType: "directTransfer" | "cash" | "creditCard" | "debitCard";
  category: string;
  transactionDate: string;
}

export const findAll = async () => {
  try {

    const token = await getCookies();
    const options = {
      method: "GET",
      headers: {
        accept: 'application/json',
        authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        startingDate: "2025-02-17T03:00:00Z",
        endingDate: "2025-10-17T03:00:00Z",
      })
    };

    const response = await fetch(
      "https://api.oinkos.samnsc.com/transaction",
      options
    );

    console.log(response.status);
    return await response.json();

  } catch (err) {
    console.error("Erro ao buscar lista de transações variáveis:", err);
  }
};

export const createNewUniqueTransaction = async (data: FormValues) => {
  try {
    const token = await getCookies();
  
    const body: RequestBody = {
      transactionType: "unique",
      title: data.description,
      value: Number(data.value.replace(",", ".")),
      paymentType: data.paymentType,
      category: data.category,
      transactionDate: new Date(data.transactionDate).toISOString().replace(".000Z", "Z"),
    }

    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    };

    const response = await fetch(
      "https://api.oinkos.samnsc.com/transaction",
      options
    );

    console.log( response)

    return await response.json();

  } catch (err) {
    console.error("Erro ao criar novo gasto variável:", err);
  }
};