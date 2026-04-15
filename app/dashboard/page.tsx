"use client";

import { useState } from "react";

import Image from "next/image";

import { Footer } from "./_components/footer";
import { Navbar } from "./_components/navbar";
import { Toolbar } from "./_components/toolbar";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Plus, Search } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { toast } from "sonner";

const DashboardPage = () => {
  return (
    <>
      <div className="bg-secondary/20 dark:bg-secondary mx-auto flex w-full max-w-7xl flex-1 border-x">
        <div className="bg-card flex w-full flex-1 flex-col rounded-xl p-5">
          <div className="flex w-full justify-between">
            <h2 className="text-2xl font-medium">Notebooks</h2>
            <InputGroup className="max-w-xs">
              <InputGroupInput placeholder="Search..." />
              <InputGroupAddon>
                <HugeiconsIcon icon={Search} />
              </InputGroupAddon>
            </InputGroup>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            <div className="group flex w-full cursor-pointer flex-col gap-1 rounded-lg pb-2 transition-all duration-200 hover:shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] dark:hover:shadow-[0px_2px_3px_-1px_rgba(255,255,255,0.06),0px_1px_0px_0px_rgba(255,255,255,0.04),0px_0px_0px_1px_rgba(255,255,255,0.08)]">
              <div className="rounded-xl transition-transform group-hover:scale-105">
                <Image
                  width={500}
                  height={500}
                  src="/book.png"
                  alt="book"
                  className="mb-2 aspect-[1/1.3] h-auto w-full rounded-xl"
                />
              </div>
              <div className="transition-transform group-hover:translate-x-4">
                <h3 className="text-lg font-medium">Untitled notebook</h3>
                <p className="text-muted-foreground text-base">
                  Robert Krinoski
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
