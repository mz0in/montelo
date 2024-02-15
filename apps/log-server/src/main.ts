import { Logger } from "@nestjs/common";
import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from "@nestjs/swagger";
import { SwaggerTheme, SwaggerThemeName } from "swagger-themes";

import { AppModule } from "./app.module";
import { HttpExceptionFilter } from "./common/filters/exception.filter";
import { PrismaClientExceptionFilter } from "./common/filters/prisma-client-exception.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger("App");

  // filters
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));
  app.useGlobalFilters(new HttpExceptionFilter());

  // swagger
  if (process.env.NODE_ENV === "development") {
    const config = new DocumentBuilder()
      .setTitle("Montelo Log Server")
      .setDescription("This server handles creating traces and traces.")
      .setVersion("1.0")
      .addServer(`http://localhost:${process.env.PORT!}/`, "🟢 Local")
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    const theme = new SwaggerTheme("v3");
    const themeName: SwaggerThemeName = "dark";
    const options: SwaggerCustomOptions = {
      explorer: true,
      customCss: theme.getBuffer(themeName),
    };
    // SwaggerUI gets set to /docs
    SwaggerModule.setup("docs", app, document, options);
  }

  if (process.env.NODE_ENV === "development") {
    await app.listen(process.env.PORT!);
  } else {
    await app.listen(process.env.PORT!, "0.0.0.0");
  }

  // graceful shutdown func
  const gracefulShutdown = async () => {
    logger.log("NestJS application is shutting down...");
    await app.close();
    logger.log("Application has been shut down.");
    process.exit(0);
  };

  // SIGINT is typically sent when the user presses Ctrl+C in the terminal
  process.on("SIGINT", gracefulShutdown);
  // SIGTERM is a termination signal typically sent from system shutdown operations
  process.on("SIGTERM", gracefulShutdown);
  // Optionally handle other signals, e.g., SIGHUP (hang up)
  process.on("SIGHUP", gracefulShutdown);
}

void bootstrap();
