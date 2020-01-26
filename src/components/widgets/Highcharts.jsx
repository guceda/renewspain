import React from 'react';
import ReactHighcharts from 'react-highcharts';



export default function HighCharts(props) {

    const buildConfig = ({ data, title = "", subtitle = "" }) => ({
        chart: { zoomType: 'x', animation: true },
        title: { text: title },
        subtitle: { text: subtitle },
        xAxis: { type: 'datetime' },
        plotOptions: { line: { marker: { enabled: false } } },
        series: data,
        credits: { enabled: false }
    })
    return <ReactHighcharts config={buildConfig(props)}></ReactHighcharts>

}