import React from 'react';
import './Timeline.css';
import JqxChart, { IChartProps } from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxchart';
import data from '../../data/data';
import * as _ from 'lodash';

class Timeline extends React.Component {

    constructor(props) {
        super(props);

        // const sampleData = [
        //     { Day: 'Monday', Running: 30, Swimming: 10, Cycling: 25, Goal: 40 },
        //     { Day: 'Tuesday', Running: 25, Swimming: 15, Cycling: 10, Goal: 50 },
        //     { Day: 'Wednesday', Running: 30, Swimming: 10, Cycling: 25, Goal: 60 },
        //     { Day: 'Thursday', Running: 40, Swimming: 20, Cycling: 25, Goal: 40 },
        //     { Day: 'Friday', Running: 45, Swimming: 20, Cycling: 25, Goal: 50 },
        //     { Day: 'Saturday', Running: 30, Swimming: 20, Cycling: 30, Goal: 60 },
        //     { Day: 'Sunday', Running: 20, Swimming: 30, Cycling: 10, Goal: 90 }
        // ];

        let sampleData = data;

        let distritcts = sampleData.map((d) => d.district);
        let uniqueDistricts = _.uniqBy(distritcts);
        
        let finalData = _.groupBy(sampleData, 'joiningDate', 'joiningDate');
        let graphData = [];
        Object.keys(finalData).map((joiningDate)=>{
            let dataByJoiningDate = finalData[joiningDate];
            uniqueDistricts.map((uD)=>{
                let formattedDate = joiningDate.split('/');
                formattedDate = formattedDate[1]+'/'+formattedDate[0]+'/'+formattedDate[2];
                let obj = {
                    district: uD,
                    date: new Date(formattedDate).toDateString().slice(4,10)
                }
                obj[uD] = dataByJoiningDate.filter((d)=>d.district == uD).length
                graphData.push(obj);
            })
        })

        sampleData = graphData;


        let series = uniqueDistricts.map((d) => {
            return {
                dataField: d,
                labels:
                {
                    backgroundColor: '#FEFEFE',
                    backgroundOpacity: 0.2,
                    borderColor: '#7FC4EF',
                    borderOpacity: 0.7,
                    padding: { left: 5, right: 5, top: 0, bottom: 0 },
                    visible: true,
                },
                symbolType: 'square'

            }
        })

        this.state = {
            description: 'Student joinies analysis by districts',
            padding: { left: 10, top: 10, right: 15, bottom: 10 },
            seriesGroups: [
                {
                    series: series,
                    // [
                    //     {
                    //         dataField: 'Swimming',
                    //         labels:
                    //         {
                    //             // backgroundColor: '#FEFEFE',
                    //             backgroundOpacity: 0.2,
                    //             borderColor: '#7FC4EF',
                    //             borderOpacity: 0.7,
                    //             padding: { left: 5, right: 5, top: 0, bottom: 0 },
                    //             visible: true,
                    //         },
                    //         symbolType: 'square'
                    //     },
                    //     {
                    //         dataField: 'Running',
                    //         labels:
                    //         {
                    //             // backgroundColor: '#FEFEFE',
                    //             backgroundOpacity: 0.2,
                    //             borderColor: '#7FC4EF',
                    //             borderOpacity: 0.7,
                    //             padding: { left: 5, right: 5, top: 0, bottom: 0 },
                    //             visible: true,
                    //         },
                    //         symbolType: 'square'
                    //     }
                    // ],
                    type: 'line'
                }
            ],
            source: sampleData,
            title: '',
            titlePadding: { left: 90, top: 0, right: 0, bottom: 10 },
            valueAxis: {
                labels: { horizontalAlignment: 'right' },
                maxValue: 50,
                minValue: 0,
                title: { text: 'District' },
                unitInterval: 5
            },
            xAxis: {
                dataField: 'date',
                gridLines: { visible: true, interval: 1 },
                padding: { bottom: 10 },
                tickMarks: { visible: true, interval: 1 },
                unitInterval: 1,
                valuesOnTicks: false
            }
        };
    }

    render() {
        return (
            <div className="timeline">
                <h2>Timeline</h2>
                <JqxChart style={{ width: '850px', height: '500px' }}
                    title={this.state.title} description={this.state.description}
                    showLegend={true} enableAnimations={true} padding={this.state.padding}
                    titlePadding={this.state.titlePadding} source={this.state.source} xAxis={this.state.xAxis}
                    valueAxis={this.state.valueAxis} seriesGroups={this.state.seriesGroups} colorScheme={'scheme05'} />
            </div>
        )
    }
}

export default Timeline;
