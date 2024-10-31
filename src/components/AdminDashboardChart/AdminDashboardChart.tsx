import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type IChartData = {
  month: string;
  bookings: number;
};

type AdminDashboardChartProps = {
  data: IChartData[];
};

const AdminDashboardChart = ({ data }: AdminDashboardChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="bookings" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default AdminDashboardChart;
