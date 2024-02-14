// import { faker } from "@faker-js/faker";
// import { eachLimit } from "async";
//
// import { Prisma, prisma } from "./client";
//
// const seedSingleBatch = async () => {
//   const envId = "380a5884-6cc9-4997-9a25-905b24fe78ae";
//   const now = new Date();
//   // const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
//   const oneHourAgo: Date = new Date(now.getTime() - 60 * 60 * 1000);
//
//   const createFakeLog = (): Prisma.LogCreateManyInput => {
//     const randomDate = faker.date.between({ from: oneHourAgo, to: now });
//     return {
//       traceId: null,
//       parentLogId: null,
//       extra: {},
//       name: "some name",
//       model: "gpt-4",
//       input: "Some input",
//       output: "Some output",
//       startTime: randomDate,
//       endTime: faker.date.recent(),
//       duration: faker.number.float({ fractionDigits: 2, min: 0, max: 30 }),
//       inputTokens: 0,
//       outputTokens: 0,
//       totalTokens: faker.number.int({ min: 100, max: 50000 }),
//       inputCost: 0,
//       outputCost: 0,
//       totalCost: faker.number.float({ fractionDigits: 2, min: 0, max: 3 }),
//       envId: envId,
//     };
//   };
//
//   const arraySize = 100;
//   const fakeLogs = Array.from({ length: arraySize }, createFakeLog);
//
//   await prisma.log.createMany({
//     data: fakeLogs,
//   });
// };
//
// const seed = async () => {
//   try {
//     const arraySize = 1;
//     const array = Array(arraySize);
//     const batches = 10;
//     await eachLimit(array, batches, seedSingleBatch);
//   } catch (error) {
//     console.error(error);
//     process.exit(1);
//   } finally {
//     await prisma.$disconnect();
//   }
// };
//
// void seed();
