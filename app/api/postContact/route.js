import { promises as fs } from "fs";
import path from "path";

export async function POST(req) {
  try {
    const body = await req.json();

    // Ensure the directory exists
    const directory = path.join(process.cwd(), "contactdetails");
    try {
      await fs.access(directory);
    } catch (error) {
      // If the directory does not exist, create it
      await fs.mkdir(directory);
    }

    // Read the directory
    const files = await fs.readdir(directory);

    // Write the new file
    const filePath = path.join(directory, `${files.length + 1}.json`);
    await fs.writeFile(filePath, JSON.stringify(body));

    // Send a successful response
    return Response.json(body, { status: 200 });
  } catch (error) {
    console.error("An error occurred:", error);
    return Response.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
