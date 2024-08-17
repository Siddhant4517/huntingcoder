import { promises as fs } from "fs";
import path from "path";
import corsMiddleware from "../../lib/corsMiddleware";

export async function GET(req) {
  try {
    // Apply the CORS middleware
    await new Promise((resolve, reject) => {
      corsMiddleware(
        req,
        {
          setHeader: (name, value) => {
            req.headers[name.toLowerCase()] = value;
          },
          status: () => 200,
          end: resolve,
        },
        (result) => {
          if (result instanceof Error) {
            return reject(result);
          }
          resolve(result);
        }
      );
    });

    const queryParams = new URL(req.url).searchParams;
    const offset = parseInt(queryParams.get("offset")) || 0;
    const limit = parseInt(queryParams.get("limit")) || 5;

    const data = await fs.readdir("blogdata");
    let allBlogs = [];

    for (
      let index = offset;
      index < Math.min(offset + limit, data.length);
      index++
    ) {
      const item = data[index];
      const myfile = await fs.readFile(path.join("blogdata", item), "utf-8");
      allBlogs.push(JSON.parse(myfile));
    }

    return new Response(JSON.stringify({ allBlogs }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch blogs" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
