package com.winfor;

import io.quarkus.security.identity.SecurityIdentity;
import jakarta.annotation.security.PermitAll;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@Path("/api")
public class GreetingResource {

    @Inject
    SecurityIdentity securityIdentity;

    @GET
    @Path("/public/hello")
    @PermitAll
    @Produces(MediaType.TEXT_PLAIN)
    public String hello() {
        return "Hello from Quarkus REST!!";
    }

    @GET
    @Path("/private/hellovip")
    @RolesAllowed("admin_winfor")
    @Produces(MediaType.TEXT_PLAIN)
    public String helloVip() {
        return "Hello VIP";
    }
}
