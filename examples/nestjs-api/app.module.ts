import {
  Module,
  Controller,
  Get,
  Post,
  BadRequestException,
  InternalServerErrorException,
  Param,
  NotFoundException,
} from "@nestjs/common";
import { ObservabilityModule } from "@ideategudy/express-nestjs-observability/nestjs";

@Controller("api")
export class AppController {
  @Get("users")
  getUsers() {
    return [
      { id: 1, name: "Alice NestJS", role: "DevOps Engineer" },
      { id: 2, name: "Bob Cloud", role: "Site Reliability Engineer" },
      { id: 3, name: "Charlie Sentry", role: "Backend Architect" },
    ];
  }

  @Post("login")
  login() {
    return { success: true, token: "nest_mock_jwt_token" };
  }

  @Get("simulate-error")
  simulateError() {
    throw new InternalServerErrorException(
      "Simulated Database Timeout Exception: Connection lost to cluster pool"
    );
  }

  @Get("simulate-bad-request")
  simulateBadRequest() {
    throw new BadRequestException(
      "Validation Failed: Invalid user payload parameter 'organizationId'"
    );
  }

  @Get("items/:id")
  getItem(@Param("id") id: string) {
    if (id === "999") {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
    return { id, name: `Telemetry Item ${id}`, available: true };
  }
}

@Module({
  imports: [
    ObservabilityModule.forRoot({
      serviceName: "bookme-nestjs-api",
      autoInitTracing: false,
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}

