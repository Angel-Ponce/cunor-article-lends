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

export { roseChart };
