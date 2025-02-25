"use server";

import { PeriodConstants } from "@/util/Constants";
import getCookies from "../server/cookies/getCookies";

export const infiniteFindAll = async ({ pageParam }, period) => {
  
  let days = 0;

  // Solução temporária, não está padronizado como feito para os gráficos
  if(period == PeriodConstants.ONE_MONTH)
    days = 31
  else if(period == PeriodConstants.ONE_WEEK)
    days = 7
  
  const oneMonth = days * 24 * 60 * 60;
  const now = Math.floor(Date.now() / 1000);

  const endingDate = now - pageParam * oneMonth;
  const startingDate = endingDate - oneMonth;

  // função que se repete em cada serviço
  const transactions = await findAll({
    onlyInclude: null,
    startingDate,
    endingDate,
  });

  const hasMore = transactions.length > 0;

  return {
    data: transactions,
    currentPage: pageParam,
    nextPage: hasMore ? pageParam + 1 : null, 
  };
};

interface Params {
  onlyInclude: string | null;
  startingDate: string | number | null;
  endingDate: string | number | null;
}

export const findAll = async (params: Params) => {
  try {
    const token = await getCookies();
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        authorization: `Bearer ${token}`,
      },
    };
    
    const url = new URL("https://api.oinkos.samnsc.com/transaction");

    if (params.onlyInclude)
      url.searchParams.append("onlyInclude", params.onlyInclude.toString());

    if (params.startingDate)
      url.searchParams.append("startingDate", params.startingDate.toString());

    if (params.endingDate)
      url.searchParams.append("endingDate", params.endingDate.toString());

    const response = await fetch(url.href, options);
    const { transactions } = await response.json();

    console.log(transactions)

    return transactions || null;

  } catch (err) {
    console.error("Erro ao buscar lista de transações:", err);
  }
};

export const getCategories = async () => {
  try {
    const token = await getCookies();
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        authorization: `Bearer ${token}`,
      },
    };
    
    const url = new URL("https://api.oinkos.samnsc.com/category");
    const response = await fetch(url.href, options);
    const { categories } = await response.json();

    console.log(categories)

    return categories || null;

  } catch (err) {
    console.error("Erro ao buscar lista de transações:", err);
  }
}