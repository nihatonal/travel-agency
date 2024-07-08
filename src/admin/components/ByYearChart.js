import React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import moment from 'moment';
import useSize from '../../shared/util/useSize';
function ByYearChart(props) {
    const windowsize = useSize();

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

    function onlyUnique(value, index, array) {
        return array.indexOf(value) === index;
    }



    const locs = props.years.map((year) =>
        props.data.filter((item) =>
            item.date.slice(0, 4) === year
        )
    );

    const new_arr = locs.map((item) =>
        item.map((el) => moment(new Date(el.date)).format("MMM"))
    );


    const counts = xLabels.map((item) =>
        new_arr.map((el) => el.filter(i => i === item).length)

    );


    const mysteriousFn = (arr) => {
        const newItemList = [];

        arr.map((item) => {
            item.map((i, idx) => {
                if (newItemList[idx] !== undefined) {
                    newItemList[idx].push(i);
                } else {
                    newItemList.push([i]);
                }
            });
        });
        return newItemList.map((item, i) => { return { data: item, label: props.years[i] } });
    };

    const filterPrice = locs.map((year) => {
        return {
            cost:


                xLabels.map((month) =>
                    year.filter((item) => moment(new Date(item.date)).format("MMM") === month)
                        .map((cost) => Number(cost.cost)).reduce((partialSum, a) => partialSum + a, 0)

                )

            //item.map((el) => moment(new Date(el.date)).format("MMM")

        }
    }
    )
        .map((result, index) => { return { data: result.cost, label: props.years[index] } });

    return (
        <div>
            <div className="destination-items">

                <LineChart
                    xAxis={[{ scaleType: 'point', data: xLabels }]}
                    series={props.filtered.includes("Стоимость") ? filterPrice : mysteriousFn(counts)}
                    width={windowsize[0] > 756 ? 700 : 400}
                    height={220}
                    margin={{ left: 70, top: 50 }}
                />

            </div>
        </div>
    );
}

export default ByYearChart;