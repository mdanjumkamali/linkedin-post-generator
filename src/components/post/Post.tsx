"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Result from "./Result";

const FormSchema = z.object({
  prompts: z.string().min(5, {
    message: "Prompt must be at least 5 characters.",
  }),
  voiceTone: z.string().nonempty({
    message: "Voice tone must be selected.",
  }),
});

const Post = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      prompts: "",
      voiceTone: "",
    },
  });

  const [voiceTone, setVoiceTone] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(data: any) {
    setIsLoading(true);
    try {
      const res = await axios.post("/api/generator", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setResponse(res.data);
      form.reset({
        prompts: "",
        voiceTone: "",
      });
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-screen-lg mx-auto flex flex-col items-center mt-10 p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <FormField
            control={form.control}
            name="prompts"
            render={({ field }) => (
              <FormItem>
                <FormControl className="h-16 text-lg">
                  <Input placeholder="LinkedIn Post Generator" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col md:flex-row gap-4 mt-6">
            <FormField
              control={form.control}
              name="voiceTone"
              render={({ field }) => (
                <FormItem className="w-full md:w-1/2">
                  <FormControl>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        setVoiceTone(value);
                      }}
                      value={voiceTone}
                    >
                      <SelectTrigger className="w-full h-12 text-lg">
                        <SelectValue placeholder="Select Tone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="casual">Casual</SelectItem>
                          <SelectItem value="storytelling">
                            Storytelling
                          </SelectItem>
                          <SelectItem value="creative">Creative</SelectItem>
                          <SelectItem value="inspirational">
                            Inspirational
                          </SelectItem>
                          <SelectItem value="professional">
                            Professional
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full md:w-1/2 h-12 text-lg bg-[#e55c43] hover:bg-[#ff7f66]"
              disabled={isLoading}
            >
              Generate
            </Button>
          </div>
        </form>
      </Form>

      <Result isLoading={isLoading} response={response} />
    </div>
  );
};

export default Post;
