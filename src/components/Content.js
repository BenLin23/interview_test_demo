import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import { useState } from "react";
import { Graphic } from "./Graphic";
import _ from "lodash";

export default function Content() {
  const { yearOption, cityOption, areaOption } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [bigTitle, setBigTitle] = useState(null);
  const [household, setHousehold] = useState({
    ordinary_Male: 0,
    ordinary_Female: 0,
    single_Male: 0,
    single_Female: 0,
    total_Ordinary: 0,
    total_Single: 0
  });

  useEffect(() => {
    handleSubmit();
  }, [yearOption, cityOption, areaOption]);

  const fetchData = async () => {
    const url =
      "https://www.ris.gov.tw/rs-opendata/api/v1/datastore/ODRP019/" +
      yearOption;
    const responseData = await fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((datas) => {
        console.log("datas===>", datas);
        return datas.responseData;
      })
      .catch((err) => console.log(`Error: ${err}`));

    return responseData;
  };
  const handleSubmit = async () => {
    setBigTitle(null);
    setIsLoading(true);
    const responseData = await fetchData();
    setIsLoading(false);

    if (responseData !== null) {
      const address = cityOption + areaOption;
      const results = responseData.filter(
        (element) => element.site_id === address
      );
      if (results.length > 0) {
        setBigTitle(yearOption + "年" + cityOption + areaOption);
        const sumValue_Ordinary_Male = _.sumBy(results, (item) =>
          Number(item.household_ordinary_m)
        );
        const sumValue_Ordinary_Female = _.sumBy(results, (item) =>
          Number(item.household_ordinary_f)
        );
        const sumValue_Single_Male = _.sumBy(results, (item) =>
          Number(item.household_single_m)
        );
        const sumValue_Single_Female = _.sumBy(results, (item) =>
          Number(item.household_single_f)
        );
        const sumValue_Single_Total = _.sumBy(results, (item) =>
          Number(item.household_single_total)
        );
        const sumValue_Ordinary_Total = _.sumBy(results, (item) =>
          Number(item.household_ordinary_total)
        );
        setHousehold({
          ordinary_Male: sumValue_Ordinary_Male,
          ordinary_Female: sumValue_Ordinary_Female,
          single_Male: sumValue_Single_Male,
          single_Female: sumValue_Single_Female,
          total_Ordinary: sumValue_Ordinary_Total,
          total_Single: sumValue_Single_Total
        });
      } else {
        setBigTitle("查無資料");
      }
    } else {
    }
  };
  return (
    <div>
      <div className="content_detail_Big_Title">{bigTitle}</div>

      <div className="content_detail_graphics">
        {isLoading ? (
          <div className="loading">
            <LoadingSpinner />
          </div>
        ) : (
          <Graphic household={household} />
        )}
      </div>
    </div>
  );
}
