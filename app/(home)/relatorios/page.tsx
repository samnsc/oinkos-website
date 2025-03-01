"use client";

import BarChart from "@/components/bar_chart/bar";
import LineChart from "@/components/line_chart/line";
import PieChart from "@/components/pie_chart/pie";
import { useTransactionReport } from "@/hooks/useTransactionReport";
import { PeriodConstants } from "@/util/Constants";

export default function Relatorios() {
  const {
    incrementPage,
    decrementPage,
    setInitialData,
    setPeriod,
    pieChartData,
    lineChartData,
    barChartData,
    startingDate,
    endingDate,
  } = useTransactionReport();

  return (
    <div className="w-full min-h-screen  flex flex-col bg-white rounded-xl p-2">
      <div className="mb-4">
        <input
          type="date"
          onChange={({ target }) =>
            setInitialData(new Date(target?.value + "T10:00:00.000Z"))
          }
          className="w-full p-2 border rounded-xl bg-white text-gray-800 focus:outline-none "
        />
        <div className="mb-4 text-gray-700">
          <label
            className="block text-gray-700 text-sm font-bold mb-1"
            htmlFor="format"
          >
            Período
          </label>
          <select
            id="paymentType"
            className="w-full p-2 border rounded-xl bg-white text-gray-800 focus:outline-none "
            onClick={(event: React.MouseEvent<HTMLSelectElement>) =>
              setPeriod(Number(event.currentTarget.value))
            }
          >
            <option value={PeriodConstants.ONE_MONTH}>Um mês</option>
            <option value={PeriodConstants.ONE_WEEK}>Uma semana</option>
            <option value={PeriodConstants.THREE_MONTHS}>Três meses</option>
          </select>

          <div className="flex items-center gap-10 mt-2 mb-2">
            <button
              onClick={decrementPage}
              className="bg-gray-50 border-2 border-solid border-slate-500 rounded-md px-2"
            >
              AVANÇAR
            </button>
            <button
              onClick={incrementPage}
              className="bg-gray-50 border-2 border-solid border-slate-500 rounded-md px-2"
            >
              VOLTAR
            </button>
          </div>
          <div>
            De {new Date(startingDate)?.toLocaleDateString()} até{" "}
            {new Date(endingDate)?.toLocaleDateString()}
          </div>
        </div>
      </div>
      {pieChartData?.datasets[0].data.length ? (
        <>
          <section className="my-2">
            <h3 className="text-gray-900 text-xl ">Gastos por Categorias</h3>
            <div className="flex justify-end w-full max-h-[480px]">
              <PieChart data={pieChartData} />
            </div>
          </section>
          <section className="my-2">
            <h3 className="text-gray-900 text-xl ">Gasto Total</h3>
            <div className="w-full ">
              <LineChart data={lineChartData ?? { datasets: [] }} />
            </div>
          </section>
          <section className="my-2">
            <h3 className="text-gray-900 text-xl ">
              Gastos Fixos e Gastos Variáveis
            </h3>
            <div className="w-full">
              <BarChart data={barChartData ?? { datasets: [] }} />
            </div>
          </section>
        </>
      ) : (
        <h3 className="text-red-800 w-full">
          Você ainda não tem gastos no período mencionado!
        </h3>
      )}
    </div>
  );
}
