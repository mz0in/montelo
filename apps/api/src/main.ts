import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { SwaggerTheme } from "swagger-themes";

import { AppModule } from "./app.module";
import { PrismaClientExceptionFilter } from "./common/filters/prisma-client-exception.filter";
import { LoggerMiddleware } from "./common/middlewares/logger.middleware";
import { envSchema } from "./env";

async function bootstrap() {
  const env = envSchema.parse(process.env);
  const app = await NestFactory.create(AppModule);

  // middlewares
  app.use(new LoggerMiddleware().use);

  // filters
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  // swagger
  if (env.NODE_ENV === "development") {
    const config = new DocumentBuilder()
      .setTitle("Montelo")
      .setDescription("Documentation for the Montelo API.")
      .setVersion("1.0")
      .addServer(`http://localhost:${env.PORT}/`, "🟢 Local")
      // .addServer("https://production.yourapi.com/", "🔴 Production")
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    const theme = new SwaggerTheme("v3");
    const options = {
      explorer: true,
      customCss: theme.getBuffer("dark"),
    };
    // SwaggerUI gets set to /docs
    SwaggerModule.setup("docs", app, document, options);
  }

  await app.listen(env.PORT, "0.0.0.0");
}

void bootstrap();
