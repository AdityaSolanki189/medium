import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";

// bind the downloaded env variables from wrangler to hono since typescript cannot identify the env variables
export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string,
    }
}>();

userRouter.post("/signup", async (c) => {
  const body = await c.req.json();

  // use prisma client with accelerate extension - should be via middleware
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  console.log("hi");
  
  // create a new user
  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
      },
    });

    const token = await sign({
        id: user.id,
      }, c.env.JWT_SECRET
    );

    return c.json({
        token
    });
  } catch (e) {
    c.status(411);
    console.log(e);
    return c.text("Failed to create user!");
  }
});

userRouter.post("/signin", async (c) => {
    const body = await c.req.json()

    // use prisma client with accelerate extension - should be via middleware
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
    // find the existing user
    try {
      const user = await prisma.user.findFirst({
        where: {
          email: body.email,
          password: body.password,
        },
      })
  
      if(!user) {
        c.status(403) // forbidden or unauthorized
        return c.text('Invalid credentials!')
      } 
  
      const token = await sign({ 
        id: user.id 
      }, c.env.JWT_SECRET)
  
      return c.json({
        token,
        user
      })
    } catch (e) {
      c.status(411)
      console.log(e);
      return c.text('Failed to create user!')
    }
});