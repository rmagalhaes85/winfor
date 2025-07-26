package com.winfor.usuario;

import java.util.List;
import java.util.stream.Collectors;
import static java.util.Arrays.asList;

import jakarta.enterprise.context.RequestScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.MediaType;

import io.quarkus.logging.Log;

import org.apache.commons.lang3.StringUtils;

import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.CreatedResponseUtil;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.resource.RealmResource;
import org.keycloak.admin.client.resource.RoleScopeResource;
import org.keycloak.admin.client.resource.UserResource;
import org.keycloak.admin.client.resource.UsersResource;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.RoleRepresentation;
import org.keycloak.representations.idm.UserRepresentation;

// Este serviço mistura responsabilidades de "lógica de negócio" e interação com HTTP ao
// lidar tanto com a API de usuários do Keycloak quanto com a criação de Responses. Dado
// que este serviço não será usado em outro contexto, achei essa abordagem mais econômica
// e conveniente
@RequestScoped
public class UsuarioKeycloakService {

    private final String REALM_NAME = "winfor";
    private final String[] ROLES = {"admin_winfor", "coordenador_cursos", "professor", "aluno"};

    @Inject
    protected Keycloak keycloak;

    public List<Usuario> listar() {
        return keycloak
            .realm(REALM_NAME)
            .users()
            .list()
            .stream()
            .map(userRep -> new Usuario() {{
                username = userRep.getUsername();
                id = userRep.getId();
                nome = userRep.getFirstName();
                sobrenome = userRep.getLastName();
                email = userRep.getEmail();
                role = getFirstRoleName(userRep);
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
        UserRepresentation userRepresentation = getUserRepresentationById(id);

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
        usuario.role = getFirstRoleName(userRepresentation);

        return Response.status(Response.Status.OK)
            .entity(usuario)
            .type(MediaType.APPLICATION_JSON)
            .build();
    }

    public void editar(Usuario usuario) {
        UserRepresentation userRep = getUserRepresentationById(usuario.id);
        userRep.setFirstName(usuario.nome);
        userRep.setLastName(usuario.sobrenome);
        userRep.setEmail(usuario.email);
        userRep.setEmailVerified(true);

        RoleScopeResource realmRolesLevel = keycloak
            .realm(REALM_NAME)
            .users()
            .get(userRep.getId())
            .roles()
            .realmLevel();

        RoleRepresentation currentRole = getFirstRole(userRep);
        if (currentRole == null || !currentRole.getName().equals(usuario.role)) {
            RoleRepresentation newRole;
            try {
                newRole = keycloak.realm(REALM_NAME).roles().get(usuario.role).toRepresentation();
            } catch (Exception e) {
                Log.error("Ocorreu um erro ao obter o novo Role: " + e.toString());
                throw e;
            }

            if (currentRole != null) {
                realmRolesLevel.remove(asList(currentRole));
            }
            realmRolesLevel.add(asList(newRole));
        }

        if (!StringUtils.isEmpty(usuario.senha)) {
            CredentialRepresentation credRep = new CredentialRepresentation();
            credRep.setType(CredentialRepresentation.PASSWORD);
            credRep.setValue(usuario.senha);
            credRep.setTemporary(false);
            userRep.setCredentials(asList(credRep));
        }

        keycloak.realm(REALM_NAME).users().get(usuario.id).update(userRep);
    }

    public void remover(String id) {
        keycloak.realm(REALM_NAME).users().get(id).remove();
    }

    private RoleRepresentation getFirstRole(UserRepresentation userRep) {
        List<RoleRepresentation> realmRoles = keycloak
            .realm(REALM_NAME)
            .users()
            .get(userRep.getId())
            .roles()
            .getAll()
            .getRealmMappings()
            .stream()
            .filter(role -> asList(ROLES).contains(role.getName()))
            .collect(Collectors.toList());

        return realmRoles == null || realmRoles.size() < 1 ? null : realmRoles.get(0);
    }

    private String getFirstRoleName(UserRepresentation userRep) {
        RoleRepresentation roleRep = getFirstRole(userRep);
        return roleRep == null ? null : roleRep.getName();
    }

    private UserRepresentation getUserRepresentationById(String id) {
        return keycloak.realm(REALM_NAME).users().get(id).toRepresentation();
    }

}
