$(function(){
    var compare = function (obj1, obj2) {
        var val1 = obj1.time;
        var val2 = obj2.time;
        if (val1 < val2) {
            return -1;
        } else if (val1 > val2) {
            return 1;
        } else {
            return 0;
        }
    }

    var dataMap = map_chengdu;

    var itemStyle = {
        normal:{
            borderColor: '#011c37',
            borderWidth: 1,
            // color:'rgba(0, 0, 0, 0.8)',
            areaColor: 'rgba(0, 0, 0, 1)'

        },
        emphasis:{
        	//show:false,
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            //shadowBlur: 20,
            borderWidth: 1,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
            areaColor: 'rgba(0, 0, 0, 1)'
        }
    };

    echarts.registerMap('成都', dataMap);
    var chart_map = echarts.init(document.getElementById('main'));
    var app = {};
    var option_map = null;

     //坐标数据

    function taxiData(data){
    	var busLine = [];
        for(var key in data){
            var tempData = data[key].sort(compare);
            var tempBus = [];
            var speed = 0;
            if(tempData.length<2){
                continue;
            }
            for(var i=0;i<tempData.length;i++){

                tempBus.push(tempData[i]['local']);
                speed +=parseInt(tempData[i]['speed'])/tempData.length;
            }
            if(speed<=20){
                busLine.push({"coords":tempBus,"lineStyle": {
                        "normal": {
                            "color": 'rgba(33, 255, 255, 0.9)'
                        }
                    },
                    'effect': {
                        'constantSpeed': 20,
                        'show': true,
                        'trailLength': 0.1,
                        'symbolSize': 2
                    }
                });
            }else if(speed>20 && speed<=27){
                busLine.push({"coords":tempBus,"lineStyle": {
                    "normal": {
                        "color": 'rgba(33, 232, 131, 1.0)'
                    }
                },
                'effect': {
                    'constantSpeed': 16,
                    'show': true,
                    'trailLength': 0.1,
                    'symbolSize': 1.6
                }
            });
            }else if(speed>27 && speed<=35){
                busLine.push({"coords":tempBus,"lineStyle": {
                    "normal": {
                        "color": 'rgba(220, 77, 241, 1.0)'
                    }
                },
                'effect': {
                    'constantSpeed': 16,
                    'show': true,
                    'trailLength': 0.1,
                    'symbolSize': 1.6
                }
            });
            }
            else if(speed>35 && speed<=50){
                busLine.push({"coords":tempBus,"lineStyle": {
                    "normal": {
                        "color": 'rgba(241, 77, 177, 1.0)'
                    }
                },
                'effect': {
                    'constantSpeed': 16,
                    'show': true,
                    'trailLength': 0.1,
                    'symbolSize': 1.6
                }
            });
            }else if(speed>50){
                busLine.push({"coords":tempBus,"lineStyle": {
                    "normal": {
                        "color": 'rgba(255, 0, 0, 1.0)'
                    }
                },
                'effect': {
                    'constantSpeed': 16,
                    'show': true,
                    'trailLength': 0.1,
                    'symbolSize': 1.6
                }
            });
            }
        }
        return busLine;
    }

    var mapmain = {
        backgroundColor: 'transparent',
        title: {
            text: '',
            subtext: '',
            sublink: ''
        },
        tooltip: {
            trigger: 'item',
            formatter: '{b}<br/>{c} (p / km2)'
        },
        toolbox: {
            show: false,
            orient: 'vertical',
            left: 'right',
            top: 'center',
            feature: {
                dataView: {readOnly: false},
                restore: {},
                saveAsImage: {}
            }
        },
        visualMap: {
            show:false,
            min: 0,
            max: 500,
            text:['High','Low'],
            realtime: false,
            calculable: true,
            seriesIndex: 0,
            inRange: {
                color: ['lightskyblue','yellow', 'orangered']
            }
        },
        geo: {
            map: '成都',
            label: {
                emphasis: {
                    show: false
                }
            },
            roam: true,
            zoom:7,
            left:'10%',
            top:'-40%',
            //layoutCenter:['10%','30%'],
            label:{
                normal: {
                    show: true,
                    textStyle: {
                        color: '#184c81',
                        fontStyle: 'normal'
                    }

                },
                emphasis: {
                    show: true,
                    textStyle: {
                        color: '#fff',
                        fontStyle: 'normal'
                    }
                }
            },
            itemStyle:itemStyle
        },
        series: [
            {
                type: 'lines',
                mapType: '成都',
                polyline: true,
                data: [],
                silent: true,
                lineStyle: {
                    normal: {
                        color: '#379f9f',
                        // color: 'rgb(200, 255, 255)',
                        opacity: 0.05,
                        width: 1.7
                    }
                },
                progressiveThreshold: 1000,
                progressive: 200
            }, {
                type: 'lines',
                mapType: '成都',
                polyline: true,
                data: [],
                lineStyle: {
                    normal: {
                        color: '#18f75e',
                        width: 0
                    }
                },
                effect: {
                    constantSpeed: 20,
                    show: true,
                    trailLength: 0.1,
                    symbolSize: 1.6
                },
                animationEasing: 'exponentialOut',
                animationDuration: 0,
                animationDurationUpdate:5,
                animationEasingUpdate:'exponentialOut',
                zlevel: 1
            }
        ]
    };

    var middline = [];
    var nightline = [];
    var morningline = taxiData(taximorning);
    mapmain.series[0].data = morningline;
    mapmain.series[1].data = morningline;
    option_map = mapmain
    chart_map.setOption(option_map);

    //点击事件
    $('#legend li').click(function(){
        $('#loader').show();
        // $('#main').empty();
        middline = [];
    	nightline = [];
    	morningline = [];
    	option_map = null;
        if($(this).index() == 0){
            morningline = taxiData(taximorning);
            mapmain.series[0].data = morningline;
		    mapmain.series[1].data = morningline;
		    option_map = mapmain
		    chart_map.setOption(option_map);
            highbar(highmorning);
            $('#left_box ul li p:eq(0)').html('50.68%');
            $('#left_box ul li p:eq(1)').html('11.68%');
            $('#left_box ul li p:eq(2)').html('12.08%');
            $('#left_box ul li p:eq(3)').html('6.25%');
            $('#left_box ul li p:eq(4)').html('9.30%');
        }else if($(this).index() == 1){
            middline = taxiData(taximidd);
            mapmain.series[0].data = middline;
		    mapmain.series[1].data = middline;
		    option_map = mapmain
		    chart_map.setOption(option_map);
            highbar(highmidd);
            $('#left_box ul li p:eq(0)').html('40.10%');
            $('#left_box ul li p:eq(1)').html('10.31%');
            $('#left_box ul li p:eq(2)').html('12.0%');
            $('#left_box ul li p:eq(3)').html('7.15%');
            $('#left_box ul li p:eq(4)').html('12.15%');
        }else if($(this).index() == 2){
            nightline = taxiData(taxinight);
            mapmain.series[0].data = nightline;
		    mapmain.series[1].data = nightline;
		    option_map = mapmain
		    chart_map.setOption(option_map);
            highbar(highnight);
            $('#left_box ul li p:eq(0)').html('51.40%');
            $('#left_box ul li p:eq(1)').html('11.22%');
            $('#left_box ul li p:eq(2)').html('11.62%');
            $('#left_box ul li p:eq(3)').html('5.75%');
            $('#left_box ul li p:eq(4)').html('8.66%');
        }
        $('#loader').fadeOut();
    })
    //************************************************************************************************
    //****************************************rightbox************************************************
    var dom = document.getElementById("right_box");
    var myChart_rightbox = echarts.init(dom);
    var app = {};
    var option = null;
    app.title = '混合';
    //shu ju chu li
    var seven = [];
    var inde = 0;
    // alert(sevendata['one'][0][0]);
    for(var key in sevendata){
    	seven[inde] = [];
    	for(var i=0;i<sevendata[key].length;i++){
    		seven[inde].push(sevendata[key][i][0]);
    	}
    	inde++;
    }

    option = {
        backgroundColor: 'transparent',
        color:['#15e9e9','#18afe7','#87cce6','#5287ea','#0f61f6','#e21a36','#d61ae2'],
        tooltip: {
            trigger: 'axis'
        },
        toolbox: {
            feature: {
                dataView: {show: true, readOnly: false},
                magicType: {show: true, type: ['line', 'bar']},
                restore: {show: true},
                saveAsImage: {show: true}
            },
            iconStyle:{
                normal:{
                    borderColor:'#15e9e9'
                },
                emphasis:{
                    borderColor:'#b1e4ff'
                }
            }
        },
        legend: {
            data:['周一','周二','周三','周四','周五','周六','周日'],
            textStyle:{
                color:'#15e9e9'
            },
            left:10,
            selected:{
            	'周一':true,
            	'周二':false,
            	'周三':false,
            	'周四':false,
            	'周五':false,
            	'周六':true,
            	'周日':true            }
        },
        xAxis: [
            {
                type: 'category',
                data: ['00：00~01:00','01：00~02:00','02：00~03:00','03：00~04:00','04：00~05:00','05：00~06:00','06：00~07:00','07：00~08:00','08：00~09:00','09：00~10:00','10：00~11:00',
                '11：00~12:00','12：00~13:00','13：00~14:00','14：00~15:00','15：00~16:00','16：00~17:00','17：00~18:00','18：00~19:00','19：00~20:00','20：00~21:00','21：00~22:00','22：00~23:00','23：00~24:00'],
                axisLine:{
                    lineStyle:{
                        color:'#15e9e9'
                    }
                },
                scale :true
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '车速km/h',
                min: 0,
                max: 70,
                interval: 10,
                axisLabel: {
                    formatter: '{value}'
                },
                axisLine:{
                    lineStyle:{
                        color:'#15e9e9'
                    }
                }
            },
            {
                type: 'value',
                name: '车速km/h',
                min: 0,
                max: 70,
                interval: 10,
                axisLabel: {
                    formatter: '{value}'
                },
                axisLine:{
                    lineStyle:{
                        color:'#15e9e9'
                    }
                }
            }
        ],
        series: [
            {
                name:'周一',
                type:'line',
                data:seven[0]
            },
            {
                name:'周二',
                type:'line',
                data:seven[1]
            },
            {
                name:'周三',
                type:'line',
                // yAxisIndex: 1,
                data:seven[2]
            },{
                name:'周四',
                type:'line',
                data:seven[3]
            },
            {
                name:'周五',
                type:'line',
                data:seven[4]
            },{
                name:'周六',
                type:'line',
                data:seven[5]
            },
            {
                name:'周日',
                type:'line',
                data:seven[6]
            }
        ]
    };
    ;
    if (option && typeof option === "object") {
       myChart_rightbox.setOption(option, true);
    }
    //************************************************************************************************
    //****************************************rightbox************************************************
    var dom = document.getElementById("rightdown_box");
    var myChartleftbox = echarts.init(dom);
    var app = {};
    var option = null;

    var datayi = [];
    datayi[0] = [];
    for(var key in sevendata){
    	datayi[0].push(sevendata[key][10][0]);
    }

    // var datayi = [
    //     [20,18,22,23,22,26,25]
    // ];

    // var dataer = [
    //     [24,25,23,25,24,29,28]
    // ];

    // var datasan = [
    //     [26,27,28,27,27,32,31]
    // ];

    var lineStyle = {
        normal: {
            width: 1,
            opacity: 0.5
        }
    };

    option = {
        backgroundColor: 'transparent',
        title: {
            text: '一周内车速对比',
            left: 'center',
            textStyle: {
                color: '#39efef',
                fontSize:14
            }
        },
        legend: {
            bottom: 5,
            data: ['10:00~11:00'],
            itemGap: 20,
            textStyle: {
                color: '#39efef',
                fontSize: 14
            },
            selectedMode: 'multipule',
            selected:{
                '10:00~11:00':true
            }
        },
        radar: {
            indicator: [
                {name: '周一', max: 50},
                {name: '周二', max: 50},
                {name: '周三', max: 50},
                {name: '周四', max: 50},
                {name: '周五', max: 50},
                {name: '周六', max: 50},
                {name: '周日', max: 50}
            ],
            shape: 'circle',
            splitNumber: 5,
            name: {
                textStyle: {
                    color: 'rgb(238, 197, 102)'
                }
            },
            splitLine: {
                lineStyle: {
                    color: [
                        'rgba(238, 197, 102, 0.1)', 'rgba(238, 197, 102, 0.2)',
                        'rgba(238, 197, 102, 0.4)', 'rgba(238, 197, 102, 0.6)',
                        'rgba(238, 197, 102, 0.8)', 'rgba(238, 197, 102, 1)'
                    ].reverse()
                }
            },
            splitArea: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: 'rgba(238, 197, 102, 0.5)'
                }
            }
        },
        series: [
            {
                name: '一环以内',
                type: 'radar',

                lineStyle: lineStyle,
                data: datayi,
                symbol: 'none',
                itemStyle: {
                    normal: {
                        color: '#47d8d8'
                    }
                },
                areaStyle: {
                    normal: {
                        opacity: 0.4
                    }
                }
            }
            // {
            //     name: '二环以内',
            //     type: 'radar',
            //     lineStyle: lineStyle,
            //     data: dataer,
            //     symbol: 'none',
            //     itemStyle: {
            //         normal: {
            //             color: '#1c16f7'
            //         }
            //     },
            //     areaStyle: {
            //         normal: {
            //             opacity: 0.6
            //         }
            //     }
            // },
            // {
            //     name: '绕城高速内',
            //     type: 'radar',
            //     lineStyle: lineStyle,
            //     data: datasan,
            //     symbol: 'none',
            //     itemStyle: {
            //         normal: {
            //             color: 'rgb(238, 197, 102)'
            //         }
            //     },
            //     areaStyle: {
            //         normal: {
            //             opacity: 0.4
            //         }
            //     }
            // }
        ]
    };;
    if (option && typeof option === "object") {
        myChartleftbox.setOption(option, true);
    }
    //************************************************************************************************
    //****************************************leftbar************************************************
    var highmorning = [66299,15286,8173,12167,11988];
    var highmidd = [44000,11318,13170,7845,13334,19099];
    var highnight = [55696,12161,12594,6235,9384,11427];

    var highdata = [2,4, 0, 5, 1, 4];
    function highbar(highdata){
        $(function(){
            $('#bar').highcharts({
                chart: {
                    type: 'column',
                    options3d: {
                        enabled: true,
                        alpha: 10,
                        beta: 25,
                        depth: 70
                    }
                },
                title: {
                    text: '不同速度车辆数量对比'
                },
                subtitle: {
                    text: ''
                },
                plotOptions: {
                    column: {
                        depth: 25
                    }
                },
                xAxis: {
                    categories: ['20(km/h)以下','20-27(km/h)','27-35(km/h)','35-40(km/h)','40-50(km/h)','60(km/h)以上'],
                    labels:{
                    	rotation:30
                    },
                    style:{
                    	fontSize:'20px',
                    	fontWeight:'bold'
                    }
                },
                yAxis: {
                    title: {
                        text: null
                    }
                },
                series: [{
                    name: '车辆速度数量',
                    data: highdata
                }]
            });
        });
     }
    highbar(highmorning);

    Highcharts.createElement('link', {
       href: '',
       rel: 'stylesheet',
       type: 'text/css'
    }, null, document.getElementsByTagName('head')[0]);

