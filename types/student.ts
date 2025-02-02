export interface StudentData {
  email: string,
  marks: {
    testname: string | null | undefined,
    graphics: string | null | undefined,
    iot: string | null | undefined,
    webtech: string | null | undefined,
    stlab: string | null | undefined,
    project: string | null | undefined,
  }
}
