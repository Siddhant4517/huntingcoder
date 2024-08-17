import { promises as fs } from "fs";

export async function GET(req, res) {
  try {
    const data = await fs.readFile("blogdata/next.js-14.1.json", "utf-8");
    return new Response(
      JSON.stringify({ message: "Hello, world!", data: JSON.parse(data) }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: "File not found" }), {
      status: 404,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
