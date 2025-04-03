export interface Project {
  id: number;
  name: string;
  status: "Zaplanowany" | "W trakcie" | "Zakończony" | "Wstrzymany";
  progress: number;
  deadline: string;
  priority: "Krytyczny" | "Wysoki" | "Średni" | "Niski";
  members: number;
}

export interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  trend: {
    value: string;
    positive: boolean;
  };
}

export interface ProjectCardProps {
  title: string;
  progress: number;
  dueDate: string;
  members: number;
}

export interface Activity {
  id: number;
  user: string;
  action: string;
  target: string;
  time: string;
}
