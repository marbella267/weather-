let ctx = document.getElementById("myChart");
let canvasContainer = document.querySelector(".can-con");
// building the structure(elements) above the chart

let temp_info = document.getElementById("temp-info");
const build_info = (length = 23) => {
  let fragment = document.createDocumentFragment();
  temp_info.style.marginLeft = ".5rem";
  temp_info.style.display = "grid";
  temp_info.style.gridTemplateColumns = `repeat(${length}, auto)`;

  for (let i = 0; i < length; i++) {
    let div = document.createElement("div");
    div.setAttribute("class", "tempIconCon");
    div.style.width = `${939 / 9 - 14}px`;
    div.style.fontWeight = "bold";

    let p = document.createElement("p");
    p.setAttribute("class", "info-temp");

    let img = document.createElement("img");
    img.setAttribute("class", "frocastTempIcon");

    div.appendChild(p);
    div.appendChild(img);

    if (i == length - 1) {
      div.style.width = "auto";
    }

    fragment.appendChild(div);
  }
  temp_info.appendChild(fragment);
};

build_info();

let paragraphTemps = document.querySelectorAll(".info-temp");
let iconsElement = document.querySelectorAll(".frocastTempIcon");

// felling the graph with data
const addDataToGraph = (temps, icons) => {
  for (let i = 0; i < temps.length; i++) {
    paragraphTemps[i].innerHTML = temps[i] + "°";
    iconsElement[i].setAttribute("src", `https:${icons[i]}`);
  }
  document.querySelector(".can-con").style.width = `${temp_info.clientWidth}`;
};

// building the chart
var config = {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        data: [],
        borderWidth: 1,
        borderColor: ["#abc7f1 "],
        fill: true,
        backgroundColor: " rgba(175, 173, 173, 0.413)",
      },
    ],
  },
  options: {
    elements: {
      point: {
        radius: 0,
      },
    },

    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        display: false,
        grid: { drawOnChartArea: false },
        stacked: true,
      },
      x: {
        grid: {
          drawOnChartArea: false,
        },

        stacked: true,
        ticks: {
          stepSize: 1,
        },
      },
    },

    plugins: {
      legend: {
        display: false,
      },
    },
  },
  plugins: [
    {
      afterDraw: function (chart) {
        const ctx = chart.ctx;
        const xAxis = chart.scales.x;
        // Draw vertical line at x-axis value 4

        for (let i = 0; i < config.data.labels.length; i++) {
          var xValue = xAxis.getPixelForValue(i);
          ctx.save();
          ctx.strokeStyle = "black";
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(xValue, 0);
          ctx.lineTo(xValue, chart.height - 30);
          ctx.stroke();
          ctx.restore();
        }
      },
    },
  ],
};

const myChart = new Chart(ctx, config);

function build_chart(temps, hours) {
  config.data.labels = hours;
  config.data.datasets[0].data = temps;
  myChart.update();
}
