import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import useSize from '../../shared/util/useSize';

function ByCountryChart(props) {
    const windowsize = useSize();

    function onlyUnique(value, index, array) {
        return array.indexOf(value) === index;
    }


    const destinations_arr = props.data.map((item) => item.country);


    const locs = props.years.map((year) =>
        props.data.filter((item) =>
            item.date.slice(0, 4) === year
        )
    )

    const new_arr = locs.map((item) =>
        item.map((el) => el.country)
    );


    const destinations_list = destinations_arr.filter(onlyUnique);

    const counts = destinations_list.map((item) =>
        new_arr.map((el) => el.filter(i => i === item).length)
    )


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


    const result = props.years.map((year) =>
        destinations_list.map((item) =>
            props.data.filter((el) => el.country === item)
                .filter((item) =>
                    item.date.slice(0, 4) === year
                ).map((cost) => Number(cost.cost)).reduce((partialSum, a) => partialSum + a, 0))
    ).map((result, index) => { return { data: result, label: props.years[index] } })


    return (
        <div>
            <div className="destination-items">

                <BarChart
                    xAxis={[{ scaleType: 'band', data: destinations_list }]}
                    series={props.filtered.includes("Стоимость") ? result : mysteriousFn(counts)}
                    width={windowsize[0] > 756 ? 500 : 400}
                    height={220}
                    margin={{ left: 70, top: 50 }}

                />

            </div>
        </div>
    );
}

export default ByCountryChart;