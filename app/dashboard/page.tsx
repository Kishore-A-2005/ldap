"use client"

import { useState, useEffect } from "react"
import type { StudentData } from "@/types/student"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import getData from "@/actions/getData"

function DashboardPage() {
  const [studentData, setStudentData] = useState<StudentData | undefined>(undefined)
  const email = localStorage.getItem("email")

  useEffect(() => {
    async function fetchData() {
      if (email === null) {
        return
      }
      
      const response = await getData({email})

      setStudentData(response.result)
    }
    fetchData()
  },  [email])

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Student Dashboard</h1>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-lg leading-6 font-medium text-gray-900">Student Information</h2>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and marks</p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Email address</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{studentData?.email}</dd>
              </div>
            </dl>
          </div>
        </div>

        <Table>
          <TableCaption>Student marks in various subjects</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Subject</TableHead>
              <TableHead>Marks</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
          {studentData?.marks
            ? Object.entries(studentData.marks).map(([subject, marks]) => (
                <TableRow key={subject}>
                  <TableCell className="font-medium">
                    {subject.charAt(0).toUpperCase() + subject.slice(1)}
                  </TableCell>
                  <TableCell>{marks ?? "N/A"}</TableCell>
                </TableRow>
              ))
            : null}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default DashboardPage