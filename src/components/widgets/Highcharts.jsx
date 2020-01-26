import React from 'react';
import ReactHighcharts from 'react-highcharts';



export default function HighCharts(props) {

    const buildConfig = ({ data, title="", subtitle="" }) => ({

        title: {
            text: title
        },

        subtitle: {
            text: subtitle
        },

        yAxis: {
            title: {
                text: 'Number of Employees'
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },

        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                },
                pointStart: 2010
            }
        },
        series: data,
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }

    })
    return <ReactHighcharts config={buildConfig(props)}></ReactHighcharts>

}