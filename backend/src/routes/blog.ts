import { createBlogInputSchema, updateBlogInputSchema } from "@adi_solanki21/medium-common-module";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";

// bind the downloaded env variables from wrangler to hono since typescript cannot identify the env variables
export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string,
    },
    Variables: {
        userId: string,
    }
}>();

blogRouter.use('/*', async (c, next) => {
    const authHeader = c.req.header('Authorization');
    if (!authHeader) {
        c.status(403);
        return c.json({
            message: 'You are not logged in',
        });
    }
    const user = await verify(authHeader, c.env.JWT_SECRET);
    if (!user) {
        c.status(403);
        return c.json({
            message: 'You are not logged in',
        });
    }
    c.set('userId', user.id);
    await next();
});

// create a new blog
blogRouter.post('/', async (c) => {
    const body = await c.req.json();
    const {success} = createBlogInputSchema.safeParse(body);
    if (!success) {
        c.status(411);
        return c.text('Invalid input!');
    }
    const userId = c.get('userId');
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const blog = await prisma.blog.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: userId,
            }
        });

        return c.json({
            id: blog.id,
        });
    } catch (e) {
        c.status(411);
        console.log(e);
        return c.text('Failed to create blog!');
    }
})

// update a blog
blogRouter.put('/', async (c) => {
    const body = await c.req.json();
    const {success} = updateBlogInputSchema.safeParse(body);
    if (!success) {
        c.status(411);
        return c.text('Invalid input!');
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const blog = await prisma.blog.update({
            where: {
                id: body.id,
            },
            data: {
                title: body.title,
                content: body.content,
            }
        });

        return c.json({
            id: blog.id,
            title: blog.title,
            content: blog.content,
        });
    } catch (e) {
        c.status(411);
        console.log(e);
        return c.text('Failed to update blog!');
    }
})

// get all the blogs
blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    // TODO: implement pagination
    try {
        const blogs = await prisma.blog.findMany({
            select: {
                content: true,
                title: true,
                id: true,
                author: {
                    select: {
                        id: true,
                        name: true,
                    }
                },
            }
        });

        return c.json(blogs);
    } catch (e) {
        c.status(411);
        console.log(e);
        return c.text('Failed to fetch blogs!');
    }
})

// get a blog
blogRouter.get('/:id', async (c) => {
    const blogId = c.req.param("id");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const blog = await prisma.blog.findFirst({
            where: {
                id: blogId,
            },
            select: {
                content: true,
                title: true,
                id: true,
                author: {
                    select: {
                        id: true,
                        name: true,
                    }
                },
            }
        });

        return c.json(blog);
    } catch (e) {
        c.status(411);
        console.log(e);
        return c.text('Failed to get blog!');
    }
})
