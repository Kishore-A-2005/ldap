"use server"
import { PrismaClient } from "@prisma/client"
const { Client } = require('pg');

const client = new Client({
	user: 'postgres',
	password: 'test123',
	host: '0.tcp.in.ngrok.io',
	port: '13406',
	database: 'CollegeCo',
});


client.connect()
const db = new PrismaClient()

export default async function Authenticate({ email, password }: { email: string, password: string }) {
  try {
    console.log("Authenticating with email:", email) 
    const user = await db.loginDetails.findUnique({
      where: { email }, //to prevent sql injection by avoiding native queries 
    })

    if (user && user.password === password) {
      console.log("Authentication successful")
      return {
        message: "Authentication Successful",
        status: true,
      }
    } else {
      console.log("Authentication failed")
      client.query('select askdfkdff;') //to trigger alert in siem
      client.end()
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
