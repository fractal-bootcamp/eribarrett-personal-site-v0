import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: publicProcedure
    .input(z.object({
      title: z.string().min(1),
      content: z.string().min(1),
      slug: z.string().min(1),
      excerpt: z.string().optional(),
      published: z.boolean().default(true)
    }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.post.create({
        data: {
          title: input.title,
          content: input.content,
          slug: input.slug,
          excerpt: input.excerpt,
          published: input.published,
        },
      });
    }),

  getLatest: publicProcedure.query(async ({ ctx }) => {
    const post = await ctx.db.post.findFirst({
      orderBy: { createdAt: "desc" },
    });

    return post ?? null;
  }),

  getBySlug: publicProcedure.input(z.object({ slug: z.string() })).query(async ({ ctx, input }) => {
    const post = await ctx.db.post.findFirst({
      where: { slug: input.slug },
    });

    return post ?? null;
  }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    try {
      // First try to get all posts regardless of published status
      const allPosts = await ctx.db.post.findMany({
        orderBy: { createdAt: "desc" },
      });

      console.log(`Found ${allPosts.length} total posts (including unpublished)`);

      // Then get only published posts
      const publishedPosts = await ctx.db.post.findMany({
        where: { published: true },
        orderBy: { createdAt: "desc" },
      });

      console.log(`Found ${publishedPosts.length} published posts`);

      // Return all posts for now to debug
      return allPosts;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  }),

  getByDate: publicProcedure.input(z.object({ date: z.string() })).query(async ({ ctx, input }) => {
    const posts = await ctx.db.post.findMany({
      where: { createdAt: { gte: new Date(input.date) } },
      orderBy: { createdAt: "desc" },
    });

    return posts;
  }),

  update: publicProcedure
    .input(z.object({
      id: z.string(),
      title: z.string().min(1).optional(),
      content: z.string().min(1).optional(),
      slug: z.string().min(1).optional(),
      excerpt: z.string().optional(),
      published: z.boolean().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      return ctx.db.post.update({
        where: { id },
        data,
      });
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.post.delete({
        where: { id: input.id },
      });
    }),
});
