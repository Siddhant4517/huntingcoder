import { promises as fs } from "fs";
import path from "path";

export async function GET(req) {
  try {
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
