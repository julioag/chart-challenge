export interface InvestmentData {
  contributions: number;
  dailyReturn: number;
  date: { seconds: number, nanoseconds: number };
  portfolioIndex: number;
  portfolioValue: number;
}

interface Dataset {
  label: string;
  data: number[];
  fill: boolean;
  backgroundColor: string;
  borderColor: string;
}

export interface ChartData {
  labels: string[];
  datasets: Array<Dataset>;
}