"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormItem,
  FormField,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import { OnBoardingSchema } from "@/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { useState, useTransition } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import Link from "next/link";

export const OnBoardingForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof OnBoardingSchema>>({
    resolver: zodResolver(OnBoardingSchema),
    defaultValues: {
      petName: "",
      age: undefined,
      about: "",
      breed: "",
      gender: "",
      image: undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof OnBoardingSchema>) => {
    setError("");
    setSuccess("");

    console.log(values);

    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append("about", values.about);
        formData.append("age", values.age);
        formData.append("breed", values.breed);
        formData.append("gender", values.gender);
        formData.append("image", values.image);
        formData.append("petName", values.petName);

        const response = await fetch("/api/onboarding", {
          method: "POST",
          body: formData,
        });

        const result = await response.json();

        if (response.ok) {
          setSuccess(result.success);
          setError("");
        } else {
          setSuccess("");
          setError(result.error);
        }
      } catch (error) {
        setError("An error occurred while submitting the form.");
        setSuccess("");
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <h1 className="text-2xl font-semibold text-primary">
          Register Your Pet
        </h1>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid  gap-6 space-y-6"
          >
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="petName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pet Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="John Doe's dog"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="1"
                        type="number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="breed"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Breed</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="Indie"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="Male"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="about"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>About</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="He likes to play fetch."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="image"
                render={({ field: { value, onChange, ...fieldProps } }) => (
                  <FormItem>
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                      <Input
                        {...fieldProps}
                        onChange={(event) =>
                          onChange(event.target.files && event.target.files[0])
                        }
                        disabled={isPending}
                        type="file"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormError message={error} />
              <FormSuccess message={success} />
              <Button type="submit" disabled={isPending} className="w-full">
                Create Account
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <Link href="/pet/findmate" className="text-primary">
          Already Registered?
        </Link>
      </CardFooter>
    </Card>
  );
};