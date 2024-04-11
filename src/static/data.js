import { BarChart, GradientChart, MultiAxisLineChart, PieChart } from "../components/charts";

export const widgetData = {
    1: {
        name: "Bar chart",
        component: <BarChart />,
    },
    2: {
        name: "Pie chart",
        component: <PieChart />,
    },
    3: {
        name: "Gradient Chart",
        component: <GradientChart />,
    },
    4: {
        name: "MultiAxis Line Chart",
        component: <MultiAxisLineChart />,
    },
};