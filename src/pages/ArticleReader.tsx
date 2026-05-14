import React from "react";
import { useParams } from "react-router-dom";
import { allGamesGuides } from "@/content";
import { SoluceLayout } from "@/components/layout/SoluceLayout";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AlertTriangle, Sparkles } from "lucide-react";

export const mdxComponents = {
  Astuce: ({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) => (
    <Alert className="my-8 border-blue-500/40 bg-blue-500/5 backdrop-blur rounded-2xl">
      <Sparkles className="h-5 w-5 text-blue-500" />
      <AlertTitle className="text-blue-700 dark:text-blue-300 font-bold text-lg">
        {title}
      </AlertTitle>
      <AlertDescription className="text-blue-900 dark:text-blue-100 leading-relaxed font-medium mt-2">
        {children}
      </AlertDescription>
    </Alert>
  ),

  Spoil: ({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) => (
    <Accordion
      type="single"
      collapsible
      className="my-8 w-full rounded-2xl border-2 border-red-200 dark:border-red-900/50 bg-red-50/50 dark:bg-red-900/10 px-6"
    >
      <AccordionItem value="spoil-1" className="border-none">
        <AccordionTrigger className="font-black text-red-600 dark:text-red-500 hover:no-underline text-lg py-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-6 h-6" />
            {title}
          </div>
        </AccordionTrigger>
        <AccordionContent className="prose prose-slate dark:prose-invert max-w-none pb-6">
          {children}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export function ArticleReader() {
  const { gameId, chapterSlug } = useParams();

  const game = allGamesGuides[gameId as keyof typeof allGamesGuides] as any;
  const chapter = game?.chapters?.find((c: any) => c.slug === chapterSlug);

  if (!game || !chapter) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="text-center space-y-6">
          <div className="inline-flex p-6 rounded-full bg-red-50 dark:bg-red-500/10 border-4 border-red-100 dark:border-red-900/30">
            <AlertTriangle className="w-12 h-12 text-red-500" />
          </div>
          <h1 className="text-5xl font-black text-slate-900 dark:text-white">
            Page introuvable
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-xl font-medium">
            Ce guide ou chapitre n'existe pas.
          </p>
        </div>
      </div>
    );
  }

  const MdxContent = chapter.component as React.ElementType;

  return (
    <SoluceLayout
      title={chapter.title}
      gameTitle={game.title}
      gameId={game.id}
      chapters={game.chapters}
    >
      <article className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-black prose-h1:text-5xl prose-h2:text-3xl prose-h3:text-2xl prose-p:text-base prose-p:leading-7 prose-img:rounded-2xl prose-img:border prose-img:shadow-md prose-a:text-red-600 hover:prose-a:text-red-500">
        <MdxContent components={mdxComponents} />
      </article>
    </SoluceLayout>
  );
}
