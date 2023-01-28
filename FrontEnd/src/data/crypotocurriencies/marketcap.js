import btc from "../../assets/img/svgs/crypto-currencies/btc.svg";
import eth from "../../assets/img/svgs/crypto-currencies/eth.svg";
import xrp from "../../assets/img/svgs/crypto-currencies/xrp.svg";
import ltc from "../../assets/img/svgs/crypto-currencies/ltc.svg";
import neo from "../../assets/img/svgs/crypto-currencies/neo.svg";
import xmr from "../../assets/img/svgs/crypto-currencies/xmr.svg";
import eos from "../../assets/img/svgs/crypto-currencies/eos.svg";
import steem from "../../assets/img/svgs/crypto-currencies/steem.svg";
import miota from "../../assets/img/svgs/crypto-currencies/miota.svg";
import dash from "../../assets/img/svgs/crypto-currencies/dash.svg";
import waves from "../../assets/img/svgs/crypto-currencies/waves.svg";

/* Chartjs (#btc-market) */
export const Marketcap1 = {
  responsive: true,
  // maintainAspectRatio: false,
  resize: true,
  plugins: {
    legend: {
      position: "top",
      display: false,
    },

    title: {
      display: false,
      text: "Chart.js Line Chart",
    },
  },
  scales: {
    x: {
      display: false,
      title: {
        display: true,
      },
    },
    y: {
      display: false,
      title: {
        display: true,
        text: "Value",
      },
    },
  },
};

export const marketcap1 = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  type: "line",
  datasets: [
    {
      data: [85, 75, 96, 84, 85, 92, 79, 78, 74, 85, 86, 80],
      label: "Ethereum Price",
      backgroundColor: "rgba(98, 89, 202, 0.2)",
      borderColor: "#6259ca",
      borderWidth: "2",
      pointBorderColor: "transparent",
      pointBackgroundColor: "transparent",
      tension: 0.4,
      fill: true,
    },
  ],
  options: {
    responsive: true,
    maintainAspectRatio:true,
    tooltips: {
      mode: "index",
      intersect: false,
    },
    hover: {
      mode: "nearest",
      intersect: true,
    },
    scales: {
      xAxes: [
        {
          ticks: {
            fontColor: "#77778e",
          },
          gridLines: {
            color: "rgba(119, 119, 142, 0.2)",
          },
        },
      ],

      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            fontColor: "#77778e",
          },
          gridLines: {
            color: "rgba(119, 119, 142, 0.2)",
          },
        },
      ],
    },
    legend: {
      labels: {
        fontColor: "#77778e",
      },
    },
  },
};
/* Chartjs (#ethereum-market) */

export const Marketcap2 = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
      display: false,
    },

    title: {
      display: false,
      text: "Chart.js Line Chart",
    },
  },
  scales: {
    x: {
      display: false,
      title: {
        display: true,
      },
    },
    y: {
      display: false,
      title: {
        display: true,
        text: "Value",
      },
    },
  },
};
export const marketcap2 = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  type: "line",
  datasets: [
    {
      data: [34, 23, 54, 34, 56, 76, 34, 76, 34, 55, 23, 76],
      label: "Ethereum Price",
      backgroundColor: "rgba(98, 89, 202, 0.2)",
      borderColor: "#6259ca",
      borderWidth: "2",
      pointBorderColor: "transparent",
      pointBackgroundColor: "transparent",
      tension: 0.4,
      fill: true,
    },
  ],
  options: {
    responsive: true,
    maintainAspectRatio: false,
    tooltips: {
      mode: "index",
      intersect: false,
    },
    hover: {
      mode: "nearest",
      intersect: true,
    },
    scales: {
      xAxes: [
        {
          ticks: {
            fontColor: "#77778e",
          },
          gridLines: {
            color: "rgba(119, 119, 142, 0.2)",
          },
        },
      ],

      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            fontColor: "#77778e",
          },
          gridLines: {
            color: "rgba(119, 119, 142, 0.2)",
          },
        },
      ],
    },
    legend: {
      labels: {
        fontColor: "#77778e",
      },
    },
  },
};

