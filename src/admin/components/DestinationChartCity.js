import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';


function DestinationChartCity(props) {

    ;

    function onlyUnique(value, index, array) {
        return array.indexOf(value) === index;
    }


    const destinations_arr = props.data.map((item) => item.city);

    var destinations = destinations_arr.reduce(function (prev, cur) {
        prev[cur] = (prev[cur] || 0) + 1;
        return prev;
    }, {});

    const destinations_list = destinations_arr.filter(onlyUnique);

    const destination_count = Object.values(destinations)

    const chartSetting = {
        xAxis: [
            {
                label: 'Tour Count',
            },
        ],
        width: 500,
        height: destinations_list.length < 4 ? 4 * 65 : destinations_list.length * 70,
    }

    return (
        <div>
            <div className="destination-items">

                <BarChart
                    yAxis={[{ data: destinations_list, scaleType: 'band' }]}
                    series={[
                        { data: destination_count, label: "Cities", }

                    ]}
                    layout="horizontal"
                    {...chartSetting}
                    margin={{
                        left: 90,
                        right: 80,
                        top: 80,
                        bottom: 80,
                    }}
                    slotProps={{
                        // Custom loading message
                        loadingOverlay: { message: 'Data should be available soon.' }
                    }}
                />

            </div>
        </div>
    );
}

export default DestinationChartCity;