import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';


function ByCityChart(props) {

    ;

    function onlyUnique(value, index, array) {
        return array.indexOf(value) === index;
    }


    const destinations_arr = props.data.map((item) => item.city);


    const locs = props.years.map((year) =>
        props.data.filter((item) =>
            item.date.slice(0, 4) === year
        )
    )

    const new_arr = locs.map((item) =>
        item.map((el) => el.city)
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


    return (
        <div>
            <div className="destination-items">

                <BarChart
                    xAxis={[{ scaleType: 'band', data: destinations_list }]}
                    series={mysteriousFn(counts)}
                    width={500}
                    height={220}
                />

            </div>
        </div>
    );
}

export default ByCityChart;