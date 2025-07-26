package com.winfor.usuario;

import java.util.ArrayList;
import java.util.List;

import io.quarkus.logging.Log;
import io.quarkus.security.identity.SecurityIdentity;

import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/api/usuarios")
public class UsuarioResource {
    @Inject
    SecurityIdentity securityIdentity;

    @Inject
    protected UsuarioKeycloakService usuarioKeycloakService;

    @GET
    @Path("/")
    @RolesAllowed("admin_winfor")
    @Produces(MediaType.APPLICATION_JSON)
    public Usuario[] listar() {
        return usuarioKeycloakService
            .listar()
            .toArray(new Usuario[0]);
    }

    @POST
    @Path("/")
    @RolesAllowed("admin_winfor")
    @Produces(MediaType.APPLICATION_JSON)
    public Response criar(String username) {
        return usuarioKeycloakService.criar(username);
    }

    @GET
    @Path("/{id}")
    @RolesAllowed("admin_winfor")
    @Produces(MediaType.APPLICATION_JSON)
    public Response ler(String id) {
        return usuarioKeycloakService.ler(id);
    }

    @PUT
    @Path("/{id}")
    @RolesAllowed("admin_winfor")
    public String edit(String id) {
        return "{\"result\": \"OK\"}";
    }
}
