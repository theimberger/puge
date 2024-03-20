export default interface BudgetType {
  name: string;
  unit: string;
  unitPlacement: string;
  theme: string;
  period: string;
  rolling: boolean;
  limit: number;
  current?: number;
  lines?: { change: number; date: string; }[];
  decimalType: string;
  lastInterval?: string;
}
