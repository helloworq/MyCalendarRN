import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Button,
    FlatList,
    TouchableOpacity,
} from 'react-native'
import Svg, {
    Circle,
    Ellipse,
    G,
    Text,
    TSpan,
    TextPath,
    Path,
    Polygon,
    Polyline,
    Line,
    Rect,
    Use,
    Image,
    Symbol,
    Defs,
    LinearGradient,
    RadialGradient,
    Stop,
    ClipPath,
    Pattern,
    Mask,
    SvgXml,
} from 'react-native-svg';

const MySvgChart = () => {
    const yuebaoxml = `<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1696756542930" class="icon" 
     viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="19270" xmlns:xlink="http://www.w3.org/1999/xlink" width="26" height="26"><path d="M398.517389 256.714779l235.342006 0 63.10627-86.570681c0 0 47.312562-57.732889-15.794731-83.421968-60.335157-24.580838-156.751067-22.655999-164.971285-22.452361-8.268314-0.203638-104.636129-2.128477-164.971285 22.452361-63.082734 25.688055-15.818267 83.421968-15.818267 83.421968L398.517389 256.714779z" fill="#F15A4A" p-id="19271"></path><path d="M621.095697 301.054637 406.997528 301.054637c0 0-283.274692 105.657388-283.274692 397.165602 0 254.790964 311.719534 262.703167 390.323776 260.686231 78.623685 2.015913 390.323776-5.895267 390.323776-260.686231C904.370389 406.712025 621.095697 301.054637 621.095697 301.054637zM592.014358 654.969179l63.958684 0c14.856359 0 26.900673 11.93789 26.900673 26.894534 0 14.853289-12.170181 26.894534-27.00812 26.894534L551.712467 708.758246l0 115.895567c0 15.084557-12.193717 27.313066-27.472702 27.313066-15.172561 0-27.472702-12.446473-27.472702-27.313066L496.767064 708.758246l-97.339956 0c-14.915711 0-27.00812-11.93789-27.00812-26.894534 0-14.853289 11.965519-26.894534 26.721595-26.894534l97.626481 0 0-55.239092-96.52438 0c-15.366989 0-27.823696-12.325723-27.823696-27.76946 0-15.33629 12.554944-27.76946 27.823696-27.76946l62.394049 0-72.256674-72.256674c-9.638521-9.638521-9.674337-25.229614 0.069585-34.974559 9.677407-9.677407 25.282826-9.761318 34.974559-0.069585l83.372849 83.372849c6.481621 6.481621 8.599865 15.651468 6.342452 23.928992l5.38873 0c-1.397836-7.819083 0.924045-16.136515 6.953366-22.165836l84.854597-84.854597c9.863648-9.863648 25.746384-9.777691 35.595706 0.071631 9.917884 9.917884 9.881045 25.786293 0.070608 35.595706l-71.354118 71.353095 78.400604 0c15.366989 0 27.823696 12.325723 27.823696 27.76946 0 15.33629-12.554944 27.76946-27.823696 27.76946L551.712467 599.73111l0 55.239092L592.014358 654.970202z" fill="#F15A4A" p-id="19272"></path></svg>`
    const wechatxml = `<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1696756530339" class="icon" 
     viewBox="0 0 1076 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="18079" xmlns:xlink="http://www.w3.org/1999/xlink" width="26" height="26"><path d="M410.493712 644.226288c-64.448471 36.97706-74.006881-20.759958-74.006881-20.759958l-80.772173-193.983933c-31.078562-92.178305 26.897497-41.56191 26.897498-41.561909s49.746372 38.732181 87.50193 62.333712c37.732946 23.602608 80.745253 6.927882 80.745254 6.927882l528.043743-250.842313C881.479874 81.578667 720.547129 0 538.352656 0 241.013636 0 0 217.098768 0 484.919453c0 154.046856 79.806318 291.154103 204.11518 380.019214L181.698086 997.56551s-10.92805 38.720336 26.945952 20.759958c25.808892-12.243853 91.603314-56.122953 130.768353-82.82771 61.570288 22.083298 128.651441 34.345455 198.970414 34.345455 297.315331 0 538.378498-217.098768 538.378499-484.924837 0-77.573115-20.313102-150.8338-56.295235-215.861568-168.236416 104.176656-559.545472 346.282128-609.973434 375.167327z" fill="#1EBE1F" p-id="18080"></path></svg>`
    const alipayxml = `<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1696755426904" class="icon" 
     viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="16890" xmlns:xlink="http://www.w3.org/1999/xlink" width="26" height="26"><path d="M300.8 579.2c-108.8 9.6-137.6 64-137.6 115.2S192 816 320 816c131.2 0 240-150.4 240-150.4s-147.2-96-259.2-86.4z" p-id="16891" fill="#1296db"></path><path d="M646.4 713.6S576 800 505.6 838.4c-70.4 38.4-153.6 64-240 38.4-89.6-22.4-150.4-89.6-140.8-208 9.6-118.4 121.6-160 214.4-160 92.8 0 265.6 67.2 265.6 67.2s16-38.4 28.8-80 19.2-76.8 19.2-76.8H281.6v-38.4h179.2v-80l-224 3.2v-54.4h224V128h118.4v121.6h240V304l-240 3.2V384l198.4 3.2s-3.2 41.6-28.8 118.4c-25.6 76.8-48 115.2-48 115.2L992 729.6V147.2C992 83.2 940.8 32 876.8 32H147.2C83.2 32 32 83.2 32 147.2v729.6c0 64 51.2 115.2 115.2 115.2h729.6c54.4 0 102.4-38.4 112-89.6L646.4 713.6z" p-id="16892" fill="#1296db"></path></svg>`
    const icbcxml = `<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1696756554895" class="icon" 
     viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="20306" xmlns:xlink="http://www.w3.org/1999/xlink" width="26" height="26"><path d="M1004.416 502.186667c0 277.333333-224.853333 502.186667-502.186667 502.186666C224.853333 1004.373333 0 779.52 0 502.186667S224.853333 0 502.186667 0c277.376 0 502.229333 224.853333 502.229333 502.186667z m-67.328 0c0-240.213333-194.688-434.858667-434.858667-434.858667-240.213333 0-434.901333 194.688-434.901333 434.858667 0 240.213333 194.730667 434.901333 434.901333 434.901333s434.858667-194.730667 434.858667-434.901333zM476.202667 250.325333V333.653333H282.794667l1.066666 77.994667 192.341334 1.066667v210.517333l-192.341334 1.024v90.88l192.341334 1.066667v67.285333H204.8v-237.226667h198.741333v-67.285333H204.8v-228.693333h271.402667z m47.189333 0h271.36v228.693334H596.053333v67.285333h198.741334v237.226667h-271.402667v-67.328l192.298667-1.066667v-90.837333l-192.298667-1.066667V412.757333l192.298667-1.066666 1.066666-78.037334h-193.365333V250.325333z" fill="#C3282B" p-id="20307"></path></svg>`
    const yuexml = `<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1696756571560" class="icon" 
     viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="21344" xmlns:xlink="http://www.w3.org/1999/xlink" width="26" height="26"><path d="M512.001 0.007C229.234 0.007 0.007 229.234 0.007 512.001c0 282.766 229.228 511.993 511.994 511.993s511.993-229.228 511.993-511.993C1023.994 229.234 794.767 0.007 512.001 0.007z m305.465 817.459c-39.699 39.699-85.906 70.859-137.338 92.613-53.207 22.504-109.773 33.915-168.127 33.915-58.354 0-114.92-11.411-168.127-33.915-51.432-21.754-97.64-52.914-137.339-92.613s-70.858-85.906-92.612-137.338c-22.505-53.207-33.916-109.773-33.916-168.127 0-58.354 11.411-114.92 33.916-168.127 21.754-51.432 52.913-97.64 92.613-137.339 39.699-39.7 85.907-70.859 137.339-92.613 53.207-22.505 109.773-33.916 168.127-33.916 58.354 0 114.92 11.411 168.127 33.916 51.432 21.754 97.639 52.913 137.338 92.612 39.699 39.7 70.859 85.907 92.613 137.339C932.585 397.08 943.995 453.646 943.995 512c0 58.354-11.41 114.92-33.915 168.127-21.755 51.433-52.915 97.64-92.614 137.339z" p-id="21345" fill="#1296db"></path><path d="M706.122 312.411c-3.674-30.973-20.976-48.274-51.948-51.948-18.242 1.837-31.912 9.143-41.012 21.873L512 427.243 410.838 282.335c-9.142-12.73-22.813-20.036-41.011-21.873-31.015 3.674-48.317 20.976-51.948 51.948 0 10.937 3.631 20.976 10.937 30.075l87.491 123.034H358.89c-20.078 1.837-31.015 11.877-32.809 30.076 1.794 18.242 12.731 28.281 32.809 30.075h101.163v46.48H358.89c-20.078 1.837-31.015 11.876-32.809 30.075 1.794 18.24 12.731 28.281 32.809 30.075h101.163v84.757c1.794 31.016 19.138 46.48 51.947 46.48s50.111-15.465 51.949-46.48V632.3H665.11c20.036-1.794 30.973-11.835 32.809-30.075-1.836-18.199-12.772-28.238-32.809-30.075H563.949v-46.48H665.11c20.036-1.794 30.973-11.833 32.809-30.075-1.836-18.199-12.772-28.239-32.809-30.076h-57.417l87.492-123.034c7.263-9.099 10.937-19.138 10.937-30.074z" p-id="21346" fill="#1296db"></path></svg>`
    const jijinxml = `<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1696756587530" class="icon" 
     viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="22461" xmlns:xlink="http://www.w3.org/1999/xlink" width="26" height="26"><path d="M919.683072 64.825344 104.044544 64.825344c-21.639168 0-39.349248 17.708032-39.349248 39.303168l0 815.683584c0 21.682176 17.71008 39.390208 39.349248 39.390208l815.638528 0c21.636096 0 39.349248-17.708032 39.349248-39.390208L959.03232 104.128512C959.03232 82.533376 941.319168 64.825344 919.683072 64.825344zM664.9856 649.032704 560.877568 544.946176 389.7344 751.8464l-74.020864-65.773568L183.66464 806.918144l-62.476288-68.258816 193.575936-177.133568 64.758784 57.50784L554.417152 407.612416l101.3504 101.377024 182.760448-238.347264 73.408512 56.287232L664.9856 649.032704z" p-id="22462" fill="#13227a"></path></svg>`
    const sodexoxml = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
    <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.0//EN" "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">
    <!-- Created with Inkscape (http://www.inkscape.org/) by Marsupilami -->
    <svg
       xmlns:svg="http://www.w3.org/2000/svg"
       xmlns="http://www.w3.org/2000/svg"
       version="1.0"
       width="512"
       height="512"
       viewBox="0 0 1024 1024"
       id="svg6217">
      <defs
         id="defs6219" />
      <path
         d="M 62.52625,26.30725 L 61.06375,33.611 C 60.42,36.57225 58.63625,38.5485 54.9925,38.5485 C 50.81,38.5485 49.70625,35.95475 50.62375,32.30475 C 51.9225,27.12725 56.14625,25.58475 62.52625,26.30725 M 69.1125,15.86475 L 64.66625,16.1485 L 63.26,23.29975 C 61.56,23.23975 61.025,23.186 59.02625,23.186 C 52.76875,23.186 47.3075,25.816 45.865,31.986 C 44.565,37.5485 47.725,41.866 54.61625,41.866 C 61.675,41.866 64.74625,38.1835 65.85,33.00475 L 69.1125,15.86475 z"
         id="path5955"
         style="fill:#2b3797;fill-opacity:1;fill-rule:nonzero;stroke:none" />
      <path
         d="M 20.875,26.61887 C 14.355,26.02512 8.74625,26.56637 8.655,28.78012 C 8.51375,32.10387 19.40125,29.20387 19.19125,35.31887 C 18.885,44.30262 3.74625,42.23637 0,41.09262 L 0.68,38.42637 C 7.13875,39.45137 13.9525,39.53637 14.1025,35.97387 C 14.2625,32.18762 3.33,35.59137 3.58625,29.46012 C 3.7775,24.89262 10.61,22.43012 21.79375,24.07262 L 20.875,26.61887 z"
         id="path5959"
         style="fill:#2b3797;fill-opacity:1;fill-rule:nonzero;stroke:none" />
      <path
         d="M 38.45513,32.73013 C 37.51388,36.48013 34.54013,38.83513 30.99888,38.83513 C 27.29638,38.83513 25.63013,36.68888 26.62263,32.73013 C 27.56513,28.98013 30.57388,26.46263 34.11388,26.46263 C 37.65138,26.46263 39.39638,28.98013 38.45513,32.73013 M 34.68388,23.39263 C 28.20013,23.39263 22.98763,27.14388 21.70638,32.73013 C 20.42138,38.32013 23.91263,42.07013 30.39388,42.07013 C 36.87513,42.07013 42.08888,38.32013 43.37138,32.73013 C 44.65638,27.14388 41.16638,23.39263 34.68388,23.39263"
         id="path5963"
         style="fill:#2b3797;fill-opacity:1;fill-rule:nonzero;stroke:none" />
      <path
         d="M 109.599,41.97526 L 103.96275,41.97526 C 100.54525,38.76151 94.0065,31.37776 89.19275,23.56401 L 93.329,23.56401 C 97.90025,29.87151 109.599,41.97526 109.599,41.97526"
         id="path5967"
         style="fill:#2b3797;fill-opacity:1;fill-rule:nonzero;stroke:none" />
      <path
         d="M 115.5055,5.40625 L 118.098,-5.6843419e-14 L 118.838,5.49625 L 124.1255,3.64625 L 120.4305,8.38375 L 124.438,11.48875 L 119.08925,11.9025 L 118.79425,17.6175 L 115.8205,13.39375 L 111.44925,17.42375 L 113.088,11.745 L 107.933,11.04625 L 112.9505,8.1875 L 110.89175,3.29625 L 115.5055,5.40625 z"
         id="path5971"
         style="fill:#2b3797;fill-opacity:1;fill-rule:nonzero;stroke:none" />
      <path
         d="M 126.4965,32.78676 C 125.54025,36.59551 122.52025,38.98801 118.924,38.98801 C 115.164,38.98801 113.469,36.80801 114.479,32.78676 C 115.43525,28.97801 118.49025,26.42051 122.08525,26.42051 C 125.68275,26.42051 127.454,28.97801 126.4965,32.78676 M 122.66525,23.29926 C 116.0815,23.29926 110.78775,27.11051 109.48275,32.78676 C 108.179,38.46426 111.72525,42.27426 118.309,42.27426 C 124.894,42.27426 130.189,38.46426 131.4915,32.78676 C 132.7965,27.11051 129.25025,23.29926 122.66525,23.29926"
         id="path5975"
         style="fill:#2b3797;fill-opacity:1;fill-rule:nonzero;stroke:none" />
      <path
         d="M 84.92138,40.40587 C 95.56638,34.49337 104.81263,25.40712 111.37138,17.55212 C 106.65638,32.30962 95.30638,40.25212 84.92138,40.40587"
         id="path5979"
         style="fill:#ed1c24;fill-opacity:1;fill-rule:nonzero;stroke:none" />
      <path
         d="M 80.708,26.13137 C 82.74675,26.13137 83.85675,26.87137 83.85675,28.28512 C 83.85675,32.03762 76.5405,31.79012 73.31425,31.13262 C 74.44925,28.32387 77.01175,26.13137 80.708,26.13137 M 88.24175,28.08012 C 88.24175,25.35887 86.073,23.35887 81.15175,23.35887 C 73.1705,23.35887 67.98425,28.54012 67.98425,34.95387 C 67.98425,39.09637 71.423,42.53887 77.70425,42.53887 C 82.03175,42.53887 84.92175,40.40637 84.92175,40.40637 C 79.41425,40.99637 72.6505,40.40637 72.6505,34.51387 C 72.6505,34.28012 72.663,34.04637 72.68175,33.81262 C 80.19675,35.37262 88.24175,33.48512 88.24175,28.08012"
         id="path5983"
         style="fill:#2b3797;fill-opacity:1;fill-rule:nonzero;stroke:none" />
    </svg>
    <!-- version: 20090314, original size: 131.75937 42.538872, border: 3% -->
    `

    const radius = 10
    const left = 10
    const padding = 5
    const progressPositionY = 40
    const progressWidth = 35
    const textInit = 25

    const ProgressGroup = ({ data }) => {

        let mapData = []
        for (let i = 0; i < data.length; i++) {
            const current = data[i]
            let temp = <>
                <Rect onPress={() => console.log(current['name'])} x={left} y={i * progressPositionY} rx={radius} height={progressWidth} width={current['width']} fill={current['color']} />
                <G x={left + padding} y={padding + progressPositionY * i}>
                    <SvgXml xml={current['xml']} />
                </G>
                <Text x={(current['width'] + left) / 2.5} y={textInit + i * progressPositionY} fill="gray" fontSize="15"> {current['name']} </Text>
                <Text x={(current['width'] + left)} y={textInit + i * progressPositionY} fill="black" fontSize="20"> {current['amount']} </Text>
            </>
            mapData.push(temp)
        }

        return (<>
            <View style={{ width: 400, height: 300, marginTop: 10 }}>
                <Svg height="100%" width="100%">
                    {mapData}
                </Svg>
            </View>

        </>)
    }

    const data = [
        {
            width: 100,
            name: "Wechat",
            xml: wechatxml,
            color: '#adebad',
            amount: 99999,
        },
        {
            width: 150,
            name: "Alipay",
            xml: alipayxml,
            color: 'skyblue',
            amount: 10000,
        },
        {
            width: 200,
            name: "ICBC",
            xml: icbcxml,
            color: '#ffb3b3',
            amount: 100000,
        },
        {
            width: 260,
            name: "余额宝",
            xml: yuebaoxml,
            color: 'orange',
            amount: 88888,
        },
        {
            width: 310,
            name: "Sodexo",
            xml: sodexoxml,
            color: 'skyblue',
            amount: 66666,
        },
        {
            width: 310,
            name: "基金",
            xml: jijinxml,
            color: 'skyblue',
            amount: 66666,
        },
        {
            width: 310,
            name: "余额",
            xml: yuexml,
            color: 'skyblue',
            amount: 66666,
        },
    ]


    return (
        <>
            <View style={{ flex: 1 }}>
                <ProgressGroup data={data} />
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <Button title='明细' />
                    <Button title='趋势' />
                    <Button title='修改' />
                </View>
            </View>
        </>
    )
}

export default MySvgChart