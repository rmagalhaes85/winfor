FROM quay.io/keycloak/keycloak:26.3.1-0 as builder
ENV KC_DB=postgres
ENV KC_HOME=/opt/keycloak
#RUN groupadd -r builder && useradd -r -g builder builder
WORKDIR ${KC_HOME}
RUN bin/kc.sh build

FROM quay.io/keycloak/keycloak:26.3.1-0
ENV KC_HOME=/opt/keycloak
COPY realms /opt/keycloak/data/import
#RUN groupadd -r keycloak && useradd -r -g keycloak keycloak
#COPY --from=builder ${KC_HOME} ${KC_HOME}
#RUN chown -R keycloak:keycloak ${KC_HOME} \
#    && chmod -R g+rX ${KC_HOME}
#USER keycloak
EXPOSE 8080
EXPOSE 8443
CMD ["start-dev", "--import-realm"]
