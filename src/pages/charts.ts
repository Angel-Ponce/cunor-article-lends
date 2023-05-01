const roseChart = (data: any[]) => {
  return {
    title: {
      text: "Actividad de prestamos",
      right: "center",
    },
    legend: {
      top: "bottom",
    },
    tooltip: {
      trigger: "item",
    },
    toolbox: {
      show: true,
      feature: {
        saveAsImage: { show: true, title: "Guardar imagen" },
      },
    },
    series: {
      name: "Prestamos",
      type: "pie",
      radius: [10, 100],
      data,
    },
  };
};

const barChart = (data: any[], labels: string[], title: string) => {
  return {
    title: {
      text: title,
      right: "center",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    xAxis: {
      type: "category",
      data: labels,
    },

    yAxis: {
      type: "value",
    },

    series: {
      name: "Usuarios",
      type: "bar",
      data,
      itemStyle: {
        color: "#349DFE",
      },
    },
  };
};

export { roseChart, barChart };
