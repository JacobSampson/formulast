import { CellModel } from "../../lib/core";

export const testCells__UCB: CellModel[][] = [
    [{"value": "\"Parent(n) Plays\"b" }, { "value": "\"Wins(n)\"b" }, { "value": "\"Plays(n)\"" }],
    [{ "value": "2" }, { "value": "0" }, { "value": "1" }],
    [null,null,null],
    [{ "value": "\"UCB\"r", "variant": "primary" }, { "value": "=B2/C2+sqrt(2*log(A2,e)/C2)", "disabled": true },null]
];

export const testCells: CellModel[][] = [
    [
        {
            "value": "\"Current Assets\"d",
            "variant": "secondary",
            "unit": "$"
        },
        {
            "value": "\"Inventory\"d",
            "variant": "secondary",
            "unit": "$"
        },
        {
            "value": "\"Current Liabilities\"d",
            "variant": "secondary",
            "unit": "$"
        }
    ],
    [
        {
            "value": "1000",
            "tag": "A2"
        },
        {
            "value": "100",
            "tag": "B2"
        },
        {
            "value": "100",
            "tag": "C2"
        }
    ],
    [
        null,
        null,
        null
    ],
    [
        {
            "value": "\"Quick Ratio\"r",
            "variant": "primary",
            "unit": "%"
        },
        {
            "value": "=B5*100",
            "tag": "B4"
        },
        null
    ],
    [
        {
            "value": "\"Quick Ratio\"r",
            "variant": "primary"
        },
        {
            "value": "=(A2-B2)/C2",
            "tag": "B5"
        },
        null
    ]
];
