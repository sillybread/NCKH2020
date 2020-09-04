var ctx = document.getElementById("myChart").getContext("2d");
var myChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: ["19:02", "19:03", "19:04", "19:05", "19:06", "19:07"],
    datasets: [
      {
        label: "Celsius",
        data: [30, 30.01, 30, 29.99, 30, 30],
        borderWidth: 1,
        borderColor: "rgba(255, 193, 7, 1)",
      },
    ],
  },
  options: {
    scales: {
      yAxes: [
        {
          ticks: {
            stepSize: 1,
          },
        },
      ],
    },
  },
});
