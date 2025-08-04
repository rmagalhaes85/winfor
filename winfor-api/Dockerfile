

#FROM maven:3.9-eclipse-temurin-21 AS development
# RUN groupadd -g 1000 appuser && \
#   useradd -d /home/appuser -u 1000 -g 1000 -s /bin/bash appuser
#USER 1000:1000
#WORKDIR /app
#COPY pom.xml /app
#RUN mkdir src
#COPY src /src
#RUN echo "whoami? $(whoami)"
#RUN mvn clean package -DskipTests
#RUN mvn quarkus:dev -DdebugHost=0.0.0.0 # -Dsuspend

FROM eclipse-temurin:21-jre-alpine AS runner
WORKDIR /app
USER appuser
COPY --from=build /app/target/quarkus-app/ ./
#CMD ["java", "-jar", "quarkus-run.jar"]
