"use server"

import { PrismaClient } from "@prisma/client"

const db = new PrismaClient()

export default async function getData({ email }: {
    email: string
}) {
  try {
    const data = await db.studentMarks.findUnique({
      where: { email },
    })

    const result = {
      email: email,
      marks: {
        testname: data?.testname,
        graphics: data?.graphics,
        iot: data?.iot,
        webtech: data?.webtech,
        stlab: data?.stlab,
        project: data?.project,
      }
    }

    return {
        type: "success",
        message: "Data fetched successfully",
        result,
    }
  } catch (error) {
    console.error("Error fetching data:", error)
    return {
        type: "error",  
        message: "An error occurred while fetching data",
    }
  }
}