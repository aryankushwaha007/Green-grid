"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Plus, Clock, MapPin, User } from "lucide-react";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { useTasks } from "@/hooks/useData";
import { Task } from "@/lib/db";
import { Skeleton } from "@/components/ui/skeleton";

export default function TasksPage() {
    const { tasks, isLoading, createTask, updateTask } = useTasks();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [newTask, setNewTask] = useState<Partial<Task>>({
        priority: "medium",
        status: "to_do",
        type: "inspection"
    });

    const handleCreateTask = async () => {
        await createTask(newTask);
        setIsDialogOpen(false);
        setNewTask({ priority: "medium", status: "to_do", type: "inspection" });
    };

    const handleCompleteTask = (taskId: string) => {
        updateTask(taskId, {
            status: 'completed',
            progress: 100
        });
    };

    const handleAssignTechnician = (taskId: string) => {
        // Mock assignment
        updateTask(taskId, {
            assigned_to: { name: "Technician " + Math.floor(Math.random() * 10) },
            status: 'in_progress'
        });
    };

    if (isLoading) {
        return <TasksSkeleton />;
    }

    const getTasksByStatus = (status: Task["status"]) => {
        return tasks?.filter((task) => task.status === status) || [];
    };

    return (
        <div className="space-y-6 h-[calc(100vh-8rem)] flex flex-col">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Technician Tasks</h1>
                    <p className="text-muted-foreground">Manage and track maintenance activities.</p>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            New Task
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Create New Task</DialogTitle>
                            <DialogDescription>
                                Assign a new maintenance task to a technician.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="facility" className="text-right">
                                    Facility
                                </Label>
                                <Select onValueChange={(val) => setNewTask({ ...newTask, facility_id: val })}>
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Select facility" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="facility-sakaka-001">Sakaka Solar Complex</SelectItem>
                                        <SelectItem value="facility-dumat-001">Dumat Al-Jandal Solar</SelectItem>
                                        <SelectItem value="facility-eastern-001">Eastern Province Hybrid</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="type" className="text-right">
                                    Type
                                </Label>
                                <Select onValueChange={(val) => setNewTask({ ...newTask, type: val })}>
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="inspection">Inspection</SelectItem>
                                        <SelectItem value="repair">Repair</SelectItem>
                                        <SelectItem value="cleaning">Cleaning</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="title" className="text-right">
                                    Title
                                </Label>
                                <Input
                                    id="title"
                                    placeholder="Task title"
                                    className="col-span-3"
                                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="description" className="text-right">
                                    Details
                                </Label>
                                <Textarea
                                    id="description"
                                    placeholder="Task details..."
                                    className="col-span-3"
                                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button onClick={handleCreateTask}>Create Task</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 min-h-0">
                {/* To Do Column */}
                <div className="flex flex-col gap-4 bg-muted/30 p-4 rounded-lg border border-border/50">
                    <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-sm uppercase text-muted-foreground">To Do</h3>
                        <Badge variant="secondary" className="rounded-full">{getTasksByStatus("to_do").length}</Badge>
                    </div>
                    <div className="flex-1 overflow-y-auto space-y-3">
                        {getTasksByStatus("to_do").map((task) => (
                            <TaskCard
                                key={task.id}
                                task={task}
                                onAssign={() => handleAssignTechnician(task.id)}
                            />
                        ))}
                    </div>
                </div>

                {/* In Progress Column */}
                <div className="flex flex-col gap-4 bg-muted/30 p-4 rounded-lg border border-border/50">
                    <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-sm uppercase text-blue-500">In Progress</h3>
                        <Badge variant="secondary" className="rounded-full">{getTasksByStatus("in_progress").length}</Badge>
                    </div>
                    <div className="flex-1 overflow-y-auto space-y-3">
                        {getTasksByStatus("in_progress").map((task) => (
                            <TaskCard
                                key={task.id}
                                task={task}
                                onComplete={() => handleCompleteTask(task.id)}
                            />
                        ))}
                    </div>
                </div>

                {/* Completed Column */}
                <div className="flex flex-col gap-4 bg-muted/30 p-4 rounded-lg border border-border/50">
                    <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-sm uppercase text-emerald-500">Completed</h3>
                        <Badge variant="secondary" className="rounded-full">{getTasksByStatus("completed").length}</Badge>
                    </div>
                    <div className="flex-1 overflow-y-auto space-y-3">
                        {getTasksByStatus("completed").map((task) => (
                            <TaskCard key={task.id} task={task} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function TaskCard({ task, onAssign, onComplete }: { task: Task; onAssign?: () => void; onComplete?: () => void }) {
    return (
        <Card className="cursor-pointer hover:border-primary/50 transition-colors">
            <CardContent className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                    <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-5 uppercase">
                        {task.type}
                    </Badge>
                    <StatusBadge
                        status={task.priority === "high" || task.priority === "critical" ? "failure" : task.priority === "medium" ? "warning" : "neutral"}
                        label={task.priority}
                        className="text-[10px] px-1.5 py-0 h-5 uppercase"
                    />
                </div>
                <div>
                    <h4 className="font-medium text-sm leading-tight mb-1">{task.title}</h4>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span className="truncate">{task.facility_id}</span>
                    </div>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border/50">
                    <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        <span>{task.assigned_to?.name || 'Unassigned'}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{new Date(task.deadline).toLocaleDateString()}</span>
                    </div>
                </div>
                <div className="flex gap-2 pt-2">
                    {onAssign && (
                        <Button size="sm" variant="secondary" className="w-full h-7 text-xs" onClick={onAssign}>
                            Assign
                        </Button>
                    )}
                    {onComplete && (
                        <Button size="sm" className="w-full h-7 text-xs bg-emerald-600 hover:bg-emerald-700" onClick={onComplete}>
                            Complete
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}

function TasksSkeleton() {
    return (
        <div className="space-y-6 h-[calc(100vh-8rem)] flex flex-col">
            <div className="flex justify-between">
                <div className="space-y-2">
                    <Skeleton className="h-8 w-64" />
                    <Skeleton className="h-4 w-48" />
                </div>
                <Skeleton className="h-10 w-32" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="flex flex-col gap-4 bg-muted/30 p-4 rounded-lg border border-border/50">
                        <div className="flex justify-between">
                            <Skeleton className="h-5 w-24" />
                            <Skeleton className="h-5 w-8" />
                        </div>
                        <div className="space-y-3">
                            {[1, 2, 3].map((j) => (
                                <Skeleton key={j} className="h-32 w-full" />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
