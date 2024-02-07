import { faker } from "@faker-js/faker";
import { eachLimit } from "async";

import { prisma } from "./client";

const seedSingleBatch = async () => {
  const envId = "ffb37205-18fe-4615-868a-ffb7ac6a944a";
  const now = new Date();
  const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());

  const createFakeLog = () => {
    const randomDateBetweenNowAndAnHourAgo = faker.date.between({ from: oneMonthAgo, to: now });
    return {
      paths: null,
      isTopLevel: true,
      messages: null,
      model: "gpt-4",
      rawInput: null,
      rawOutput: null,
      startTime: randomDateBetweenNowAndAnHourAgo,
      endTime: faker.date.recent(),
      duration: parseFloat(faker.number.float({ max: 30 }).toFixed(2)),
      inputTokenCount: 0,
      outputTokenCount: 0,
      totalTokenCount: 0,
      inputCost: 0,
      outputCost: 0,
      totalCost: faker.number.float(2),
      envId: envId,
    };
  };

  const arraySize = 1000;
  const fakeLogs = Array.from({ length: arraySize }, createFakeLog);

  await prisma.log.createMany({
    data: fakeLogs,
  });
};

const seed = async () => {
  try {
    const arraySize = 1000;
    const array = Array(arraySize);
    const batches = 10;
    await eachLimit(array, batches, seedSingleBatch);
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

void seed();
