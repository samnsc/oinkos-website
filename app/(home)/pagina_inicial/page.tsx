"use client";

import Card from "@/components/pagina_inicial/cards/card";
import TransactionCard from "@/components/pagina_inicial/cards/transactionCard";
import PieChart from "@/components/pie_chart/pie";
import { useRecurringTransactions } from "@/hooks/useRecurringTransactions";
import { useTransactionReport } from "@/hooks/useTransactionReport";
import getUser from "@/server/getUser/getUser";
import { RecurringTransaction } from "@/types/Transactions";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

interface User {
  id: number;
  name: string;
  email: string;
  salary: number;
}

export default function PaginaInicial() {
  const { pieChartData, totalSum } = useTransactionReport();
  const { nextRecurringTransactions } = useRecurringTransactions();

  const { data: user }: UseQueryResult<User, Error> = useQuery({
    queryKey: ["getUser"],
    queryFn: getUser,
  });

  return (
    <div className="w-full flex flex-col gap-10 justify-center">
      <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
        <Card text={"Saldo Atual"} value={user?.salary} />
        <Card text={"Gasto Total"} value={totalSum} />
        <Card
          text={"Economia Mensal"}
          value={user?.salary - totalSum > 0 ? user?.salary - totalSum : 0}
        />
      </div>

      <section className="w-full flex flex-col bg-white rounded-xl p-2 drop-shadow-lg">
        <h3 className="text-gray-900 text-xl font-bold ">
          Gastos por Categorias Nesse Mês
        </h3>
        <div className="flex justify-end w-full max-h-[480px]">
          <PieChart data={pieChartData} />
        </div>
      </section>

      <div className="text-gray-900">
        <h3 className="text-xl font-bold">Próximos Pagamentos</h3>
        <div className="text-xl grid grid-cols-3 gap-[15px]">
          {nextRecurringTransactions?.map(
            (transaction: RecurringTransaction, key: number) => (
              <TransactionCard
                key={key}
                category={transaction.category}
                date={new Date(
                  transaction.transactionDate
                ).toLocaleDateString()}
                value={transaction.value}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}
