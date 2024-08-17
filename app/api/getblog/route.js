import { promises as fs } from "fs";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  try {
    const data = await fs.readFile(`./blogdata/${slug}.json`, "utf-8");
    return new Response(JSON.stringify({ data: JSON.parse(data) }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "File not found" }), {
      status: 404,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
