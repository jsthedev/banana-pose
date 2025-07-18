import "@/components/product_details/size_chart_drawer/size_chart_tables/index.scss";

import { sizeDimensionData } from "@/utils/dimension_chart";

function DimensionChartTable({ dimensionChart }) {
  const { sortedSizes, rows } = sizeDimensionData(dimensionChart);

  return (
    <div className="size-chart-table">
      <table>
        <tbody>
          <tr>
            <th>BP Size</th>
            {sortedSizes.map((size) => (
              <td key={size}>{size}</td>
            ))}
          </tr>
          {rows.map(({ measurement, values }) => (
            <tr>
              <th key={measurement}>{measurement}</th>
              {values.map((val, idx) => (
                <td key={idx}>{val}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DimensionChartTable;