// highchart背景
    Highcharts.theme = {
       colors: ["#b1fcf4", "#90ee7e", "#f45b5b", "#7798BF", "#aaeeee", "#ff0066", "#eeaaee",
          "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"],
       chart: {
          backgroundColor: {
             linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
             stops: [
                [0, '#2a2a2b'],
                [1, '#3e3e40']
             ]
          },
          backgroundColor: 'rgba(0,0,0,0)',
          style: {
             fontFamily: "'Unica One', sans-serif"
          },
          plotBorderColor: '#606063'
       },
       title: {
          style: {
             color: '#E0E0E3',
             textTransform: 'uppercase',
             fontSize: '20px'
          }
       },
       subtitle: {
          style: {
             color: '#E0E0E3',
             textTransform: 'uppercase'
          }
       },
       xAxis: {
          gridLineColor: '#707073',
          gridLineWidth: 0,
          labels: {
             style: {
                color: '#E0E0E3',
                fontSize:'15px'
             }
          },
          lineColor: '#707073',
          minorGridLineColor: '#505053',
          tickColor: '#707073',
          title: {
             style: {
                color: '#A0A0A3'

             }
          }
       },
       yAxis: {
        gridLineWidth: 0,
          gridLineColor: '#707073',
          labels: {
             style: {
                color: '#E0E0E3',
                fontSize:'15px'
             }
          },
          lineColor: '#707073',
          minorGridLineColor: '#505053',
          tickColor: '#707073',
          tickWidth: 1,
          title: {
             style: {
                color: '#A0A0A3'
             }
          }
       },
       tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
          style: {
             color: '#F0F0F0'
          }
       },
       plotOptions: {
          series: {
             dataLabels: {
                color: '#B0B0B3'
             },
             marker: {
                lineColor: '#333'
             }
          },
          boxplot: {
             fillColor: '#505053'
          },
          candlestick: {
             lineColor: 'white'
          },
          errorbar: {
             color: 'white'
          }
       },
       legend: {
        enabled:false,
          itemStyle: {
             color: '#E0E0E3'
          },
          itemHoverStyle: {
             color: '#FFF'
          },
          itemHiddenStyle: {
             color: '#606063'
          }
       },
       credits: {
        enabled: false,
          style: {
             color: '#666'
          }
       },
       labels: {
          style: {
             color: '#707073'
          }
       },

       drilldown: {
          activeAxisLabelStyle: {
             color: '#F0F0F3'
          },
          activeDataLabelStyle: {
             color: '#F0F0F3'
          }
       },

       navigation: {
          buttonOptions: {
             symbolStroke: '#DDDDDD',
             theme: {
                fill: '#505053'
             }
          }
       },

       // scroll charts
       rangeSelector: {
          buttonTheme: {
             fill: '#505053',
             stroke: '#000000',
             style: {
                color: '#CCC'
             },
             states: {
                hover: {
                   fill: '#707073',
                   stroke: '#000000',
                   style: {
                      color: 'white'
                   }
                },
                select: {
                   fill: '#000003',
                   stroke: '#000000',
                   style: {
                      color: 'white'
                   }
                }
             }
          },
          inputBoxBorderColor: '#505053',
          inputStyle: {
             backgroundColor: '#333',
             color: 'silver'
          },
          labelStyle: {
             color: 'silver'
          }
       },

       navigator: {
          handles: {
             backgroundColor: '#666',
             borderColor: '#AAA'
          },
          outlineColor: '#CCC',
          maskFill: 'rgba(255,255,255,0.1)',
          series: {
             color: '#7798BF',
             lineColor: '#A6C7ED'
          },
          xAxis: {
             gridLineColor: '#505053'
          }
       },

       scrollbar: {
          barBackgroundColor: '#808083',
          barBorderColor: '#808083',
          buttonArrowColor: '#CCC',
          buttonBackgroundColor: '#606063',
          buttonBorderColor: '#606063',
          rifleColor: '#FFF',
          trackBackgroundColor: '#404043',
          trackBorderColor: '#404043'
       },

       // special colors for some of the
       legendBackgroundColor: 'rgba(0, 0, 0, 0.0)',
       background2: '#505053',
       dataLabelsColor: '#B0B0B3',
       textColor: '#C0C0C0',
       contrastTextColor: '#F0F0F3',
       maskColor: 'rgba(255,255,255,0.3)'
    };


    // Apply the theme
    Highcharts.setOptions(Highcharts.theme);

    // 初始化
    (function init(){
        $('#left_box ul li p:eq(0)').html('50.68%');
        $('#left_box ul li p:eq(1)').html('11.68%');
        $('#left_box ul li p:eq(2)').html('12.08%');
        $('#left_box ul li p:eq(3)').html('6.25%');
        $('#left_box ul li p:eq(4)').html('9.30%');
        $('#loader').fadeOut();
    })();
})
