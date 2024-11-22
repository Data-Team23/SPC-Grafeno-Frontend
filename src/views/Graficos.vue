<template>
    <h1 style="margin-left: 500px; color: black;">Gráficos</h1>
    <div class="container">
        <bar-chart :chart-data="dataGraph" :options="chartOptions"></bar-chart>
    </div>
</template>

<script setup>

import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
    BarController,
    LineController,
    PointElement,
} from "chart.js";
import { BarChart } from "vue-chart-3";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement, 
  BarController,
  LineController
);

const dataGraph = {
  labels: ["Cluster 1", "Cluster 2", "Cluster 3", "Cluster 4"], // Eixo X
  datasets: [
    {
      label: "Recência (R)",
      data: [10, 20, 15, 25], // Valores de R para cada cluster
      backgroundColor: "#3B82F6",
      borderColor: "#2563EB",
      borderWidth: 1,
    },
    {
      label: "Frequência (F)",
      data: [12, 18, 22, 30], // Valores de F para cada cluster
      backgroundColor: "#10B981",
      borderColor: "#059669",
      borderWidth: 1,
    },
    {
      label: "Valor Monetário (M)",
      data: [8, 25, 20, 35], // Valores de M para cada cluster
      backgroundColor: "#F59E0B",
      borderColor: "#D97706",
      borderWidth: 1,
    },
  ],
};

const chartOptions = {
  responsive: true, // Gráfico responsivo
  maintainAspectRatio: false, // Permite altura personalizada
  scales: {
    x: {
      beginAtZero: true,
    },
    y: {
      beginAtZero: true,
    },
  },
  plugins: {
    legend: {
      display: true,
      position: "top",
    },
  },
};
</script>