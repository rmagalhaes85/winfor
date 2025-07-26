package com.winfor.usuario;

import java.util.List;
import java.util.stream.Collectors;

import jakarta.enterprise.context.RequestScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.MediaType;

import io.quarkus.logging.Log;

import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.CreatedResponseUtil;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.resource.RealmResource;
import org.keycloak.admin.client.resource.UsersResource;
import org.keycloak.representations.idm.UserRepresentation;

// Este serviço mistura responsabilidades de "lógica de negócio" e interação com HTTP ao
// lidar tanto com a API de usuários do Keycloak quanto com a criação de Responses. Dado
// que este serviço não será usado em outro contexto, achei essa abordagem mais econômica
// e conveniente
@RequestScoped
public class UsuarioKeycloakService {

    private final String REALM_NAME = "winfor";

    @Inject
    protected Keycloak keycloak;

    public List<Usuario> listar() {
        return keycloak
            .realm(REALM_NAME)
            .users()
            .list()
            .stream()
            .map(uk -> new Usuario() {{
                username = uk.getUsername();
                id = uk.getId();
                nome = uk.getFirstName();
                sobrenome = uk.getLastName();
                email = uk.getEmail();
                // TODO implementar leitura dos roles
                role = getFirstRoleName(uk);
                senha = ""; // senha deverá poder ser escrita, mas nunca lida
            }})
            .collect(Collectors.toList());
    }

    public Response criar(String username) {
        UserRepresentation user = new UserRepresentation();
        user.setUsername(username);
        RealmResource realmResource = keycloak.realm(REALM_NAME);
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

    public Response ler(String id) {
        UserRepresentation userRepresentation = keycloak
            .realm(REALM_NAME)
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

    public void editar(Usuario usuario) {
    }

    public void remover(String id) {
    }

    private String getFirstRoleName(UserRepresentation ur) {
        // TODO a lista de realm roles não está sendo retornada. Verificar
        List<String> realmRoles = ur.getRealmRoles();
        return realmRoles == null || realmRoles.size() < 1 ? "" : realmRoles.get(0);
    }

}
