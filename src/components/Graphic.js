import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import _ from "lodash";
import { useState } from "react";

const getPieOptions = (type, label, household) => ({
  chart: {
    type
  },
  title: {
    text: label
  },
  yAxis: {
    title: {
      text: "Values"
    }
  },
  series: [
    {
      name: label,
      data: [
        ["共同生活", household.total_Ordinary],
        ["獨立生活", household.total_Single]
      ]
    }
  ],
  plotOptions: {
    pie: {
      showInLegend: true,
      cursor: "pointer",
      dataLabels: {
        enabled: true,
        format: "{point.percentage:.1f} %"
      }
    }
  }
});

const getColumnOptions = (type, label, household) => ({
  chart: {
    type
  },
  title: {
    text: label
  },
  yAxis: {
    title: {
      text: "數量",

      align: "high",
      rotation: 0,
      y: -20,
      offset: 10
    }
  },
  xAxis: {
    categories: ["共同生活", "獨立生活"]
  },
  series: [
    {
      name: "男性",
      data: [household.ordinary_Male, household.single_Male]
    },
    {
      name: "女性",
      data: [household.ordinary_Female, household.single_Female]
    }
  ]
});

export const Graphic = (props) => {
  const [options, setOptions] = useState({
    series: [
      {
        data: [1, 2, 3]
      }
    ]
  });
  const dataisNull = Object.values(props.household).every((el) => el === 0);
  return (
    <>
      {dataisNull ? (
        <div></div>
      ) : (
        <div>
          <HighchartsReact
            highcharts={Highcharts}
            options={getColumnOptions("column", "人口數統計", props.household)}
          />
          <HighchartsReact
            highcharts={Highcharts}
            options={getPieOptions("pie", "戶數統計", props.household)}
          />
        </div>
      )}
    </>
  );
};
