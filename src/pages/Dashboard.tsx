import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Activity as ActivityType,
  ProjectCardProps,
  StatsCardProps,
} from "@/types";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  Briefcase,
  Clock,
  Users,
} from "lucide-react";

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight dark:text-white">
          Dashboard
        </h1>
        <p className="text-muted-foreground dark:text-slate-400">
          Przegląd Twoich projektów i aktywności
        </p>
      </div>

      {/* Karty statystyk */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Całkowite projekty"
          value="12"
          icon={Briefcase}
          trend={{ value: "+4.5%", positive: true }}
        />
        <StatsCard
          title="Aktywne zadania"
          value="24"
          icon={Activity}
          trend={{ value: "-2.3%", positive: false }}
        />
        <StatsCard
          title="Czas pracy"
          value="32h"
          icon={Clock}
          trend={{ value: "+12%", positive: true }}
        />
        <StatsCard
          title="Członkowie zespołu"
          value="8"
          icon={Users}
          trend={{ value: "+1", positive: true }}
        />
      </div>

      {/* Zakładki z zawartością */}
      <Tabs defaultValue="projects" className="space-y-4">
        <TabsList>
          <TabsTrigger value="projects">Projekty</TabsTrigger>
          <TabsTrigger value="activity">Aktywność</TabsTrigger>
          <TabsTrigger value="stats">Statystyki</TabsTrigger>
        </TabsList>

        <TabsContent value="projects" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <ProjectCard
              title="Redesign strony internetowej"
              progress={75}
              dueDate="2025-04-15"
              members={5}
            />
            <ProjectCard
              title="Aplikacja mobilna"
              progress={45}
              dueDate="2025-05-20"
              members={3}
            />
            <ProjectCard
              title="System analityczny"
              progress={90}
              dueDate="2025-04-10"
              members={4}
            />
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Ostatnia aktywność</CardTitle>
            </CardHeader>
            <CardContent>
              <ActivityList />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stats" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Podsumowanie czasu</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center border border-dashed rounded-lg bg-slate-50 dark:bg-slate-800 dark:border-slate-700">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Wykresy statystyk (przykładowe dane)
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon: Icon,
  trend,
}) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground dark:text-slate-400">
              {title}
            </p>
            <h3 className="text-2xl font-bold mt-1 dark:text-white">{value}</h3>
          </div>
          <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
            <Icon className="h-5 w-5 text-slate-600 dark:text-slate-400" />
          </div>
        </div>
        <div className="mt-4">
          <span
            className={`text-xs font-medium flex items-center ${
              trend.positive ? "text-green-600" : "text-red-600"
            }`}
          >
            {trend.positive ? (
              <ArrowUpRight className="h-3 w-3 mr-1" />
            ) : (
              <ArrowDownRight className="h-3 w-3 mr-1" />
            )}
            {trend.value} od ostatniego tygodnia
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  progress,
  dueDate,
  members,
}) => {
  const date = new Date(dueDate);
  const formattedDate = new Intl.DateTimeFormat("pl-PL", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-base dark:text-white">{title}</h3>
          <span className="text-xs bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-full dark:text-slate-300">
            {progress}%
          </span>
        </div>

        <Progress value={progress} className="h-2 mt-4" />

        <div className="mt-4 flex justify-between text-sm text-muted-foreground">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            <span>{members}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const ActivityList: React.FC = () => {
  const activities: ActivityType[] = [
    {
      id: 1,
      user: "Anna Kowalska",
      action: "dodała komentarz do",
      target: "Redesign strony internetowej",
      time: "2 godziny temu",
    },
    {
      id: 2,
      user: "Jan Nowak",
      action: "zaktualizował zadanie",
      target: "Implementacja formularza kontaktowego",
      time: "3 godziny temu",
    },
    {
      id: 3,
      user: "Tomasz Wiśniewski",
      action: "utworzył nowy projekt",
      target: "System raportowania",
      time: "5 godzin temu",
    },
    {
      id: 4,
      user: "Magdalena Zielińska",
      action: "zakończyła zadanie",
      target: "Projektowanie interfejsu",
      time: "wczoraj",
    },
    {
      id: 5,
      user: "Piotr Dąbrowski",
      action: "przypisał zadanie do",
      target: "Anna Kowalska",
      time: "wczoraj",
    },
  ];

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Użytkownik</TableHead>
          <TableHead>Akcja</TableHead>
          <TableHead>Czas</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {activities.map((activity) => (
          <TableRow key={activity.id}>
            <TableCell className="font-medium">{activity.user}</TableCell>
            <TableCell>
              {activity.action}{" "}
              <span className="font-medium">{activity.target}</span>
            </TableCell>
            <TableCell className="text-muted-foreground">
              {activity.time}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default Dashboard;
