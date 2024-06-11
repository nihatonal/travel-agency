import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';


function Destinations(props) {

    ;

    function onlyUnique(value, index, array) {
        return array.indexOf(value) === index;
    }


    const destinations_arr = props.data.map((item) => item.country);

    const years = props.data.map((item) => item.date.slice(0, 4)).filter(onlyUnique).sort();

    const locs = years.map((year) =>
        props.data.filter((item) =>
            item.date.slice(0, 4) === year
        )
    )

    const new_arr = locs.map((item) =>
        item.map((el) => el.country)
    );
    console.log(new_arr)

    var destinations = destinations_arr.reduce(function (prev, cur) {
        prev[cur] = (prev[cur] || 0) + 1;
        return prev;
    }, {});


    const destinations_list = destinations_arr.filter(onlyUnique);

    const destination_count = Object.values(destinations);

    let arr = []
    const counts = destinations_list.map((item) =>
        new_arr.map((el) => el.filter(i => i === item).length)

        // Object.values(item.reduce(function (prev, cur) {
        //     prev[cur] = (prev[cur] || 0) + 1;
        //     return prev;
        // }, {}))
    )
    console.log(counts)


    const chartSetting = {
        xAxis: [
            {
                label: 'Tour Count',
            },
        ],
        width: 500,
        height: destinations_list.length < 4 ? 4 * 65 : destinations_list.length * 60,
    }

    return (
        <div>
            <div className="destination-items">

                <BarChart
                    xAxis={[{ scaleType: 'band', data: destinations_list }]}
                    series={[{ data: [4, 3, 5, 3] }, { data: [1, 6, 3, 1] }]}
                    width={600}
                    height={300}
                />

            </div>
        </div>
    );
}

export default Destinations;