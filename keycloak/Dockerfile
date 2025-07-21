FROM quay.io/keycloak/keycloak:26.3.1-0 as builder
ENV KC_DB=postgres
ENV KC_HOME=/opt/keycloak
WORKDIR ${KC_HOME}
RUN bin/kc.sh build

FROM quay.io/keycloak/keycloak:26.3.1-0
ENV KC_HOME=/opt/keycloak
COPY realms /opt/keycloak/data/import
EXPOSE 8080
EXPOSE 8443
CMD ["start-dev", "--import-realm"]
