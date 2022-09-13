import React from "react";
import Chart from "react-apexcharts";
// import axios from 'axios';

const charData = [
  [
    1,
    "1633790202999999999756",
    "939"
  ],
  [
    2,
    "1032884060020000001554",
    "965"
  ],
  [
    3,
    "1143506388090000000749",
    "980"
  ],
  [
    4,
    "1651970159340000002147",
    "1461"
  ],
  [
    5,
    "2888538602513714742581",
    "1565"
  ],
  [
    6,
    "3131154750979264623585",
    "1432"
  ],
  [
    7,
    "2638588470962534454212",
    "1471"
  ],
  [
    8,
    "2146881083383900003120",
    "1329"
  ],
  [
    9,
    "1974601898693398261218",
    "1238"
  ],
  [
    10,
    "1728197951110000005642",
    "1101"
  ],
  [
    11,
    "1626088065879999999770",
    "1084"
  ],
  [
    12,
    "1296183022129915767638",
    "1056"
  ],
  [
    13,
    "1435488407606290090507",
    "1026"
  ],
  [
    14,
    "1364874536438230826173",
    "969"
  ],
  [
    15,
    "1007242276085500001815",
    "867"
  ],
  [
    16,
    "799267988801280000812",
    "812"
  ],
  [
    17,
    "594019020501300000481",
    "786"
  ],
  [
    18,
    "471046834229910000658",
    "702"
  ],
  [
    19,
    "386642780038995728204",
    "640"
  ],
  [
    20,
    "328049627575870000030",
    "585"
  ],
  [
    21,
    "296025883160000000153",
    "534"
  ],
  [
    22,
    "263611890455826304195",
    "473"
  ],
  [
    23,
    "272348066386384446903",
    "465"
  ],
  [
    24,
    "243921829264799284582",
    "483"
  ],
  [
    25,
    "381433966480099928404",
    "467"
  ],
  [
    26,
    "306647534830364611972",
    "529"
  ],
  [
    27,
    "315609841079742853229",
    "491"
  ],
  [
    28,
    "311110684026437765047",
    "428"
  ],
  [
    29,
    "309401940484119556438",
    "404"
  ],
  [
    30,
    "240953716038963109464",
    "422"
  ],
  [
    31,
    "254690399392547055836",
    "413"
  ],
  [
    32,
    "224606121298392890483",
    "389"
  ],
  [
    33,
    "209254038440198758900",
    "352"
  ],
  [
    34,
    "180564877697529058238",
    "327"
  ],
  [
    35,
    "137341174423094373581",
    "302"
  ],
  [
    36,
    "157812665722317242826",
    "299"
  ],
  [
    37,
    "136649474482583038055",
    "295"
  ],
  [
    38,
    "79420050000000000092",
    "174"
  ]
];

const Charts = () => {
  // axios.get(`https://avaricetoken.io/getLobbyData`)
  // .then(res => {
  //   console.log(res.data);
  // })
  let chd = charData.map(cd => {
    return  [cd[0], Math.round(Number(cd[1]/10**18)*100)/100];
  });
  let options = {
    chart: {
      id: 'area-datetime',
      type: 'area',
      zoom: {
        autoScaleYaxis: true
      },
      toolbar: {
        show: false,
      }
    },
    
    dataLabels: {
      enabled: false
    },
    markers: {
      size: 0,
      style: 'hollow',
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 100]
      }
    },
    legend: {
      show: true,
      showForSingleSeries: true,
      showForNullSeries: true,
      showForZeroSeries: true,
      position: 'top',
      horizontalAlign: 'center', 
      floating: false,
      fontSize: '13px',
      fontFamily: 'Helvetica, Arial',
      fontWeight: 400,
      formatter: undefined,
      inverseOrder: false,
      width: undefined,
      height: undefined,
      tooltipHoverFormatter: undefined,
      customLegendItems: [],
      offsetX: 0,
      offsetY: 0,
      labels: {
          colors: undefined,
          useSeriesColors: false
      },
      markers: {
          width: 12,
          height: 12,
          strokeWidth: 0,
          strokeColor: '#fff',
          radius: 12,
          customHTML: undefined,
          onClick: undefined,
          offsetX: 0,
          offsetY: 0
      },
      itemMargin: {
          horizontal: 5,
          vertical: 5
      },
      onItemClick: {
          toggleDataSeries: true
      },
      onItemHover: {
          highlightDataSeries: true
      },
  }
  }

  return (
    <div className="w-full md:w-[60%] inline-block">
      <div id="chart" className="w-full">
      <Chart series={
        [{
            data: chd,
            name: 'BNB Entry',
            type: "area"
          }]
      } type="area" height={300} options={options}/>
    </div>
    </div>
  )
  
}


export default Charts;
