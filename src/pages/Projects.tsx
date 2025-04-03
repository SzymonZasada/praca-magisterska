import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Project } from "@/types";
import {
  ArrowDown,
  ArrowUp,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
} from "lucide-react";
import { useState } from "react";

interface SortConfig {
  key: keyof Project;
  direction: "asc" | "desc";
}

const Projects: React.FC = () => {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "name",
    direction: "asc",
  });

  // Przykładowe dane projektów
  const projects: Project[] = [
    {
      id: 1,
      name: "Redesign strony internetowej",
      status: "W trakcie",
      progress: 75,
      deadline: "2025-04-15",
      priority: "Wysoki",
      members: 5,
    },
    {
      id: 2,
      name: "Aplikacja mobilna",
      status: "W trakcie",
      progress: 45,
      deadline: "2025-05-20",
      priority: "Średni",
      members: 3,
    },
    {
      id: 3,
      name: "System analityczny",
      status: "W trakcie",
      progress: 90,
      deadline: "2025-04-10",
      priority: "Krytyczny",
      members: 4,
    },
    {
      id: 4,
      name: "Kampania marketingowa",
      status: "Zaplanowany",
      progress: 0,
      deadline: "2025-05-01",
      priority: "Niski",
      members: 2,
    },
    {
      id: 5,
      name: "Aktualizacja bazy danych",
      status: "Zakończony",
      progress: 100,
      deadline: "2025-03-30",
      priority: "Wysoki",
      members: 2,
    },
    {
      id: 6,
      name: "Optymalizacja wydajności",
      status: "Wstrzymany",
      progress: 60,
      deadline: "2025-04-25",
      priority: "Średni",
      members: 3,
    },
  ];

  const requestSort = (key: keyof Project) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedProjects = [...projects].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  const getStatusColor = (status: Project["status"]): string => {
    const statusColors: Record<Project["status"], string> = {
      Zaplanowany:
        "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
      "W trakcie":
        "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
      Zakończony:
        "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
      Wstrzymany:
        "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
    };

    return (
      statusColors[status] ||
      "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-400"
    );
  };

  const getPriorityColor = (priority: Project["priority"]): string => {
    const priorityColors: Record<Project["priority"], string> = {
      Krytyczny: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
      Wysoki:
        "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
      Średni:
        "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
      Niski:
        "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    };

    return (
      priorityColors[priority] ||
      "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-400"
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight dark:text-white">
            Projekty
          </h1>
          <p className="text-muted-foreground dark:text-slate-400">
            Zarządzaj swoimi projektami
          </p>
        </div>
        <Button className="flex items-center gap-1">
          <Plus className="h-4 w-4" />
          <span>Nowy projekt</span>
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          {/* Filtry i wyszukiwanie */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input placeholder="Szukaj projektów..." className="pl-10" />
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
              <Select defaultValue="all">
                <SelectTrigger className="w-full sm:w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Wszystkie</SelectItem>
                  <SelectItem value="active">W trakcie</SelectItem>
                  <SelectItem value="completed">Zakończone</SelectItem>
                  <SelectItem value="planned">Zaplanowane</SelectItem>
                  <SelectItem value="paused">Wstrzymane</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="all">
                <SelectTrigger className="w-full sm:w-32">
                  <SelectValue placeholder="Priorytet" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Wszystkie</SelectItem>
                  <SelectItem value="critical">Krytyczny</SelectItem>
                  <SelectItem value="high">Wysoki</SelectItem>
                  <SelectItem value="medium">Średni</SelectItem>
                  <SelectItem value="low">Niski</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Tabela projektów */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead
                    className="w-[300px] cursor-pointer"
                    onClick={() => requestSort("name")}
                  >
                    <div className="flex items-center gap-1">
                      Nazwa projektu
                      {sortConfig.key === "name" &&
                        (sortConfig.direction === "asc" ? (
                          <ArrowUp className="h-3 w-3" />
                        ) : (
                          <ArrowDown className="h-3 w-3" />
                        ))}
                    </div>
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Postęp</TableHead>
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => requestSort("deadline")}
                  >
                    <div className="flex items-center gap-1">
                      Termin
                      {sortConfig.key === "deadline" &&
                        (sortConfig.direction === "asc" ? (
                          <ArrowUp className="h-3 w-3" />
                        ) : (
                          <ArrowDown className="h-3 w-3" />
                        ))}
                    </div>
                  </TableHead>
                  <TableHead>Priorytet</TableHead>
                  <TableHead>Zespół</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedProjects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell className="font-medium">
                      {project.name}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={getStatusColor(project.status)}
                      >
                        {project.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress
                          value={project.progress}
                          className="h-2 w-20"
                        />
                        <span className="text-xs text-muted-foreground">
                          {project.progress}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {new Date(project.deadline).toLocaleDateString("pl-PL")}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={getPriorityColor(project.priority)}
                      >
                        {project.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <span className="text-sm">{project.members} osób</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edytuj</DropdownMenuItem>
                          <DropdownMenuItem>Pokaż szczegóły</DropdownMenuItem>
                          <DropdownMenuItem>Archiwizuj</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600 dark:text-red-400">
                            Usuń
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Projects;
