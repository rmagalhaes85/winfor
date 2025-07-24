package com.winfor.usuario;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import io.quarkus.security.identity.SecurityIdentity;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

import org.keycloak.admin.client.Keycloak;
import org.keycloak.representations.idm.UserRepresentation;

@Path("/usuario")
public class UsuarioResource {
    @Inject
    SecurityIdentity securityIdentity;

    @Inject
    Keycloak keycloak;

    @GET
    @Path("/")
    @RolesAllowed("admin_winfor")
    @Produces(MediaType.APPLICATION_JSON)
    public Usuario[] list() {
        List<Usuario> usuarios = keycloak
                .realm("winfor")
                .users()
                .list()
                .stream()
                .map(uk -> new Usuario() {{
                    username = uk.getUsername();
                    id = uk.getId();
                    nome = uk.getFirstName();
                    sobrenome = uk.getLastName();
                    email = uk.getEmail();
                    // TODO
                    role = getFirstRoleName(uk);
                    senha = ""; // senha deverá poder ser escrita, mas nunca lida
                }})
                .collect(Collectors.toList());
        Usuario u = new Usuario();
        return usuarios.toArray(new Usuario[0]);
    }

    private String getFirstRoleName(UserRepresentation ur) {
        // TODO a lista de realm roles não está sendo retornada. Verificar
        List<String> realmRoles = ur.getRealmRoles();
        return realmRoles == null || realmRoles.size() < 1 ? "" : realmRoles.get(0);
    }
}
