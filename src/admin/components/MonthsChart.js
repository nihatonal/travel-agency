import React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import moment from 'moment';

function MonthsChart(props) {

    ;

    function onlyUnique(value, index, array) {
        return array.indexOf(value) === index;
    }


    const dates_arr = props.data.map((item) =>
        moment(new Date(item.date)).format("MMM")
    );



    var destinations = dates_arr.reduce(function (prev, cur) {
        prev[cur] = (prev[cur] || 0) + 1;
        return prev;
    }, {});

    const destinations_months = dates_arr.filter(onlyUnique);

    const destination_count = Object.values(destinations)

    const xLabels = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ];
    const arr = []
    xLabels.map((item) => {
        if (destinations[item]) {
            arr.push(destinations[item])
        }
        else {
            arr.push(0)
        }
        return arr
    })

    return (
        <div>
            <div className="destination-items">

                <LineChart
                    xAxis={[{ scaleType: 'point', data: xLabels }]}
                    series={[
                        {
                            data: arr,
                            label: props.label+" year",
                        },
                    ]}
                    width={500}
                    height={250}
                />

            </div>
        </div>
    );
}

export default MonthsChart;