/* Chartjs (#xrp-market) */
export const Marketcap3 = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
      display: false,
    },

    title: {
      display: false,
      text: "Chart.js Line Chart",
    },
  },
  scales: {
    x: {
      display: false,
      title: {
        display: true,
      },
    },
    y: {
      display: false,
      title: {
        display: true,
        text: "Value",
      },
    },
  },
};
export const marketcap3 = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  type: "line",
  datasets: [
    {
      data: [7, 5, 7, 3, 5, 2, 5, 3, 9, 6, 5, 9, 7, 3, 5, 2, 7, 10],
      label: "Ethereum Price",
      backgroundColor: "rgba(98, 89, 202, 0.2)",
      borderColor: "#6259ca",
      borderWidth: "2",
      pointBorderColor: "transparent",
      pointBackgroundColor: "transparent",
      tension: 0.4,
      fill: true,
    },
  ],
  options: {
    responsive: true,
    maintainAspectRatio: false,
    tooltips: {
      mode: "index",
      intersect: false,
    },
    hover: {
      mode: "nearest",
      intersect: true,
    },
    scales: {
      xAxes: [
        {
          ticks: {
            fontColor: "#77778e",
          },
          gridLines: {
            color: "rgba(119, 119, 142, 0.2)",
          },
        },
      ],

      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            fontColor: "#77778e",
          },
          gridLines: {
            color: "rgba(119, 119, 142, 0.2)",
          },
        },
      ],
    },
    legend: {
      labels: {
        fontColor: "#77778e",
      },
    },
  },
};
/* Chartjs (#ltc-market) */
export const Marketcap4 = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
      display: false,
    },

    title: {
      display: false,
      text: "Chart.js Line Chart",
    },
  },
  scales: {
    x: {
      display: false,
      title: {
        display: true,
      },
    },
    y: {
      display: false,
      title: {
        display: true,
        text: "Value",
      },
    },
  },
};
export const marketcap4 = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  type: "line",
  datasets: [
    {
      data: [15, 6, 16, 11, 12, 15, 10, 19, 16, 13, 12, 15, 7, 16, 11],
      label: "Ethereum Price",
      backgroundColor: "rgba(98, 89, 202, 0.2)",
      borderColor: "#6259ca",
      borderWidth: "2",
      pointBorderColor: "transparent",
      pointBackgroundColor: "transparent",
      tension: 0.4,
      fill: true,
    },
  ],
  options: {
    responsive: true,
    maintainAspectRatio: false,
    tooltips: {
      mode: "index",
      intersect: false,
    },
    hover: {
      mode: "nearest",
      intersect: true,
    },
    scales: {
      xAxes: [
        {
          ticks: {
            fontColor: "#77778e",
          },
          gridLines: {
            color: "rgba(119, 119, 142, 0.2)",
          },
        },
      ],

      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            fontColor: "#77778e",
          },
          gridLines: {
            color: "rgba(119, 119, 142, 0.2)",
          },
        },
      ],
    },
    legend: {
      labels: {
        fontColor: "#77778e",
      },
    },
  },
};

export const CryptMarketingValues =
[
  { IMAGES: btc, ID: 1, Symbol: "bitcoin", Name: "Bitcoin", crypt: "BTC", lastprice: "$151.00", MarkerCap: "$518", Change: "success", platform: "Trade", },
  { ID: 2, ymbol: "ethereum", Name: "Ethereum", crypt: "ETH", lastprice: "$723.48", MarkerCap: "$448", Change: "success", platform: "Trade", IMAGES: eth, },
  { ID: 3, Symbol: "ripple", Name: "Ripple", crypt: "XRP", lastprice: "$425.25", MarkerCap: "$763", Change: "success", platform: "Trade", IMAGES: xrp, },
  { ID: 4, Symbol: "litecoin", Name: "Litecoin", crypt: "LTC", lastprice: "$1.2029", MarkerCap: "$678,", Change: "danger", platform: "Trade", IMAGES: ltc, },
  { ID: 5, Symbol: "neo", Name: "Neo", crypt: "NEO", lastprice: "$154.67", MarkerCap: "$197", Change: "danger", platform: "Trade", IMAGES: neo, },
  { ID: 6, Symbol: "monero", Name: "Monero", crypt: "XMR", lastprice: "$305.16", MarkerCap: "$4,778", Change: "success", platform: "Trade", IMAGES: xmr, },
  { ID: 7, Symbol: "eos", Name: "Eos", crypt: "EOS", lastprice: "$149.18", MarkerCap: "$8,44", Change: "danger", platform: "Trade", IMAGES: eos, },
  { ID: 8, Symbol: "steem", Name: "Steem", crypt: "STEEM", lastprice: "$0.4673", MarkerCap: "$8,358", Change: "success", platform: "Trade", IMAGES: steem, },
  { ID: 9, Symbol: "lota", Name: "Lota", crypt: "LOTA", lastprice: "$2.34", MarkerCap: "$654", Change: "danger", platform: "Trade", IMAGES: miota, },
  { ID: 10, Symbol: "dash", Name: "Dash", crypt: "DASH", lastprice: "$747.2", MarkerCap: "$588", Change: "success", platform: "Trade", IMAGES: dash, },
  { ID: 11, Symbol: "waves", Name: "Bitcoin", crypt: "NEM", lastprice: "$181.39", MarkerCap: "$3,084", Change: "danger", platform: "Trade", IMAGES: waves, },
];