// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/line
import { ResponsiveLine } from '@nivo/line'

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const data = [
    {
        "id": "japan",
        "color": "hsl(305, 70%, 50%)",
        "data": [
            {
                "x": "plane",
                "y": 207
            },
            {
                "x": "helicopter",
                "y": 108
            },
            {
                "x": "boat",
                "y": 166
            },
            {
                "x": "train",
                "y": 204
            },
            {
                "x": "subway",
                "y": 223
            },
            {
                "x": "bus",
                "y": 53
            },
            {
                "x": "car",
                "y": 295
            },
            {
                "x": "moto",
                "y": 125
            },
            {
                "x": "bicycle",
                "y": 93
            },
            {
                "x": "horse",
                "y": 47
            },
            {
                "x": "skateboard",
                "y": 106
            },
            {
                "x": "others",
                "y": 44
            }
        ]
    },
    {
        "id": "france",
        "color": "hsl(40, 70%, 50%)",
        "data": [
            {
                "x": "plane",
                "y": 20
            },
            {
                "x": "helicopter",
                "y": 122
            },
            {
                "x": "boat",
                "y": 270
            },
            {
                "x": "train",
                "y": 163
            },
            {
                "x": "subway",
                "y": 149
            },
            {
                "x": "bus",
                "y": 117
            },
            {
                "x": "car",
                "y": 70
            },
            {
                "x": "moto",
                "y": 206
            },
            {
                "x": "bicycle",
                "y": 232
            },
            {
                "x": "horse",
                "y": 290
            },
            {
                "x": "skateboard",
                "y": 234
            },
            {
                "x": "others",
                "y": 53
            }
        ]
    },
    {
        "id": "us",
        "color": "hsl(39, 70%, 50%)",
        "data": [
            {
                "x": "plane",
                "y": 113
            },
            {
                "x": "helicopter",
                "y": 208
            },
            {
                "x": "boat",
                "y": 213
            },
            {
                "x": "train",
                "y": 104
            },
            {
                "x": "subway",
                "y": 42
            },
            {
                "x": "bus",
                "y": 171
            },
            {
                "x": "car",
                "y": 202
            },
            {
                "x": "moto",
                "y": 138
            },
            {
                "x": "bicycle",
                "y": 62
            },
            {
                "x": "horse",
                "y": 246
            },
            {
                "x": "skateboard",
                "y": 286
            },
            {
                "x": "others",
                "y": 28
            }
        ]
    },
    {
        "id": "germany",
        "color": "hsl(265, 70%, 50%)",
        "data": [
            {
                "x": "plane",
                "y": 33
            },
            {
                "x": "helicopter",
                "y": 216
            },
            {
                "x": "boat",
                "y": 140
            },
            {
                "x": "train",
                "y": 7
            },
            {
                "x": "subway",
                "y": 219
            },
            {
                "x": "bus",
                "y": 195
            },
            {
                "x": "car",
                "y": 178
            },
            {
                "x": "moto",
                "y": 95
            },
            {
                "x": "bicycle",
                "y": 250
            },
            {
                "x": "horse",
                "y": 289
            },
            {
                "x": "skateboard",
                "y": 123
            },
            {
                "x": "others",
                "y": 278
            }
        ]
    },
    {
        "id": "norway",
        "color": "hsl(259, 70%, 50%)",
        "data": [
            {
                "x": "plane",
                "y": 243
            },
            {
                "x": "helicopter",
                "y": 235
            },
            {
                "x": "boat",
                "y": 144
            },
            {
                "x": "train",
                "y": 28
            },
            {
                "x": "subway",
                "y": 36
            },
            {
                "x": "bus",
                "y": 178
            },
            {
                "x": "car",
                "y": 151
            },
            {
                "x": "moto",
                "y": 67
            },
            {
                "x": "bicycle",
                "y": 109
            },
            {
                "x": "horse",
                "y": 266
            },
            {
                "x": "skateboard",
                "y": 27
            },
            {
                "x": "others",
                "y": 166
            }
        ]
    }
]

const MyResponsiveLine = ({ data /* see data tab */ }) => (
    <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: true,
            reverse: false
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'transportation',
            legendOffset: 36,
            legendPosition: 'middle'
        }}
        axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'count',
            legendOffset: -40,
            legendPosition: 'middle'
        }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    />
)
