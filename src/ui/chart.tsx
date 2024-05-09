"use client";
import React, { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { Chart, LinearScale, CategoryScale, LineElement, Tooltip, Legend, PointElement } from 'chart.js';
import { Line } from 'react-chartjs-2';

import { db } from '@/lib/database';
import { ChartData, InvestmentData } from '@/lib/types';

Chart.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);


const InvestmentEvolutionChart: React.FC = () => {
  const [data, setData] = useState<ChartData>({
    labels: [],
    datasets: []
  });

  const prepareData = (data: Array<InvestmentData>) => {
      const labels = data.map(item => new Date(item.date.seconds * 1000).toLocaleDateString());
      const dataset1 =
        {
          label: 'Valor de la cartera',
          data: data.map(item => item.portfolioValue),
          fill: false,
          backgroundColor: 'rgb(255, 99, 132)', // color rojo
          borderColor: 'rgba(255, 99, 132, 0.2)',
        };
      const dataset2 =
        {
          label: 'Contribuciones',
          data: data.map(item => item.contributions),
          fill: false,
          backgroundColor: 'rgb(75, 192, 192)', // color verde
          borderColor: 'rgba(75, 192, 192, 0.2)',
        };
    return { labels, datasets: [dataset1, dataset2]};
  }


  useEffect(() => {
    const docRef = doc(db, 'investmentEvolutions', 'user1');
    const unsubscribe = onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        const rawData = doc.data()["array"];
        const processedData = prepareData(rawData);
        setData(processedData);
      } else {
        console.log("No such document!");
      }
    });
    return () => unsubscribe();
  }, []);

  

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Fecha'
        },
      },
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <>
      <h1 className="text-4xl font-bold">Gráfico evolución de inversión</h1>
      <Line data={data} options={options} />
    </>
  )
};

export default InvestmentEvolutionChart;