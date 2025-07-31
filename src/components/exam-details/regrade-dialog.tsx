"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ITestingArea } from "@/models/Exam";
import { GRADING_SYSTEM_OPTIONS } from "@/constants/grading-systems";
import { AlertTriangle, RefreshCw } from "lucide-react";

const regradeSchema = z.object({
  gradingSystem: z.enum(["general", "lower", "cbc"]),
});

type RegradeFormData = z.infer<typeof regradeSchema>;

interface RegradeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  examId: string;
  testingArea: ITestingArea;
  onRegraded: (testingArea: ITestingArea) => void;
}

export const RegradeDialog: React.FC<RegradeDialogProps> = ({
  open,
  onOpenChange,
  examId,
  testingArea,
  onRegraded,
}) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<RegradeFormData>({
    resolver: zodResolver(regradeSchema),
    defaultValues: {
      gradingSystem: testingArea.gradingSystem || "general",
    },
  });

  const onSubmit = async (data: RegradeFormData) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `/api/v3/exam/${examId}/testing-area/${testingArea._id}/regrade`,
        data
      );

      toast({
        title: "Success",
        description: response.data.message,
      });

      onRegraded(response.data.data);
      onOpenChange(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.error || "Failed to re-grade testing area",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const currentGradingSystem = GRADING_SYSTEM_OPTIONS.find(
    option => option.value === testingArea.gradingSystem
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <RefreshCw className="h-5 w-5" />
            Re-grade Testing Area
          </DialogTitle>
          <DialogDescription>
            Change the grading system for &quot;{testingArea.name}&quot; and recalculate all marks.
          </DialogDescription>
        </DialogHeader>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
            <div className="text-sm text-amber-800">
              <p className="font-medium mb-1">Current Grading System:</p>
              <p>{currentGradingSystem?.label}</p>
              <p className="text-xs mt-1">{currentGradingSystem?.description}</p>
              
              {testingArea.marks && testingArea.marks.length > 0 && (
                <p className="mt-2 font-medium">
                  This will recalculate {testingArea.marks.length} student mark(s).
                </p>
              )}
            </div>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="gradingSystem"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Grading System</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select grading system" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {GRADING_SYSTEM_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex flex-col">
                            <span className="font-medium">{option.label}</span>
                            <span className="text-xs text-gray-500">{option.description}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Re-grading..." : "Re-grade"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
