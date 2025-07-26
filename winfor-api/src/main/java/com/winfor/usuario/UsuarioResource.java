package com.winfor.usuario;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

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

import org.keycloak.admin.client.CreatedResponseUtil;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.resource.RealmResource;
import org.keycloak.admin.client.resource.UsersResource;
import org.keycloak.representations.idm.UserRepresentation;

@Path("/api/usuarios")
public class UsuarioResource {
    @Inject
    SecurityIdentity securityIdentity;

    @Inject
    Keycloak keycloak;

    @GET
    @Path("/")
    @RolesAllowed("admin_winfor")
    @Produces(MediaType.APPLICATION_JSON)
    public Usuario[] listar() {
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
        return usuarios.toArray(new Usuario[0]);
    }

    @POST
    @Path("/")
    @RolesAllowed("admin_winfor")
    @Produces(MediaType.APPLICATION_JSON)
    public Response criar(String username) {
        UserRepresentation user = new UserRepresentation();
        user.setUsername(username);
        RealmResource realmResource = keycloak.realm("winfor");
        UsersResource usersResource = realmResource.users();

        Response response = usersResource.create(user);
        Response.Status status = Response.Status.fromStatusCode(response.getStatus());

        if (status == Response.Status.CREATED) {
            String userId = CreatedResponseUtil.getCreatedId(response);
            Log.info(String.format("Usuario '%s' criado com sucesso. Id = '%s'",
                        username, userId));
            Usuario u = new Usuario();
            u.username = username;
            u.id = userId;
            return Response.status(status)
                .entity(u)
                .type(MediaType.APPLICATION_JSON)
                .build();
        }

        if (status == Response.Status.CONFLICT) {
            Log.info(String.format("Já existe um usuário de login '%s'", username));
            return Response.status(status).build();
        }

        Log.error(String.format("A API do Keycloak retornou um status desconhecido: %d",
                    status));
        return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
    }

    @GET
    @Path("/{id}")
    @RolesAllowed("admin_winfor")
    @Produces(MediaType.APPLICATION_JSON)
    public Response ler(String id) {
        UserRepresentation userRepresentation = keycloak
            .realm("winfor")
            .users()
            .get(id)
            .toRepresentation();

        if (userRepresentation == null) {
            return Response.status(Response.Status.NOT_FOUND)
                .build();
        }

        Usuario usuario = new Usuario();
        usuario.id = userRepresentation.getId();
        usuario.username = userRepresentation.getUsername();
        usuario.nome = userRepresentation.getFirstName();
        usuario.sobrenome = userRepresentation.getLastName();
        usuario.email = userRepresentation.getEmail();

        return Response.status(Response.Status.OK)
            .entity(usuario)
            .type(MediaType.APPLICATION_JSON)
            .build();
    }

    @PUT
    @Path("/{id}")
    @RolesAllowed("admin_winfor")
    public String edit(String id) {
        return "{\"result\": \"OK\"}";
    }

    private String getFirstRoleName(UserRepresentation ur) {
        // TODO a lista de realm roles não está sendo retornada. Verificar
        List<String> realmRoles = ur.getRealmRoles();
        return realmRoles == null || realmRoles.size() < 1 ? "" : realmRoles.get(0);
    }
}
