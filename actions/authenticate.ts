"use server"

import { PrismaClient } from "@prisma/client"

const db = new PrismaClient()

export default async function Authenticate({ email, password }: { email: string, password: string }) {
  try {
    console.log("Authenticating with email:", email) 
    const user = await db.loginDetails.findUnique({
      where: { email },
    })

    if (user && user.password === password) {
      console.log("Authentication successful")
      return {
        message: "Authentication Successful",
        status: true,
      }
    } else {
      console.log("Authentication failed")
      return {
        message: "Authentication Failed, Check email or password and try again",
        status: false,
      }
    }
  } catch (error) {
    console.error("Error during authentication:", error)
    return {
      message: "An error occurred during authentication",
      status: false,
    }
  }
}
